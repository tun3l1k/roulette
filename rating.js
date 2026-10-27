// Рейтинг игроков: топы по уровню, балансу, коллекции и другим показателям (реальные игроки с сервера)
var RCATS=[{id:'lvl',n:'Уровень',lo:2,hi:45},{id:'bal',n:'Баланс',lo:500,hi:8e6},{id:'col',n:'Коллекция',lo:300,hi:3e6},{id:'spn',n:'Прокрутки',lo:30,hi:6000},{id:'rar',n:'Редкие',lo:1,hi:140},{id:'bst',n:'Лучший ник',lo:100,hi:900000}];
function srand(s){var x=Math.sin(hh(s))*10000;return x-Math.floor(x)}
function rval(c,name){var r=srand(name+':'+c.id);return Math.round(c.lo*Math.pow(c.hi/c.lo,r))}
function myStat(c){var col=0;(S.coll||[]).forEach(function(x){col+=worth(x)});
 return c.id=='lvl'?level():c.id=='bal'?Math.round(S.yuz+(S.ton||0)*RATE):c.id=='col'?col:c.id=='spn'?(S.spins||0):c.id=='rar'?(S.rare||[]).length:(S.best?worth(S.best):0)}
function rfmt(c,v){return c.id=='lvl'?'Ур. '+v:c.id=='spn'||c.id=='rar'?fmt(v):abbr(v)+' ⭐'}
function myName(){return TG?(TG.username?'@'+TG.username:(TG.first_name||'Ты')):'Ты'}
var RT={d:{},at:{},busy:0,err:''};
function rLoad(cid,force){if(RT.busy||(!force&&RT.at[cid]&&Date.now()-RT.at[cid]<600000))return;RT.busy=1;
 cpost('/api/top',{initData:cInit(),cat:cid}).then(function(r){RT.busy=0;if(r&&r.ok){RT.d[cid]=r;RT.at[cid]=Date.now();RT.err=''}else{RT.err='Не удалось загрузить рейтинг';RT.at[cid]=Date.now()}if(scr=='rating'||scr=='profile')draw()}).catch(function(){RT.busy=0;RT.err='Нет связи с сервером';RT.at[cid]=Date.now();if(scr=='rating'||scr=='profile')draw()})}
function ratingHtml(){var cid=S.rc||'lvl',c=RCATS.filter(function(x){return x.id==cid})[0]||RCATS[0];
 var chips='<div class="fchips">'+RCATS.map(function(x){return '<button class="fc'+(x.id==c.id?' on':'')+'" data-rc="'+x.id+'">'+x.n+'</button>'}).join('')+'</div>';
 if(typeof cloudOn!='function'||!cloudOn())return '<div class="empty">Рейтинг работает только в Telegram<br>Здесь только реальные игроки</div>';
 var d=RT.d[c.id];setTimeout(function(){rLoad(c.id)},0);
 if(!d)return chips+'<div class="empty">'+(RT.err||'Загружаем рейтинг…')+'</div>';
 function av(x,sz){return '<div class="rav" style="width:'+sz+'px;height:'+sz+'px;font-size:'+Math.round(sz*.42)+'px;background:linear-gradient(135deg,hsl('+(Math.abs(hh(x.n))%360)+',70%,55%),hsl('+((Math.abs(hh(x.n))+50)%360)+',70%,40%))">'+esc(x.n.replace('@','').charAt(0).toUpperCase())+'</div>'}
 var L=d.top,me='<div class="rme">'+av({n:myName()},46)+'<div class="rmt"><small>Твоё место · '+c.n+'</small><b>'+(d.rank?'#'+d.rank:'—')+'</b></div><div class="rmv"><b>'+(d.rank?rfmt(c,d.mine):'—')+'</b><small>из '+d.total+' игроков</small></div></div>';
 var pod=L.length>=3?'<div class="podium">'+[1,0,2].map(function(i){var x=L[i],pl=i+1;return '<div class="pod p'+pl+(x.me?' me':'')+'"><div class="pav">'+(pl==1?'<span class="pcr">'+IC.crown+'</span>':'')+av(x,pl==1?64:52)+'<i class="pn">'+pl+'</i></div><b>'+esc(x.n)+'</b><small>'+rfmt(c,x.v)+'</small></div>'}).join('')+'</div>':'';
 var rest=L.length>=3?L.slice(3):L,off=L.length>=3?4:1;
 var rows=rest.length?'<div class="grp">'+rest.map(function(x,i){return '<div class="rrw'+(x.me?' me':'')+'"><span class="rk">'+(i+off)+'</span>'+av(x,38)+'<b>'+esc(x.n)+'</b><small>'+rfmt(c,x.v)+'</small></div>'}).join('')+'</div>':'';
 return me+chips+pod+rows+'<div class="foot">Рейтинг реальных игроков обновляется раз в 2 часа'+(d.at?' · последнее обновление в '+hhmm(d.at):'')+'.</div>'}
