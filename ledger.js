// Журнал операций, график баланса, статистика за сутки
function led(r){S.ledger=S.ledger||[];var b=S.bl||{y:S.yuz,t:S.ton||0},now=Date.now(),dy=S.yuz-b.y,dt2=r3((S.ton||0)-b.t);
 if(dy)S.ledger.unshift({t:now,d:dy,c:'star',r:r});
 if(dt2)S.ledger.unshift({t:now,d:dt2,c:'ton',r:r});
 if(S.ledger.length>200)S.ledger.length=200;
 if(dy){S.bh=S.bh||[];S.bh.push({t:now,y:S.yuz});if(S.bh.length>60)S.bh.shift()}
 S.bl={y:S.yuz,t:S.ton||0}}
function spark(){var a=(S.bh||[]).slice(-30);
 if(a.length<2)return '<div class="empty" style="padding:22px 0">График появится после первых операций</div>';
 var ys=a.map(function(p){return p.y}),mn=Math.min.apply(null,ys),mx=Math.max.apply(null,ys),rg=mx-mn||1,
 pts=a.map(function(p,i){return (i*(300/(a.length-1))).toFixed(1)+','+(70-((p.y-mn)/rg)*60).toFixed(1)}).join(' ');
 return '<svg class="spark" viewBox="0 0 300 80" preserveAspectRatio="none"><defs><linearGradient id="sg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2AABEE" stop-opacity=".45"/><stop offset="1" stop-color="#2AABEE" stop-opacity="0"/></linearGradient></defs><polygon points="0,80 '+pts+' 300,80" fill="url(#sg)"/><polyline points="'+pts+'" fill="none" stroke="#2AABEE" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke"/></svg>'}
function dayStats(){var from=Date.now()-864e5,i=0,o=0;(S.ledger||[]).forEach(function(e){if(e.t>=from&&e.c=='star'){if(e.d>0)i+=e.d;else o-=e.d}});return{i:i,o:o}}
function txHtml(n){var L=(S.ledger||[]).slice(0,n||15);
 if(!L.length)return '<div class="empty" style="padding:24px 0">Операций пока нет</div>';
 return '<div class="grp">'+L.map(function(e){var up=e.d>0;
  return '<div class="tx"><div class="txi '+(up?'up':'dn')+'">'+(up?'↗':'↘')+'</div><div class="txm"><b>'+esc(e.r)+'</b><small>'+dt(e.t)+'</small></div><div class="txa '+(up?'up':'dn')+'">'+(up?'+':'−')+(e.c=='ton'?tonF(Math.abs(e.d))+' TON':abbr(Math.abs(e.d))+' ⭐')+'</div></div>'}).join('')+'</div>'}
