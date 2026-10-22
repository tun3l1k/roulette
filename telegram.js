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
// Оформление под Telegram: цвет шапки, нативная кнопка «Назад»
var TW=(window.Telegram&&window.Telegram.WebApp)||null,TGBB=false;
function tgPaint(){try{
 var p=TW.themeParams||{};
 document.documentElement.classList.toggle('tgdark',TW.colorScheme=='dark');
 TW.setHeaderColor('secondary_bg_color');TW.setBackgroundColor('secondary_bg_color');
 if(TW.isVersionAtLeast('7.10')&&(p.section_bg_color||p.bg_color))TW.setBottomBarColor(p.section_bg_color||p.bg_color)}catch(e){}}
(function(){try{
 if(!TW||!TW.isVersionAtLeast||!TW.isVersionAtLeast('6.1'))return;
 TW.ready();TW.expand();tgPaint();
 if(TW.onEvent)TW.onEvent('themeChanged',tgPaint);
 if(TW.BackButton){TGBB=true;document.documentElement.classList.add('tgback');TW.BackButton.onClick(function(){if(typeof back=='function')back()})}
}catch(e){}})();
// Кнопка «Назад» Telegram видна только на вложенных экранах
function tgSync(){try{if(!TGBB)return;if(STK.length>1)TW.BackButton.show();else TW.BackButton.hide()}catch(e){}}
function photoTag(){var p=TG&&TG.photo_url;if(!p||String(p).indexOf('https://')!=0)return'';return '<img class="pimg" src="'+String(p).replace(/"/g,'')+'" alt="" referrerpolicy="no-referrer" onerror="this.remove()">'}
function ownHandle(){return TG&&TG.username?'@'+TG.username:(TG&&TG.first_name?esc(TG.first_name):'@твой_ник')}
function ownInitial(){return TG&&TG.first_name?esc(TG.first_name.charAt(0).toUpperCase()):'👤'}
function tgPost(ev,d){try{if(window.TelegramWebviewProxy&&window.TelegramWebviewProxy.postEvent){window.TelegramWebviewProxy.postEvent(ev,JSON.stringify(d||{}));return}}catch(e){}try{if(window.parent!==window)window.parent.postMessage(JSON.stringify({eventType:ev,eventData:d||{}}),'*')}catch(e){}}
