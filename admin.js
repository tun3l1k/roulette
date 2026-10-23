// Админ-меню (скрыто за паролем; защита только от случайного входа, не настоящая безопасность)
var ADM=false,ADM_FAIL=0,ADM_LOCK=0,ADM_H=-1989635603;
function hh(s){var h=5381;for(var i=0;i<s.length;i++)h=((h<<5)+h+s.charCodeAt(i))|0;return h}
function askPass(){if(ADM){go('admin');return}
 if(Date.now()<ADM_LOCK){toast('Слишком много попыток. Подожди минуту');return}
 var o=document.createElement('div');o.className='ov';
 o.innerHTML='<div class="sh"><p>Админ-меню<br><span style="font-size:14px;color:var(--sub);font-weight:400">Введи пароль</span></p><input id="admp" class="inp" type="password" inputmode="numeric" autocomplete="off" maxlength="12" placeholder="Пароль" style="text-align:center;letter-spacing:6px"><div class="row2" style="margin-top:14px"><button class="act" data-x="0">Отмена</button><button class="pbtn" style="flex:1" data-x="1">Войти</button></div></div>';
 o.addEventListener('click',function(e){var b=e.target.closest('[data-x]');if(b||e.target===o){var i=document.getElementById('admp'),v=i?i.value:'',ok=b&&b.getAttribute('data-x')=='1';o.remove();if(ok)admTry(v)}});
 document.body.appendChild(o);setTimeout(function(){var i=document.getElementById('admp');if(i)i.focus()},60)}
function admTry(v){if(hh(String(v).trim()+'rl')===ADM_H){ADM=true;ADM_FAIL=0;go('admin')}else{ADM_FAIL++;if(ADM_FAIL>=5){ADM_LOCK=Date.now()+60000;ADM_FAIL=0}toast('Неверный пароль')}}
function admGrant(s){var p=s.split(':'),v=parseFloat(p[1]);if(!ADM||!(v>0)||v>1e12)return;
 if(p[0]=='ton')S.ton=r3((S.ton||0)+v);else S.yuz+=Math.round(v);
 led('Админ: выдача');save();hap({type:'notification',notification_type:'success'});toast('Выдано +'+(p[0]=='ton'?tonF(v)+' TON':money(Math.round(v))));draw()}
function admCustom(c){var i=document.getElementById('admn');admGrant(c+':'+(i?i.value:'0'))}
function adminHtml(){if(!ADM)return '<div class="empty">Нет доступа</div>';
 var gv=function(l,v){return '<button class="act" data-adm="'+v+'">'+l+'</button>'};
 return '<div class="stats3" style="grid-template-columns:1fr 1fr;margin-top:4px"><div class="stat"><small>Звёзды</small><b>'+money(S.yuz)+'</b></div><div class="stat"><small>TON</small><b>'+tonF(S.ton||0)+'</b></div></div>'+
  '<div class="sec">Выдача звёзд</div><div class="row2">'+gv('+1 000','star:1000')+gv('+10 000','star:10000')+gv('+100 000','star:100000')+'</div>'+
  '<div class="sec">Выдача TON</div><div class="row2">'+gv('+0,1','ton:0.1')+gv('+0,5','ton:0.5')+gv('+5','ton:5')+'</div>'+
  '<div class="sec">Своя сумма</div><input id="admn" class="inp" type="number" inputmode="decimal" placeholder="Сумма"><div class="row2" style="margin-top:10px"><button class="act" data-act="admgs">Выдать ⭐</button><button class="act" data-act="admgt">Выдать TON</button></div>'+
  maintHtml()+'<div class="sec">Диагностика Telegram</div><div class="grp">'+[['Запуск из Telegram',TG?'да':'нет'],['ID пользователя',TG&&TG.id?TG.id:'не передан'],['Имя пользователя',TG&&TG.username?'@'+esc(TG.username):'не передано'],['Фото профиля',TG&&TG.photo_url?'есть':'не передано'],['Облако',cloudStatus()]].map(function(x){return '<div class="go"><span>'+x[0]+'</span><small>'+x[1]+'</small></div>'}).join('')+'</div>'+
  '<div class="sec">Опасная зона</div><div class="grp"><button class="go" data-act="reset" style="color:#ff3b30">Сбросить мой прогресс</button></div>'+
  '<button class="pbtn gray" style="width:100%;margin-top:18px" data-act="admout">Выйти из админ-меню</button>'}
