// Маркет: аукцион, продажа, продажа пользователю, предложения
function defPrice(){var w=worth({u:LU,tier:LT,base:LB}),k=LM=='auc'?1.5:1.2;return LC=='ton'?Math.max(.002,r3(w/RATE*k)):Math.max(2,Math.round(w*k))}
function minBid(l){if(l.cc=='ton')return l.bidder?r3(l.price+Math.max(.001,l.price*.1)):l.price;return l.bidder?l.price+Math.max(1,Math.ceil(l.price*.1)):l.price}
function avatar(u,t,ix){return '<div class="mav" style="background:linear-gradient(135deg,'+t.color+','+t.color+'99)'+(ix>=3?';box-shadow:0 0 14px '+t.color+'88':'')+'">'+esc(u.charAt(0).toUpperCase())+'</div>'}
function starVal(l){return l.cc=='ton'?l.price*RATE:l.price}
function lotsFiltered(mode){var f=S.mf||{},q=(S.mq||'').toLowerCase(),L=(S.lots||[]).filter(function(x){return mode=='mine'?!!x.mine:(!x.mine&&(mode=='fix')==!!x.fx)});
 if(q)L=L.filter(function(l){return l.u.indexOf(q)>=0});
 if(mode!='mine'){if(f.cc&&f.cc!='all')L=L.filter(function(l){return l.cc==f.cc});if(f.t>=0)L=L.filter(function(l){return ti(l.tier)==f.t})}
 var so=f.s||'end';return L.sort(function(a,b){return so=='asc'?starVal(a)-starVal(b):so=='desc'?starVal(b)-starVal(a):a.endsAt-b.endsAt})}
var SRCI='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l5 5"/></svg>';
function mFilters(){var f=S.mf||{},cc=f.cc||'all',t=f.t===undefined?-1:f.t,so=f.s||'end',SL={end:'Скоро закончатся',asc:'Сначала дешёвые',desc:'Сначала дорогие'},md=S.mt||'auc',
 base=(S.lots||[]).filter(function(x){return !x.mine&&(md=='fix')==!!x.fx}),cnt={};base.forEach(function(l){var k=ti(l.tier);cnt[k]=(cnt[k]||0)+1});
 var act=cc!='all'||t>=0||!!S.mq;
 return '<div class="msearch">'+SRCI+'<input id="msq" placeholder="Поиск ника" value="'+esc(S.mq||'')+'" autocomplete="off" autocapitalize="off" spellcheck="false"></div>'+
  '<div class="fchips"><button class="fc'+(cc=='all'?' on':'')+'" data-mf="cc:all">Все</button><button class="fc'+(cc=='star'?' on':'')+'" data-mf="cc:star">'+SI(16)+'</button><button class="fc'+(cc=='ton'?' on':'')+'" data-mf="cc:ton">'+TI(16)+'</button>'+
  TIERS.map(function(tr,i){return '<button class="fc rc'+(t==i?' on':'')+'" data-mf="t:'+(t==i?-1:i)+'"><i class="rdt" style="background:'+tr.color+'"></i>'+(cnt[i]||0)+'</button>'}).join('')+
  '<button class="fc" data-ms="1">'+SL[so]+'</button>'+(act?'<button class="fc" data-mf="reset:1">Сбросить</button>':'')+'</div>'}
function lotRow(l){var t=tier(l.tier),m=mult(l.u),ix=ti(l.tier),left=l.endsAt-Date.now(),st='',b='';
 if(l.mine){st=l.fx?(l.to?'ждёт @'+esc(l.to):'ждёт покупателя'):(l.bidder?'есть ставка':'нет ставок');if(!l.bidder)b='<button class="pbtn sm" data-cancel="'+l.id+'">Снять</button>'}
 else if(l.fx){b='<button class="pbtn sm" data-buy="'+l.id+'">Купить</button>'}
 else{st=l.bidder=='me'?'✓ твоя ставка':(l.bidder?'ставка есть':'');if(l.bidder!='me')b='<button class="pbtn sm" data-bid="'+l.id+'">Ставка · '+cash(minBid(l),l.cc)+'</button>'}
 return '<div class="mrow"><div class="mleft">'+avatar(l.u,t,ix)+'<div class="mmid"><b>@'+l.u+'</b><div class="msub">'+t.icon+' '+t.name+(m.m>1?' · ×'+fm(m.m):'')+'</div><div class="mtags"><span class="tm'+(left<30000?' hot':'')+'" data-end="'+l.endsAt+'">'+tleft(left)+'</span>'+(l.cc=='ton'?'<span class="cb" style="background:#4f9bff">TON</span>':'')+(l.to?'<span class="cb" style="background:#a259f7">для @'+esc(l.to)+'</span>':'')+'</div><div class="msub">'+(l.mine?'твой лот':'@'+esc(l.seller))+'</div></div></div>'+
  '<div class="mright"><div class="mprice">'+cash(l.price,l.cc)+'</div><div class="mst">'+(l.fx?'цена':(l.bidder?'ставка':'старт'))+(st?' · '+st:'')+'</div>'+b+'</div></div>'}
function lotsHtml(mode){var L=lotsFiltered(mode);
 if(!L.length)return '<div class="empty">'+(mode=='mine'?'У тебя пока нет лотов<br>Выставь ник из коллекции':'Ничего не найдено<br>Измени фильтры или поиск')+'</div>';
 return '<div class="msum">'+L.length+' '+(L.length==1?'лот':'лотов')+'</div><div class="grp mlist">'+L.map(lotRow).join('')+'</div>'}
function offersHtml(){var O=S.offers||[];if(!O.length)return '';
 return '<div class="sec">Предложения тебе</div><div class="grp mlist">'+O.map(function(o){var t=tier(o.tier),m=mult(o.u),ix=ti(o.tier),left=o.endsAt-Date.now();
  return '<div class="mrow"><div class="mleft">'+avatar(o.u,t,ix)+'<div class="mmid"><b>@'+o.u+'</b><div class="msub">'+t.icon+' '+t.name+(m.m>1?' · ×'+fm(m.m):'')+'</div><div class="mtags"><span class="tm" data-end="'+o.endsAt+'">'+tleft(left)+'</span>'+(o.cc=='ton'?'<span class="cb" style="background:#4f9bff">TON</span>':'')+'</div><div class="msub">от @'+esc(o.from)+' · лично тебе</div></div></div><div class="mright"><div class="mprice">'+cash(o.price,o.cc)+'</div><div class="mbt"><button class="pbtn sm" data-oacc="'+o.id+'">Принять</button><button class="pbtn sm gray" data-orej="'+o.id+'">Нет</button></div></div></div>'}).join('')+'</div>'}
function newLot(fx){var t=TIERS[rnd([0,1,1,2,2,3,4])],u=build(t.id),bs=baseFor(t.id),w=worth({u:u,tier:t.id,base:bs}),tn=ti(t.id)>=3&&Math.random()<.4,k=fx?1.3:1.5;
 return{id:Date.now()+''+ri(100,999),u:u,tier:t.id,base:bs,cc:tn?'ton':'star',fx:fx?1:0,seller:rnd(BOTN),price:tn?Math.max(.002,r3(w/RATE*k)):Math.max(2,Math.round(w*k)),bidder:null,endsAt:Date.now()+(fx?ri(180,600):ri(60,300))*1000}}
function offerNew(){var t=TIERS[rnd([1,2,2,3,3,4])],u=build(t.id),bs=baseFor(t.id),w=worth({u:u,tier:t.id,base:bs}),tn=ti(t.id)>=3&&Math.random()<.3;
 return{id:Date.now()+''+ri(100,999),from:rnd(BOTN),u:u,tier:t.id,base:bs,cc:tn?'ton':'star',price:tn?Math.max(.002,r3(w/RATE*.9)):Math.max(2,Math.round(w*.9)),endsAt:Date.now()+ri(180,360)*1000}}
function findLot(id){return (S.lots||[]).filter(function(x){return x.id==id})[0]}
function pay(cc,v,r){if(cc=='ton'){if((S.ton||0)<v)return false;S.ton=r3((S.ton||0)-v)}else{if(S.yuz<v)return false;S.yuz-=v}led(r||'Покупка');return true}
function gain(cc,v,r){if(cc=='ton')S.ton=r3((S.ton||0)+v);else S.yuz+=v;led(r||'Доход')}
function bid(id){var l=findLot(id);if(!l||l.mine||l.fx||l.bidder=='me')return;var mb=minBid(l);
 if(!pay(l.cc,mb,'Ставка на @'+l.u))return toast('Не хватает '+(l.cc=='ton'?'TON':'звёзд'));
 l.price=mb;l.bidder='me';tq('bid1');save();hap({type:'impact',impact_style:'light'});toast('Ставка принята: '+cash(mb,l.cc));draw()}
function buyLot(id){var l=findLot(id);if(!l||l.mine||!l.fx)return;
 if(!pay(l.cc,l.price,'Покупка @'+l.u))return toast('Не хватает '+(l.cc=='ton'?'TON':'звёзд'));
 S.lots=S.lots.filter(function(x){return x!==l});var rec={u:l.u,tier:l.tier,base:l.base,odds:oddsOf(tier(l.tier)),ts:Date.now()};S.coll.unshift(rec);noteBest(rec);
 save();hap({type:'notification',notification_type:'success'});toast('🛒 Куплено @'+l.u+' · −'+cash(l.price,l.cc));draw()}
function cancelLot(id){var l=findLot(id);if(!l||!l.mine||l.bidder)return;
 S.lots=S.lots.filter(function(x){return x!==l});S.coll.unshift({u:l.u,tier:l.tier,base:l.base,odds:oddsOf(tier(l.tier))});save();toast('Лот снят, ник вернулся в коллекцию');draw()}
function acceptOffer(id){var o=(S.offers||[]).filter(function(x){return x.id==id})[0];if(!o)return;
 if(!pay(o.cc,o.price,'Покупка @'+o.u))return toast('Не хватает '+(o.cc=='ton'?'TON':'звёзд'));
 S.offers=S.offers.filter(function(x){return x!==o});var rec={u:o.u,tier:o.tier,base:o.base,odds:oddsOf(tier(o.tier)),ts:Date.now()};S.coll.unshift(rec);noteBest(rec);
 save();hap({type:'notification',notification_type:'success'});toast('🤝 Принято: @'+o.u+' · −'+cash(o.price,o.cc));draw()}
function rejectOffer(id){S.offers=(S.offers||[]).filter(function(x){return x.id!=id});save();draw()}
function auTick(){var now=Date.now(),ch=false;S.lots=S.lots||[];S.offers=S.offers||[];
 S.lots=S.lots.filter(function(l){if(l.endsAt>now)return true;ch=true;var rec={u:l.u,tier:l.tier,base:l.base,odds:oddsOf(tier(l.tier))};
  if(l.mine){if(l.bidder){var g=l.cc=='ton'?r3(l.price*feeK()):Math.floor(l.price*feeK());gain(l.cc,g,'Продан лот @'+l.u);toast('💰 Лот продан: @'+l.u+' · +'+cash(g,l.cc))}else{S.coll.unshift(rec);toast('@'+l.u+' не продан, вернулся в коллекцию')}}
  else if(l.bidder=='me'){S.coll.unshift(rec);noteBest(rec);toast('🏆 Ты выиграл @'+l.u)}
  return false});
 S.lots.forEach(function(l){
  if(l.mine&&l.fx){var cap=(l.cc=='ton'?worth(l)/RATE+.001:worth(l)+2)*(l.to?2:1.6);
   if(l.price<=cap&&Math.random()<(l.to?.025:.04)){l.sold=1;var g2=l.cc=='ton'?r3(l.price*feeK()):Math.floor(l.price*feeK());gain(l.cc,g2,'Продан @'+l.u);toast('💰 '+(l.to?'@'+l.to:'Покупатель')+' купил @'+l.u+' · +'+cash(g2,l.cc));ch=true}return}
  if(l.fx)return;
  if(l.mine){if(Math.random()<.07&&l.price<(l.cc=='ton'?worth(l)/RATE*1.3+.001:worth(l)*4+4)){l.price=minBid(l);l.bidder='bot';ch=true}}
  else if(Math.random()<.03){var mb=minBid(l);if(l.bidder=='me'){gain(l.cc,l.price,'Возврат ставки @'+l.u);toast('Тебя перебили: @'+l.u)}l.price=mb;l.bidder='bot';ch=true}});
 S.lots=S.lots.filter(function(l){return !l.sold});
 led('Операция');giftTick();if(isPrem()&&S.freeDay!==dk(new Date())){S.freeDay=dk(new Date());S.free=(S.free||0)+1;toast('✨ Premium: бесплатная прокрутка дня');ch=true}
 var no=S.offers.length;S.offers=S.offers.filter(function(o){return o.endsAt>now});if(S.offers.length!=no)ch=true;
 if(S.offers.length<2&&Math.random()<.015){var o=offerNew();S.offers.push(o);ch=true}
 var nA=S.lots.filter(function(x){return !x.mine&&!x.fx}).length,nF=S.lots.filter(function(x){return !x.mine&&x.fx}).length;
 while(nA<4){S.lots.push(newLot(0));nA++;ch=true}while(nF<4){S.lots.push(newLot(1));nF++;ch=true}
 if(ch){save();if(scr=='market')draw();else if(scr=='home'&&!busy)paintHome()}
 tickTimers()}
function tickTimers(){var now=Date.now();
 if(scr=='wheel'&&!WBUSY){var rdy=wheelReady()+':'+S.wt;if(WA_!==rdy){WA_=rdy;draw()}else{var wt=document.getElementById('wtimer');if(wt)wt.textContent=wheelLeft()}}
 if(scr=='market'){var q=document.querySelectorAll('[data-end]');for(var i=0;i<q.length;i++){var lf=q[i].getAttribute('data-end')-now;q[i].textContent=tleft(lf);q[i].classList.toggle('hot',lf<30000)}}}
