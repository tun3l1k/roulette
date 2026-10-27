// Ежедневный вход (серия 7 дней) и награда за новый уровень
var LOGIN_R=[{s:200},{s:300,f:1},{s:500},{s:700,f:2},{s:1000},{s:1500,f:3},{s:3000,f:5,l:20}];
function dayNum(tz){var o=Math.max(-840,Math.min(840,Math.round(+tz)||0));return Math.floor((Date.now()-o*60000)/86400000)}
function loginInfo(tz){var lg=S.lg||{d:-9,n:0,at:0},t=dayNum(tz);
 return{done:lg.d==t,n:lg.d==t?lg.n:(lg.d==t-1?lg.n:0),next:(lg.d==t?lg.n:(lg.d==t-1?lg.n:0))+(lg.d==t?0:1),lost:lg.d<t-1&&lg.n>0}}
function claimLogin(tz){var t=dayNum(tz),lg=S.lg;
 if(lg&&(lg.d>=t||Date.now()-(lg.at||0)<20*3600e3))return{err:'done'};
 var n=lg&&lg.d==t-1?lg.n+1:1,r=LOGIN_R[(n-1)%LOGIN_R.length];
 S.yuz+=r.s;if(r.f)S.free=(S.free||0)+r.f;if(r.l)S.luck=(S.luck||0)+r.l;
 S.lg={d:t,n:n,at:Date.now(),t:((lg&&lg.t)||0)+1};led('Ежедневный вход');save();
 hap({type:'notification',notification_type:'success'});toast('День '+n+': +'+money(r.s)+(r.f?' и '+r.f+' прокр.':'')+(r.l?' · удача на '+r.l:''));draw();return{ok:1,n:n}}
function loginRewardText(r){return money(r.s)+(r.f?' · '+r.f+' прокр.':'')+(r.l?' · удача ×1,5':'')}
// Окно ежедневной награды: появляется само при входе в игру, пока награда за сегодня не получена
var DLYS=false;
function dailyBody(){var i=loginInfo(new Date().getTimezoneOffset()),cyc=LOGIN_R.length,cur=(i.next-1)%cyc,day=cur+1;
 var cells=LOGIN_R.map(function(r,k){var got=k<cur,now=k==cur;
  return '<div class="dc'+(got?' got':'')+(now?' now':'')+(k==cyc-1?' last':'')+'"><small>День '+(k+1)+'</small><b>'+(got?'✓':SI(18))+'</b><span>'+fmt(r.s)+'</span>'+(r.f?'<em>+'+r.f+' прокр.</em>':'')+(r.l?'<em>удача ×1,5</em>':'')+'</div>'}).join('');
 return '<div class="dhead"><div class="dico">'+IC.medal+'</div><h3>Ежедневная награда</h3><p>'+(i.lost?'Серия прервалась, начинаем заново.':i.n>0?'Серия: '+i.n+' '+(i.n==1?'день':i.n<5?'дня':'дней')+' подряд. Не пропускай!':'Заходи каждый день: награды растут до 7-го дня.')+'</p></div>'+
  '<div class="dgrid">'+cells+'</div><button class="pbtn" style="width:100%;margin-top:16px" data-dl="go">Забрать · '+loginRewardText(LOGIN_R[cur])+'</button><button class="plainbtn" data-dl="x">Позже</button>'}
function dailyPop(){if(document.querySelector('.ov.dly'))return;var o=document.createElement('div');o.className='ov dly';
 o.innerHTML='<div class="sh dsh">'+dailyBody()+'</div>';
 o.addEventListener('click',function(e){var b=e.target.closest('[data-dl]');if(!b&&e.target!==o)return;
  if(b&&b.getAttribute('data-dl')=='go'){b.disabled=true;Promise.resolve(claimLogin(new Date().getTimezoneOffset())).then(function(){o.remove()},function(){o.remove()})}else o.remove()});
 document.body.appendChild(o)}
function dailyAuto(){if(DLYS)return;DLYS=true;if(loginInfo(new Date().getTimezoneOffset()).done)return;setTimeout(dailyPop,500)}
function levelCheck(){var L=level();if(S.lvR===undefined){S.lvR=L;return}
 while(S.lvR<L&&S.lvR<500){S.lvR++;var st=50*S.lvR+50,fr=S.lvR%5==0?5:0;S.yuz+=st;if(fr)S.free=(S.free||0)+fr;led('Уровень '+S.lvR);toast('Уровень '+S.lvR+'! +'+money(st)+(fr?' и '+fr+' прокруток':''))}}
// Сделки между игроками: деньги уходят в залог на сервере (p2pPay), возвращаются через p2pRefund или входящие «cash»
function p2pPay(a,slot,cc){a=Math.round(+a);if(!(a>0)||a>1e10)return{err:'arg'};if(slot=='gift'?gfFull():(slot&&collFull()))return{err:'full'};
 if(cc=='ton'){if((S.ton||0)<a/1000-1e-9)return{err:'poor'};S.ton=r3((S.ton||0)-a/1000)}else{if(S.yuz<a)return{err:'poor'};S.yuz-=a}led('Сделка с игроком');save();return{ok:1}}
function p2pRefund(a,cc){a=Math.round(+a);if(a>0&&a<1e10){if(cc=='ton')S.ton=r3((S.ton||0)+a/1000);else S.yuz+=a;led('Возврат по сделке');save()}return{ok:1}}
