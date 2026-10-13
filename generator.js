// Ядро генератора: сборка ника и прокрутка
function build(id){switch(id){
 case 'common':var k=ri(0,2);if(k==0)return rnd(NAMES)+'_'+rnd(SURN)+'_'+ri(10,99);if(k==1)return pron(ri(6,9))+ri(100,9999);return rnd(SHORTN)+'_'+rnd(WORDS)+ri(1,999);
 case 'norm':return Math.random()<.5?pron(ri(8,12)):rnd(NAMES)+rnd(WORDS);
 case 'rare':return Math.random()<.7?rnd(NAMES):pron(ri(6,7));
 case 'epic':return Math.random()<.7?rnd(SHORTN):pron(ri(4,5));
 case 'legend':return Math.random()<.75?rnd(FRAG_L.concat(WORDS)):pron(3);
 case 'mythic':return Math.random()<.45?'abcdefghijklmnopqrstuvwxyz'.charAt(ri(0,25)):rnd(FRAG_M);
 default:return rnd(DIVINE)}}
function spin(){if(busy)return;
 if(S.pending)return toast('Сначала реши: продать или оставить');
 var fr=S.free>0;if(!fr&&S.yuz<COST)return toast('Не хватает звёзд: прокрутка стоит '+money(COST));
 busy=true;var P=SRV()?srvRun('spinRoll',[],{raw:true}):null;
 var D=S.anim===false?[70]:[55,60,68,80,96,116,140,170,205,245],n=0;
 function done(o){var rr=o&&o.res;busy=false;var he=$('huname');if(he)he.style.opacity='1';
  if(!rr||rr.err||!rr.r){paintHome();if(o&&o.err)toast('Нет связи с сервером');return}
  var r=rr.r;cur=r;paintHome(1);buzzEnd(r);(o.msgs||[]).forEach(function(m){toast(m)});autoHandle(r)}
 function finish(){if(P)P.then(done);else done({res:spinRoll(),msgs:[]})}
 function step(){hap({type:'selection_change'});var he=$('huname');if(he){he.textContent='@'+pron(ri(5,9));he.style.opacity='.45';$('hrar').textContent='…';$('hrar').style.color='var(--sub)'}
  if(++n>=D.length)finish();else setTimeout(step,D[n])}
 setTimeout(step,D[0])}
var AS=false,ASN=0,ASt=null;
function autoLoop(){if(!AS)return;
 if(busy){ASt=setTimeout(autoLoop,300);return}
 if(S.pending){if(willAuto(S.pending)){ASt=setTimeout(autoLoop,300);return}stopAuto('⏸ Автопрокрутка: выпал @'+S.pending.u+' — реши, продать или оставить');return}
 if(S.free<=0&&S.yuz<COST){stopAuto('⏹ Не хватает звёзд для прокрутки');return}
 if(S.free<=0&&S.yuz-COST<(S.asMin||0)){stopAuto('⏹ Достигнут резерв баланса');return}
 if(S.asLimit&&ASN>=S.asLimit){stopAuto('⏹ Лимит прокруток: '+S.asLimit);return}
 spin();ASN++;paintHome();ASt=setTimeout(autoLoop,500)}
function toggleAuto(){if(AS){stopAuto('⏹ Автопрокрутка остановлена');return}
 if(S.pending){toast('Сначала реши: продать или оставить');return}
 if(!S.auto){S.auto=true;S.autoMax=S.autoMax||0;toast('Авто-продажа включена: обычные ники продаются сами')}
 AS=true;ASN=0;paintHome();autoLoop()}
function stopAuto(m){AS=false;clearTimeout(ASt);if(m)toast(m);paintHome()}
