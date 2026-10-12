// Рефералы: приглашай друзей по ссылке и получай награды (подсчёт ведёт сервер)
var REFM=[{n:3,star:1000,t:'1 000 ⭐'},{n:10,gift:1,t:'подарок Telegram'},{n:25,ton:0.02,t:'0,02 TON'},{n:50,gift:1,star:10000,t:'подарок и 10 000 ⭐'}];
var REF_STAR=500,REF_WELCOME=300,REF_NEED=10,RF=null,RBOT='';
function refLink(){return RBOT&&TG&&TG.id?'https://t.me/'+RBOT+'?start=ref_'+TG.id:''}
function refsInfo(){if(RBOT||!cloudOn())return;cpost('/api/info',{}).then(function(r){if(r&&r.ok&&r.bot){RBOT=r.bot;if(scr=='friends')draw()}}).catch(function(){})}
function refsLoad(){if(!cloudOn()||!CL.loaded)return;refsInfo();
 cpost('/api/refs',{initData:cInit()}).then(function(r){if(!r||!r.ok)return;RF=r;refsApply(r);if(scr=='friends')draw()}).catch(function(){})}
function refsApply(r){var act=r.act||0,paid=S.refPaid||0,ch=false,msgs=[];
 if(r.inviter&&!S.refWelcome){S.refWelcome=1;S.yuz+=REF_WELCOME;ch=true;msgs.push('🎁 Бонус приглашённого: +'+money(REF_WELCOME))}
 if(act>paid){var d=act-paid;S.yuz+=d*REF_STAR;S.free=(S.free||0)+d;ch=true;msgs.push('👥 Друг активен! +'+money(d*REF_STAR)+' и бесплатная прокрутка');
  REFM.forEach(function(m){if(paid<m.n&&act>=m.n){if(m.star)S.yuz+=m.star;if(m.ton)S.ton=r3((S.ton||0)+m.ton);if(m.gift)giveGift(randGiftType());msgs.push('🏆 '+m.n+' друзей: '+m.t)}});S.refPaid=act}
 if(ch){led('Реферальная программа');save();msgs.forEach(function(x){toast(x)});if(scr=='home')paintHome()}}
function refCopy(){var l=refLink();if(!l)return toast('Ссылка ещё загружается');
 function fb(){var a=document.createElement('textarea');a.value=l;document.body.appendChild(a);a.select();try{document.execCommand('copy');toast('Ссылка скопирована')}catch(e){toast(l)}document.body.removeChild(a)}
 try{navigator.clipboard.writeText(l).then(function(){toast('Ссылка скопирована')},fb)}catch(e){fb()}}
function refShare(){var l=refLink();if(!l)return toast('Ссылка ещё загружается');
 var u='https://t.me/share/url?url='+encodeURIComponent(l)+'&text='+encodeURIComponent('Залетай в «Юзерок: Рулетка»: крути рулетку, находи редкие юзернеймы и получай подарки. Держи бонус по моей ссылке 👇'),w=window.Telegram&&window.Telegram.WebApp;
 try{if(w&&w.openTelegramLink)w.openTelegramLink(u);else window.open(u,'_blank')}catch(e){window.open(u,'_blank')}}
function friendsHtml(){if(!cloudOn())return emp('users','Приглашения работают внутри Telegram',50);
 var d=RF||{},act=d.act||0,tot=d.total||0,l=refLink();
 return '<div class="refc"><div class="refh">Приглашай друзей</div><div class="refp">За каждого активного друга: <b>+'+money(REF_STAR)+'</b> и бесплатная прокрутка. Другу в подарок: <b>+'+money(REF_WELCOME)+'</b>.</div></div>'+
  (l?'<div class="reflink">'+esc(l)+'</div><div class="row2" style="margin-top:10px"><button class="act" data-act="refcopy">Копировать</button><button class="pbtn" style="flex:1" data-act="refshare">Поделиться</button></div>':'<div class="empty" style="padding:18px 0">Загружаем ссылку…</div>')+
  '<div class="stats3" style="grid-template-columns:1fr 1fr;margin-top:14px"><div class="stat"><b>'+tot+'</b><small>приглашено</small></div><div class="stat"><b>'+act+'</b><small>активных</small></div></div>'+
  '<div class="sec">Награды за друзей</div><div class="grp">'+REFM.map(function(m){var ok=act>=m.n;return '<div class="go"><span style="width:12px;height:12px;border-radius:50%;background:'+(ok?'#34c759':'var(--sep)')+';flex:none"></span><span>'+m.n+' друзей</span><small style="color:'+(ok?'#34c759':'var(--sub)')+'">'+(ok?'✓ ':'')+m.t+'</small></div>'}).join('')+'</div>'+
  ((d.list||[]).length?'<div class="sec">Твои друзья</div><div class="grp">'+d.list.map(function(f){var a=f.spins>=REF_NEED;return '<div class="go"><span>'+esc(f.name||'Игрок')+'</span><small style="color:'+(a?'#34c759':'var(--sub)')+'">'+(a?'активен ✓':'прокрутки '+Math.min(f.spins,REF_NEED)+'/'+REF_NEED)+'</small></div>'}).join('')+'</div>':'')+
  '<div class="foot">Друг считается активным после '+REF_NEED+' прокруток. Ссылка работает для тех, кто ещё не играл.</div>'}
