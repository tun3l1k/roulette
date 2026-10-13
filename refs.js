// Рефералы: приглашай друзей по ссылке и получай награды (подсчёт ведёт сервер)
var TITLES={amb:'Амбассадор',leg:'Легенда Юзерка'};
var REFM=[{n:1,star:2500,ton:0.5,t:'2 500 ⭐ и 0,5 TON'},{n:10,nick:1,t:'случайный мифический или легендарный юзернейм'},{n:25,title:'amb',star:10000,t:'титул «Амбассадор» и 10 000 ⭐'},{n:100,title:'leg',ton:25,star:100000,t:'титул «Легенда Юзерка», 25 TON и 100 000 ⭐'}];
var REF_WELCOME=300,REF_NEED=3,RF=null,RBOT='';
function titleChip(){var T=S.titles||[];if(!T.length)return '';var k=T.indexOf('leg')>=0?'leg':T[T.length-1];return ' <span class="ttl '+k+'">'+TITLES[k]+'</span>'}
function refLink(){return RBOT&&TG&&TG.id?'https://t.me/'+RBOT+'?start=ref_'+TG.id:''}
function refsInfo(){if(RBOT||!cloudOn())return;cpost('/api/info',{}).then(function(r){if(r&&r.ok&&r.bot){RBOT=r.bot;if(scr=='friends')draw()}}).catch(function(){})}
function refsLoad(){if(!cloudOn()||!CL.loaded)return;refsInfo();
 cpost('/api/refs',{initData:cInit()}).then(function(r){if(!r||!r.ok)return;RF=r;if(r.patch){srvApply(r);(r.msgs||[]).forEach(function(m){toast(m)});if(scr=='home')paintHome()}else refsApply(r);if(scr=='friends')draw()}).catch(function(){})}
function refsApply(r){var act=r.act||0,paid=S.refPaid||0,ch=false,msgs=[];
 if(r.inviter&&!S.refWelcome){S.refWelcome=1;S.yuz+=REF_WELCOME;ch=true;msgs.push('Бонус приглашённого: +'+money(REF_WELCOME))}
 if(act>paid){REFM.forEach(function(m){if(paid<m.n&&act>=m.n){ch=true;if(m.star)S.yuz+=m.star;if(m.ton)S.ton=r3((S.ton||0)+m.ton);
   if(m.nick){var tt=Math.random()<.7?'legend':'mythic',nk={u:build(tt),tier:tt,base:baseFor(tt),ts:Date.now()};nk.odds=oddsOf(tier(tt));S.coll.unshift(nk);noteBest(nk);msgs.push('Реферальный ник: @'+nk.u)}
   if(m.title){S.titles=S.titles||[];if(S.titles.indexOf(m.title)<0)S.titles.push(m.title);msgs.push('Титул: '+TITLES[m.title])}
   msgs.push(m.n+' друзей: '+m.t)}});S.refPaid=act}
 if(ch){led('Реферальная программа');save();msgs.forEach(function(x){toast(x)});if(scr=='home')paintHome()}}
function refCopy(){var l=refLink();if(!l)return toast('Ссылка ещё загружается');
 function fb(){var a=document.createElement('textarea');a.value=l;document.body.appendChild(a);a.select();try{document.execCommand('copy');toast('Ссылка скопирована')}catch(e){toast(l)}document.body.removeChild(a)}
 try{navigator.clipboard.writeText(l).then(function(){toast('Ссылка скопирована')},fb)}catch(e){fb()}}
function refShare(){var l=refLink();if(!l)return toast('Ссылка ещё загружается');
 var u='https://t.me/share/url?url='+encodeURIComponent(l)+'&text='+encodeURIComponent('Залетай в «Юзерок: Рулетка»: крути рулетку, находи редкие юзернеймы и получай подарки. Держи бонус по моей ссылке 👇'),w=window.Telegram&&window.Telegram.WebApp;
 try{if(w&&w.openTelegramLink)w.openTelegramLink(u);else window.open(u,'_blank')}catch(e){window.open(u,'_blank')}}
function friendsHtml(){if(!cloudOn())return emp('users','Приглашения работают внутри Telegram',50);
 var d=RF||{},act=d.act||0,tot=d.total||0,l=refLink();
 return '<div class="refc"><div class="refh">Приглашай друзей</div><div class="refp">Друг считается активным, когда зарегистрируется и сделает <b>'+REF_NEED+' прокрутки</b>. За каждый рубеж ты получаешь награду, а другу в подарок <b>+'+money(REF_WELCOME)+'</b>.</div></div>'+
  (l?'<div class="reflink">'+esc(l)+'</div><div class="row2" style="margin-top:10px"><button class="act" data-act="refcopy">Копировать</button><button class="pbtn" style="flex:1" data-act="refshare">Поделиться</button></div>':'<div class="empty" style="padding:18px 0">Загружаем ссылку…</div>')+
  '<div class="stats3" style="grid-template-columns:1fr 1fr;margin-top:14px"><div class="stat"><b>'+tot+'</b><small>приглашено</small></div><div class="stat"><b>'+act+'</b><small>активных</small></div></div>'+
  '<div class="sec">Награды за друзей</div><div class="grp">'+REFM.map(function(m){var ok=act>=m.n;return '<div class="go"><span style="width:12px;height:12px;border-radius:50%;background:'+(ok?'#34c759':'var(--sep)')+';flex:none"></span><span>'+m.n+' друзей</span><small style="color:'+(ok?'#34c759':'var(--sub)')+'">'+(ok?'✓ ':'')+m.t+'</small></div>'}).join('')+'</div>'+
  ((d.list||[]).length?'<div class="sec">Твои друзья</div><div class="grp">'+d.list.map(function(f){var a=f.spins>=REF_NEED;return '<div class="go"><span>'+esc(f.name||'Игрок')+'</span><small style="color:'+(a?'#34c759':'var(--sub)')+'">'+(a?'активен ✓':'прокрутки '+Math.min(f.spins,REF_NEED)+'/'+REF_NEED)+'</small></div>'}).join('')+'</div>':'')+
  '<div class="foot">Ссылка работает для тех, кто ещё не играл. Награды за рубежи выдаются один раз.</div>'}
