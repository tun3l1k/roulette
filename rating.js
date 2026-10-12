// Рейтинг игроков: топы по уровню, балансу, коллекции и другим показателям (пока тестовый, боты вместо реальных игроков)
var RCATS=[{id:'lvl',n:'Уровень',lo:2,hi:45},{id:'bal',n:'Баланс',lo:500,hi:8e6},{id:'col',n:'Коллекция',lo:300,hi:3e6},{id:'spn',n:'Прокрутки',lo:30,hi:6000},{id:'rar',n:'Редкие',lo:1,hi:140},{id:'bst',n:'Лучший ник',lo:100,hi:900000}];
var RBOTS=['crypto_king','neo_wolf','dubai_boss','lena_star','max_ivanov_99','shadow_777','alex_dev','casino_royal','tiger_fx','pixel_man','nika_gold','vip_hunter','bit_lord','mr_rocket','kate_moon','ninja_one','zen_master','lucky_ann','king_fox','gold_rush','oleg_trade','star_boy','mega_win','fire_lion'];
function srand(s){var x=Math.sin(hh(s))*10000;return x-Math.floor(x)}
function rval(c,name){var r=srand(name+':'+c.id);return Math.round(c.lo*Math.pow(c.hi/c.lo,r))}
function myStat(c){var col=0;(S.coll||[]).forEach(function(x){col+=worth(x)});
 return c.id=='lvl'?level():c.id=='bal'?Math.round(S.yuz+(S.ton||0)*RATE):c.id=='col'?col:c.id=='spn'?(S.spins||0):c.id=='rar'?(S.rare||[]).length:(S.best?worth(S.best):0)}
function rfmt(c,v){return c.id=='lvl'?'Ур. '+v:c.id=='spn'||c.id=='rar'?fmt(v):abbr(v)+' ⭐'}
function myName(){return TG?(TG.username?'@'+TG.username:(TG.first_name||'Ты')):'Ты'}
function ratingHtml(){var cid=S.rc||'lvl',c=RCATS.filter(function(x){return x.id==cid})[0]||RCATS[0],
 L=RBOTS.map(function(n){return{n:'@'+n,v:rval(c,n)}});L.push({n:myName(),v:myStat(c),me:1});L.sort(function(a,b){return b.v-a.v});
 var my=0;L.forEach(function(x,i){if(x.me)my=i+1});
 function av(x,sz){return '<div class="rav" style="width:'+sz+'px;height:'+sz+'px;font-size:'+Math.round(sz*.42)+'px;background:linear-gradient(135deg,hsl('+(Math.abs(hh(x.n))%360)+',70%,55%),hsl('+((Math.abs(hh(x.n))+50)%360)+',70%,40%))">'+esc(x.n.replace('@','').charAt(0).toUpperCase())+'</div>'}
 var chips='<div class="fchips">'+RCATS.map(function(x){return '<button class="fc'+(x.id==c.id?' on':'')+'" data-rc="'+x.id+'">'+x.n+'</button>'}).join('')+'</div>';
 var pod='<div class="podium">'+[1,0,2].map(function(i){var x=L[i],pl=i+1;return '<div class="pod p'+pl+(x.me?' me':'')+'"><div class="pav">'+(pl==1?'<span class="pcr">'+IC.crown+'</span>':'')+av(x,pl==1?64:52)+'<i class="pn">'+pl+'</i></div><b>'+esc(x.n)+'</b><small>'+rfmt(c,x.v)+'</small></div>'}).join('')+'</div>';
 var rows='<div class="grp">'+L.slice(3,15).map(function(x,i){return '<div class="rrw'+(x.me?' me':'')+'"><span class="rk">'+(i+4)+'</span>'+av(x,38)+'<b>'+esc(x.n)+'</b><small>'+rfmt(c,x.v)+'</small></div>'}).join('')+'</div>';
 var mine=my>15?'<div class="grp" style="margin-top:10px"><div class="rrw me"><span class="rk">'+my+'</span>'+av(L[my-1],38)+'<b>'+esc(L[my-1].n)+'</b><small>'+rfmt(c,L[my-1].v)+'</small></div></div>':'';
 return '<div class="rme"><small>Твоё место</small><b>#'+my+'</b><span>из '+L.length+' · '+rfmt(c,myStat(c))+'</span></div>'+chips+pod+rows+mine+'<div class="foot">Пока тестовый рейтинг с ботами. Реальные игроки появятся вместе с сервером.</div>'}
