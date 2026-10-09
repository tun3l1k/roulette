// Запуск: обработчики нажатий и инициализация
if(!S.g1){S.g1=1;S.yuz=(S.yuz||0)+10000;save()}
if(!S.g2){S.g2=1;S.ton=r3((S.ton||0)+0.5);save()}
document.addEventListener('click',function(e){
 var el=e.target.closest('[data-go],[data-act],[data-pick],[data-sell],[data-theme],[data-tg],[data-mt],[data-bid],[data-lp],[data-lpp],[data-ld],[data-cur],[data-tu],[data-am],[data-hf],[data-cf],[data-cs],[data-claim],[data-pt],[data-lc],[data-xch],[data-tt]');if(!el)return;
 var d=el.dataset;
 if(d.go){go(d.go);}
 else if(d.pick){S.main=d.pick;S.pinned=true;save();toast('Основной: @'+d.pick);hap({type:'selection_change'});draw()}
 else if(d.sell){var c=S.coll.filter(function(x){return x.u==d.sell})[0];if(c){if(ti(c.tier)>=3&&S.confirm!==false)ask('Продать @'+c.u+' за '+money(worth(c))+'?','Продать',function(){sellOne(c.u)});else sellOne(c.u)}}
 else if(d.cur){S.cur=d.cur;save();draw()}
 else if(d.tu){S.yuz+=+d.tu;save();toast('+'+money(+d.tu)+' (тест)');draw()}
 else if(d.mt){S.mt=d.mt;save();draw()}
 else if(d.bid){bid(d.bid)}
 else if(d.lp){var cc=S.coll.filter(function(x){return x.u==d.lp})[0];if(cc){LU=cc.u;LT=cc.tier;LB=cc.base;LC='star';LP=defPrice();LD=300;draw()}}
 else if(d.lpp){LP=LC=='ton'?r3(Math.max(.001,LP+(+d.lpp)*Math.max(.001,r3(LP*.2)))):Math.max(1,LP+(+d.lpp)*Math.max(1,Math.round(LP*.2)));draw()}
 else if(d.lc){if(d.lc=='ton'&&ti(LT)<3){toast('В TON можно продавать эпические и выше');return}LC=d.lc;LP=defPrice();draw()}
 else if(d.xch){var tq1=+d.xch,cst=Math.ceil(tq1*RATE*1.1);if(S.yuz<cst){toast('Не хватает звёзд');return}S.yuz-=cst;S.ton=r3((S.ton||0)+tq1);save();hap({type:'notification',notification_type:'success'});toast('💎 +'+tonF(tq1)+' TON');draw()}
 else if(d.tt){S.ton=r3((S.ton||0)+(+d.tt));save();toast('+'+tonF(+d.tt)+' TON (тест)');draw()}
 else if(d.ld){LD=+d.ld;draw()}
 else if(d.claim){tqE();var tk=TASKS.filter(function(x){return x.id==d.claim})[0];if(tk&&!S.tq.c[tk.id]&&(S.tq.p[tk.id]||0)>=tk.goal){S.tq.c[tk.id]=1;S.yuz+=tk.rew;save();hap({type:'notification',notification_type:'success'});toast('🎁 +'+money(tk.rew)+' · '+tk.title);draw()}}
 else if(d.pt!==undefined){PT=+d.pt;draw()}
 else if(d.cf!==undefined){S.cf=+d.cf;save();draw()}
 else if(d.cs!==undefined){S.cs=d.cs;save();draw()}
 else if(d.hf!==undefined){S.hf=+d.hf;save();draw()}
 else if(d.am!==undefined){S.autoMax=+d.am;save();draw()}
 else if(d.tg){if(d.tg=='auto')S.auto=!S.auto;else S[d.tg]=(S[d.tg]===false);save();if(d.tg=='haptic')hap({type:'impact',impact_style:'medium'});draw()}
 else if(d.theme){S.theme=d.theme;save();theme();draw()}
 else switch(d.act){
  case 'spin':spin();break;case 'copy':copy();break;case 'share':share();break;
  case 'qr':toast('QR-код — скоро');break;case 'edit':go('coll');break;
  case 'setmain':if(cur){S.main=cur.u;S.pinned=true;save();toast('Основной: @'+cur.u)}else toast('Сначала покрути 🔄');break;
  case 'sellcur':if(!S.pending){toast('Сначала покрути 🔄');break}if(ti(S.pending.tier)>=3&&S.confirm!==false)ask('Продать @'+S.pending.u+' за '+money(worth(S.pending))+'?','Продать',sellPending);else sellPending();break;
  case 'keep':var pk=S.pending;if(!pk){toast('Сначала покрути 🔄');break}
   if(!S.coll.some(function(x){return x.u==pk.u}))S.coll.unshift(pk);
   
   tq('keep3');S.pending=null;cur=null;save();toast('📚 В коллекции');paintHome(1);break;
  case 'haptic':S.haptic=(S.haptic===false);save();hap({type:'impact',impact_style:'medium'});draw();break;
  case 'listgo':if(!LU)break;S.coll=S.coll.filter(function(x){return x.u!=LU});if(S.main==LU)S.main=null;
   S.lots.push({id:Date.now()+''+ri(100,999),u:LU,tier:LT,base:LB,cc:LC,seller:'ты',mine:1,price:LP,bidder:null,endsAt:Date.now()+LD*1000});
   tq('list1');LU=null;S.mt='mine';save();toast('Лот выставлен');go('market');break;
  case 'bulk':var bl=bulkList();if(!bl.length)break;var tot=bl.reduce(function(a,c){return a+worth(c)},0);if(S.confirm!==false)ask('Продать '+bl.length+' шт. за '+money(tot)+'?','Продать',sellBulk);else sellBulk();break;
  case 'chest':tqE();if(!allClaimed()||S.tq.c.chest)break;var cj=chestInfo();S.yuz+=cj.rew;if(cj.n>=7)S.ton=r3((S.ton||0)+.01);S.streak=cj.n;S.lastChest=dk(new Date());S.tq.c.chest=1;save();hap({type:'notification',notification_type:'success'});toast('🎁 Бонус дня +'+money(cj.rew));draw();break;
  case 'xch':var xe=document.getElementById('xch');if(xe&&xe.scrollIntoView)xe.scrollIntoView({behavior:'smooth',block:'center'});break;
  case 'luck':if(S.yuz>=100){S.yuz-=100;S.luck+=10;save();toast('🍀 Удача на 10 прокруток');draw()}else toast('Не хватает баланса');break;
  case 'reset':ask('Сбросить весь прогресс?','Сбросить',function(){S={coll:[],hist:[],spins:0,yuz:10000,g1:1,xp:0,luck:0,theme:S.theme};cur=null;save();go('home')});break}
});
tgPost('web_app_ready');tgPost('web_app_expand');tgPost('web_app_setup_swipe_behavior',{allow_vertical_swipe:false});
S.since=S.since||Date.now();S.lots=S.lots||[];S.rare=S.rare||S.hist.filter(function(c){return ti(c.tier)>=2});theme();draw();auTick();setInterval(auTick,1000);
