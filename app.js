// Запуск: обработчики нажатий и инициализация
if(!S.g1){S.g1=1;S.yuz=(S.yuz||0)+10000;save()}
if(!S.g2){S.g2=1;S.ton=r3((S.ton||0)+0.5);save()}
if(!S.g3){S.g3=1;S.xp=Math.round((S.spins||0)*4.6);S.pity=0;save()}
document.addEventListener('click',function(e){
 var el=e.target.closest('[data-go],[data-act],[data-pick],[data-sell],[data-theme],[data-tg],[data-mt],[data-bid],[data-lp],[data-lpp],[data-ld],[data-cur],[data-tu],[data-am],[data-hf],[data-cf],[data-cs],[data-claim],[data-tk],[data-pt],[data-lc],[data-xch],[data-tt],[data-pc],[data-buy],[data-cancel],[data-oacc],[data-orej],[data-lm],[data-bs],[data-bp],[data-fgi],[data-fgg],[data-soon],[data-lot],[data-ct],[data-cp],[data-nick],[data-rc],[data-ta],[data-ca],[data-ru-0],[data-ru-1],[data-ru-2],[data-ru-3],[data-ru-4],[data-ru-5],[data-ru-6],[data-adm],[data-mf],[data-ms],[data-ap],[data-ac],[data-at],[data-ar],[data-al]');if(!el)return;
 var d=el.dataset;
 if(d.go){go(d.go);}
 else if(d.pick){S.main=d.pick;S.pinned=true;save();toast('Основной: @'+d.pick);hap({type:'selection_change'});draw()}
 else if(d.sell){var c=S.coll.filter(function(x){return x.u==d.sell})[0];if(c){if(ti(c.tier)>=3&&S.confirm!==false)ask('Продать @'+c.u+' за '+money(worth(c))+'?','Продать',function(){sellOne(c.u)});else sellOne(c.u)}}
 else if(d.cur){S.cur=d.cur;save();draw()}
  else if(d.bs){S.bsize=d.bs;save();applySize();draw()}
 else if(d.bp){buyPack(d.bp)}
 else if(d.fgi){FG.k='nick';FG.id=d.fgi;draw()}
 else if(d.fgg){FG.k='gift';FG.id=d.fgg;draw()}
 else if(d.soon){SOONT=d.soon;go('soon')}
 else if(d.nick){nickSheet(d.nick)}
 else if(d.ct!==undefined){CF.t=+d.ct;CF.sel=[];draw()}
 else if(d.cp){var ix=CF.sel.indexOf(d.cp);if(ix>=0)CF.sel.splice(ix,1);else if(CF.sel.length<3)CF.sel.push(d.cp);else toast('Уже выбрано 3 ника');hap({type:'selection_change'});draw()}
 else if(d.rc){S.rc=d.rc;save();draw()}
 else if(d.adm){admGrant(d.adm)}
 else if(d.ap!==undefined){applyPreset(+d.ap);draw()}
 else if(d.ta){S.autoTagAct=d.ta;save();draw()}
 else if(d.ca){S.autoCapAct=d.ca;save();draw()}
 else if(d.ac!==undefined){S.autoCap=+d.ac;save();draw()}
 else if(d.at!==undefined){var kk=keepTags().slice(),ik=kk.indexOf(d.at);if(ik>=0)kk.splice(ik,1);else kk.push(d.at);S.autoTags=kk;save();draw()}
 else if(d.ar!==undefined){S.asMin=+d.ar;save();draw()}
 else if(d.al!==undefined){S.asLimit=+d.al;save();draw()}
 else if(d.mt){S.mt=d.mt;save();draw()}
 else if(d.xch){exchangeTon(d.xch)}
 else if(d.claim){claimTask(d.claim)}
 else if(d.tk){S.tt=d.tk;save();draw()}
 else if(d.pt!==undefined){PT=+d.pt;draw()}
 else if(el.getAttribute('data-ru-0')!==null||(function(){for(var i=0;i<7;i++)if(el.hasAttribute('data-ru-'+i))return true;return false})()){for(var ri2=0;ri2<7;ri2++){if(el.hasAttribute('data-ru-'+ri2)){var rr2=autoRules().slice();rr2[ri2]=el.getAttribute('data-ru-'+ri2);S.arules=rr2;save();draw()}}}
 else if(d.pc!==undefined){S.cf=+d.pc;save();go('coll')}
 else if(d.cf!==undefined){S.cf=+d.cf;save();draw()}
 else if(d.cs!==undefined){S.cs=d.cs;save();draw()}
 else if(d.hf!==undefined){S.hf=+d.hf;save();draw()}
 else if(d.am!==undefined){S.autoMax=+d.am;save();draw()}
 else if(d.tg){if(d.tg=='auto'||d.tg=='autoNotify')S[d.tg]=!S[d.tg];else S[d.tg]=(S[d.tg]===false);save();if(d.tg=='haptic')hap({type:'impact',impact_style:'medium'});draw()}
 else if(d.theme){S.theme=d.theme;save();theme();draw()}
 else switch(d.act){
  case 'spin':if(busy){skipNow();break}if(AS)break;spin();break;
  case 'auto':toggleAuto();break;
  case 'wheel':spinWheel();break;
  case 'buyprem':buyPrem();break;
  case 'admin':askPass();break;
  case 'fgsend':giftFriend();break;
  case 'sharecur':shareNick(S.pending);break;
  case 'sharebest':shareNick(S.best);break;
  case 'news':openTg(NEWS_URL);break;
  case 'support':openTg(SUPPORT_URL);break;
  case 'pmult':S.pm=!S.pm;save();draw();break;
  case 'maint':var mi2=document.getElementById('admmsg');maintSet(!MT.on,mi2?mi2.value:'');break;
  case 'maintretry':maintCheck();toast('Проверяем…');break;
  case 'refcopy':refCopy();break;
  case 'refshare':refShare();break;
  case 'cloudsync':if(!cloudOn())toast('Облако работает внутри Telegram');else{toast('☁️ Синхронизация…');cloudLoad()}break;
  case 'admgs':admCustom('star');break;
  case 'admgt':admCustom('ton');break;
  case 'admout':ADM=false;go('settings');break;
  case 'buywr':buyWheelReset();break;case 'copy':copy();break;case 'share':share();break;
  case 'qr':toast('QR-код — скоро');break;case 'edit':go('coll');break;
  case 'setmain':if(cur){S.main=cur.u;S.pinned=true;save();toast('Основной: @'+cur.u)}else toast('Сначала покрути 🔄');break;
  case 'sellcur':if(!S.pending){toast('Сначала покрути 🔄');break}if(ti(S.pending.tier)>=3&&S.confirm!==false)ask('Продать @'+S.pending.u+' за '+money(worth(S.pending))+'?','Продать',sellPending);else sellPending();break;
  case 'keep':if(!S.pending){toast('Сначала покрути');break}keepPending();break;
  case 'haptic':S.haptic=(S.haptic===false);save();hap({type:'impact',impact_style:'medium'});draw();break;
  case 'craftgo':craftGo();break;
  case 'claimlogin':claimLogin(new Date().getTimezoneOffset());break;
  case 'bulk':var bl=bulkList();if(!bl.length)break;var tot=bl.reduce(function(a,c){return a+worth(c)},0);if(S.confirm!==false)ask('Продать '+bl.length+' шт. за '+money(tot)+'?','Продать',sellBulk);else sellBulk();break;
  case 'chest':claimChest();break;
  case 'xch':var xe=document.getElementById('xch');if(xe&&xe.scrollIntoView)xe.scrollIntoView({behavior:'smooth',block:'center'});break;
  case 'luck':buyLuck();break;
  case 'resetme':ask('Сбросить весь прогресс? Ники, звёзды, уровень и подарки пропадут, начнёшь с нуля. Это нельзя отменить.','Сбросить',function(){Promise.resolve(resetMe()).then(function(r){var e=r&&(r.err||(r.res&&r.res.err));if(e)toast('Не удалось сбросить');else{toast('Прогресс сброшен');go('home')}})});break;
  case 'reset':ask('Сбросить весь прогресс?','Сбросить',function(){Promise.resolve(resetAll()).then(function(r){var e=r&&(r.err||(r.res&&r.res.err));if(e)toast('Сброс доступен только администратору');else go('home')})});break}
});
tgPost('web_app_ready');tgPost('web_app_expand');tgPost('web_app_setup_swipe_behavior',{allow_vertical_swipe:false});
S.since=S.since||Date.now();S.rare=S.rare||S.hist.filter(function(c){return ti(c.tier)>=2});if(!S.best){var _b=null;(S.coll||[]).concat(S.rare||[],S.hist||[]).forEach(function(c){if(!_b||worth(c)>worth(_b))_b=c});if(_b){noteBest(_b);save()}}
if(S.autoKeep===false&&!S.autoTags)S.autoTags=[];
if(!S.bl)S.bl={y:S.yuz,t:S.ton||0};
wrapActions();theme();applySize();draw();auTick();setInterval(function(){if(SRV())tickTimers();else auTick()},1000);var n8=0;setInterval(function(){if(!SRV())return;n8++;if(scr=='market'||n8%8==0)srvRun('tickNow',[])},8000);cloudLoad();maintCheck();setInterval(maintCheck,60000);
document.addEventListener('input',function(e){if(e.target&&e.target.id=='fgto')FGTO=e.target.value.replace(/^@/,'').toLowerCase().replace(/[^a-z0-9_]/g,'');if(e.target&&e.target.id=='lto')LTO=e.target.value.replace(/^@/,'').toLowerCase().replace(/[^a-z0-9_]/g,'')});
document.addEventListener('gesturestart',function(e){e.preventDefault()});
document.addEventListener('visibilitychange',function(){if(document.hidden)cloudPush(true)});
document.addEventListener('input',function(e){var id=e.target&&e.target.id;
 
 if(id=='csq'){S.cq=e.target.value.toLowerCase().replace(/[^a-z0-9_]/g,'');var cl=document.getElementById('clist');if(cl)cl.innerHTML=collList()}});
