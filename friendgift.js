// «Подарок другу»: отправка ника другому игроку по username (передача идёт через сервер)
var FG={k:'nick',id:null},FGTO='';
function fgiftHtml(){var items=S.coll.slice().sort(function(a,b){return worth(b)-worth(a)}).slice(0,60);
 var list=items.length?'<div class="grp">'+items.map(function(x){var sel=FG.k!='gift'&&FG.id==x.u;
  return '<button class="go'+(sel?' sel':'')+'" data-fgi="'+x.u+'"><span class="rdt" style="background:'+tier(x.tier).color+'"></span><b>@'+x.u+'</b><small>'+(sel?'выбран':money(worth(x)))+'</small></button>'}).join('')+'</div>':'<div class="empty">В коллекции пока пусто</div>';
 var gl=(S.gf||[]).length?'<div class="sec">Подарки</div><div class="grp">'+S.gf.map(function(x){var g=gInfo(x.g);if(!g)return '';var sel=FG.k=='gift'&&FG.id==x.n;return '<button class="go'+(sel?' sel':'')+'" data-fgg="'+esc(x.n)+'"><img class="gth" src="gift/'+esc(x.g)+'.webp" alt=""><b>'+esc(g.name)+'</b><small>'+(sel?'выбран':tonF(g.ton)+' TON')+'</small></button>'}).join('')+'</div>':'';
 return '<div class="sec">Какой ник подарить</div>'+list+gl+'<div class="sec">Кому (username в Telegram)</div><input id="fgto" class="inp" placeholder="@username друга" value="'+esc(FGTO)+'" maxlength="33" autocapitalize="off" autocomplete="off" spellcheck="false"><button class="pbtn" style="width:100%;margin-top:14px" data-act="fgsend">Подарить</button><div class="foot">Ник придёт другу сразу. Друг должен уже играть в игру, а если его ещё нет, отправь ему приглашение.</div><button class="plainbtn" data-act="refshare">Пригласить друга</button>'}
function sendErr(e){return e=='no_friend'?'Друг ещё не играл. Отправь ему приглашение':e=='item'?'Предмет не найден':e=='self'?'Нельзя подарить самому себе':e=='name'?'Проверь username друга':e=='maint'?'Сейчас технический перерыв':'Не удалось отправить, попробуй ещё раз'}
function giftFriend(){if(!FG.id){toast('Выбери ник или подарок');return}var to=FGTO;
 if(!/^[a-z0-9_]{5,32}$/.test(to)){toast('Введи username друга: от 5 символов, буквы, цифры, _');return}
 if(TG&&TG.username&&TG.username.toLowerCase()==to){toast('Нельзя подарить самому себе');return}
 if(!SRV()){toast('Подарок другу работает внутри Telegram');return}
 srvPost('/api/send',{initData:cInit(),kind:FG.k,id:FG.id,to:to,prefs:prefsOut()}).then(function(r){
  if(r&&r.ok){srvApply(r);(r.msgs||[]).forEach(function(m){toast(m)});FG.id=null;FG.k='nick';FGTO='';hap({type:'notification',notification_type:'success'});back()}
  else toast(sendErr(r&&r.err))}).catch(function(){toast('Нет связи с сервером')})}

// Быстрая отправка ника другу прямо из карточки ника (без перехода на другой экран)
function sendSheet(kind,id,label){if(!SRV()){toast('Отправка другу работает внутри Telegram');return}
 var o=document.createElement('div');o.className='ov';
 o.innerHTML='<div class="sh" style="text-align:left"><div class="sec" style="margin-top:0">Отправить '+esc(label)+' другу</div><input id="sdto" class="inp" placeholder="@username друга" maxlength="33" autocapitalize="off" autocomplete="off" spellcheck="false" value="'+esc(FGTO)+'"><button class="pbtn" style="width:100%;margin-top:12px" data-sd="go">Отправить</button><div class="foot" style="margin:10px 0 0">Друг должен уже играть. Если его нет в игре, отправь ему приглашение.</div><button class="plainbtn" data-sd="inv" style="margin-top:0">Пригласить друга</button><button class="plainbtn" data-sd="x" style="margin-top:0">Отмена</button></div>';
 var busyS=false;
 o.addEventListener('click',function(e){var b=e.target.closest('[data-sd]');if(!b&&e.target!==o)return;var v=b?b.getAttribute('data-sd'):'x';
  if(v=='x'){o.remove();return}if(v=='inv'){refShare();return}
  var to=String(document.getElementById('sdto').value||'').replace(/^@/,'').trim().toLowerCase();
  if(!/^[a-z0-9_]{5,32}$/.test(to)){toast('Введи username друга: от 5 символов, буквы, цифры, _');return}
  if(TG&&TG.username&&TG.username.toLowerCase()==to){toast('Нельзя отправить самому себе');return}
  if(busyS)return;busyS=true;
  srvPost('/api/send',{initData:cInit(),kind:kind,id:id,to:to,prefs:prefsOut()}).then(function(r){busyS=false;
   if(r&&r.ok){srvApply(r);(r.msgs||[]).forEach(function(m){toast(m)});FGTO='';o.remove();hap({type:'notification',notification_type:'success'});if(scr=='home')paintHome();draw()}
   else toast(sendErr(r&&r.err))}).catch(function(){busyS=false;toast('Нет связи с сервером')})});
 document.body.appendChild(o);setTimeout(function(){var i=document.getElementById('sdto');if(i&&!i.value)i.focus()},80)}
