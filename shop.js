// Магазин и Premium (покупки пока тестовые: настоящая оплата Telegram Stars подключается с сервером)
var PACKS=[{id:'p1',stars:1000,price:50,tag:''},{id:'p2',stars:5500,price:250,tag:'+10%'},{id:'p3',stars:12000,price:500,tag:'+20%'}];
var PREM_PRICE=150,PREM_DAYS=30,WR_PRICE=25;
function isPrem(){return (S.prem||0)>Date.now()}
function premDays(){return Math.max(0,Math.ceil(((S.prem||0)-Date.now())/864e5))}
function feeK(){return isPrem()?.97:.95}
function feeTxt(){return isPrem()?'3% (Premium)':'5%'}
function wheelMs(){return isPrem()?3*3600*1000:WHEEL_MS}
function buyReal(title,price,fn){ask('Тестовая покупка: '+title+' за '+price+' Telegram Stars. Списаний нет, настоящая оплата подключится вместе с сервером.','Купить',function(){S.spent=(S.spent||0)+price;hap({type:'notification',notification_type:'success'});fn()})}
function buyPack(id){var p=PACKS.filter(function(x){return x.id==id})[0];if(!p)return;buyReal(fmt(p.stars)+' ⭐',p.price,function(){S.yuz+=p.stars;led('Пакет '+abbr(p.stars)+' ⭐');save();toast('🎁 +'+money(p.stars));draw()})}
function buyPrem(){buyReal('Premium на '+PREM_DAYS+' дней',PREM_PRICE,function(){S.prem=Math.max(Date.now(),S.prem||0)+PREM_DAYS*864e5;save();toast('✨ Premium активен ещё '+premDays()+' дн.');draw()})}
function buyWheelReset(){buyReal('новая попытка колеса',WR_PRICE,function(){S.wheelAt=0;save();toast('🎡 Колесо снова доступно');draw()})}
function shopHtml(){var pr=isPrem();
 return '<div class="premc"><div class="premt"><span class="premi">✦</span><div><b>Premium</b><small>'+(pr?'Активен · осталось '+premDays()+' дн.':PREM_DAYS+' дней')+'</small></div></div>'+
  '<ul class="premp"><li>Колесо фортуны каждые 3 часа вместо 5</li><li>Комиссия маркета 3% вместо 5%</li><li>+1 бесплатная прокрутка каждый день</li><li>Значок ✦ в профиле</li></ul>'+
  '<button class="premb" data-act="buyprem">'+(pr?'Продлить':'Подключить')+' · '+PREM_PRICE+' Stars</button></div>'+
  '<div class="sec">Пакеты звёзд</div><div class="grp">'+PACKS.map(function(p){return '<button class="go" data-bp="'+p.id+'"><span class="ic" style="background:#ffb020">'+SI(22)+'</span><div>'+fmt(p.stars)+' ⭐'+(p.tag?' <span class="badge sm" style="background:#34c759">'+p.tag+'</span>':'')+'</div><small style="margin-left:auto;color:var(--blue)">'+p.price+' Stars</small></button>'}).join('')+'</div>'+
  '<div class="sec">Ускорители</div><div class="grp"><button class="go" data-act="luck"><span class="ic" style="background:#34c759">🍀</span><div>Удача ×3<br><small style="margin:0">на 10 прокруток</small></div><small style="margin-left:auto;color:var(--blue)">'+money(100)+'</small></button>'+
  '<button class="go" data-act="buywr"><span class="ic" style="background:#ff9f0a">🎡</span><div>Ещё одна попытка колеса<br><small style="margin:0">сбросить таймер</small></div><small style="margin-left:auto;color:var(--blue)">'+WR_PRICE+' Stars</small></button></div>'+
  '<div class="sec">Скоро</div><div class="grp"><div class="go"><span class="ic" style="background:#a259f7">🏆</span><div>Battle Pass<br><small style="margin:0">награды за прокрутки</small></div><small style="margin-left:auto">скоро</small></div><div class="go"><span class="ic" style="background:#ff5d8f">🎨</span><div>Рамки и темы профиля</div><small style="margin-left:auto">скоро</small></div></div>'+
  '<div class="foot">Оплата идёт через Telegram Stars (XTR). Сейчас покупки тестовые и ничего не списывают.</div>'}
