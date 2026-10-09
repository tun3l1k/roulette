// Ядро генератора: сборка ника и прокрутка
function build(id){switch(id){
 case 'common':var k=ri(0,2);if(k==0)return rnd(NAMES)+'_'+rnd(SURN)+'_'+ri(10,99);if(k==1)return pron(ri(6,9))+ri(100,9999);return rnd(SHORTN)+'_'+rnd(WORDS)+ri(1,999);
 case 'norm':return Math.random()<.5?pron(ri(8,12)):rnd(NAMES)+rnd(WORDS);
 case 'rare':return Math.random()<.7?rnd(NAMES):pron(ri(6,7));
 case 'epic':return Math.random()<.7?rnd(SHORTN):pron(ri(4,5));
 case 'legend':return Math.random()<.7?rnd(WORDS):pron(3);
 case 'mythic':return 'abcdefghijklmnopqrstuvwxyz'.charAt(ri(0,25));
 default:return rnd(DIVINE)}}
function spin(){if(busy)return;
 if(S.pending)return toast('Сначала реши: продать или оставить');
 busy=true;paintHome();
 var D=S.anim===false?[70]:[55,60,68,80,96,116,140,170,205,245],n=0;function step(){hap({type:'selection_change'});var he=$('huname');if(he){he.textContent='@'+pron(ri(5,9));he.style.opacity='.45';$('hrar').textContent='…';$('hrar').style.color='var(--sub)'}
  if(++n>=D.length){var t=pickTier(),r={u:build(t.id),tier:t.id,base:baseFor(t.id),odds:oddsOf(t),ts:Date.now()};
   cur=r;S.pending=r;S.spins++;S.xp+=t.pts;if(S.luck>0)S.luck--;
   S.hist.unshift(r);if(S.hist.length>50)S.hist.pop();if(ti(r.tier)>=2){S.rare.unshift(r);if(S.rare.length>100)S.rare.pop()}save();
   if($('huname'))$('huname').style.opacity='1';paintHome(1);busy=false;
   buzzEnd(r);tq('spin10');if(ti(r.tier)>=2)tq('rare1');if(Math.random()<.002){var tf=r3(.01+Math.random()*.04);S.ton=r3((S.ton||0)+tf);setTimeout(function(){toast('💎 Находка! +'+tonF(tf)+' TON');paintHome()},900)}
   if(S.auto&&ti(r.tier)<=(S.autoMax||0)&&(S.autoKeep===false||mult(r.u).m<=1)){setTimeout(function(){if(S.pending===r){var g=worth(r);S.yuz+=g;S.autoN=(S.autoN||0)+1;S.autoSum=(S.autoSum||0)+g;tq('sell5');S.pending=null;cur=null;save();toast('💰 Авто-продажа @'+r.u+' · +'+money(g));paintHome(1)}},1200)}}else setTimeout(step,D[n])}setTimeout(step,D[0])}
