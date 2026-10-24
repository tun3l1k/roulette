// Связь с сервером: в Telegram все расчёты экономики выполняет сервер, телефон только показывает результат
var SQ=Promise.resolve();
var ACTW=['keepPending','sellPending','sellOne','sellBulk','claimTask','claimChest','buyLuck','exchangeTon','bid','buyLot','cancelLot','acceptOffer','rejectOffer','listLot','autoResolve','admGrant','tickNow','resetAll','craftRoll','claimLogin'];
var POSTH={};
function SRV(){return !!(typeof MT!='undefined'&&MT.eng)&&typeof cloudOn=='function'&&cloudOn()&&CL.loaded}
function prefsOut(){var o={};PREFK.forEach(function(k){if(S[k]!==undefined)o[k]=S[k]});return o}
function srvApply(r){var p=r.patch||{};Object.keys(p).forEach(function(k){S[k]=p[k]});(r.del||[]).forEach(function(k){delete S[k]});try{localStorage.setItem('ur3',JSON.stringify(S))}catch(e){}}
function srvPost(path,body){var p=SQ.then(function(){return cpost(path,body)});SQ=p.catch(function(){});return p}
function typing(){var a=document.activeElement;return !!(a&&/^(msq|csq|lto|fgto|admn|admmsg|admp)$/.test(a.id||''))}
function refreshAfter(r){if(Object.keys(r.patch||{}).length||(r.msgs||[]).length){if(scr=='home')paintHome();if(!typing())draw()}}
function srvRun(fn,args,opt){opt=opt||{};
 return srvPost('/api/act',{initData:cInit(),fn:fn,args:args||[],prefs:prefsOut()}).then(function(r){
  if(!r||!r.ok){if(r&&r.err=='maint'){MT.on=true;MT.admin=false;maintShow()}else if(r&&r.err=='banned')toast('Аккаунт заблокирован');else if(!opt.raw)toast('Нет связи с сервером');return{err:(r&&r.err)||'net'}}
  srvApply(r);
  if(!opt.raw){(r.msgs||[]).forEach(function(m){toast(m)});if(POSTH[fn])POSTH[fn]();refreshAfter(r)}
  return{res:r.res,msgs:r.msgs||[]}}).catch(function(){if(!opt.raw)toast('Нет связи с сервером');return{err:'net'}})}
function wrapActions(){ACTW.forEach(function(n){var o=window[n];if(typeof o!='function')return;window[n]=function(){var a=[].slice.call(arguments);if(!SRV())return o.apply(this,a);return srvRun(n,a)}})}
