// Маркет: аукцион, лоты, ставки
function defPrice(){var w=worth({u:LU,tier:LT,base:LB});return LC=='ton'?Math.max(.002,r3(w/RATE*1.5)):Math.max(2,Math.round(w*1.5))}
function minBid(l){if(l.cc=='ton')return l.bidder?r3(l.price+Math.max(.001,l.price*.1)):l.price;return l.bidder?l.price+Math.max(1,Math.ceil(l.price*.1)):l.price}
function lotsHtml(mi){var L=(S.lots||[]).filter(function(x){return !!x.mine==mi}).sort(function(a,b){return a.endsAt-b.endsAt});
 if(!L.length)return '<div class="empty">'+(mi?'У тебя пока нет лотов<br>Выставь ник из коллекции':'Лотов пока нет')+'</div>';
 return '<div class="lots">'+L.map(function(l,i){var t=tier(l.tier),m=mult(l.u),ix=ti(l.tier),left=l.endsAt-Date.now(),
  st=l.mine?(l.bidder?'<span class="chipok">есть ставка</span>':'<span class="chipno">нет ставок</span>'):(l.bidder=='me'?'<span class="chipok">✓ твоя ставка</span>':(l.bidder?'<span class="chipno">ставка есть</span>':'')),
  b=(l.mine||l.bidder=='me')?'':'<button class="pbtn sm" data-bid="'+l.id+'">Ставка · '+cash(minBid(l),l.cc)+'</button>';
  return '<div class="lotc" style="border-color:'+t.color+'88;background:linear-gradient(160deg,'+t.color+'33,var(--grp) 65%);'+(ix>=1?'box-shadow:0 0 '+(6+ix*6)+'px '+t.color+(ix>=4?'88':'55')+';':'')+'animation-delay:'+Math.min(i,8)*35+'ms">'+
   '<div class="lt1"><span class="cb" style="background:'+t.color+'">'+t.icon+' '+t.name+'</span>'+(m.m>1?'<span class="cb" style="background:#2AABEE">×'+fm(m.m)+'</span>':'')+(l.cc=='ton'?'<span class="cb" style="background:#4f9bff">💎 TON</span>':'')+'<span class="tm'+(left<30000?' hot':'')+'" data-end="'+l.endsAt+'">'+tleft(left)+'</span></div>'+
   '<div class="cn" style="min-height:0;font-size:24px;margin:8px 0 2px">@'+l.u+'</div>'+
   '<div class="ls">'+(l.mine?'твой лот':'продавец @'+esc(l.seller))+(m.m>1?' · '+m.tags.join(', '):'')+'</div>'+
   '<div class="lt3"><div><small>'+(l.bidder?'Текущая ставка':'Стартовая цена')+'</small><div class="cp" style="font-size:18px">'+cash(l.price,l.cc)+'</div></div><div class="lact">'+st+b+'</div></div></div>'}).join('')+'</div>'}
function newLot(){var t=TIERS[rnd([0,1,1,2,2,3,4])],u=build(t.id),bs=baseFor(t.id),w=worth({u:u,tier:t.id,base:bs}),tn=ti(t.id)>=3&&Math.random()<.4;
 return{id:Date.now()+''+ri(100,999),u:u,tier:t.id,base:bs,cc:tn?'ton':'star',seller:rnd(BOTN),price:tn?Math.max(.002,r3(w/RATE*1.5)):Math.max(2,Math.round(w*1.5)),bidder:null,endsAt:Date.now()+ri(60,300)*1000}}
function bid(id){var l=(S.lots||[]).filter(function(x){return x.id==id})[0];if(!l||l.mine||l.bidder=='me')return;var mb=minBid(l),tn=l.cc=='ton';
 if((tn?(S.ton||0):S.yuz)<mb)return toast('Не хватает '+(tn?'TON':'звёзд'));
 if(tn)S.ton=r3((S.ton||0)-mb);else S.yuz-=mb;l.price=mb;l.bidder='me';tq('bid1');save();hap({type:'impact',impact_style:'light'});toast('Ставка принята: '+cash(mb,l.cc));draw()}
function auTick(){var now=Date.now(),ch=false;S.lots=S.lots||[];
 S.lots=S.lots.filter(function(l){if(l.endsAt>now)return true;ch=true;var rec={u:l.u,tier:l.tier,base:l.base,odds:oddsOf(tier(l.tier))};
  if(l.mine){if(l.bidder){var g=l.cc=='ton'?r3(l.price*.95):Math.floor(l.price*.95);if(l.cc=='ton')S.ton=r3((S.ton||0)+g);else S.yuz+=g;toast('💰 Лот продан: @'+l.u+' · +'+cash(g,l.cc))}else{S.coll.unshift(rec);toast('@'+l.u+' не продан, вернулся в коллекцию')}}
  else if(l.bidder=='me'){S.coll.unshift(rec);toast('🏆 Ты выиграл @'+l.u)}
  return false});
 S.lots.forEach(function(l){
  if(l.mine){if(Math.random()<.07&&l.price<(l.cc=='ton'?worth(l)/RATE*1.3+.001:worth(l)*4+4)){l.price=minBid(l);l.bidder='bot';ch=true}}
  else if(Math.random()<.03){var mb=minBid(l);if(l.bidder=='me'){if(l.cc=='ton')S.ton=r3((S.ton||0)+l.price);else S.yuz+=l.price;toast('Тебя перебили: @'+l.u)}l.price=mb;l.bidder='bot';ch=true}});
 var open=S.lots.filter(function(x){return !x.mine}).length;while(open<5){S.lots.push(newLot());open++;ch=true}
 if(ch){save();if(scr=='market'||scr=='list'&&0)draw();else if(scr=='home'&&!busy)paintHome()}
 else if(scr=='market'){var q=document.querySelectorAll('[data-end]');for(var i=0;i<q.length;i++){var lf=q[i].getAttribute('data-end')-now;q[i].textContent=tleft(lf);q[i].classList.toggle('hot',lf<30000)}}}
