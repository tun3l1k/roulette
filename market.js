// Маркет: только реальные игроки (см. p2p.js). Здесь остались общие таймеры и переезд старых симулированных лотов.
var SRCI='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l5 5"/></svg>';
function marketMigrate(){if(!S.lots&&!S.offers)return false;
 (S.lots||[]).forEach(function(l){if(l.mine){S.coll.unshift({u:l.u,tier:l.tier,base:l.base,k:l.k,odds:oddsOf(tier(l.tier))});if(l.bidder&&l.cc=='star')S.yuz+=0}
  else if(l.bidder=='me'){if(l.cc=='ton')S.ton=r3((S.ton||0)+l.price);else S.yuz+=l.price}});
 delete S.lots;delete S.offers;delete S.mf;delete S.mq;save();return true}
function auTick(){var ch=marketMigrate();
 if(isPrem()&&S.freeDay!==dk(new Date())){S.freeDay=dk(new Date());S.free=(S.free||0)+1;toast('✨ Premium: бесплатная прокрутка дня');ch=true}
 if(ch){save();if(scr=='home'&&!busy)paintHome()}
 tickTimers()}
function tickTimers(){var now=Date.now();
 if(scr=='wheel'&&!WBUSY){var rdy=wheelReady()+':'+S.wt;if(WA_!==rdy){WA_=rdy;draw()}else{var wt=document.getElementById('wtimer');if(wt)wt.textContent=wheelLeft()}}
 if(scr=='market'||scr=='gifts'){var q=document.querySelectorAll('[data-end]');for(var i=0;i<q.length;i++){var lf=q[i].getAttribute('data-end')-now;q[i].textContent=tleft(lf);q[i].classList.toggle('hot',lf<30000)}}}
