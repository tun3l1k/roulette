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
function dailyHtml(){var tz=new Date().getTimezoneOffset(),i=loginInfo(tz),cyc=LOGIN_R.length,cur=i.done?((i.n-1)%cyc):(i.next-1)%cyc;
 var head='<div class="refc"><div class="refh">Серия входов: '+(i.done?i.n:i.n)+' '+(i.n==1?'день':'дней')+'</div><div class="refp">'+(i.done?'Награда за сегодня получена. Возвращайся завтра, серия не прервётся.':(i.lost?'Серия прервалась, начни заново: день 1.':'Заходи каждый день: награды растут до 7-го дня и повторяются.'))+'</div></div>';
 var rows='<div class="grp">'+LOGIN_R.map(function(r,k){var got=i.done?k<=cur:k<cur,now=!i.done&&k==cur;
  return '<div class="go'+(now?' sel':'')+'"><span style="width:12px;height:12px;border-radius:50%;background:'+(got?'#34c759':now?'var(--blue)':'var(--sep)')+';flex:none"></span><span>День '+(k+1)+'</span><small style="color:'+(got?'#34c759':now?'var(--text)':'var(--sub)')+'">'+(got?'✓ ':'')+loginRewardText(r)+'</small></div>'}).join('')+'</div>';
 var btn=i.done?'<button class="pbtn" style="width:100%;margin-top:14px" disabled>Получено сегодня</button>':'<button class="pbtn" style="width:100%;margin-top:14px" data-act="claimlogin">Получить · '+loginRewardText(LOGIN_R[cur])+'</button>';
 var lv='<div class="sec">Награды за уровни</div><div class="grp"><div class="go"><span>Новый уровень</span><small>50 ⭐ × уровень + 50</small></div><div class="go"><span>Каждый 5-й уровень</span><small>+5 прокруток</small></div><div class="go"><span>Сейчас</span><small>Уровень '+level()+'</small></div></div>';
 return head+btn+'<div class="sec">Награды за 7 дней</div>'+rows+lv}
function levelCheck(){var L=level();if(S.lvR===undefined){S.lvR=L;return}
 while(S.lvR<L&&S.lvR<500){S.lvR++;var st=50*S.lvR+50,fr=S.lvR%5==0?5:0;S.yuz+=st;if(fr)S.free=(S.free||0)+fr;led('Уровень '+S.lvR);toast('Уровень '+S.lvR+'! +'+money(st)+(fr?' и '+fr+' прокруток':''))}}
// Сделки между игроками: деньги уходят в залог на сервере (p2pPay), возвращаются через p2pRefund или входящие «cash»
function p2pPay(a,slot){a=Math.round(+a);if(!(a>0)||a>1e10)return{err:'arg'};if(slot&&collFull())return{err:'full'};if(S.yuz<a)return{err:'poor'};S.yuz-=a;led('Сделка с игроком');save();return{ok:1}}
function p2pRefund(a){a=Math.round(+a);if(a>0&&a<1e10){S.yuz+=a;led('Возврат по сделке');save()}return{ok:1}}
