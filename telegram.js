// Связь с Telegram: ник, фото, вибрация, события Mini App
var TG=null;
try{var _W=window.Telegram&&window.Telegram.WebApp;if(_W&&_W.initDataUnsafe&&_W.initDataUnsafe.user)TG=_W.initDataUnsafe.user}catch(e){}
if(!TG)try{var _q=new URLSearchParams(location.hash.slice(1)).get('tgWebAppData')||new URLSearchParams(location.search).get('tgWebAppData');if(_q)TG=JSON.parse(new URLSearchParams(_q).get('user'))}catch(e){}
if(!TG)try{var _ip=JSON.parse(sessionStorage.getItem('__telegram__initParams')||'null');if(_ip&&_ip.tgWebAppData)TG=JSON.parse(new URLSearchParams(_ip.tgWebAppData).get('user'))}catch(e){}
function hap(d){if(S.haptic===false)return;
 try{if(window.TelegramWebviewProxy&&window.TelegramWebviewProxy.postEvent){window.TelegramWebviewProxy.postEvent('web_app_trigger_haptic_feedback',JSON.stringify(d));return}}catch(e){}
 try{if(window.parent!==window)window.parent.postMessage(JSON.stringify({eventType:'web_app_trigger_haptic_feedback',eventData:d}),'*')}catch(e){}
 try{if(navigator.vibrate)navigator.vibrate(d.type=='selection_change'?8:d.type=='notification'?[60,40,60]:d.impact_style=='heavy'?80:30)}catch(e){}}
function buzzEnd(r){var i=ti(r.tier);if(i>=5)hap({type:'notification',notification_type:'success'});else if(i>=3)hap({type:'impact',impact_style:'heavy'});else if(i>=2)hap({type:'impact',impact_style:'medium'});else hap({type:'impact',impact_style:'light'})}
function photoTag(){var p=TG&&TG.photo_url;if(!p||String(p).indexOf('https://')!=0)return'';return '<img class="pimg" src="'+String(p).replace(/"/g,'')+'" alt="" referrerpolicy="no-referrer" onerror="this.remove()">'}
function ownHandle(){return TG&&TG.username?'@'+TG.username:(TG&&TG.first_name?esc(TG.first_name):'@твой_ник')}
function ownInitial(){return TG&&TG.first_name?esc(TG.first_name.charAt(0).toUpperCase()):'👤'}
function tgPost(ev,d){try{if(window.TelegramWebviewProxy&&window.TelegramWebviewProxy.postEvent){window.TelegramWebviewProxy.postEvent(ev,JSON.stringify(d||{}));return}}catch(e){}try{if(window.parent!==window)window.parent.postMessage(JSON.stringify({eventType:ev,eventData:d||{}}),'*')}catch(e){}}
