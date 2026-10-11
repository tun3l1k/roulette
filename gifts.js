// Подарки в стиле NFT-подарков Telegram (оригинальные коллекционные предметы игры)
var GT_=[{id:'candy',n:'Candy Cane',e:'🍭',base:50,sup:320622,estP:1},{id:'vice',n:'Vice Cream',e:'🍦',base:75,sup:500000},{id:'snoop',n:'Snoop Dogg',e:'🐶',base:200,sup:600000},{id:'mood',n:'Mood Pack',e:'🎒',base:500,sup:100000,estP:1,estS:1},{id:'cigar',n:'Snoop Cigar',e:'🚬',base:1000,sup:120000}];
var GOLD={plush:'vice',cap:'candy',heart:'mood',rocket:'snoop',crown:'snoop',orb:'mood',gem:'cigar',dragon:'cigar'};
var GRN=['Обычный','Редкий','Эпический','Легендарный','Мифический'],GRC=['#9e9e9e','#3b82f6','#a855f7','#ff9500','#ff3b30'],GRB=[0,.3,.8,2,6];
var GMOD=[['Классика'],['Золотой','Серебряный'],['Неон','Хром'],['Кристалл','Лавовый'],['Призрачный']];
var GBD=[[['Серый туман','#6b7a8f','#2d3647'],['Графит','#4a4f5c','#1f232b'],['Platinum','#9aa7b8','#4a5568']],[['Небо','#4aa3ff','#1b4fa8'],['Мята','#3ed6a4','#128a6a'],['Pine Green','#2f7d5b','#12392b'],['Feldgrau','#6f7f76','#2f3a35']],[['Закат','#ff8a5c','#b0306b'],['Орхидея','#c26bff','#5a2aa8'],['Sapphire','#2f6bff','#0b2a7a']],[['Рубин','#ff4d6d','#7a0f2b'],['Янтарь','#ffb347','#a85a00']],[['Северное сияние','#5affd6','#3b1fa8'],['Electric Purple','#a63bff','#3a0f7a']]];
var GSY=[['⭐','🌙'],['❄️','🍀'],['🔥','⚡'],['💫','🌸'],['👾']];
var GV=null,GTO='',GPOS=[[10,12],[72,10],[84,46],[14,70],[66,78],[42,6]];
function GT(id){return GT_.filter(function(t){return t.id==id})[0]}
function findGift(id){return (S.gifts||[]).filter(function(g){return g.id==id})[0]}
function rollR(){var r=Math.random()*100,w=[55,25,12,6,2],i=0;for(;i<4;i++){r-=w[i];if(r<=0)break}return i}
function randGiftType(){var w=[34,28,20,12,6],r=Math.random()*100,i=0;for(;i<w.length-1;i++){r-=w[i];if(r<=0)break}return GT_[i].id}
function giftMigrate(){(S.gifts||[]).forEach(function(x){if(!GT(x.type))x.type=GOLD[x.type]||GT_[0].id;if(x.up&&x.ser>GT(x.type).sup)x.ser=ri(1,GT(x.type).sup)})}
function glog(x){S.glog=S.glog||[];S.glog.unshift({t:Date.now(),x:x});if(S.glog.length>40)S.glog.pop()}
function gname(g){var t=GT(g.type);return g.up?g.md[0]+' '+t.n+' #'+g.ser:t.n}
function giftWorth(g){var t=GT(g.type);if(!g.up)return t.base;var b=GRB[g.md[1]]+GRB[g.bd[3]]+GRB[g.sy[1]],sb=g.ser<=10?2:g.ser<=100?.5:g.ser<=1000?.2:0;return Math.round(t.base*(1+b+sb))}
function giftRar(g){return g.up?Math.max(g.md[1],g.bd[3],g.sy[1]):0}
function giveGift(type,from){S.gifts=S.gifts||[];var g={id:Date.now()+''+ri(100,999),type:type,up:0,ts:Date.now(),from:from||null};S.gifts.unshift(g);glog('Получен подарок «'+GT(type).n+'»'+(from?' от @'+from:''));save();return g}
function buyGift(type){var t=GT(type);if(!t)return;if(!pay('star',t.base,'Подарок «'+t.n+'»'))return toast('Не хватает звёзд');giveGift(type);hap({type:'notification',notification_type:'success'});toast('🎁 «'+t.n+'» в твоих подарках');draw()}
function mkNft(g,boost){var t=GT(g.type),k=boost||0,mr=Math.min(4,rollR()+k),br=Math.min(4,rollR()+k),sr=Math.min(4,rollR()+k),b=rnd(GBD[br]);g.md=[rnd(GMOD[mr]),mr];g.bd=[b[0],b[1],b[2],br];g.sy=[rnd(GSY[sr]),sr];g.ser=ri(1,t.sup);g.up=1}
function upgradeGift(id){var g=findGift(id);if(!g||g.up)return;var t=GT(g.type),cost=Math.round(t.base*.4);
 if(!pay('star',cost,'Улучшение подарка'))return toast('Не хватает звёзд');
 mkNft(g,0);
 glog('Улучшен до NFT: '+gname(g));save();hap({type:'notification',notification_type:'success'});toast('✨ NFT создан: '+gname(g));draw()}
function sellGift(id){var g=findGift(id);if(!g)return;var p=Math.round(giftWorth(g)*.7);S.gifts=S.gifts.filter(function(x){return x!==g});gain('star',p,'Продажа подарка');glog('Продан «'+gname(g)+'» за '+abbr(p)+' ⭐');save();toast('💰 Продано «'+gname(g)+'» · +'+money(p));go('gifts')}
function sendGiftGo(){var g=findGift(GV);if(!g){go('gifts');return}
 if(!/^[a-z0-9_]{5,32}$/.test(GTO)){toast('Введи username: от 5 символов, буквы, цифры, _');return}
 if(TG&&TG.username&&TG.username.toLowerCase()==GTO){toast('Нельзя отправить самому себе');return}
 S.gifts=S.gifts.filter(function(x){return x!==g});glog('Отправлен «'+gname(g)+'» → @'+GTO);save();hap({type:'notification',notification_type:'success'});toast('🎁 Подарок отправлен @'+GTO);GTO='';go('gifts')}
function giftTick(){if(!S.gifts)S.gifts=[];if(S.gifts.length<60&&Math.random()<.002){giveGift(randGiftType(),rnd(BOTN))}}
function gAct(s){var i=s.indexOf(':'),v=s.slice(0,i),a=s.slice(i+1);
 if(v=='case'){CV=a;go('case')}else if(v=='copen')openCase(a);else if(v=='open'){GV=a;go('gift')}else if(v=='tab'){S.gt=a;save();draw()}else if(v=='buy')buyGift(a);else if(v=='up')upgradeGift(a);
 else if(v=='send'){GV=a;GTO='';go('gsend')}
 else if(v=='sell'){var g=findGift(a);if(g)ask('Продать «'+gname(g)+'» за '+money(Math.round(giftWorth(g)*.7))+'?','Продать',function(){sellGift(a)})}}
function giftArt(g,big){var t=GT(g.type),c1='#3a4a68',c2='#1f2a40',pat='';
 if(g.up){c1=g.bd[1];c2=g.bd[2];pat=GPOS.map(function(p){return '<span class="gsy" style="left:'+p[0]+'%;top:'+p[1]+'%">'+g.sy[0]+'</span>'}).join('')}
 return '<div class="gart'+(big?' big':'')+'" style="background:linear-gradient(145deg,'+c1+','+c2+')">'+pat+'<span class="ge">'+t.e+'</span></div>'}
function giftCard(g){var r=giftRar(g);return '<button class="gcard" data-g="open:'+g.id+'">'+giftArt(g)+'<b>'+GT(g.type).n+'</b><small>'+(g.up?'#'+g.ser+' · '+g.md[0]:'Обычный подарок')+'</small><span class="gb" style="background:'+(g.up?GRC[r]:'var(--sep)')+';color:'+(g.up?'#fff':'var(--sub)')+'">'+(g.up?GRN[r]:'можно улучшить')+'</span></button>'}
function giftsMini(){var L=(S.gifts||[]).slice(0,6);
 return (L.length?'<div class="ggrid">'+L.map(giftCard).join('')+'</div>':'<div class="empty">Подарков пока нет<br>Их можно получить в колесе фортуны или купить</div>')+'<button class="pbtn" style="width:100%;margin-top:12px" data-go="gifts">Все подарки</button>'}
function giftsHtml(){var tb=S.gt||'cases',n=(S.gifts||[]).length,body='';
 if(tb=='cases')body=casesHtml();
 else if(tb=='mine')body=n?'<div class="ggrid">'+S.gifts.map(giftCard).join('')+'</div>':'<div class="empty" style="padding:40px 0"><div style="font-size:54px">🎁</div>Подарков пока нет<br>Открой кейс, получи в колесе фортуны или купи в каталоге</div>';
 else if(tb=='shop')body='<div class="grp">'+GT_.map(function(t){return '<button class="go" data-g="buy:'+t.id+'"><span class="gmini" style="background:linear-gradient(145deg,#3a4a68,#1f2a40)">'+t.e+'</span><div>'+t.n+'<br><small style="margin:0">тираж '+(t.estS?'≈ ':'')+fmt(t.sup)+'</small></div><small style="margin-left:auto;color:var(--blue)">'+(t.estP?'≈ ':'')+money(t.base)+'</small></button>'}).join('')+'</div><div class="foot">Подарок можно улучшить до NFT: у него появятся уникальные модель, фон, символ и номер. Значок «≈» значит, что цена или тираж пока приблизительные. Картинки пока заменены эмодзи.</div>';
 else body=(S.glog||[]).length?'<div class="grp">'+S.glog.slice(0,25).map(function(e){return '<div class="tx"><div class="txm"><b>'+esc(e.x)+'</b><small>'+dt(e.t)+'</small></div></div>'}).join('')+'</div>':'<div class="empty">Событий пока нет</div>';
 return balBar(1,'gst','gtn')+'<div class="seg" style="margin-top:12px">'+[['cases','Кейсы'],['mine','Мои · '+n],['shop','Каталог'],['log','История']].map(function(x){return '<button class="'+(tb==x[0]?'on':'')+'" data-g="tab:'+x[0]+'">'+x[1]+'</button>'}).join('')+'</div><div style="margin-top:12px">'+body+'</div>'}
function giftDetail(){var g=findGift(GV);if(!g)return '<div class="empty">Подарок не найден</div>';var t=GT(g.type),r=giftRar(g),w=giftWorth(g);
 return '<div style="text-align:center">'+giftArt(g,1)+'<div style="font-size:22px;font-weight:800;margin-top:12px">'+gname(g)+'</div>'+(g.up?'<span class="gb" style="background:'+GRC[r]+';color:#fff;font-size:13px">'+GRN[r]+'</span>':'<div class="ls" style="margin-top:4px">Обычный подарок</div>')+'</div>'+
  (g.up?'<div class="grp" style="margin-top:16px">'+[['Модель',g.md[0],g.md[1]],['Фон',g.bd[0],g.bd[3]],['Символ',g.sy[0],g.sy[1]]].map(function(a){return '<div class="go"><span>'+a[0]+'</span><small style="color:'+GRC[a[2]]+'">'+a[1]+' · '+GRN[a[2]]+'</small></div>'}).join('')+'<div class="go"><span>Номер</span><small>#'+g.ser+' из '+fmt(t.sup)+'</small></div></div>':'')+
  '<div class="grp" style="margin-top:12px"><div class="go"><span>Оценка</span><small>'+money(w)+'</small></div>'+(g.from?'<div class="go"><span>От кого</span><small>@'+esc(g.from)+'</small></div>':'')+'</div>'+
  '<div class="row2" style="margin-top:16px">'+(g.up?'':'<button class="pbtn" style="flex:1" data-g="up:'+g.id+'">Улучшить · '+money(Math.round(t.base*.4))+'</button>')+'<button class="pbtn" style="flex:1" data-g="send:'+g.id+'">Отправить</button></div>'+
  '<button class="pbtn gray" style="width:100%;margin-top:10px" data-g="sell:'+g.id+'">Продать · '+money(Math.round(w*.7))+'</button>'}
function giftSendHtml(){var g=findGift(GV);if(!g)return '<div class="empty">Подарок не найден</div>';
 return '<div style="text-align:center">'+giftArt(g,1)+'<div style="font-size:20px;font-weight:800;margin-top:12px">'+gname(g)+'</div></div><div class="sec">Кому (username в Telegram)</div><input id="gto" class="inp" placeholder="@username" value="'+esc(GTO)+'" maxlength="33" autocapitalize="off" autocomplete="off" spellcheck="false"><button class="act m" style="width:100%;margin-top:18px" data-act="gsendgo">Отправить подарок</button><div class="foot">Демо: настоящая отправка другому игроку появится вместе с сервером.</div>'}
