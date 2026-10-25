// Экран «Подарки»: каталог за TON и свои подарки (дарить другу, выставить игрокам, продать магазину)
function giftsHtml(){var mine=S.gf||[],ton=S.ton||0;
 var my=mine.length?'<div class="sec">Мои подарки · '+mine.length+'</div><div class="ggrid">'+mine.map(function(x){var g=gInfo(x.g);if(!g)return '';
  return '<button class="gcard own" data-gfo="'+esc(x.n)+'"><img src="gift/'+esc(x.g)+'.webp" alt=""><b>'+esc(g.name)+'</b><small style="color:'+gColor(g.ix)+'">'+tonF(g.ton)+' TON</small></button>'}).join('')+'</div>':'';
 var cat='<div class="sec">Магазин подарков</div><div class="ggrid">'+GIFTS.map(function(a){return '<button class="gcard dim" data-gfb="'+a[0]+'"><img src="gift/'+a[0]+'.webp" alt=""><b>'+esc(a[1])+'</b><small class="gsoon">Покупка временно недоступна</small></button>'}).join('')+'</div>';
 return '<div class="gnote"><b>🛠 Раздел в разработке</b><span>Покупка подарков скоро откроется. Уже полученные подарки можно дарить и продавать.</span></div>'+my+cat+'<div class="foot">Цены в TON появятся после открытия раздела. TON — внутриигровая валюта, вывода на реальный кошелёк нет.</div>'}
function gfSheet(h){var o=document.createElement('div');o.className='ov';o.innerHTML='<div class="sh" style="text-align:left">'+h+'<button class="plainbtn" data-gfx="close">Закрыть</button></div>';
 o.addEventListener('click',function(e){if(e.target===o||(e.target.closest&&e.target.closest('[data-gfx="close"]')))o.remove()});document.body.appendChild(o);return o}
function gfBuySheet(id){var g=gInfo(id);if(!g)return;
 gfSheet('<div class="ghero"><img src="gift/'+id+'.webp" alt=""><b>'+esc(g.name)+'</b></div><div class="gdev"><b>🛠 Раздел находится в разработке</b><p>Покупка временно недоступна. Мы скоро откроем её: следи за новостями игры.</p></div>')}
function gfOwnSheet(n){var it=(S.gf||[]).filter(function(x){return x.n==n})[0];if(!it)return;var g=gInfo(it.g);if(!g)return;
 var o=gfSheet('<div class="ghero"><img src="gift/'+it.g+'.webp" alt=""><b>'+esc(g.name)+'</b></div><div class="grp" style="margin-top:12px"><div class="go"><span>Цена в магазине</span><small>'+tonF(g.ton)+' TON</small></div><div class="go"><span>Продать магазину</span><small>'+tonF(r3(g.ton*GF_SELL))+' TON</small></div></div>'+
  '<button class="pbtn" style="width:100%;margin-top:12px" data-gfx="list">Выставить игрокам</button><button class="pbtn gray" style="width:100%;margin-top:8px" data-gfx="send">Подарить другу</button><button class="pbtn gray" style="width:100%;margin-top:8px" data-gfx="sell">Продать магазину</button>');
 o.addEventListener('click',function(e){var b=e.target.closest('[data-gfx]');if(!b)return;var v=b.getAttribute('data-gfx');if(v=='close')return;o.remove();
  if(v=='list'){if(p2on())p2Form(n,'gift');else toast('Маркет работает только в Telegram')}
  else if(v=='send'){FG.k='gift';FG.id=n;go('fgift')}
  else if(v=='sell')Promise.resolve(sellGift(n)).then(function(){if(scr=='gifts')draw()})})}
document.addEventListener('click',function(e){var t=e.target&&e.target.closest?e.target.closest('[data-gfb],[data-gfo]'):null;if(!t)return;
 if(t.hasAttribute('data-gfb'))gfBuySheet(t.getAttribute('data-gfb'));else gfOwnSheet(t.getAttribute('data-gfo'))});
