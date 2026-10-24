// Маркет между реальными игроками: лоты по фикс-цене и аукционы. Работает только в Telegram с облаком.
var P2={list:[],at:0,busy:0,f:'all',err:''};
var P2_FEE=5,P2_DUR=[[3600,'1 ч'],[21600,'6 ч'],[86400,'24 ч'],[259200,'3 дня']];
var P2_ERR={gone:'Лот уже недоступен',poor:'Не хватает звёзд',full:'Коллекция заполнена',self:'Это твой лот',top:'Твоя ставка и так выше всех',low:'Ставка слишком маленькая',outbid:'Ставку только что перебили, попробуй снова',has_bids:'Есть ставки — лот снять нельзя',limit:'Не больше 10 активных лотов',item:'Этого ника нет в коллекции',arg:'Проверь цену и срок',maint:'Технические работы',banned:'Доступ закрыт',fail:'Не получилось, попробуй ещё раз'};
function p2on(){return typeof cloudOn=='function'&&cloudOn()}
function p2Body(o){o=o||{};o.initData=cInit();o.prefs=typeof prefsOut=='function'?prefsOut():undefined;return o}
function p2Redraw(){if(scr=='market'&&S.mt=='p2p'){var a=document.activeElement;if(a&&/^(p2q|p2am)$/.test(a.id||''))return;draw()}}
function p2Load(force){if(P2.busy||(!force&&Date.now()-P2.at<4000))return;P2.busy=1;
 var mine=P2.f=='mine',b=p2Body({});if(!mine){if(P2.f=='fixed'||P2.f=='auction')b.mode=P2.f;if(S.mq)b.q=S.mq}
 cpost(mine?'/api/p2p/mine':'/api/p2p/browse',b).then(function(r){P2.busy=0;P2.at=Date.now();if(r&&r.ok){P2.list=r.list||[];P2.err=''}else P2.err=r&&r.err=='maint'?'Технические работы':'Не удалось загрузить';p2Redraw()}).catch(function(){P2.busy=0;P2.at=Date.now();P2.err='Нет связи с сервером';p2Redraw()})}
function p2Enter(){setTimeout(function(){p2Load(false)},0)}
function p2Row(l){var t=tier(l.tier),k=l.k>1?' · <b style="color:'+bonusColor(l.k)+'">×'+fm(l.k)+'</b>':'',left=l.end-Date.now(),
 st=l.mine?'мой · '+(l.mode=='auction'?(l.bids?'ставок '+l.bids:'нет ставок'):'ждёт покупателя'):l.mode=='fixed'?'продажа':(l.top?'твоя ставка':(l.bids?'ставок '+l.bids:'нет ставок'));
 return '<button class="go frow" data-p2lot="'+l.id+'"><div class="fl"><div class="fn"><i>@</i>'+esc(l.u)+'</div><div class="fs"><span class="fst '+(l.mode=='fixed'?'sale':'auc')+(l.top?' me':'')+'">'+st+'</span><i class="rdt" style="background:'+t.color+'"></i>'+t.name+k+'</div></div>'+
  '<div class="fr"><div class="fp">'+money(l.bid>0?l.bid:l.price)+'</div><div class="ft tm'+(left<30000?' hot':'')+'" data-end="'+l.end+'">'+tleft(left)+'</div></div></button>'}
function p2Html(){var F={all:'Все',fixed:'Продажа',auction:'Аукционы',mine:'Мои'};
 var chips='<div class="fchips">'+Object.keys(F).map(function(k){return '<button class="fc'+(P2.f==k?' on':'')+'" data-p2f="'+k+'">'+F[k]+'</button>'}).join('')+'</div>';
 var srch=P2.f=='mine'?'':'<div class="msearch">'+SRCI+'<input id="p2q" placeholder="Поиск ника" value="'+esc(S.mq||'')+'" autocomplete="off" autocapitalize="off" spellcheck="false"></div>';
 var body=P2.err?'<div class="empty">'+P2.err+'</div>':!P2.at?'<div class="empty">Загружаем лоты…</div>':!P2.list.length?'<div class="empty">'+(P2.f=='mine'?'У тебя нет лотов и ставок':'Лотов пока нет<br>Выставь свой ник первым')+'</div>':'<div class="fhead"><span>Ник</span><span>Цена · осталось</span></div><div class="grp mlist ftable">'+P2.list.map(p2Row).join('')+'</div>';
 return '<button class="pbtn" style="width:100%;margin-top:12px" data-p2new="1">'+PLUSC+'Выставить ник</button>'+srch+chips+'<div id="mlist">'+body+'</div>'+
  '<div class="foot">Здесь торгуют реальные игроки. Комиссия с продажи '+P2_FEE+'%.<br>Ставка списывается сразу и возвращается, если тебя перебьют. За 30 секунд до конца новая ставка продлевает торги.</div>'}
function p2Find(id){for(var i=0;i<P2.list.length;i++)if(P2.list[i].id==id)return P2.list[i]}
function p2Sheet(h){var o=document.createElement('div');o.className='ov';o.innerHTML='<div class="sh" style="text-align:left">'+h+'<button class="plainbtn" data-p2x="close">Закрыть</button></div>';
 o.addEventListener('click',function(e){if(e.target===o||(e.target.closest&&e.target.closest('[data-p2x="close"]')))o.remove()});document.body.appendChild(o);return o}
function p2Done(r,okMsg,o){if(r&&r.ok){srvApply(r);(r.msgs||[]).forEach(toast);if(okMsg)toast(okMsg);if(o)o.remove();if(scr=='home')paintHome();P2.at=0;p2Load(true);draw();return}
 var e=r&&r.err;toast((P2_ERR[e]||'Не получилось')+(e=='low'&&r.min?': от '+money(r.min):''));if(e=='gone'||e=='outbid'||e=='low'){if(o)o.remove();P2.at=0;p2Load(true)}}
function p2LotSheet(id){var l=p2Find(id);if(!l)return;var t=tier(l.tier),c={u:l.u,tier:l.tier,base:l.base,k:l.k},w=worth(c),cur=l.bid>0?l.bid:l.price,fee=Math.floor(cur*(100-P2_FEE)/100);
 var act=l.mine?(l.bids?'<div class="foot" style="margin:12px 0 0">Есть ставки — лот снять нельзя</div>':'<button class="pbtn gray" style="width:100%;margin-top:12px" data-p2x="cancel">Снять с продажи</button>'):
  l.mode=='fixed'?'<button class="pbtn" style="width:100%;margin-top:12px" data-p2x="buy">Купить за '+money(l.price)+'</button>':
  l.top?'<div class="foot" style="margin:12px 0 0">Твоя ставка — самая высокая</div>':'<div class="msearch" style="margin-top:12px"><input id="p2am" inputmode="numeric" placeholder="Ставка, от '+fmt(l.min)+'" value="'+l.min+'" autocomplete="off"></div><button class="pbtn" style="width:100%;margin-top:8px" data-p2x="bid">Сделать ставку</button>';
 var o=p2Sheet(nickHero(c,1)+'<div class="grp" style="margin-top:12px"><div class="go"><span>Тип</span><small>'+(l.mode=='fixed'?'Продажа':'Аукцион')+'</small></div><div class="go"><span>'+(l.mode=='fixed'?'Цена':(l.bid>0?'Текущая ставка':'Стартовая цена'))+'</span><small style="color:var(--text);font-weight:700">'+money(cur)+'</small></div><div class="go"><span>Осталось</span><small class="tm" data-end="'+l.end+'">'+tleft(l.end-Date.now())+'</small></div><div class="go"><span>Оценка ника</span><small>'+money(w)+'</small></div><div class="go"><span>Продавец</span><small>'+(l.mine?'ты':'@'+esc(l.seller))+'</small></div>'+(l.mine?'<div class="go"><span>Получишь после комиссии</span><small>'+money(fee)+'</small></div>':'')+'</div>'+act);
 o.addEventListener('click',function(e){var b=e.target.closest('[data-p2x]');if(!b||o.getAttribute('data-bz'))return;var v=b.getAttribute('data-p2x');if(v=='close')return;o.setAttribute('data-bz','1');
  var q;if(v=='buy')q=cpost('/api/p2p/buy',p2Body({id:l.id}));else if(v=='cancel')q=cpost('/api/p2p/cancel',p2Body({id:l.id}));
  else{var a=Math.round(+(document.getElementById('p2am').value||0));q=cpost('/api/p2p/bid',p2Body({id:l.id,amount:a}))}
  q.then(function(r){o.removeAttribute('data-bz');p2Done(r,v=='bid'?'Ставка принята':'',o)}).catch(function(){o.removeAttribute('data-bz');toast('Нет связи с сервером')})})}
function p2Pick(){if(!S.coll.length){toast('В коллекции пусто');return}
 var o=p2Sheet('<div class="sec" style="margin-top:0">Какой ник выставить?</div><div class="grp" style="max-height:50vh;overflow:auto">'+S.coll.slice(0,50).map(function(c){var t=tier(c.tier);return '<button class="go it" style="border-color:'+t.color+'" data-p2pick="'+esc(c.u)+'"><b>@'+esc(c.u)+'</b><small>'+t.icon+' '+t.name+' · '+money(worth(c))+'</small></button>'}).join('')+'</div>');
 o.addEventListener('click',function(e){var b=e.target.closest('[data-p2pick]');if(b){o.remove();p2Form(b.getAttribute('data-p2pick'))}})}
function p2Form(u){var c=S.coll.filter(function(x){return x.u==u})[0];if(!c)return;var w=worth(c),st={mode:'fixed',dur:86400,price:Math.max(2,Math.round(w*1.2))};
 function body(){return nickHero(c,1)+'<div class="ftabs" style="margin-top:12px"><button class="'+(st.mode=='fixed'?'on':'')+'" data-p2x="m:fixed">Продажа</button><button class="'+(st.mode=='auction'?'on':'')+'" data-p2x="m:auction">Аукцион</button></div>'+
  '<div class="msearch" style="margin-top:12px"><input id="p2pr" inputmode="numeric" value="'+st.price+'" autocomplete="off" placeholder="'+(st.mode=='auction'?'Стартовая цена':'Цена')+'"></div>'+
  '<div class="fchips">'+P2_DUR.map(function(d){return '<button class="fc'+(st.dur==d[0]?' on':'')+'" data-p2x="d:'+d[0]+'">'+d[1]+'</button>'}).join('')+'</div>'+
  '<div class="foot" style="margin:6px 0">Оценка ника '+money(w)+'. После комиссии '+P2_FEE+'% получишь меньше цены.</div><button class="pbtn" style="width:100%" data-p2x="go">Выставить</button>'}
 var o=p2Sheet(body());var box=o.firstChild;
 function keep(){var i=document.getElementById('p2pr');if(i)st.price=Math.round(+i.value)||st.price}
 o.addEventListener('click',function(e){var b=e.target.closest('[data-p2x]');if(!b)return;var v=b.getAttribute('data-p2x');if(v=='close')return;keep();
  if(v.indexOf('m:')==0||v.indexOf('d:')==0){if(v[0]=='m')st.mode=v.slice(2);else st.dur=+v.slice(2);var cl=box.lastChild;box.innerHTML=body();box.appendChild(cl)}
  else if(v=='go'){if(!(st.price>=1)){toast('Укажи цену');return}if(o.getAttribute('data-bz'))return;o.setAttribute('data-bz','1');
   cpost('/api/p2p/list',p2Body({u:u,mode:st.mode,price:st.price,dur:st.dur})).then(function(r){o.removeAttribute('data-bz');if(r&&r.ok)P2.f='mine';p2Done(r,'Ник выставлен',o)}).catch(function(){o.removeAttribute('data-bz');toast('Нет связи с сервером')})}})}
document.addEventListener('click',function(e){var t=e.target&&e.target.closest?e.target.closest('[data-p2lot],[data-p2f],[data-p2new]'):null;if(!t)return;
 if(t.hasAttribute('data-p2lot'))p2LotSheet(t.getAttribute('data-p2lot'));
 else if(t.hasAttribute('data-p2f')){P2.f=t.getAttribute('data-p2f');P2.at=0;P2.list=[];draw();p2Load(true)}
 else p2Pick()});
document.addEventListener('input',function(e){if(e.target&&e.target.id=='p2q'){S.mq=e.target.value.toLowerCase().replace(/[^a-z0-9_]/g,'');clearTimeout(P2.tm);P2.tm=setTimeout(function(){P2.at=0;p2Load(true)},350)}});
