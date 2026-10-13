// Коллекция: поиск, фильтры, карточки ников и окно с подробностями
function collAll(){var cf=(S.cf===undefined?-1:S.cf),cs=S.cs||'r',q=(S.cq||'').toLowerCase(),c2={};S.coll.forEach(function(c){var k=ti(c.tier);c2[k]=(c2[k]||0)+1});
 if(cf>=0&&!c2[cf])cf=-1;
 var L=S.coll.filter(function(c){return (cf<0||ti(c.tier)==cf)&&(!q||c.u.indexOf(q)>=0)});
 if(cs=='r')L=L.slice().sort(function(a,b){return ti(b.tier)-ti(a.tier)||worth(b)-worth(a)});else if(cs=='p')L=L.slice().sort(function(a,b){return worth(b)-worth(a)});
 return{L:L,c2:c2,cf:cf,cs:cs}}
function collList(){var L=collAll().L;
 if(!L.length)return '<div class="empty">'+(S.coll.length?'Ничего не найдено':'В коллекции пока пусто<br>Крути и оставляй лучшие ники')+'</div>';
 return '<div class="cgrid">'+L.map(function(c,i){var t=tier(c.tier),m=mult(c.u),ix=ti(c.tier);
  return '<button class="nc" data-nick="'+c.u+'" style="--c:'+t.color+';animation-delay:'+Math.min(i,10)*25+'ms"><div class="ncav" style="background:'+t.color+(ix>=3?';box-shadow:0 0 14px '+t.color+'88':'')+'">'+esc(c.u.charAt(0).toUpperCase())+'</div><b>@'+c.u+'</b><div class="ncm"><span class="cb" style="background:'+t.color+'">'+t.name+'</span>'+(m.m>1?'<span class="cb" style="background:#2AABEE">×'+fm(m.m)+'</span>':'')+'</div><div class="ncp">'+money(worth(c))+'</div></button>'}).join('')+'</div>'}
function collHtml(){if(!S.coll.length)return emp('box','В коллекции пока пусто<br>Крути и оставляй лучшие ники',50);
 var a=collAll(),tot=0,rr=0;S.coll.forEach(function(c){tot+=worth(c);if(ti(c.tier)>=2)rr++});var bl=bulkList();
 return '<div class="cstat"><div><b>'+S.coll.length+'</b><small>ников</small></div><div><b>'+abbr(tot)+'</b><small>оценка ⭐</small></div><div><b>'+rr+'</b><small>редких</small></div></div>'+
  '<div class="msearch">'+SRCI+'<input id="csq" placeholder="Поиск ника" value="'+esc(S.cq||'')+'" autocomplete="off" autocapitalize="off" spellcheck="false"></div>'+
  '<div class="fchips"><button class="fc'+(a.cf<0?' on':'')+'" data-cf="-1">Все '+S.coll.length+'</button>'+TIERS.map(function(t,i){return a.c2[i]?'<button class="fc rc'+(a.cf==i?' on':'')+'" data-cf="'+i+'"><i class="rdt" style="background:'+t.color+'"></i>'+a.c2[i]+'</button>':''}).join('')+
  [['r','По редкости'],['p','По цене'],['n','Новые']].map(function(x){return '<button class="fc'+(a.cs==x[0]?' on':'')+'" data-cs="'+x[0]+'" style="'+(a.cs==x[0]?'':'opacity:.8')+'">'+(a.cs==x[0]?'⇅ ':'')+x[1]+'</button>'}).join('')+'</div>'+
  '<div id="clist">'+collList()+'</div>'+(bl.length?'<button class="plainbtn" data-act="bulk">Продать дешёвые ('+bl.length+' шт.)</button>':'')}
function nickSheet(u){var c=S.coll.filter(function(x){return x.u==u})[0];if(!c)return;var t=tier(c.tier),m=mult(u),w=worth(c),b=c.base!=null?c.base:t.pts,o=document.createElement('div');o.className='ov';
 o.innerHTML='<div class="sh" style="text-align:left"><div style="display:flex;align-items:center;gap:12px"><div class="ncav" style="background:'+t.color+';width:52px;height:52px;font-size:22px;flex:none">'+esc(u.charAt(0).toUpperCase())+'</div><div style="min-width:0"><div style="font-size:22px;font-weight:800;word-break:break-all">@'+u+'</div><span class="cb" style="background:'+t.color+'">'+t.name+'</span></div></div>'+
  '<div class="grp" style="margin-top:14px"><div class="go"><span>Базовая цена</span><small>'+money(b)+'</small></div>'+m.parts.map(function(p){return '<div class="go"><span>'+p[0]+'</span><small>× '+fm(p[1])+'</small></div>'}).join('')+'<div class="go"><span><b>Итого</b></span><small style="color:var(--text);font-weight:700">'+money(w)+'</small></div></div>'+
  '<div class="row2" style="margin-top:14px"><button class="act" data-nx="close">Закрыть</button><button class="pbtn" style="flex:1" data-nx="list">Выставить</button></div><button class="pbtn gray" style="width:100%;margin-top:8px" data-nx="sell">Продать · '+money(w)+'</button><button class="plainbtn" data-nx="friend">Подарить другу</button><button class="plainbtn" style="margin-top:0" data-nx="share">Поделиться картинкой</button></div>';
 o.addEventListener('click',function(e){var b2=e.target.closest('[data-nx]');if(b2||e.target===o){var v=b2?b2.getAttribute('data-nx'):'close';o.remove();
  if(v=='sell'){if(ti(c.tier)>=3&&S.confirm!==false)ask('Продать @'+u+' за '+money(w)+'?','Продать',function(){sellOne(u)});else sellOne(u)}
  else if(v=='share'){shareNick(c)}
  else if(v=='friend'){FG={k:'nick',id:c.u};go('fgift')}
  else if(v=='list'){go('list');LU=c.u;LT=c.tier;LB=c.base;LC='star';LM='auc';LP=defPrice();LD=300;draw()}}});
 document.body.appendChild(o)}
