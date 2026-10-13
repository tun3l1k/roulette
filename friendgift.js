// «Подарок другу»: отправка ников и подарков другому игроку по username (передача идёт через сервер)
var FG={k:'nick',id:null},FGTO='';
function fgiftHtml(){var nk=FG.k=='nick',items=nk?S.coll.slice().sort(function(a,b){return worth(b)-worth(a)}).slice(0,60):(S.gifts||[]);
 var tabs='<div class="seg"><button class="'+(nk?'on':'')+'" data-fgk="nick">Ники · '+S.coll.length+'</button><button class="'+(nk?'':'on')+'" data-fgk="gift">Подарки · '+(S.gifts||[]).length+'</button></div>';
 var list=items.length?'<div class="grp">'+items.map(function(x){var id=nk?x.u:x.id,sel=FG.id==id;
  return '<button class="go'+(sel?' sel':'')+'" data-fgi="'+id+'">'+(nk?'<span class="rdt" style="background:'+tier(x.tier).color+'"></span><b>@'+id+'</b>':'<span class="gmini" style="background:linear-gradient(145deg,#3a4a68,#1f2a40)">'+GT(x.type).e+'</span><b>'+esc(gname(x))+'</b>')+'<small>'+(sel?'выбран':money(nk?worth(x):giftWorth(x)))+'</small></button>'}).join('')+'</div>':'<div class="empty">Здесь пока пусто</div>';
 return tabs+'<div class="sec">Что подарить</div>'+list+'<div class="sec">Кому (username в Telegram)</div><input id="fgto" class="inp" placeholder="@username друга" value="'+esc(FGTO)+'" maxlength="33" autocapitalize="off" autocomplete="off" spellcheck="false"><button class="pbtn" style="width:100%;margin-top:14px" data-act="fgsend">Подарить</button><div class="foot">Подарок придёт другу сразу. Друг должен уже играть в игру, а если его ещё нет, отправь ему приглашение.</div><button class="plainbtn" data-act="refshare">Пригласить друга</button>'}
function sendErr(e){return e=='no_friend'?'Друг ещё не играл. Отправь ему приглашение':e=='item'?'Предмет не найден':e=='self'?'Нельзя подарить самому себе':e=='name'?'Проверь username друга':e=='maint'?'Сейчас технический перерыв':'Не удалось отправить, попробуй ещё раз'}
function giftFriend(){if(!FG.id){toast('Выбери, что подарить');return}var to=FGTO;
 if(!/^[a-z0-9_]{5,32}$/.test(to)){toast('Введи username друга: от 5 символов, буквы, цифры, _');return}
 if(TG&&TG.username&&TG.username.toLowerCase()==to){toast('Нельзя подарить самому себе');return}
 if(!SRV()){toast('Подарки друзьям работают внутри Telegram');return}
 srvPost('/api/send',{initData:cInit(),kind:FG.k,id:FG.id,to:to,prefs:prefsOut()}).then(function(r){
  if(r&&r.ok){srvApply(r);(r.msgs||[]).forEach(function(m){toast(m)});FG.id=null;FGTO='';hap({type:'notification',notification_type:'success'});back()}
  else toast(sendErr(r&&r.err))}).catch(function(){toast('Нет связи с сервером')})}
