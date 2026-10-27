// Интерфейс: навигация, экраны, отрисовка
var BV={};
function barAvatar(){return '<div class="bav"><span>'+ownInitial()+'</span>'+photoTag()+'</div>'}
function balBar(av,ids,idt){return '<div class="bbar" data-go="wallet">'+(av?barAvatar():'')+'<div class="bmid"><small>Ваш баланс</small><div class="bnums"><span class="bn1">'+SI(22)+'<b id="'+ids+'">'+fS(S.yuz)+'</b></span><span class="bn1">'+TI(22)+'<b id="'+idt+'">'+fT(S.ton||0)+'</b></span></div></div><button class="bplus" data-go="shop">'+WA5+'Пополнить</button></div>'}
function countTo(id,v,f){var el=document.getElementById(id);if(!el)return;var from=BV[id]===undefined?v:BV[id];BV[id]=v;
 if(from==v){el.innerHTML=f(v);return}
 var t0=Date.now(),d=700;(function st(){var k=Math.min(1,(Date.now()-t0)/d),e=1-Math.pow(1-k,3);el.innerHTML=f(from+(v-from)*e);if(k<1)requestAnimationFrame(st)})();
 var pr=el.closest?el.closest('.bal2,.wcard,.mbal2,.bbar'):null;if(pr){pr.classList.remove('up','dn');void pr.offsetWidth;pr.classList.add(v>from?'up':'dn')}}
// ----- screens -----
var NA=true,LS=null;
var STK=['home'];
// Нижняя панель вкладок: перерисовывается только когда меняется активная вкладка
var TK_=null;
function paintTabs(){var on=isTab(scr),tb=$('tabs');document.body.classList.toggle('hastabs',on);if(!tb)return;
 var k=on?scr:'';if(k===TK_)return;TK_=k;
 tb.innerHTML=on?TABS.map(function(t){return '<button data-go="'+t[0]+'"'+(t[0]==scr?' class="on" aria-current="page"':'')+'>'+t[2]+'<span>'+t[1]+'</span></button>'}).join(''):''}
function go(n){if(n==scr){draw();return}
 var dir=1,tsw=isTab(n)&&isTab(scr);
 if(STK.length>1&&STK[STK.length-2]==n){STK.pop();dir=-1}else if(n=='home'){STK=['home'];dir=-1}else if(isTab(n))STK=[n];else STK.push(n);
 if(n=='profile'&&dir>0){PT=0;if(typeof rLoad=='function'&&cloudOn())rLoad('lvl')}if(n=='friends')refsLoad();
 if(tsw)hap({type:'selection_change'});
 var a=$('app'),sy=window.scrollY||0,old=null,rm=tsw||(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches);
 if(!rm&&a.animate){old=document.createElement('div');old.className='ghost';old.innerHTML='<div style="transform:translateY(-'+sy+'px)">'+a.innerHTML+'</div>';document.body.appendChild(old)}
 if(AS&&n!='home')stopAuto('⏹ Автопрокрутка остановлена');NA=true;scr=n;draw();window.scrollTo(0,0);
 if(old){var o={duration:340,easing:'cubic-bezier(.32,.72,0,1)'},sh='0 0 28px rgba(0,0,0,.35)';
  old.style.zIndex=dir>0?1:3;a.style.zIndex=dir>0?3:1;(dir>0?a:old).style.boxShadow=sh;
  var ao=old.animate(dir>0?[{transform:'translateX(0)'},{transform:'translateX(-28%)'}]:[{transform:'translateX(0)'},{transform:'translateX(100%)'}],{duration:340,easing:o.easing,fill:'forwards'});
  a.animate(dir>0?[{transform:'translateX(100%)'},{transform:'translateX(0)'}]:[{transform:'translateX(-28%)'},{transform:'translateX(0)'}],o);
  var done=function(){if(old.parentNode)old.remove();a.style.zIndex='';a.style.boxShadow=''};ao.onfinish=done;setTimeout(done,700)}}
var tx=0,ty=0;
document.addEventListener('touchstart',function(e){var t=e.touches[0];tx=t.clientX;ty=t.clientY},{passive:true});
document.addEventListener('touchend',function(e){var t=e.changedTouches[0],dx=t.clientX-tx,dy=Math.abs(t.clientY-ty);if(tx<48&&dx>70&&dy<60&&STK.length>1)go(STK[STK.length-2])},{passive:true});
function shown(){return S.pending||null}
function priceText(sh){if(!sh)return'';var q=REVL?worthNoBonus(sh):worth(sh);return '+'+money(q)}
function rarityHtml(cnt){var tot=0;TIERS.forEach(function(t){tot+=cnt[t.id]||0});
 var seg=tot?TIERS.map(function(t){return cnt[t.id]?'<i style="flex:'+cnt[t.id]+';background:'+t.color+'"></i>':''}).join(''):'<i style="flex:1;background:var(--sep)"></i>';
 return '<div class="rcard" data-pc="-1"><div class="rtop"><div><small>Редкость коллекции</small><b>'+tot+' ников</b></div><span class="ar">›</span></div><div class="rseg">'+seg+'</div><div class="rrows">'+
  TIERS.map(function(t,ix){var n=cnt[t.id]||0,p=tot?Math.round(n/tot*100):0;return '<div class="rrow'+(n?'':' z')+'" data-pc="'+ix+'"><span class="rdot" style="background:'+t.color+'"></span><span class="rn">'+t.name+'</span><div class="rbar"><i style="width:'+p+'%;background:'+t.color+'"></i></div><b>'+n+'</b><small>'+p+'%</small></div>'}).join('')+'</div></div>'}
function hhmm(ts){var d=new Date(ts);return ('0'+d.getHours()).slice(-2)+':'+('0'+d.getMinutes()).slice(-2)}
function dayLabel(ts){var d=new Date(ts),n=new Date(),y=new Date();y.setDate(n.getDate()-1);return dk(d)==dk(n)?'Сегодня':dk(d)==dk(y)?'Вчера':dt(ts).split(' ')[0]}
function lvlPct(){var L=level(),lo=25*(L-1)*(L-1),hi=25*L*L;return Math.max(0,Math.min(100,Math.round((S.xp-lo)/(hi-lo)*100)))}
function lvlHtml(){return '<span class="lvchip">Уровень '+level()+'</span>'+(S.luck>0?'<span class="lvchip g">'+IC.luck+'×1,5 · '+S.luck+'</span>':'')}
function spinLabel(){if(busy&&!AS)return '<b>Пропустить</b>';return '<b>Прокрутить</b>'+(S.free>0?'<span class="cst">бесплатно ×'+S.free+'</span>':'<span class="cst">'+SI(16)+fmt(COST)+'</span>')}
function paintHome(anim){var sh=shown();if(!$('huname'))return;var t=sh?tier(sh.tier):null,i=sh?ti(sh.tier):0,a=$('hava'),u=$('huname');
u.innerHTML=sh?'@'+sh.u:ownHandle();$('hl').innerHTML=ownInitial();
$('hrar').textContent=t?t.name:'';$('hrar').style.color=t?t.color:'var(--sub)';
var pe=!!S.pending&&!REVL;$('hrow').style.display=pe?'flex':'none';var hb=$('hbonus');if(hb&&!REVL){hb.className='mxp';hb.innerHTML=sh?mxHtml(sh,false):''}$('hbtn').style.opacity=pe?.45:1;$('hbtn').innerHTML=spinLabel();var hsh=$('hshare');if(hsh)hsh.style.display=pe?'flex':'none';var ab=$('hauto');if(ab){ab.classList.toggle('on',AS);ab.innerHTML=AS?AUTOI+'<span>Стоп · '+ASN+'</span>':AUTOI+'<span>Авто</span>'}countTo('hbs',S.yuz,fS);countTo('hbt',S.ton||0,fT);$('hprice').textContent=priceText(sh);var hp=$('hpity');if(hp){if(S.pity>0)hp.textContent='Гарант ×'+S.pity+' удачи на следующую прокрутку';else hp.textContent='До гаранта: ×2 через '+(50-S.spins%50)+' · ×50 через '+(150-S.spins%150)+' прокруток'}
$('hlvl').innerHTML=lvlHtml();var hr=$('hring');if(hr)hr.setAttribute('stroke-dashoffset',(345.6*(1-lvlPct()/100)).toFixed(1));
a.style.boxShadow=i>=1?'0 0 '+(8+i*7)+'px '+t.color+(i>=4?'':'aa'):'none';a.style.borderColor=i>=1?t.color:'';
if(anim){u.classList.remove('pop');void u.offsetWidth;u.classList.add('pop')}}
var PT=0;
function bulkHtml(){var b=bulkList();if(!b.length)return '';var t=b.reduce(function(a,c){return a+worth(c)},0);return '<button class="act" style="width:100%;margin-bottom:12px" data-act="bulk">Продать обычные и необычные · '+b.length+' шт. · +'+money(t)+'</button>'}
function ask(msg,okTxt,cb){var o=document.createElement('div');o.className='ov';
 o.innerHTML='<div class="sh"><p>'+msg+'</p><div class="row2"><button class="act" data-x="0">Отмена</button><button class="pbtn" style="flex:1" data-x="1">'+okTxt+'</button></div></div>';
 o.addEventListener('click',function(e){var b=e.target.closest('[data-x]');if(b||e.target===o){o.remove();if(b&&b.getAttribute('data-x')=='1')cb()}});document.body.appendChild(o)}
function tgRow(ic,col,label,k){var on=(k=='auto'||k=='autoNotify')?!!S[k]:S[k]!==false;return '<button class="go" data-tg="'+k+'"><span class="ic" style="background:'+col+'">'+ei(ic)+'</span>'+label+'<span class="sw'+(on?' on':'')+'"></span></button>'}
function back(){go(STK.length>1?STK[STK.length-2]:'home')}
function srow(ic,col,label){return '<button class="go" data-soon="'+label+'"><span class="ic" style="background:'+col+'">'+ic+'</span>'+label+'<span class="cnt plain">скоро</span><span class="ar" style="margin-left:8px">›</span></button>'}
var SOONT='';
function nav(title,b){var pv=STK.length>1?STK[STK.length-2]:(b||'home');return '<div class="nav"><button class="rbtn" data-go="'+pv+'"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg></button><h2>'+title+'</h2><span style="width:46px"></span></div>'}
function row(ic,col,label,to,sm){return '<button class="go" data-go="'+to+'"><span class="ic" style="background:'+col+'">'+ic+'</span>'+label+(sm?'<span class="cnt'+(typeof sm=='string'?' plain':'')+'">'+sm+'</span><span class="ar" style="margin-left:8px">›</span>':'<span class="ar">›</span>')+'</button>'}
function draw(){var h='',a=$('app'),_y=window.scrollY,_k=(scr===LS);
 if(scr=='home'){var sh=shown(),mt=sh?tier(sh.tier):null,u=sh?sh.u:null;
  h=balBar(0,'hbs','hbt')+
  '<div class="hero"><button class="shbtn" id="hshare" data-act="sharecur" style="display:none">'+SHI+'</button><div class="avawrap hv"><div class="ava" id="hava"><span id="hl">'+ownInitial()+'</span>'+photoTag()+'</div></div>'+
  '<div class="uname" id="huname">'+(u?'@'+u:ownHandle())+'</div><div class="mxp" id="hbonus">'+(sh?mxHtml(sh,false):'')+'</div>'+
  '<div class="lvl" id="hlvl">'+lvlHtml()+'</div>'+
  '<div class="rar">Редкость<b id="hrar" style="color:'+(mt?mt.color:'var(--sub)')+'">'+(mt?mt.name:'')+'</b></div></div>'+
  '<div class="spinrow"><button class="go big" id="hbtn" data-act="spin">'+spinLabel()+'</button><button class="autob" id="hauto" data-act="auto">'+AUTOI+'<span>Авто</span></button></div><div class="abrow" id="hrow"><button class="ab sell" data-act="sellcur">'+TAGC+'<span class="bt"><b>Продать</b><i id="hprice">'+priceText(sh)+'</i></span></button><button class="ab keep" data-act="keep">'+PLUSC+'<span class="bt"><b>Оставить</b><i>в коллекцию</i></span></button></div><div class="pity" id="hpity"></div>'+
  '<div class="grp">'+row(IC.gift,'#ff6b9d','Подарки за TON','gifts',(S.gf||[]).length?String((S.gf||[]).length):'')+row(IC.users,'#5ac8fa','Пригласить друзей','friends','')+row(IC.gift,'#34c759','Подарок другу','fgift','')+srow(IC.medal,'#ff9f0a','Battle Pass')+srow(IC.frame,'#a259f7','Рамки профиля')+row(IC.task,'#30b0c7','Задания','tasks',claimable()?''+claimable():'')+row(IC.auto,'#a259f7','Авто-продажа','auto',S.auto?'Вкл':'')+row(IC.bag,'#34c759','Магазин','shop','')+row(IC.wheel,'#ff9f0a','Колесо фортуны','wheel',wheelReady()?'готово':'')+srow(IC.gift,'#ff5d8f','Подарки')+'</div>'+
  '<div class="grp">'+row(IC.clock,'#5ccf6c','История прокруток','hist')+row(IC.gear,'#8e8e93','Настройки','settings')+'</div>'+
  '<div class="foot">Собирай редкие ники, повышай уровень,<br>стань легендой!</div>'}
 else if(scr=='spin'){h=nav('Прокрутка')+'<div id="card"></div><div class="row2"><button class="act m" data-act="spin">🔄 Ещё</button></div><div class="row2"><button class="act" data-act="copy">📋 Копировать</button><button class="act" data-act="share">📤 Поделиться</button></div><div class="row2"><button class="act" data-act="setmain">⭐ Сделать основным</button></div>'}
 else if(scr=='coll'){h=nav('Коллекция')+collHtml()}
 else if(scr=='craft'){h=nav('Крафт')+craftHtml()}
 else if(scr=='hist'){h=nav('История прокруток')+histHtml()}
 else if(scr=='rating'){h=nav('Рейтинг')+ratingHtml()}
 else if(scr=='market'){var P2ON=p2on();if(P2ON)p2Enter();
  h=nav('Маркет')+balBar(1,'mst','mtn')+(P2ON?p2Html():'<div class="empty">Маркет работает только в Telegram<br>Здесь торгуют реальные игроки</div>')+
  '<div class="grp" style="margin-top:18px"><button class="go" data-go="gifts"><span class="ic" style="background:#ff6b9d">'+IC.gift+'</span>Подарки за TON<span class="ar">›</span></button><button class="go" data-go="shop"><span class="ic" style="background:#34c759">'+IC.bag+'</span>Магазин и Premium<span class="ar">›</span></button></div>'}
 else if(scr=='wallet'){
  h=nav('Кошелёк')+'<div class="wcard"><div class="wtop"><span>Мой баланс</span><span class="wchip">≈ '+fmt(Math.round(S.yuz+(S.ton||0)*RATE))+' ⭐</span></div><div class="wrow"><div class="wico">'+SI(26)+'</div><div><small>Звёзды</small><b id="wst">'+fS(S.yuz)+'</b></div></div><div class="wrow tn"><div class="wico">'+TI(26)+'</div><div><small>TON</small><b id="wtn">'+tonF(S.ton||0)+'</b></div></div></div>'+
  '<div class="wacts"><button class="wa" data-go="shop">'+WA4+'Магазин</button><button class="wa" data-go="market">'+WA1+'Маркет</button><button class="wa" data-go="tasks">'+WA2+'Задания</button><button class="wa" data-act="xch">'+WA3+'Обмен</button></div>'+
  '<div class="sec">Динамика баланса</div><div class="wchart">'+spark()+'<div class="wsum"><div><small>Доход за 24 ч</small><b class="up">+'+abbr(dayStats().i)+' ⭐</b></div><div><small>Расход за 24 ч</small><b class="dn">−'+abbr(dayStats().o)+' ⭐</b></div></div></div>'+
  '<div class="sec" id="xch">Обмен звёзд на TON</div><div class="grp">'+[0.01,0.1,1].map(function(t){var c=Math.ceil(t*RATE*1.1);return '<button class="go" data-xch="'+t+'"><span class="ic" style="background:#4f9bff">'+ei('💎')+'</span><div>'+tonF(t)+' TON<br><small style="margin:0">комиссия 10%</small></div><small style="margin-left:auto;'+(S.yuz>=c?'color:var(--blue)':'')+'">'+money(c)+'</small></button>'}).join('')+'</div>'+
  '<div class="foot">TON очень ценный и редкий: курс 1 TON = '+fmt(RATE)+' ⭐.<br>Его можно получить обменом, продав дорогой ник на маркете за TON или найти при прокрутке (очень редко).<br>TON в игре — внутриигровая валюта, вывод на реальный кошелёк недоступен.</div>'+
  '<div class="sec">Операции</div>'+txHtml(20)}
 else if(scr=='admin'){h=nav('Админ-меню','settings')+adminHtml()}
 else if(scr=='friends'){h=nav('Друзья')+friendsHtml()}
 else if(scr=='soon'){h=nav(SOONT||'Скоро')+emp('sparkle','Раздел скоро появится<br>Мы над ним работаем',70)}
 else if(scr=='gifts'){h=nav('Подарки')+balBar(1,'gst','gtn')+giftsHtml()}
 else if(scr=='fgift'){h=nav('Подарок другу')+fgiftHtml()}
 else if(scr=='tasks'){h=nav('Задания')+tasksHtml()}
 else if(scr=='auto'){h=nav('Авто-продажа')+autoHtml()}
 else if(scr=='shop'){h=nav('Магазин')+shopHtml()}
 else if(scr=='wheel'){h=nav('Колесо фортуны')+wheelHtml()}
 else if(scr=='profile'){var bestR=S.best||null,cnt={},rr=0;S.coll.forEach(function(c){cnt[c.tier]=(cnt[c.tier]||0)+1;if(ti(c.tier)>=2)rr++});
  var L=level(),lo=25*(L-1)*(L-1),hi=25*L*L,pc=Math.max(0,Math.min(100,Math.round((S.xp-lo)/(hi-lo)*100))),
  nm=TG?esc(((TG.first_name||'')+' '+(TG.last_name||'')).trim()||'Игрок'):'Игрок',
  un=TG&&TG.username?'@'+esc(TG.username):'не указан',
  bt=bestR?tier(bestR.tier):null,cc=bt?bt.color:'#2AABEE',
  stat=function(v,lb){return '<div class="stat"><b>'+v+'</b><small>'+lb+'</small></div>'},
  inf2=function(lb,v,ic){return '<div class="inf2"><div><small>'+lb+'</small><div class="v">'+v+'</div></div>'+(ic||'')+'</div>'},
  MN=['янв','фев','мар','апр','мая','июн','июл','авг','сен','окт','ноя','дек'],sd=new Date(S.since||Date.now()),
  QRI='<button class="qrb" data-act="qr"><svg viewBox="0 0 24 24" fill="none" stroke="#4f86ec" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><path d="M14 14h3v3M21 14v1M14 21h1M18 18h3v3"/></svg></button>',
  shield='<svg class="shd" viewBox="0 0 24 24"><path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5z" fill="#4f86ec"/><text x="12" y="15.5" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">'+L+'</text></svg>',
  body='',colWorth=0,rk=RT&&RT.d&&RT.d.lvl,myPlace=rk&&rk.rank?'#'+rk.rank:'—';S.coll.forEach(function(c){colWorth+=worth(c)});
  if(PT==0){body='<div class="lvcard"><div class="lvtop"><b>Уровень '+L+'</b><small>'+fmt(S.xp)+' / '+fmt(hi)+' оч.</small></div><div class="bar"><i style="width:'+pc+'%"></i></div><div class="lvnx">До уровня '+(L+1)+': '+fmt(Math.max(0,hi-S.xp))+' оч.</div></div>'+
   '<div class="stats3">'+stat(fmt(S.spins),'прокруток')+stat(S.coll.length,'в коллекции')+stat(rr,'редких')+stat(abbr(colWorth),'оценка ⭐')+stat((S.lg&&S.lg.n)||0,'дней серия')+stat(myPlace,'в рейтинге')+'</div>'+
   (bestR?'<div class="sec">Лучший ник за всё время</div>'+nickHero(bestR)+priceRows(bestR).replace('class="grp"','class="grp" style="margin-top:10px"')+'<button class="pbtn" style="width:100%;margin-top:10px" data-act="sharebest">Поделиться картинкой</button>':'')+
   '<div class="sec">Коллекция</div>'+rarityHtml(cnt)+
   '<div class="grp mult" style="margin-top:18px"><button class="go" data-act="pmult"><span>Множители цены</span><small>'+(S.pm?'скрыть':'показать')+'</small></button>'+(S.pm?[['3 символа','×3'],['4 символа','×2'],['5 символов','×1,2'],['6 символов','×1,1'],['7–8 символов','×1,05'],['Настоящее имя (alex)','×1,5'],['Красивое слово (gold)','×2'],['Статусное слово (boss, king)','×2,5'],['Топ-слово (город, бренд)','×5'],['Одна буква','×5'],['Повтор одной буквы (aaaa)','×3'],['Три одинаковые буквы (aaa)','×2'],['Две одинаковые буквы (ll)','×1,15'],['Зеркальный ник (abccba)','×2'],['Лесенка (abc, 123)','×2'],['Две одинаковые цифры','×1,2'],['Три одинаковые цифры','×1,5'],['Красивые цифры (777, 007)','×2'],['Четыре одинаковые цифры','×3'],['Год в конце (2024)','×1,5'],['Много цифр вразброс','×0,8'],['Подчёркивание','×0,9']].map(function(x){return '<div class="go"><span>'+x[0]+'</span><small>'+x[1]+'</small></div>'}).join(''):'')+'</div>'}
  else{var hr=(S.rare||[]).slice(0,8);
   body=(hr.length?histCards(hr):'<div class="empty">Редких пока не выпадало</div>')+'<button class="pbtn" style="width:100%;margin-top:12px" data-go="hist">Вся история</button>'}
  h='<div class="ptop"><button class="rbtn" data-go="home"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg></button><button class="ibtn" data-go="settings"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/></svg>Изм.</button></div>'+
  '<div class="avawrap p2"><div class="ava"><span>'+ownInitial()+'</span>'+photoTag()+'</div></div>'+
  '<div class="uname" style="font-size:26px;margin:10px 0 2px">'+nm+(isPrem()?' <span class="prembadge">'+IC.crown+'Premium</span>':'')+titleChip()+'</div><div class="pst">'+shield+'<span>в сети</span></div>'+
  '<div class="grp pinfo">'+inf2('имя пользователя','<span style="color:var(--blue)">'+un+'</span>',QRI)+(TG&&TG.id?'<button class="inf2 idr" data-act="copyid"><div><small>ID</small><div class="v mono">'+TG.id+'</div></div><span class="idc">копировать</span></button>':'')+inf2('баланс',balHtml())+inf2('в игре с',sd.getDate()+' '+MN[sd.getMonth()])+'</div>'+
  '<div class="ptabs">'+['Статистика','История'].map(function(x,i){return '<button class="'+(i==PT?'on':'')+'" data-pt="'+i+'">'+x+'</button>'}).join('')+'</div><div class="pbody">'+body+'</div>'}
 else if(scr=='settings'){h=nav('Настройки')+'<div class="sec">Тема</div><div class="grp">'+[['auto','Как в телефоне'],['light','Светлая'],['dark','Тёмная']].map(function(x){return '<button class="go" data-theme="'+x[0]+'">'+x[1]+(S.theme==x[0]?'<small style="color:var(--blue)">✓</small>':'')+'</button>'}).join('')+'</div><div class="sec">Размер кнопок</div><div class="seg">'+[['s','Маленький'],['m','Средний'],['l','Большой']].map(function(x){return '<button class="'+((S.bsize||'m')==x[0]?'on':'')+'" data-bs="'+x[0]+'">'+x[1]+'</button>'}).join('')+'</div><div class="sec">Параметры</div><div class="grp">'+tgRow('📳','#ff9500','Вибрация','haptic')+tgRow('✨','#af52de','Анимация прокрутки','anim')+'</div><div class="grp" style="margin-top:18px"><button class="go" data-go="auto"><span class="ic" style="background:#ff9500">'+ei('💰')+'</span>Авто-продажа<small>'+(S.auto?'Вкл':'Выкл')+'</small><span class="ar" style="margin-left:8px">›</span></button></div><div class="grp" style="margin-top:18px">'+tgRow('🛡️','#34c759','Подтверждать продажу','confirm')+'</div><div class="grp" style="margin-top:18px"><button class="go" data-act="cloudsync"><span class="ic" style="background:#4f9bff">'+ei('☁️')+'</span>Облачное сохранение<small>'+cloudStatus()+'</small></button></div><div class="grp" style="margin-top:18px"><button class="go" data-act="news"><span class="ic" style="background:#5ac8fa">'+IC.news+'</span>Новости игры<span class="ar" style="margin-left:8px">›</span></button><button class="go" data-act="support"><span class="ic" style="background:#34c759">'+IC.chat+'</span>Техподдержка<span class="ar" style="margin-left:8px">›</span></button></div>'+'<div class="grp" style="margin-top:18px"><div class="go"><span class="ic" style="background:#8e8e93">'+IC.info+'</span>Версия игры<small>v'+APP_VER+'</small></div></div><div class="grp" style="margin-top:18px"><button class="go" data-act="resetme" style="color:#ff3b30"><span class="ic" style="background:#ff3b30">'+ei('🗑️')+'</span>Сбросить прогресс</button></div>'}
 a.innerHTML=h;a.className=NA?'':'noanim';NA=false;if(_k)window.scrollTo(0,_y);LS=scr;paintTabs();tgSync();if(scr=='spin')card(cur);if(scr=='home')paintHome();if(scr=='wallet'){countTo('wst',S.yuz,fS);countTo('wtn',S.ton||0,fT)}if(scr=='gifts'){countTo('gst',S.yuz,fS);countTo('gtn',S.ton||0,fT)}if(scr=='market'){countTo('mst',S.yuz,fS);countTo('mtn',S.ton||0,fT)}}
function card(r){var el=$('card');if(!el)return;
 if(!r){el.innerHTML='<div class="msg"><div class="mava">?</div><div class="bubble"><div class="bn">Username Bot</div><div class="bu">Жми «Ещё»</div></div></div>';return}
 var t=tier(r.tier),i=ti(r.tier);
 el.innerHTML='<div class="msg"><div class="mava">'+r.u.charAt(0).toUpperCase()+'</div><div class="bubble pop" id="bub" style="border-color:'+(i>=2?t.color:'transparent')+';box-shadow:'+(i>=3?'0 0 '+(10+i*6)+'px '+t.color:'none')+'"><div class="bn">Username Bot '+(i>=2?'✔️':'')+'</div><div class="bu">@'+r.u+'</div><span class="badge" style="background:'+t.color+'">'+t.icon+' '+t.name+'</span><div class="meta"><span>Шанс: 1 из '+fmt(r.odds)+'</span><span>+'+t.pts+' оч. · онлайн</span></div></div></div>'}
function copy(){if(!cur)return toast('Сначала покрути 🔄');var s='@'+cur.u;
 function fb(){var a=document.createElement('textarea');a.value=s;document.body.appendChild(a);a.select();try{document.execCommand('copy');toast('Скопировано '+s)}catch(e){toast(s)}document.body.removeChild(a)}
 try{navigator.clipboard.writeText(s).then(function(){toast('Скопировано '+s)},fb)}catch(e){fb()}}
function share(){var cur=shown();if(!cur)return toast('Сначала покрути 🔄');var t=tier(cur.tier),x='Мне выпал @'+cur.u+' — '+t.icon+' '+t.name+'! Сможешь лучше?';
 if(navigator.share){navigator.share({text:x}).catch(function(){})}else{try{navigator.clipboard.writeText(x);toast('Текст скопирован')}catch(e){toast(x)}}}
