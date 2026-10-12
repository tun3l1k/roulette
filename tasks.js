// Задания: ежедневные и недельные, бонус дня
function wkKey(){var d=new Date(),x=new Date(d);x.setDate(d.getDate()-((d.getDay()+6)%7));return dk(x)}
function tqE(){var k=dk(new Date());if(!S.tq||S.tq.day!=k)S.tq={day:k,p:{},c:{}};var w=wkKey();if(!S.tw||S.tw.wk!=w)S.tw={wk:w,p:{},c:{}}}
function tdone(t){hap({type:'notification',notification_type:'success'});toast('Задание выполнено: '+t.title)}
function tq(id,n){tqE();var t=TASKS.filter(function(x){return x.id==id})[0];
 if(t){var b=S.tq.p[id]||0;S.tq.p[id]=Math.min(t.goal,b+(n||1));if(b<t.goal&&S.tq.p[id]>=t.goal)tdone(t)}
 WTASKS.forEach(function(w){if(w.ev==id){var b=S.tw.p[w.id]||0;S.tw.p[w.id]=Math.min(w.goal,b+(n||1));if(b<w.goal&&S.tw.p[w.id]>=w.goal)tdone(w)}});save()}
function allClaimed(){return TASKS.every(function(t){return S.tq.c[t.id]})}
function claimable(){tqE();var n=0;TASKS.forEach(function(t){if((S.tq.p[t.id]||0)>=t.goal&&!S.tq.c[t.id])n++});WTASKS.forEach(function(t){if((S.tw.p[t.id]||0)>=t.goal&&!S.tw.c[t.id])n++});if(allClaimed()&&!S.tq.c.chest)n++;return n}
function chestInfo(){var y=new Date();y.setDate(y.getDate()-1);var n=(S.lastChest==dk(y))?(S.streak||0)+1:1;return{n:n,rew:200+50*(Math.min(n,7)-1)}}
function streakNow(){var y=new Date();y.setDate(y.getDate()-1);return(S.lastChest==dk(new Date())||S.lastChest==dk(y))?(S.streak||0):0}
function dayLeft(){var n=new Date(),m=new Date(n);m.setHours(24,0,0,0);var t=Math.floor((m-n)/60000);return Math.floor(t/60)+' ч '+(t%60)+' мин'}
function weekLeft(){var n=new Date(),dow=(n.getDay()+6)%7,m=new Date(n.getFullYear(),n.getMonth(),n.getDate()+7-dow),mn=Math.max(0,Math.floor((m-n)/60000)),d=Math.floor(mn/1440),h=Math.floor(mn%1440/60);return d+' д '+h+' ч'}
function claimTask(id){tqE();var t=TASKS.filter(function(x){return x.id==id})[0],st=S.tq;if(!t){t=WTASKS.filter(function(x){return x.id==id})[0];st=S.tw}
 if(!t||st.c[id]||(st.p[id]||0)<t.goal)return;st.c[id]=1;S.yuz+=t.rew;led('Награда: '+t.title);save();hap({type:'notification',notification_type:'success'});toast('Награда +'+money(t.rew)+' · '+t.title);draw()}
var TCOL=['#5ac8fa','#34c759','#ff9500','#a259f7','#ff5d8f','#4f9bff','#ffb020'];
function tasksHtml(){tqE();var tb=S.tt||'d',L=tb=='d'?TASKS:WTASKS,st=tb=='d'?S.tq:S.tw,dn=0;L.forEach(function(t){if(st.c[t.id])dn++});
 var pc=dn/L.length,C=2*Math.PI*30,ci=chestInfo(),sn=streakNow(),ready=allClaimed();
 var hero='<div class="thero"><div class="tring"><svg viewBox="0 0 72 72"><circle cx="36" cy="36" r="30" fill="none" stroke="var(--sep)" stroke-width="7"/><circle cx="36" cy="36" r="30" fill="none" stroke="#5ac8fa" stroke-width="7" stroke-linecap="round" stroke-dasharray="'+C.toFixed(1)+'" stroke-dashoffset="'+(C*(1-pc)).toFixed(1)+'" transform="rotate(-90 36 36)"/></svg><b>'+dn+'/'+L.length+'</b></div><div class="tinfo"><b>'+(tb=='d'?'Задания дня':'Задания недели')+'</b><small>Обновятся через '+(tb=='d'?dayLeft():weekLeft())+'</small></div></div>';
 var tabs='<div class="seg"><button class="'+(tb=='d'?'on':'')+'" data-tk="d">Ежедневные</button><button class="'+(tb=='w'?'on':'')+'" data-tk="w">Недельные</button></div>';
 var list='<div class="tlist">'+L.map(function(t,i){var p=Math.min(t.goal,st.p[t.id]||0),cl=!!st.c[t.id],ok=p>=t.goal,col=TCOL[i%TCOL.length];
  return '<div class="tcard'+(cl?' dn':'')+'"><div class="tic" style="background:'+col+'">'+IC[t.ic]+'</div><div class="tmid"><b>'+t.title+'</b><div class="bar"><i style="width:'+Math.round(p/t.goal*100)+'%;background:'+col+'"></i></div><small>'+p+' / '+t.goal+'</small></div><div class="tact">'+(cl?'<span class="tdone">Получено</span>':ok?'<button class="pbtn sm" data-claim="'+t.id+'">+'+abbr(t.rew)+' ⭐</button>':'<span class="trew">+'+abbr(t.rew)+' ⭐</span>')+'</div></div>'}).join('')+'</div>';
 var chest='';
 if(tb=='d'){var dots='';for(var i=1;i<=7;i++)dots+='<i class="'+(i<=sn?'on':'')+'"></i>';
  chest='<div class="chest"><div class="chead"><div class="tic" style="background:#ff9f0a">'+IC.gift+'</div><div><b>Бонус дня</b><small>Выполни все задания · серия '+sn+' из 7</small></div></div><div class="cdots">'+dots+'</div>'+(S.tq.c.chest?'<div class="tdone" style="text-align:center">Получено</div>':'<button class="pbtn" style="width:100%;'+(ready?'':'opacity:.45')+'" data-act="chest">Забрать '+money(ci.rew)+'</button>')+'</div>'}
 return hero+tabs+list+chest}
