// Действия экономики. Этот код выполняется на сервере (источник правды) и локально, если сервера нет
var PREFK=['theme','bsize','haptic','anim','confirm','auto','arules','autoMax','autoKeep','autoTags','autoTagAct','autoCap','autoCapAct','autoNotify','asMin','asLimit','mf','mq','cf','cs','cq','hf','rc','tt','gt','pm','mt'];
function defState(){return {coll:[],hist:[],spins:0,yuz:1500,g1:1,g2:1,g3:1,xp:0,luck:0,theme:'auto'}}
function initState(){S.coll=S.coll||[];S.hist=S.hist||[];S.since=S.since||Date.now();S.lots=S.lots||[];S.rare=S.rare||S.hist.filter(function(c){return ti(c.tier)>=2});S.gifts=S.gifts||[];
 if(!S.best){var b=null;S.coll.concat(S.rare,S.hist).forEach(function(c){if(!b||worth(c)>worth(b))b=c});if(b)noteBest(b)}
 if(S.autoKeep===false&&!S.autoTags)S.autoTags=[];giftMigrate();if(!S.bl)S.bl={y:S.yuz,t:S.ton||0}}
function resetAll(){var keep={};PREFK.forEach(function(k){if(S[k]!==undefined)keep[k]=S[k]});S=defState();Object.keys(keep).forEach(function(k){S[k]=keep[k]});initState();cur=null;return{ok:1}}
function spinRoll(){if(S.pending)return{err:'pending'};var fr=S.free>0;if(!fr&&S.yuz<COST)return{err:'poor'};
 if(fr)S.free--;else{S.yuz-=COST;led('Прокрутка')}
 var t=pickTier(),r={u:build(t.id),tier:t.id,base:baseFor(t.id),odds:oddsOf(t),ts:Date.now()};
 S.pending=r;noteBest(r);S.spins++;S.xp+=XPT[t.id];if(S.luck>0)S.luck--;
 S.pity=0;if(S.spins%500==0)S.pity=5;else if(S.spins%50==0)S.pity=2;if(S.pity)toast('Гарант! Следующая прокрутка: удача ×'+S.pity);
 S.hist.unshift(r);if(S.hist.length>50)S.hist.pop();if(ti(r.tier)>=2){S.rare.unshift(r);if(S.rare.length>100)S.rare.pop()}
 tq('spin10');if(ti(r.tier)>=2)tq('rare1');
 if(Math.random()<.006){var gg=giveGift(randGiftType());toast('Находка! Подарок «'+GT(gg.type).n+'»')}
 if(Math.random()<.002){var tf=r3(.01+Math.random()*.04);S.ton=r3((S.ton||0)+tf);led('Находка TON');toast('Находка! +'+tonF(tf)+' TON')}
 save();return{r:r}}
function autoResolve(){var r=S.pending;if(!r)return{err:'none'};var a=autoAction(r);if(a=='ask')return{err:'ask'};
 if(a=='sell'){var g=worth(r);S.yuz+=g;led('Авто-продажа @'+r.u);logAuto(r,g,'sell');S.autoN=(S.autoN||0)+1;S.autoSum=(S.autoSum||0)+g;tq('sell5');S.pending=null;cur=null;save();autoToast('Авто-продажа @'+r.u+' · +'+money(g));paintHome(1)}
 else{logAuto(r,0,'keep');S.autoKept=(S.autoKept||0)+1;keepPending();autoToast('Авто-сохранение @'+r.u)}
 return{ok:1,a:a}}
function claimChest(){tqE();if(!allClaimed()||S.tq.c.chest)return{err:'no'};var cj=chestInfo();S.yuz+=cj.rew;if(cj.n>=7){S.ton=r3((S.ton||0)+.01);giveGift(randGiftType())}
 S.streak=cj.n;S.lastChest=dk(new Date());S.tq.c.chest=1;led('Бонус дня');save();hap({type:'notification',notification_type:'success'});toast('Бонус дня +'+money(cj.rew));draw();return{ok:1}}
function buyLuck(){if(S.yuz<100){toast('Не хватает баланса');return{err:'poor'}}S.yuz-=100;S.luck=(S.luck||0)+10;led('Удача ×3');save();toast('Удача на 10 прокруток');draw();return{ok:1}}
function exchangeTon(t){t=r3(+t);if(!(t>=.001)||t>1000)return{err:'arg'};var cst=Math.ceil(t*RATE*1.1);if(S.yuz<cst){toast('Не хватает звёзд');return{err:'poor'}}
 S.yuz-=cst;S.ton=r3((S.ton||0)+t);led('Обмен ⭐ → TON');save();hap({type:'notification',notification_type:'success'});toast('+'+tonF(t)+' TON');draw();return{ok:1}}
function wheelRoll(){wheelSync();if(S.wt<=0)return{err:'no'};var tot=WHEEL.reduce(function(a,b){return a+b.w},0),r=Math.random()*tot,k=0;
 for(var i=0;i<WHEEL.length;i++){r-=WHEEL[i].w;if(r<=0){k=i;break}}
 if(S.wt>=wcap())S.wl=Date.now();S.wt--;
 var pr=WHEEL[k],st=360/WHEEL.length,prev=S.wrot||0;S.wheelAt=Date.now();
 if(pr.t=='star')S.yuz+=pr.v;else if(pr.t=='luck')S.luck=(S.luck||0)+pr.v;else if(pr.t=='free')S.free=(S.free||0)+pr.v;else if(pr.t=='ton')S.ton=r3((S.ton||0)+pr.v);
 if(pr.t=='gift')giveGift(randGiftType());led('Колесо фортуны');tq('wheel');
 var delta=(((-k*st-prev)%360)+360)%360+360*5,tgt=prev+delta+(Math.random()*st*.6-st*.3);S.wrot=((tgt%360)+360)%360;save();
 return{k:k,tgt:tgt,prize:prizeText(pr)}}
function listLot(p){p=p||{};var c=S.coll.filter(function(x){return x.u==p.u})[0];if(!c)return{err:'item'};var price=+p.price,dur=+p.dur,cc=p.cc=='ton'?'ton':'star';
 if(!(price>0)||!(dur>=30&&dur<=3600))return{err:'arg'};if(cc=='ton'&&ti(c.tier)<3)return{err:'ton'};
 price=cc=='ton'?r3(price):Math.max(1,Math.round(price));S.coll=S.coll.filter(function(x){return x!==c});
 S.lots.push({id:Date.now()+''+ri(100,999),u:c.u,tier:c.tier,base:c.base,cc:cc,seller:'ты',mine:1,fx:p.fx?1:0,to:null,price:price,bidder:null,endsAt:Date.now()+dur*1000});
 tq('list1');save();toast('Лот выставлен');return{ok:1}}
function tickNow(){auTick();return{ok:1}}
function takeForSend(kind,id){var rec=null;
 if(kind=='nick'){rec=S.coll.filter(function(x){return x.u==id})[0];if(!rec)return null;S.coll=S.coll.filter(function(x){return x!==rec})}
 else if(kind=='gift'){rec=(S.gifts||[]).filter(function(x){return x.id==id})[0];if(!rec)return null;S.gifts=S.gifts.filter(function(x){return x!==rec})}
 return rec}
function sendDone(kind,rec,to){glog('Отправлено другу @'+to+': '+(kind=='nick'?'@'+rec.u:gname(rec)));toast('Подарок отправлен @'+to)}
function inboxReceive(items){items.forEach(function(it){var p=it.p;
 if(it.k=='nick'){S.coll.unshift(p);noteBest(p);glog('Получен ник @'+p.u+' от @'+it.from);toast('Подарок от @'+it.from+': ник @'+p.u)}
 else{S.gifts=S.gifts||[];p.from=it.from;S.gifts.unshift(p);glog('Получен подарок «'+gname(p)+'» от @'+it.from);toast('Подарок от @'+it.from+': «'+gname(p)+'»')}})}
