// Ядро генератора: сборка ника и прокрутка
function build(id){var r=Math.random();switch(id){
 case 'common':
  if(r<.22)return rnd(NAMES)+'_'+rnd(SURN)+'_'+ri(10,99);
  if(r<.42)return pron(ri(6,9))+ri(100,9999);
  if(r<.62)return rnd(SHORTN)+'_'+rnd(WORDS)+ri(1,999);
  if(r<.82)return rnd(ADJ)+'_'+rnd(NOUN)+'_'+ri(10,9999);
  return rnd(SURN)+rnd(SHORTN)+ri(1,99)+'_'+pron(ri(2,3));
 case 'norm':
  if(r<.3)return pron(ri(8,12));
  if(r<.55)return rnd(NAMES)+rnd(WORDS);
  if(r<.8)return rnd(ADJ)+rnd(NOUN);
  return rnd(SHORTN)+'_'+rnd(SURN);
 case 'rare':
  if(r<.7)return rnd(NAMES);
  if(r<.85)return pron(ri(6,7));
  return rnd(ADJ)+rnd(SHORTN);
 case 'epic':
  if(r<.62)return rnd(SHORTN);
  if(r<.88)return pron(ri(4,5));
  return rnd(WORDS.filter(function(w){return w.length>=5}));
 case 'legend':
  if(r<.78)return rnd(FRAG_L.concat(WORDS.filter(function(w){return w.length<=4})));
  return pron(3);
 case 'mythic':
  if(r<.3)return 'abcdefghijklmnopqrstuvwxyz'.charAt(ri(0,25));
  if(r<.5)return pron(2);
  return rnd(FRAG_M);
 default:return rnd(DIVINE)}}
// Бонус прокрутки: после ника крутится «барабан» множителей, цена ника умножается на выпавший
var REVL=false,SKIP=false,STm=0,RTm=0,SPF=null;
function skipNow(){if(SKIP)return;SKIP=true;if(STm){clearTimeout(STm);STm=0;if(SPF)SPF()}else if(REVL&&RVT){RVT()}}
var RVT=null;
function countPrice(from,to,ms,cb){var el=$('hprice'),t0=Date.now();if(!el){cb();return}
 (function f(){var p=SKIP?1:Math.min(1,(Date.now()-t0)/ms),e=1-Math.pow(1-p,3);el.textContent='+'+money(from+(to-from)*e);if(p<1)requestAnimationFrame(f);else cb()})()}
// Множитель показывается сразу готовым (без «барабана»), затем цена плавно дорастает до итоговой
function reveal(r,cb){var hb=$('hbonus');if(!hb||S.anim===false){cb();return}
 var k=bonusOf(r),from=worthNoBonus(r),to=worth(r);
 hb.className='bonus land'+(k>1?' win':'');
 hb.innerHTML=k>1?'<b style="color:'+bonusColor(k)+'">×'+fm(k)+'</b><small>бонус прокрутки</small>':'<small>без бонуса</small>';
 if(k>=5)hap({type:'notification',notification_type:'success'});
 countPrice(from,to,SKIP?260:(k>1?650:150),function(){var d=SKIP?(k>1?650:120):(k>1?500:250);
  RVT=function(){clearTimeout(RTm);RTm=0;RVT=null;cb()};RTm=setTimeout(function(){RTm=0;RVT=null;cb()},d)})}
function spin(){if(busy)return;
 if(S.pending)return toast('Сначала реши: продать или оставить');
 var fr=S.free>0;if(!fr&&S.yuz<COST)return toast('Не хватает звёзд: прокрутка стоит '+money(COST));
 SKIP=false;busy=true;paintHome();var P=SRV()?srvRun('spinRoll',[],{raw:true}):null;
 var D=S.anim===false?[70]:[55,60,68,80,96,116,140,170,205,245],n=0;
 function done(o){var rr=o&&o.res;var he=$('huname');if(he)he.style.opacity='1';
  if(!rr||rr.err||!rr.r){busy=false;paintHome();if(o&&o.err)toast('Нет связи с сервером');return}
  var r=rr.r;SKIP=false;cur=r;REVL=S.anim!==false;paintHome(1);buzzEnd(r);(o.msgs||[]).forEach(function(m){toast(m)});
  reveal(r,function(){REVL=false;busy=false;paintHome();autoHandle(r)})}
 function finish(){STm=0;SPF=null;if(P)P.then(done);else done({res:spinRoll(),msgs:[]})}
 SPF=finish;
 function step(){hap({type:'selection_change'});var he=$('huname');if(he){he.textContent='@'+pron(ri(5,9));he.style.opacity='.45';$('hrar').textContent='…';$('hrar').style.color='var(--sub)'}
  if(SKIP||++n>=D.length)finish();else STm=setTimeout(step,D[n])}
 STm=setTimeout(step,D[0])}
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
