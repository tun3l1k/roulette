// Облачное сохранение: прогресс хранится на сервере (Cloudflare D1), вход по подписи Telegram
var API='https://roulette-bot-2.tunlstandoff.workers.dev',CL={t:null,at:0,ok:null,msg:'',busy:false,loaded:false,loading:false};
function cInit(){var w=window.Telegram&&window.Telegram.WebApp;if(w&&w.initData)return w.initData;
 try{var q=new URLSearchParams(location.hash.slice(1)).get('tgWebAppData');if(q)return q}catch(e){}
 try{var ip=JSON.parse(sessionStorage.getItem('__telegram__initParams')||'null');if(ip&&ip.tgWebAppData)return ip.tgWebAppData}catch(e){}
 return ''}
function cloudOn(){return !!cInit()}
function cpost(path,body,keep){var b=JSON.stringify(body);return fetch(API+path,{method:'POST',headers:{'content-type':'application/json'},body:b,keepalive:!!keep&&b.length<60000}).then(function(r){return r.json().catch(function(){return{ok:false,err:'bad'}})})}
function cdone(){if(scr=='settings'||scr=='admin')draw()}
function cerr(e){return e=='no_db'?'сервер не настроен':e=='auth'?'нет подписи Telegram':e||'ошибка'}
function cloudSoon(){if(!cloudOn())return;if(!CL.loaded){if(!CL.loading)cloudLoad();return}clearTimeout(CL.t);CL.t=setTimeout(function(){cloudPush()},Math.max(4000,15000-(Date.now()-CL.at)))}
function cloudPush(keep){if(!cloudOn()||!CL.loaded||(CL.busy&&!keep))return;clearTimeout(CL.t);CL.busy=true;
 cpost('/api/save',{initData:cInit(),state:S},keep).then(function(r){CL.busy=false;
  if(r.ok){CL.at=Date.now();CL.ok=true;CL.msg=''}
  else if(r.err=='newer'){CL.ok=false;CL.msg='на сервере новее';cloudLoad(true)}
  else{CL.ok=false;CL.msg=cerr(r.err)}cdone()}).catch(function(){CL.busy=false;CL.ok=false;CL.msg='нет сети';cdone()})}
function cloudLoad(force){if(!cloudOn()||CL.loading)return;CL.loading=true;
 cpost('/api/load',{initData:cInit()}).then(function(r){
  CL.loading=false;
  if(!r.ok){CL.ok=false;CL.msg=cerr(r.err);cdone();return}
  CL.loaded=true;var st=r.state,fr=FRESH;FRESH=false;
  if(st&&(force||fr||(st.sv||0)>(S.sv||0))){S=st;S.coll=S.coll||[];S.hist=S.hist||[];S.rare=S.rare||[];S.lots=S.lots||[];S.gifts=S.gifts||[];
   try{localStorage.setItem('ur3',JSON.stringify(S))}catch(e){}
   CL.at=Date.now();CL.ok=true;CL.msg='';theme();applySize();giftMigrate();draw();toast('☁️ Прогресс загружен с сервера')}
  else{CL.ok=true;CL.msg='';if(!st||(S.sv||0)>(st.sv||0))cloudPush();else CL.at=Date.now();cdone()}
 }).catch(function(){CL.loading=false;CL.ok=false;CL.msg='нет сети';cdone()})}
function cloudStatus(){if(!cloudOn())return 'только в Telegram';if(CL.ok===null)return 'подключение…';if(!CL.ok)return 'ошибка: '+CL.msg;return CL.at?'сохранено '+hhmm(CL.at):'готово'}
