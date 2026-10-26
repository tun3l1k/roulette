// Коллекция: поиск, фильтры, карточки ников и окно с подробностями
// Общие кирпичики оформления: коллекционный фон по редкости, «герой» ника, разбор цены
function bdVars(t){return '--tc:'+t.color}
function bdCls(t){return 'bd'+(ti(t.id)>=4?' hi':'')}
// Ник набран моноширинным шрифтом: ширина символа ≈ 0.6 em, поэтому размер считается точно по длине
function nickSize(u,big){var n=u.length+1,w=big?300:136,mx=big?40:26,mn=big?20:12;return Math.max(mn,Math.min(mx,Math.floor(w/(.6*n))))}
function nk(u,big){return '<span class="nk" style="font-size:'+nickSize(u,big)+'px"><i>@</i>'+esc(u)+'</span>'}
function traitChips(c){var m=mult(c.u),k=bonusOf(c);return m.parts.map(function(p){return '<span class="tch">'+p[0]+' ×'+fm(p[1])+'</span>'}).join('')+(k>1?'<span class="tch bn" style="color:'+bonusColor(k)+'">бонус ×'+fm(k)+'</span>':'')}
function nickHero(c,sm){var t=tier(c.tier),k=bonusOf(c);
 return '<div class="bh '+bdCls(t)+(sm?' sm':'')+'" style="'+bdVars(t)+'"><div class="bht"><span class="bhr">'+t.name+'</span>'+(k>1?'<span class="bhm" style="color:'+bonusColor(k)+'">бонус ×'+fm(k)+'</span>':'')+'</div>'+nk(c.u,1)+'<div class="bhp">'+money(worth(c))+'</div></div>'}
function priceRows(c){var t=tier(c.tier),m=mult(c.u),k=bonusOf(c),b=c.base!=null?c.base:t.pts;
 return '<div class="grp"><div class="go"><span>Базовая цена ('+t.name+')</span><small>'+money(b)+'</small></div>'+m.parts.map(function(p){return '<div class="go"><span>'+p[0]+'</span><small>× '+fm(p[1])+'</small></div>'}).join('')+(k>1?'<div class="go"><span>Бонус прокрутки</span><small style="color:'+bonusColor(k)+';font-weight:700">× '+fm(k)+'</small></div>':'')+'<div class="go"><span><b>Итого</b></span><small style="color:var(--text);font-weight:700">'+money(worth(c))+'</small></div></div>'}
function collAll(){var cf=(S.cf===undefined?-1:S.cf),cs=S.cs||'r',q=(S.cq||'').toLowerCase(),c2={};S.coll.forEach(function(c){var k=ti(c.tier);c2[k]=(c2[k]||0)+1});
 if(cf>=0&&!c2[cf])cf=-1;
 var L=S.coll.filter(function(c){return (cf<0||ti(c.tier)==cf)&&(!q||c.u.indexOf(q)>=0)});
 if(cs=='r')L=L.slice().sort(function(a,b){return ti(b.tier)-ti(a.tier)||worth(b)-worth(a)});else if(cs=='p')L=L.slice().sort(function(a,b){return worth(b)-worth(a)});
 return{L:L,c2:c2,cf:cf,cs:cs}}
function collList(){var L=collAll().L;
 if(!L.length)return '<div class="empty">'+(S.coll.length?'Ничего не найдено':'В коллекции пока пусто<br>Крути и оставляй лучшие ники')+'</div>';
 return '<div class="grp clist">'+L.map(function(c){var t=tier(c.tier),m=mult(c.u),k=bonusOf(c),tg=m.parts.map(function(p){return p[0]}).join(', ');
  return '<button class="go crow" data-nick="'+c.u+'"><div class="hav" style="'+bdVars(t)+'"><span>'+esc(c.u.charAt(0))+'</span></div><div class="hm"><b class="mono">@'+esc(c.u)+'</b><small><i class="rdt" style="background:'+t.color+'"></i>'+t.name+(tg?' · '+tg:'')+'</small></div><div class="hr"><b>'+money(worth(c))+'</b>'+(k>1?'<small style="color:'+bonusColor(k)+';font-weight:700">бонус ×'+fm(k)+'</small>':'<small>&nbsp;</small>')+'</div></button>'}).join('')+'</div>'}
function capBar(){var n=S.coll.length,p=Math.min(100,Math.round(n/COLL_MAX*100)),cl=n>=COLL_MAX?'#ff3b30':n>=COLL_MAX*.9?'#ff9500':'var(--blue)';
 return '<div class="capb"><div class="capt"><span>Коллекция</span><b style="color:'+(n>=COLL_MAX?'#ff3b30':'var(--text)')+'">'+n+' / '+COLL_MAX+'</b></div><div class="capl"><i style="width:'+p+'%;background:'+cl+'"></i></div>'+(n>=COLL_MAX?'<div class="capn">Мест нет: продай или скрафти ники, чтобы оставлять новые</div>':'')+'</div>'}
function crReady(){var c=craftTiers(),n=0;Object.keys(c).forEach(function(k){if(c[k]>=3&&craftChance(+k)>0)n++});return n?'можно: '+n:''}
function collHtml(){if(!S.coll.length)return emp('box','В коллекции пока пусто<br>Крути и оставляй лучшие ники',50);
 var a=collAll(),tot=0,rr=0;S.coll.forEach(function(c){tot+=worth(c);if(ti(c.tier)>=2)rr++});var bl=bulkList();
 return capBar()+'<div class="cstat"><div><b>'+S.coll.length+'</b><small>ников</small></div><div><b>'+abbr(tot)+'</b><small>оценка ⭐</small></div><div><b>'+rr+'</b><small>редких</small></div></div>'+
  '<div class="grp" style="margin-top:12px"><button class="go" data-go="craft"><span class="ic" style="background:#a855f7">'+IC.sparkle+'</span>Крафт ников<span class="cnt plain">'+crReady()+'</span><span class="ar" style="margin-left:8px">›</span></button></div>'+
  '<div class="msearch">'+SRCI+'<input id="csq" placeholder="Поиск ника" value="'+esc(S.cq||'')+'" autocomplete="off" autocapitalize="off" spellcheck="false"></div>'+
  '<div class="fchips"><button class="fc'+(a.cf<0?' on':'')+'" data-cf="-1">Все '+S.coll.length+'</button>'+TIERS.map(function(t,i){return a.c2[i]?'<button class="fc rc'+(a.cf==i?' on':'')+'" data-cf="'+i+'"><i class="rdt" style="background:'+t.color+'"></i>'+a.c2[i]+'</button>':''}).join('')+
  [['r','По редкости'],['p','По цене'],['n','Новые']].map(function(x){return '<button class="fc'+(a.cs==x[0]?' on':'')+'" data-cs="'+x[0]+'" style="'+(a.cs==x[0]?'':'opacity:.8')+'">'+(a.cs==x[0]?'⇅ ':'')+x[1]+'</button>'}).join('')+'</div>'+
  '<div id="clist">'+collList()+'</div>'+(bl.length?'<button class="plainbtn" data-act="bulk">Продать дешёвые ('+bl.length+' шт.)</button>':'')}
function nickSheet(u){var c=S.coll.filter(function(x){return x.u==u})[0];if(!c)return;var w=worth(c),o=document.createElement('div');o.className='ov';
 o.innerHTML='<div class="sh" style="text-align:left">'+nickHero(c,1)+'<div style="margin-top:14px">'+priceRows(c).replace('class="grp"','class="grp" style="margin-top:0"')+'</div>'+
  '<div class="row2" style="margin-top:14px"><button class="act" data-nx="close">Закрыть</button><button class="pbtn" style="flex:1" data-nx="list">Выставить</button></div><button class="pbtn gray" style="width:100%;margin-top:8px" data-nx="sell">Продать · '+money(w)+'</button><button class="pbtn gray" style="width:100%;margin-top:8px" data-nx="friend">Отправить другу</button><button class="plainbtn" style="margin-top:0" data-nx="share">Поделиться картинкой</button></div>';
 o.addEventListener('click',function(e){var b2=e.target.closest('[data-nx]');if(b2||e.target===o){var v=b2?b2.getAttribute('data-nx'):'close';o.remove();
  if(v=='sell'){if(ti(c.tier)>=3&&S.confirm!==false)ask('Продать @'+u+' за '+money(w)+'?','Продать',function(){sellOne(u)});else sellOne(u)}
  else if(v=='share'){shareNick(c)}
  else if(v=='friend'){sendSheet('nick',c.u,'@'+c.u)}
  else if(v=='list'){if(p2on())p2Form(c.u);else toast('Маркет работает только в Telegram')}}});
 document.body.appendChild(o)}
