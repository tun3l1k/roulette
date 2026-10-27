// История выпадений: лента с днями, распределение редкостей, фильтры
function hhmm(ts){var d=new Date(ts);return ('0'+d.getHours()).slice(-2)+':'+('0'+d.getMinutes()).slice(-2)}
function dayLabel(ts){var d=new Date(ts),n=new Date(),y=new Date();y.setDate(n.getDate()-1);return dk(d)==dk(n)?'Сегодня':dk(d)==dk(y)?'Вчера':dt(ts).split(' ')[0]}
function histCards(arr){var out='',last='',open=false;
 arr.forEach(function(c){var t=tier(c.tier),m=mult(c.u),lb=c.ts?dayLabel(c.ts):'Раньше';
  if(lb!==last){if(open)out+='</div>';out+='<div class="sec">'+lb+'</div><div class="grp">';open=true;last=lb}
  out+='<div class="go hrw"><div class="hav" style="'+bdVars(t)+'"><span>'+esc(c.u.charAt(0))+'</span></div><div class="hm"><b class="mono">@'+esc(c.u)+'</b><small><i class="rdt" style="background:'+t.color+'"></i>'+t.name+(m.parts.length?' · '+m.parts.map(function(p){return p[0]}).join(', '):'')+'</small></div><div class="hr"><b>'+money(worth(c))+'</b><small>'+(c.ts?hhmm(c.ts):'')+'</small></div></div>'});
 return out+(open?'</div>':'')}
function histHtml(){var hf=S.hf||0,TH=[0,2,3,4],HL=['Все','Редкие','Эпик+','Легенды+'],arr=(hf==0?S.hist:(S.rare||[])).filter(function(c){return ti(c.tier)>=TH[hf]}),H=S.hist||[],
 today=H.filter(function(c){return c.ts&&dk(new Date(c.ts))==dk(new Date())}).length,cnt={};H.forEach(function(c){cnt[c.tier]=(cnt[c.tier]||0)+1});
 var seg=H.length?TIERS.map(function(t){return cnt[t.id]?'<i style="flex:'+cnt[t.id]+';background:'+t.color+'"></i>':''}).join(''):'<i style="flex:1;background:var(--sep)"></i>',
 leg=TIERS.map(function(t){return cnt[t.id]?'<span><i style="background:'+t.color+'"></i>'+cnt[t.id]+'</span>':''}).join('');
 return '<div class="hstats"><div><b>'+fmt(S.spins)+'</b><small>всего</small></div><div><b>'+today+'</b><small>сегодня</small></div><div><b>'+(S.rare||[]).length+'</b><small>редких</small></div><div><b>'+(S.best?abbr(worth(S.best)):'—')+'</b><small>лучший</small></div></div>'+
  '<div class="hbar"><div class="rseg">'+seg+'</div><div class="hleg">'+leg+'</div></div>'+
  '<div class="fchips">'+HL.map(function(x,i){return '<button class="fc'+(i==hf?' on':'')+'" data-hf="'+i+'">'+x+'</button>'}).join('')+'</div>'+
  (arr.length?histCards(arr)+'<div class="foot">'+(hf?'Хранятся последние 100 редких выпадений':'Последние 50 прокруток')+'</div>':'<div class="empty">'+(hf?'Редких пока не выпадало':'История пуста')+'</div>')}
