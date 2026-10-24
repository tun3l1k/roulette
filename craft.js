// Крафт: 3 ника одной редкости → шанс получить ник редкостью выше
var CRAFT_P=[.6,.55,.5,.45,.35,.25]; // шанс успеха для обычных…мифических; божественные не крафтятся
var CF={t:null,sel:[]};
function craftChance(i){return CRAFT_P[i]||0}
function craftRoll(us){
 if(!Array.isArray(us)||us.length!=3)return{err:'arg'};
 var u3=us.map(String);if(u3[0]==u3[1]||u3[0]==u3[2]||u3[1]==u3[2])return{err:'arg'};
 var items=u3.map(function(u){return S.coll.filter(function(x){return x.u==u})[0]});
 if(items.some(function(x){return !x}))return{err:'item'};
 if(items.some(function(x){return x.tier!=items[0].tier}))return{err:'tier'};
 var i0=ti(items[0].tier),p=craftChance(i0);if(!(p>0))return{err:'max'};
 var win=Math.random()<p,nt=TIERS[win?i0+1:i0];
 S.coll=S.coll.filter(function(x){return u3.indexOf(x.u)<0});
 var u,k=0;do{u=build(nt.id);k++}while(k<30&&(S.coll.some(function(x){return x.u==u})||(S.pending&&S.pending.u==u)));
 var r={u:u,tier:nt.id,base:baseFor(nt.id),k:rollBonus(),odds:oddsOf(nt),ts:Date.now()};
 S.coll.unshift(r);noteBest(r);S.xp+=XPT[nt.id];S.crafts=(S.crafts||0)+1;if(win)S.craftWins=(S.craftWins||0)+1;
 led('Крафт: '+u3.map(function(x){return '@'+x}).join(', ')+' → @'+u);save();
 return{ok:1,win:win,r:r,p:p,from:u3.map(function(x,i){return items[i]})}}
function craftTiers(){var c={};S.coll.forEach(function(x){c[ti(x.tier)]=(c[ti(x.tier)]||0)+1});return c}
function craftHtml(){var c=craftTiers(),can=TIERS.map(function(t,i){return c[i]>=3&&craftChance(i)>0?i:-1}).filter(function(i){return i>=0});
 if(!can.length)return emp('sparkle','Для крафта нужно 3 ника одной редкости<br>Оставляй ники в коллекции — лишние можно сплавить в более редкий',60);
 if(CF.t===null||can.indexOf(CF.t)<0){CF.t=can[0];CF.sel=[]}
 var i=CF.t,t=TIERS[i],nt=TIERS[i+1],p=Math.round(craftChance(i)*100);
 var L=S.coll.filter(function(x){return ti(x.tier)==i}).sort(function(a,b){return worth(a)-worth(b)}),sum=0;
 CF.sel=CF.sel.filter(function(u){return L.some(function(x){return x.u==u})});
 CF.sel.forEach(function(u){sum+=worth(L.filter(function(x){return x.u==u})[0])});
 var chips='<div class="fchips">'+TIERS.map(function(x,j){return c[j]>=3&&craftChance(j)>0?'<button class="fc rc'+(j==i?' on':'')+'" data-ct="'+j+'"><i class="rdt" style="background:'+x.color+'"></i>'+c[j]+'</button>':''}).join('')+'</div>';
 var info='<div class="crinfo"><div class="crt"><span style="color:'+t.color+'">'+t.name+'</span><i>→</i><span style="color:'+nt.color+'">'+nt.name+'</span></div><div class="crp"><b>'+p+'%</b><small>шанс успеха</small></div></div>'+
  '<div class="crnote">Нужно выбрать 3 ника. Не повезло — получишь один новый ник прежней редкости, два других сгорят.</div>';
 var rows='<div class="grp">'+L.map(function(c2){var m=mult(c2.u),on=CF.sel.indexOf(c2.u)>=0;
  return '<button class="go hrw'+(on?' sel':'')+'" data-cp="'+c2.u+'"><div class="hav" style="'+bdVars(t)+'"><span>'+esc(c2.u.charAt(0))+'</span></div><div class="hm"><b class="mono">@'+esc(c2.u)+'</b><small>'+(m.m>1?'×'+fm(m.m):'без множителей')+'</small></div><div class="hr"><b>'+money(worth(c2))+'</b><small>'+(on?'✓ выбран':'')+'</small></div></button>'}).join('')+'</div>';
 var n=CF.sel.length;
 return chips+info+rows+'<div class="crbar"><button class="pbtn" style="width:100%" data-act="craftgo"'+(n==3?'':' disabled')+'>'+(n==3?'Скрафтить · сгорит '+money(sum):'Выбрано '+n+' из 3')+'</button></div>'}
function craftResult(o){var r=o.r,t=tier(r.tier),ov=document.createElement('div');ov.className='ov';
 ov.innerHTML='<div class="sh" style="text-align:left"><div class="crres '+(o.win?'win':'lose')+'">'+(o.win?'Получилось!':'Не повезло')+'</div>'+nickHero(r,1)+
  '<div class="crnote" style="text-align:center">'+(o.win?'Новая редкость: '+t.name:'Шанс был '+Math.round(o.p*100)+'%. Взамен — ник той же редкости')+'</div><button class="pbtn" style="width:100%;margin-top:12px" data-nx="close">Отлично</button></div>';
 ov.addEventListener('click',function(e){if(e.target===ov||e.target.closest('[data-nx]'))ov.remove()});document.body.appendChild(ov);
 hap(o.win?{type:'notification',notification_type:'success'}:{type:'impact',impact_style:'medium'})}
function craftGo(){if(CF.sel.length!=3)return;var us=CF.sel.slice();CF.sel=[];
 Promise.resolve(craftRoll(us)).then(function(x){var o=x&&x.res?x.res:x;if(!o||o.err||!o.r){toast('Не получилось: выбери ники заново');draw();return}craftResult(o);draw()})}
