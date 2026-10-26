// Магазин и Premium (покупки пока тестовые: настоящая оплата Telegram Stars подключается с сервером)
var PACKS=[{id:'p1',stars:1000,price:50,tag:''},{id:'p2',stars:5500,price:250,tag:'+10%'},{id:'p3',stars:12000,price:500,tag:'+20%'}];
var PREM_PRICE=150,PREM_DAYS=30,WR_PRICE=25;
function isPrem(){return (S.prem||0)>Date.now()}
function premDays(){return Math.max(0,Math.ceil(((S.prem||0)-Date.now())/864e5))}
function feeK(){return isPrem()?.97:.95}
function feeTxt(){return isPrem()?'3% (Premium)':'5%'}
function wheelMs(){return isPrem()?3*3600*1000:WHEEL_MS}
// Настоящая оплата Telegram Stars: счёт создаёт сервер, покупку выдаёт тоже сервер после подтверждения платежа (через inbox)
function shopItem(id){var p=PACKS.filter(function(x){return x.id==id})[0];
 if(p)return{id:id,title:fmt(p.stars)+' звёзд',desc:'Пакет игровых звёзд: '+fmt(p.stars)+' ⭐',price:p.price};
 if(id=='prem')return{id:id,title:'Premium на '+PREM_DAYS+' дней',desc:'Колесо каждые 3 часа, комиссия маркета 3%, +1 бесплатная прокрутка в день',price:PREM_PRICE};
 if(id=='wr')return{id:id,title:'Попытка колеса фортуны',desc:'Дополнительная попытка колеса, копится и не сгорает',price:WR_PRICE};
 return null}
function shopGrant(id){var it=shopItem(id);if(!it)return;var p=PACKS.filter(function(x){return x.id==id})[0];S.spent=(S.spent||0)+it.price;
 if(p){S.yuz+=p.stars;led('Пакет '+abbr(p.stars)+' ⭐');toast('🎁 Покупка: +'+money(p.stars))}
 else if(id=='prem'){S.prem=Math.max(Date.now(),S.prem||0)+PREM_DAYS*864e5;toast('✨ Premium активен ещё '+premDays()+' дн.')}
 else if(id=='wr'){wheelSync();S.wt=(S.wt||0)+1;toast('🎡 Попытка колеса добавлена: '+S.wt)}
 save()}
var PAYB=0;
function payOn(){var w=window.Telegram&&window.Telegram.WebApp;return !!(typeof cloudOn=='function'&&cloudOn()&&w&&typeof w.openInvoice=='function')}
function payPoll(s0,n){if(!SRV())return;srvRun('tickNow',[]).then(function(){if((S.spent||0)>s0){hap({type:'notification',notification_type:'success'});if(scr=='home')paintHome();else draw();return}
 if(n<8)setTimeout(function(){payPoll(s0,n+1)},1500);else toast('Платёж обрабатывается, покупка придёт в течение минуты')})}
function payStars(id){if(!payOn()){toast('Оплата Telegram Stars работает внутри Telegram');return}if(PAYB)return;PAYB=1;
 cpost('/api/invoice',{initData:cInit(),id:id}).then(function(r){
  if(!r||!r.ok||!r.link){PAYB=0;toast(r&&r.err=='maint'?'Сейчас технический перерыв':'Не удалось создать счёт, попробуй позже');return}
  var s0=S.spent||0;window.Telegram.WebApp.openInvoice(r.link,function(st){PAYB=0;if(st=='paid'){toast('Платёж прошёл, зачисляем…');payPoll(s0,0)}else if(st=='failed')toast('Оплата не прошла')})
 }).catch(function(){PAYB=0;toast('Нет связи с сервером')})}
function buyPack(id){payStars(id)}
function buyPrem(){payStars('prem')}
function buyWheelReset(){payStars('wr')}
function shopHtml(){var pr=isPrem();
 return '<div class="premc"><div class="premt"><span class="premi">'+IC.crown+'</span><div><b>Premium</b><small>'+(pr?'Активен · осталось '+premDays()+' дн.':PREM_DAYS+' дней')+'</small></div></div>'+
  '<ul class="premp"><li>Колесо фортуны каждые 3 часа вместо 5</li><li>Комиссия маркета 3% вместо 5%</li><li>+1 бесплатная прокрутка каждый день</li><li>Значок Premium в профиле</li></ul>'+
  '<button class="premb" data-act="buyprem">'+(payOn()?(pr?'Продлить':'Подключить')+' · '+PREM_PRICE+' ⭐ Stars':'Только в Telegram')+'</button></div>'+
  '<div class="sec">Пакеты звёзд</div><div class="grp">'+PACKS.map(function(p){return '<button class="go" data-bp="'+p.id+'"><span class="ic" style="background:#ffb020">'+SI(22)+'</span><div>'+fmt(p.stars)+' ⭐'+(p.tag?' <span class="badge sm" style="background:#34c759">'+p.tag+'</span>':'')+'</div><small style="margin-left:auto;color:var(--blue)">'+p.price+' Stars</small></button>'}).join('')+'</div>'+
  '<div class="sec">Ускорители</div><div class="grp"><button class="go" data-act="luck"><span class="ic" style="background:#34c759">'+ei('🍀')+'</span><div>Удача ×1,5<br><small style="margin:0">на 10 прокруток</small></div><small style="margin-left:auto;color:var(--blue)">'+money(LUCK_COST)+'</small></button>'+
  '<button class="go" data-act="buywr"><span class="ic" style="background:#ff9f0a">'+ei('🎡')+'</span><div>Ещё одна попытка колеса<br><small style="margin:0">копится, не сгорает</small></div><small style="margin-left:auto;color:var(--blue)">'+WR_PRICE+' Stars</small></button></div>'+
  '<div class="sec">Скоро</div><div class="grp"><div class="go"><span class="ic" style="background:#a259f7">'+ei('🏆')+'</span><div>Battle Pass<br><small style="margin:0">награды за прокрутки</small></div><small style="margin-left:auto">скоро</small></div><div class="go"><span class="ic" style="background:#ff5d8f">'+ei('🎨')+'</span><div>Рамки и темы профиля</div><small style="margin-left:auto">скоро</small></div></div>'+
  '<div class="foot">Оплата через Telegram Stars. Покупка зачисляется сразу после платежа. Вопросы по оплате: команда /paysupport в боте.</div>'}
