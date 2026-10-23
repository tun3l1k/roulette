// Технический перерыв: флаг хранится на сервере, игроки видят заставку, админ включает из админ-меню
var MT={on:false,msg:'',admin:false,cfg:false,eng:false,ok:false};
function maintShow(){var el=document.getElementById('maint');
 if(MT.on&&!MT.admin){if(!el){el=document.createElement('div');el.id='maint';el.className='maint';document.body.appendChild(el)}
  el.innerHTML='<div class="mti">'+IC.tools+'</div><h2>Технический перерыв</h2><p>'+esc(MT.msg||'Мы готовим обновление. Скоро вернёмся!')+'</p><button class="pbtn" data-act="maintretry">Проверить снова</button><button class="pbtn gray" style="margin-top:10px" data-act="news">'+IC.news+' Новости в группе</button>'}
 else if(el)el.remove()}
function maintCheck(){if(!cloudOn())return;
 cpost('/api/status',{initData:cInit()}).then(function(r){if(!r||!r.ok)return;MT.ok=true;MT.admin=!!r.admin;MT.cfg=!!r.cfg;MT.eng=!!r.eng;MT.on=!!r.maint;MT.msg=r.msg||'';if(r.gc){try{applyGameCfg(r.gc);if(scr=='home')paintHome();else if(!typing())draw()}catch(e){}}maintShow();if(scr=='admin'||scr=='settings')draw()}).catch(function(){})}
function maintSet(on,msg){cpost('/api/maint',{initData:cInit(),on:on,msg:msg||''}).then(function(r){
 if(r&&r.ok){MT.on=!!r.maint;MT.msg=r.msg||'';toast(on?'Игра закрыта на технический перерыв':'Игра снова открыта');draw()}
 else toast(r&&r.err=='forbidden'?'Нет прав: добавь свой ID в ADMIN_IDS воркера':'Не удалось, попробуй ещё раз')}).catch(function(){toast('Нет связи с сервером')})}
function maintHtml(){var id=TG&&TG.id?TG.id:'не передан';
 return '<div class="sec">Технический перерыв</div><div class="grp"><div class="go"><span>Статус</span><small style="color:'+(MT.on?'#ff6a5f':'#34c759')+'">'+(MT.on?'закрыто для игроков':'игра открыта')+'</small></div></div>'+
  (MT.admin?'<input id="admmsg" class="inp" style="margin-top:10px" placeholder="Сообщение игрокам (необязательно)" maxlength="140" value="'+esc(MT.msg||'')+'"><button class="pbtn" style="width:100%;margin-top:10px" data-act="maint">'+(MT.on?'Открыть игру':'Закрыть игру на перерыв')+'</button><div class="foot" style="margin-top:6px">Игроки увидят заставку, ты (админ) продолжаешь играть как обычно.</div>'
   :'<div class="foot" style="margin-top:8px">Чтобы управлять перерывом, добавь свой Telegram ID в переменную <b>ADMIN_IDS</b> воркера. Твой ID: <b>'+id+'</b></div>')}
