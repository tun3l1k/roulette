// Интерфейс: навигация, экраны, отрисовка
var BV={};
function countTo(id,v,f){var el=document.getElementById(id);if(!el)return;var from=BV[id]===undefined?v:BV[id];BV[id]=v;
 if(from==v){el.textContent=f(v);return}
 var t0=Date.now(),d=700;(function st(){var k=Math.min(1,(Date.now()-t0)/d),e=1-Math.pow(1-k,3);el.textContent=f(from+(v-from)*e);if(k<1)requestAnimationFrame(st)})();
 var pr=el.closest?el.closest('.bal2,.wcard,.mbal2'):null;if(pr){pr.classList.remove('up','dn');void pr.offsetWidth;pr.classList.add(v>from?'up':'dn')}}
// ----- screens -----
var STK=['home'];
function go(n){if(n==scr){draw();return}
 var dir=1;if(STK.length>1&&STK[STK.length-2]==n){STK.pop();dir=-1}else if(n=='home'){STK=['home'];dir=-1}else STK.push(n);
 if(n=='list')LU=null;if(n=='profile')PT=0;
 var a=$('app'),sy=window.scrollY||0,old=null,rm=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
 if(!rm&&a.animate){old=document.createElement('div');old.className='ghost';old.innerHTML='<div style="transform:translateY(-'+sy+'px)">'+a.innerHTML+'</div>';document.body.appendChild(old)}
 scr=n;draw();window.scrollTo(0,0);
 if(old){var o={duration:340,easing:'cubic-bezier(.32,.72,0,1)'},sh='0 0 28px rgba(0,0,0,.35)';
  old.style.zIndex=dir>0?1:3;a.style.zIndex=dir>0?3:1;(dir>0?a:old).style.boxShadow=sh;
  var ao=old.animate(dir>0?[{transform:'translateX(0)'},{transform:'translateX(-28%)'}]:[{transform:'translateX(0)'},{transform:'translateX(100%)'}],{duration:340,easing:o.easing,fill:'forwards'});
  a.animate(dir>0?[{transform:'translateX(100%)'},{transform:'translateX(0)'}]:[{transform:'translateX(-28%)'},{transform:'translateX(0)'}],o);
  var done=function(){if(old.parentNode)old.remove();a.style.zIndex='';a.style.boxShadow=''};ao.onfinish=done;setTimeout(done,700)}}
var tx=0,ty=0;
document.addEventListener('touchstart',function(e){var t=e.touches[0];tx=t.clientX;ty=t.clientY},{passive:true});
document.addEventListener('touchend',function(e){var t=e.changedTouches[0],dx=t.clientX-tx,dy=Math.abs(t.clientY-ty);if(tx<48&&dx>70&&dy<60&&STK.length>1)go(STK[STK.length-2])},{passive:true});
function shown(){return S.pending||null}
function priceText(sh){if(!sh)return'';var q=worth(sh);return '+'+money(q)}
function paintHome(anim){var sh=shown();if(!$('huname'))return;var t=sh?tier(sh.tier):null,i=sh?ti(sh.tier):0,a=$('hava'),u=$('huname');
u.innerHTML=sh?'@'+sh.u:ownHandle();$('hl').innerHTML=ownInitial();
$('hrar').textContent=t?t.name:'—';$('hrar').style.color=t?t.color:'var(--sub)';
var pe=!!S.pending;$('hrow').style.display=pe?'flex':'none';$('hbtn').style.opacity=pe?.45:1;countTo('hbs',S.yuz,fS);countTo('hbt',S.ton||0,fT);$('hprice').textContent=priceText(sh);$('hmult').textContent=sh?multText(sh):'';$('hodds').textContent=sh&&sh.odds&&S.odds!==false?'Шанс: 1 из '+fmt(sh.odds):'';
$('hlvl').innerHTML='Уровень '+level()+''+(S.luck>0?' &nbsp;🍀'+S.luck:'');
a.style.boxShadow=i>=1?'0 0 '+(8+i*7)+'px '+t.color+(i>=4?'':'aa'):'none';a.style.borderColor=i>=1?t.color:'';
if(anim){u.classList.remove('pop');void u.offsetWidth;u.classList.add('pop')}}
var LC='star',PT=0,LU=null,LT=null,LB=null,LP=10,LD=300,BOTN=BOTS.map(function(b){return b[0]});
function bulkHtml(){var b=bulkList();if(!b.length)return '';var t=b.reduce(function(a,c){return a+worth(c)},0);return '<button class="act" style="width:100%;margin-bottom:12px" data-act="bulk">Продать обычные и необычные · '+b.length+' шт. · +'+money(t)+'</button>'}
function ask(msg,okTxt,cb){var o=document.createElement('div');o.className='ov';
 o.innerHTML='<div class="sh"><p>'+msg+'</p><div class="row2"><button class="act" data-x="0">Отмена</button><button class="pbtn" style="flex:1" data-x="1">'+okTxt+'</button></div></div>';
 o.addEventListener('click',function(e){var b=e.target.closest('[data-x]');if(b||e.target===o){o.remove();if(b&&b.getAttribute('data-x')=='1')cb()}});document.body.appendChild(o)}
function tgRow(ic,col,label,k){var on=k=='auto'?!!S.auto:S[k]!==false;return '<button class="go" data-tg="'+k+'"><span class="ic" style="background:'+col+'">'+ic+'</span>'+label+'<span class="sw'+(on?' on':'')+'"></span></button>'}
function nav(title,b){return '<div class="nav"><button class="rbtn" data-go="'+(b||'home')+'"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg></button><h2>'+title+'</h2><span style="width:46px"></span></div>'}
function row(ic,col,label,to,sm){return '<button class="go" data-go="'+to+'"><span class="ic" style="background:'+col+'">'+ic+'</span>'+label+(sm?'<span class="cnt">'+sm+'</span><span class="ar" style="margin-left:8px">›</span>':'<span class="ar">›</span>')+'</button>'}
function draw(){var h='',a=$('app');
 if(scr=='home'){var sh=shown(),mt=sh?tier(sh.tier):null,u=sh?sh.u:null;
  h='<div class="top"><button class="sq" data-act="qr">▦</button><button class="bal2" id="hbal" data-go="wallet"><span class="bc">'+SI(18)+'<b id="hbs">'+fS(S.yuz)+'</b></span><i class="bd"></i><span class="bc">'+TI(18)+'<b id="hbt">'+tonF(S.ton||0)+'</b></span></button></div>'+
  '<div class="avawrap"><div class="ava" id="hava"><span id="hl">'+ownInitial()+'</span>'+photoTag()+'</div><div class="cam">📷</div></div>'+
  '<div class="uname" id="huname">'+(u?'@'+u:ownHandle())+'</div>'+
  '<div class="lvl" id="hlvl">Уровень '+level()+''+(S.luck>0?' &nbsp;🍀'+S.luck:'')+'</div>'+
  '<div class="rar">Редкость<b id="hrar" style="color:'+(mt?mt.color:'var(--sub)')+'">'+(mt?mt.name:'—')+'</b><span id="hmult" style="font-size:13px;display:block;color:var(--blue);margin-top:2px"></span><span id="hodds" style="font-size:13px">'+(sh&&sh.odds&&S.odds!==false?'Шанс: 1 из '+fmt(sh.odds):'')+'</span></div>'+
  '<button class="go big" id="hbtn" data-act="spin">Прокрутить</button><div class="abrow" id="hrow"><button class="ab sell" data-act="sellcur">'+TAGC+'<span class="bt"><b>Продать</b><i id="hprice">'+priceText(sh)+'</i></span></button><button class="ab keep" data-act="keep">'+PLUSC+'<span class="bt"><b>Оставить</b><i>в коллекцию</i></span></button></div>'+
  '<div class="grp">'+row(IC.user,'#ef5a5a','Мой профиль','profile')+row(IC.gear,'#5ccf6c','Настройки','settings')+'</div>'+
  '<div class="grp">'+row(IC.task,'#30b0c7','Задания','tasks',claimable())+row(IC.auto,'#a259f7','Авто-продажа','auto',S.auto?'Вкл':'')+row(IC.gift,'#ff5d8f','Подарки','gifts','скоро')+'</div>'+
  '<div class="grp">'+row(IC.layers,'#3d7df2','Коллекция','coll',S.coll.length)+row(IC.clock,'#5ccf6c','История прокруток','hist')+row(IC.trophy,'#f2b244','Рейтинг','rating')+row(IC.shop,'#5db4f7','Маркет','market')+'</div>'+
  '<div class="foot">👑 Собирай редкие юзеры, повышай уровень,<br>стань легендой!</div>'}
 else if(scr=='spin'){h=nav('Прокрутка')+'<div id="card"></div><div class="row2"><button class="act m" data-act="spin">🔄 Ещё</button></div><div class="row2"><button class="act" data-act="copy">📋 Копировать</button><button class="act" data-act="share">📤 Поделиться</button></div><div class="row2"><button class="act" data-act="setmain">⭐ Сделать основным</button></div>'}
 else if(scr=='coll'){var c2={},tot=0,rr=0;S.coll.forEach(function(c){var k=ti(c.tier);c2[k]=(c2[k]||0)+1;tot+=worth(c);if(k>=2)rr++});
  var cf=(S.cf===undefined?-1:S.cf);if(cf>=0&&!c2[cf])cf=-1;var cs=S.cs||'r',bk=bulkHtml();
  var CL=S.coll.filter(function(c){return cf<0||ti(c.tier)==cf});
  if(cs=='r')CL=CL.slice().sort(function(a,b){return ti(b.tier)-ti(a.tier)||worth(b)-worth(a)});else if(cs=='p')CL=CL.slice().sort(function(a,b){return worth(b)-worth(a)});
  h=nav('Коллекция')+(S.coll.length?
   '<div class="stats3" style="margin-top:4px"><div class="stat"><b>'+S.coll.length+'</b><small>ников</small></div><div class="stat"><b>'+money(tot)+'</b><small>оценка</small></div><div class="stat"><b>'+rr+'</b><small>редких</small></div></div>'+
   (bk?'<div style="margin-top:10px">'+bk+'</div>':'')+
   '<div class="fchips"><button class="fc'+(cf<0?' on':'')+'" data-cf="-1">Все<b>'+S.coll.length+'</b></button>'+TIERS.map(function(t,i){return c2[i]?'<button class="fc'+(cf==i?' on':'')+'" data-cf="'+i+'">'+t.icon+'<b>'+c2[i]+'</b></button>':''}).join('')+'</div>'+
   '<div class="seg" style="margin-top:10px">'+[['r','По редкости'],['p','По цене'],['n','Новые']].map(function(x){return '<button class="'+(cs==x[0]?'on':'')+'" data-cs="'+x[0]+'">'+x[1]+'</button>'}).join('')+'</div>'+
   '<div class="cgrid">'+CL.map(function(c,i){var t=tier(c.tier),m=mult(c.u),ism=c.u==S.main,ix=ti(c.tier);
    return '<div class="ccard" style="border-color:'+t.color+'88;background:linear-gradient(160deg,'+t.color+'33,var(--grp) 65%);'+(ix>=1?'box-shadow:0 0 '+(6+ix*6)+'px '+t.color+(ix>=4?'88':'55')+';':'')+'animation-delay:'+Math.min(i,10)*30+'ms"><div class="ctop"><span class="cb" style="background:'+t.color+'">'+t.icon+' '+t.name+'</span></div><div class="cn">@'+c.u+'</div><div class="cx">'+money(c.base!=null?c.base:t.pts)+(m.m>1?' × '+fm(m.m)+' · '+m.tags.join(', '):'')+'</div><div class="cp">'+money(worth(c))+'</div><div class="cbt"><button class="s" data-sell="'+c.u+'">Продать</button></div></div>'}).join('')+'</div>'
   :'<div class="empty">В коллекции пока пусто<br>Крути и оставляй лучшие ники</div>')}
 else if(scr=='hist'){var hf=S.hf||0,TH=[0,2,3,4],HL=['Все','Редкие','Эпик+','Легенды+'],arr=(hf==0?S.hist:(S.rare||[])).filter(function(c){return ti(c.tier)>=TH[hf]});
  h=nav('История прокруток')+'<div class="seg">'+HL.map(function(x,i){return '<button class="'+(i==hf?'on':'')+'" data-hf="'+i+'">'+x+'</button>'}).join('')+'</div>'+
  (arr.length?'<div class="grp">'+arr.map(function(c){var t=tier(c.tier),m=mult(c.u).m;return '<div class="go it" style="border-color:'+t.color+'"><div class="li"><b>@'+c.u+'</b><span class="badge sm" style="background:'+t.color+'">'+t.name+'</span>'+(m>1?'<span class="badge sm" style="background:#2AABEE">×'+fm(m)+'</span>':'')+'<div class="ls">'+(c.ts?dt(c.ts):'')+'</div></div><small>1 из '+fmt(c.odds)+'</small></div>'}).join('')+'</div><div class="foot">'+(hf?'Хранятся последние 100 редких выпадений':'Последние 50 прокруток')+'</div>':'<div class="empty">'+(hf?'Редких пока не выпадало':'История пуста')+'</div>')}
 else if(scr=='rating'){var tn=TG?(TG.username?'@'+TG.username:(TG.first_name||'Ты')):'Ты',me=[tn+' · ты',S.xp,1],L=BOTS.map(function(b){return['@'+b[0],b[1]]});L.push(me);L.sort(function(a,b){return b[1]-a[1]});
  h=nav('Рейтинг')+'<div class="grp">'+L.map(function(x,i){return '<div class="go"><span class="ic" style="background:var(--sep)">'+(i<3?['🥇','🥈','🥉'][i]:i+1)+'</span><b'+(x[2]?' style="color:var(--blue)"':'')+'>'+esc(x[0])+'</b><small>'+fmt(x[1])+' оч.</small></div>'}).join('')+'</div><div class="foot">Пока тестовый рейтинг. Реальные игроки — позже.</div>'}
 else if(scr=='market'){var mi=S.mt=='mine',MLs=S.lots||[],nA=MLs.filter(function(x){return !x.mine}).length,nM=MLs.length-nA;
  h=nav('Маркет')+'<div class="mbal2" data-go="wallet"><div class="bcol"><small>Звёзды</small><span class="bnum">'+SI(22)+'<b id="mst">'+fS(S.yuz)+'</b></span></div><div class="bdiv"></div><div class="bcol"><small>TON</small><span class="bnum">'+TI(22)+'<b id="mtn">'+tonF(S.ton||0)+'</b></span></div></div>'+
  '<div class="seg" style="margin-top:12px"><button class="'+(mi?'':'on')+'" data-mt="auc">Аукцион · '+nA+'</button><button class="'+(mi?'on':'')+'" data-mt="mine">Мои лоты · '+nM+'</button></div>'+
  (mi?'<button class="pbtn" style="width:100%;margin-top:12px" data-go="list">'+PLUSC+'Выставить ник</button>':'')+lotsHtml(mi)+
  '<div class="sec">Магазин</div><div class="shop"><div class="shi">🍀</div><div class="shm"><b>Удача ×3</b><small>на 10 прокруток для редких</small></div><button class="pbtn sm" data-act="luck">'+money(100)+'</button></div>'+
  '<div class="foot">Демо: лоты и ставки пока симулируются.<br>Настоящие игроки появятся после подключения сервера.</div>'}
 else if(scr=='wallet'){
  h=nav('Кошелёк')+'<div class="wcard"><div class="wtop"><span>Мой баланс</span><span class="wchip">≈ '+fmt(Math.round(S.yuz+(S.ton||0)*RATE))+' ⭐</span></div><div class="wrow"><div class="wico">'+SI(26)+'</div><div><small>Звёзды</small><b id="wst">'+fS(S.yuz)+'</b></div></div><div class="wrow tn"><div class="wico">'+TI(26)+'</div><div><small>TON</small><b id="wtn">'+tonF(S.ton||0)+'</b></div></div></div>'+
  '<div class="wacts"><button class="wa" data-go="market">'+WA1+'Маркет</button><button class="wa" data-go="tasks">'+WA2+'Задания</button><button class="wa" data-act="xch">'+WA3+'Обмен</button></div>'+
  '<div class="sec" id="xch">Обмен звёзд на TON</div><div class="grp">'+[0.01,0.1,1].map(function(t){var c=Math.ceil(t*RATE*1.1);return '<button class="go" data-xch="'+t+'"><span class="ic" style="background:#4f9bff">💎</span><div>'+tonF(t)+' TON<br><small style="margin:0">комиссия 10%</small></div><small style="margin-left:auto;'+(S.yuz>=c?'color:var(--blue)':'')+'">'+money(c)+'</small></button>'}).join('')+'</div>'+
  '<div class="foot">TON очень ценный и редкий: курс 1 TON = '+fmt(RATE)+' ⭐.<br>Его можно получить обменом, продав дорогой ник на маркете за TON или найти при прокрутке (очень редко).</div>'+
  '<div class="sec">Тестовое пополнение</div><div class="row2"><button class="act" data-tu="10000">+10 000 ⭐</button><button class="act" data-tt="0.5">+0,5 TON</button></div>'}
 else if(scr=='gifts'){h=nav('Подарки')+'<div class="empty" style="padding:70px 0"><div style="font-size:64px">🎁</div><div style="font-size:22px;font-weight:700;color:var(--text);margin-top:12px">Скоро</div><div style="margin-top:6px">Здесь можно будет дарить ники друзьям</div></div>'}
 else if(scr=='tasks'){tqE();var TQ=S.tq,dn=0;TASKS.forEach(function(t){if(TQ.c[t.id])dn++});var ci=chestInfo();
  h=nav('Задания')+'<div class="mbal" style="background:linear-gradient(135deg,#30b0c7,#1a7fa0)"><div><small>Сегодня выполнено</small><b>'+dn+' / '+TASKS.length+'</b></div><div style="text-align:right"><small>Обновятся через</small><b style="font-size:18px">'+dayLeft()+'</b></div></div>'+
  '<div class="tasks">'+TASKS.map(function(t){var p=Math.min(t.goal,TQ.p[t.id]||0),cl=!!TQ.c[t.id],ok=p>=t.goal;
   return '<div class="tk'+(cl?' dn':'')+'"><div class="tkm"><b>'+t.title+'</b><div class="bar"><i style="width:'+Math.round(p/t.goal*100)+'%"></i></div><small>'+p+' / '+t.goal+'</small></div>'+(cl?'<span class="chipok">✓ получено</span>':ok?'<button class="pbtn sm" data-claim="'+t.id+'">Забрать · '+money(t.rew)+'</button>':'<span class="tkr">+'+money(t.rew)+'</span>')+'</div>'}).join('')+'</div>'+
  '<div class="sec">Бонус дня</div><div class="shop"><div class="shi" style="background:#ff9f0a">🎁</div><div class="shm"><b>Выполни все задания</b><small>Серия дней: '+streakNow()+' · награда растёт до 7 дней</small></div>'+(TQ.c.chest?'<span class="chipok">✓</span>':'<button class="pbtn sm" '+(allClaimed()?'':'disabled style="opacity:.45" ')+'data-act="chest">'+money(ci.rew)+'</button>')+'</div>'}
 else if(scr=='auto'){var AM=['Только обычные','Обычные и необычные','До редких включительно'];
  h=nav('Авто-продажа')+'<div class="grp">'+tgRow('💰','#ff9500','Авто-продажа','auto')+'</div>'+
  '<div class="sec">Продавать автоматически</div><div class="grp" style="'+(S.auto?'':'opacity:.5')+'">'+AM.map(function(x,i){return '<button class="go" data-am="'+i+'">'+x+((S.autoMax||0)==i?'<small style="color:var(--blue)">✓</small>':'')+'</button>'}).join('')+'</div>'+
  '<div class="sec">Правила</div><div class="grp">'+tgRow('🛡️','#34c759','Не продавать ники с множителем ×','autoKeep')+'</div>'+
  '<div class="stats3" style="grid-template-columns:1fr 1fr;margin-top:18px"><div class="stat"><b>'+(S.autoN||0)+'</b><small>продано автоматически</small></div><div class="stat"><b>'+money(S.autoSum||0)+'</b><small>заработано</small></div></div>'+
  '<div class="foot">Как это работает: после прокрутки ник показывается 1–2 секунды, и если он подходит под правила, продаётся сам. Успей нажать «Оставить», если он тебе нужен.</div>'}
 else if(scr=='list'){
  if(!LU){h=nav('Выставить ник','market')+(S.coll.length?'<div class="grp">'+S.coll.map(function(c){var t=tier(c.tier);return '<button class="go it" style="border-color:'+t.color+'" data-lp="'+c.u+'"><b>@'+c.u+'</b><small>'+t.icon+' '+t.name+mx(c.u)+'</small></button>'}).join('')+'</div>':'<div class="empty">В коллекции пусто</div>')}
  else{var lt=tier(LT);h=nav('Аукцион','market')+'<div class="grp"><div class="go it" style="border-color:'+lt.color+'"><b style="font-size:22px">@'+LU+'</b><small>'+lt.icon+' '+lt.name+'</small></div></div>'+
   '<div class="sec">Валюта</div><div class="seg"><button class="'+(LC=='star'?'on':'')+'" data-lc="star">⭐ Звёзды</button><button class="'+(LC=='ton'?'on':'')+'" data-lc="ton">💎 TON</button></div>'+
   '<div class="sec">Стартовая цена</div><div class="row2"><button class="act" data-lpp="-1">−</button><div class="act" style="color:var(--text)">'+cash(LP,LC)+'</div><button class="act" data-lpp="1">+</button></div>'+
   '<div class="sec">Длительность (демо)</div><div class="seg">'+[[60,'1 мин'],[300,'5 мин'],[900,'15 мин']].map(function(x){return '<button class="'+(LD==x[0]?'on':'')+'" data-ld="'+x[0]+'">'+x[1]+'</button>'}).join('')+'</div>'+
   '<button class="act m" style="width:100%;margin-top:20px" data-act="listgo">Выставить на аукцион</button><div class="foot">Комиссия с продажи 5%</div>'}}
 else if(scr=='profile'){var bestR=null,cnt={},rr=0;S.coll.forEach(function(c){cnt[c.tier]=(cnt[c.tier]||0)+1;if(ti(c.tier)>=2)rr++;if(!bestR||worth(c)>worth(bestR))bestR=c});
  var L=level(),lo=10*(L-1)*(L-1),hi=10*L*L,pc=Math.max(0,Math.min(100,Math.round((S.xp-lo)/(hi-lo)*100))),
  nm=TG?esc(((TG.first_name||'')+' '+(TG.last_name||'')).trim()||'Игрок'):'Игрок',
  un=TG&&TG.username?'@'+esc(TG.username):'не указан',
  bt=bestR?tier(bestR.tier):null,cc=bt?bt.color:'#2AABEE',
  stat=function(v,lb){return '<div class="stat"><b>'+v+'</b><small>'+lb+'</small></div>'},
  inf2=function(lb,v,ic){return '<div class="inf2"><div><small>'+lb+'</small><div class="v">'+v+'</div></div>'+(ic||'')+'</div>'},
  MN=['янв','фев','мар','апр','мая','июн','июл','авг','сен','окт','ноя','дек'],sd=new Date(S.since||Date.now()),
  QRI='<button class="qrb" data-act="qr"><svg viewBox="0 0 24 24" fill="none" stroke="#4f86ec" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><path d="M14 14h3v3M21 14v1M14 21h1M18 18h3v3"/></svg></button>',
  shield='<svg class="shd" viewBox="0 0 24 24"><path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5z" fill="#4f86ec"/><text x="12" y="15.5" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">'+L+'</text></svg>',
  body='';
  if(PT==0){body='<div class="lvcard"><div class="lvtop"><b>Уровень '+L+'</b><small>'+fmt(S.xp)+' / '+fmt(hi)+' оч.</small></div><div class="bar"><i style="width:'+pc+'%"></i></div></div>'+
   '<div class="stats3">'+stat(fmt(S.spins),'прокруток')+stat(S.coll.length,'в коллекции')+stat(rr,'редких')+'</div>'+
   (bestR?'<div class="sec">Лучший ник</div><div class="showc" style="border-color:'+cc+';box-shadow:0 0 22px '+cc+'55"><div class="sn">@'+bestR.u+'</div><div><span class="badge" style="background:'+cc+'">'+bt.icon+' '+bt.name+'</span>'+(mult(bestR.u).m>1?' <span class="badge" style="background:#2AABEE">×'+fm(mult(bestR.u).m)+'</span>':'')+'</div><div class="ls" style="margin-top:8px">'+multText(bestR)+'</div></div>':'')+
   '<div class="sec">Редкость коллекции</div><div class="chips">'+TIERS.map(function(t){return '<div class="chip" style="opacity:'+(cnt[t.id]?1:.4)+';border-color:'+t.color+'"><span>'+t.icon+'</span><b>'+(cnt[t.id]||0)+'</b><small>'+t.name+'</small></div>'}).join('')+'</div>'+
   '<details class="grp mult"><summary>Множители цены</summary>'+[['Короткий ник, до 3 символов','×3'],['Короткий ник, 4 символа','×2'],['Топ-слово (город, бренд)','×5'],['Слово','×2'],['Имя','×1,5'],['Зеркало (anna, lol)','×2'],['Красивые цифры (777, 007)','×2']].map(function(x){return '<div class="go"><span>'+x[0]+'</span><small>'+x[1]+'</small></div>'}).join('')+'</details>'}
  else if(PT==1){body='<div class="empty" style="padding:50px 0"><div style="font-size:56px">🎁</div><div style="font-size:20px;font-weight:700;color:var(--text);margin-top:10px">Скоро</div><div style="margin-top:6px">Здесь появятся подарки от друзей</div></div>'}
  else{var hr=(S.rare||[]).slice(0,8);
   body=(hr.length?'<div class="grp">'+hr.map(function(c){var t=tier(c.tier);return '<div class="go it" style="border-color:'+t.color+'"><div class="li"><b>@'+c.u+'</b><div class="ls">'+t.icon+' '+t.name+(c.ts?' · '+dt(c.ts):'')+'</div></div><small>1 из '+fmt(c.odds)+'</small></div>'}).join('')+'</div>':'<div class="empty">Редких пока не выпадало</div>')+'<button class="pbtn" style="width:100%;margin-top:12px" data-go="hist">Вся история</button>'}
  h='<div class="ptop"><button class="rbtn" data-go="home"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg></button><button class="ibtn" data-go="settings"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/></svg>Изм.</button></div>'+
  '<div class="avawrap p2"><div class="ava"><span>'+ownInitial()+'</span>'+photoTag()+'</div></div>'+
  '<div class="uname" style="font-size:26px;margin:10px 0 2px">'+nm+'</div><div class="pst">'+shield+'<span>в сети</span></div>'+
  (bestR?'<button class="bestrow" data-go="coll"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 4h10v5a5 5 0 0 1-10 0V4zM7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3M12 14v4M8 21h8M9 18h6"/></svg><b>@'+bestR.u+'</b><span>- '+money(worth(bestR))+' ›</span></button>':'')+
  '<div class="grp pinfo">'+inf2('имя пользователя','<span style="color:var(--blue)">'+un+'</span>',QRI)+inf2('баланс',balHtml())+inf2('в игре с',sd.getDate()+' '+MN[sd.getMonth()])+'</div>'+
  '<div class="ptabs">'+['Статистика','Подарки','История'].map(function(x,i){return '<button class="'+(i==PT?'on':'')+'" data-pt="'+i+'">'+x+'</button>'}).join('')+'</div><div class="pbody">'+body+'</div>'}
 else if(scr=='settings'){h=nav('Настройки')+'<div class="sec">Тема</div><div class="grp">'+[['auto','Как в телефоне'],['light','Светлая'],['dark','Тёмная']].map(function(x){return '<button class="go" data-theme="'+x[0]+'">'+x[1]+(S.theme==x[0]?'<small style="color:var(--blue)">✓</small>':'')+'</button>'}).join('')+'</div><div class="sec">Параметры</div><div class="grp">'+tgRow('📳','#ff9500','Вибрация','haptic')+tgRow('✨','#af52de','Анимация прокрутки','anim')+'</div><div class="grp" style="margin-top:18px"><button class="go" data-go="auto"><span class="ic" style="background:#ff9500">💰</span>Авто-продажа<small>'+(S.auto?'Вкл':'Выкл')+'</small><span class="ar" style="margin-left:8px">›</span></button></div><div class="grp" style="margin-top:18px">'+tgRow('🛡️','#34c759','Подтверждать продажу','confirm')+tgRow('🎯','#5ac8fa','Показывать шанс','odds')+'</div><div class="sec">Диагностика Telegram</div><div class="grp">'+[['Запуск из Telegram',TG?'да':'нет'],['Имя пользователя',TG&&TG.username?'@'+esc(TG.username):'не передано'],['Фото профиля',TG&&TG.photo_url?'есть':'не передано']].map(function(x){return '<div class="go"><span>'+x[0]+'</span><small>'+x[1]+'</small></div>'}).join('')+'</div><div class="grp" style="margin-top:18px"><button class="go" data-act="reset" style="color:#ff3b30">Сбросить прогресс</button></div>'}
 a.innerHTML=h;if(scr=='spin')card(cur);if(scr=='home')paintHome();if(scr=='wallet'){countTo('wst',S.yuz,fS);countTo('wtn',S.ton||0,fT)}if(scr=='market'){countTo('mst',S.yuz,fS);countTo('mtn',S.ton||0,fT)}}
function card(r){var el=$('card');if(!el)return;
 if(!r){el.innerHTML='<div class="msg"><div class="mava">?</div><div class="bubble"><div class="bn">Username Bot</div><div class="bu">Жми «Ещё»</div></div></div>';return}
 var t=tier(r.tier),i=ti(r.tier);
 el.innerHTML='<div class="msg"><div class="mava">'+r.u.charAt(0).toUpperCase()+'</div><div class="bubble pop" id="bub" style="border-color:'+(i>=2?t.color:'transparent')+';box-shadow:'+(i>=3?'0 0 '+(10+i*6)+'px '+t.color:'none')+'"><div class="bn">Username Bot '+(i>=2?'✔️':'')+'</div><div class="bu">@'+r.u+'</div><span class="badge" style="background:'+t.color+'">'+t.icon+' '+t.name+'</span><div class="meta"><span>Шанс: 1 из '+fmt(r.odds)+'</span><span>+'+t.pts+' оч. · онлайн</span></div></div></div>'}
function copy(){if(!cur)return toast('Сначала покрути 🔄');var s='@'+cur.u;
 function fb(){var a=document.createElement('textarea');a.value=s;document.body.appendChild(a);a.select();try{document.execCommand('copy');toast('Скопировано '+s)}catch(e){toast(s)}document.body.removeChild(a)}
 try{navigator.clipboard.writeText(s).then(function(){toast('Скопировано '+s)},fb)}catch(e){fb()}}
function share(){var cur=shown();if(!cur)return toast('Сначала покрути 🔄');var t=tier(cur.tier),x='Мне выпал @'+cur.u+' — '+t.icon+' '+t.name+' (шанс 1 из '+fmt(cur.odds)+')! Сможешь лучше?';
 if(navigator.share){navigator.share({text:x}).catch(function(){})}else{try{navigator.clipboard.writeText(x);toast('Текст скопирован')}catch(e){toast(x)}}}
