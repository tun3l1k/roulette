// Математика редкости и цены: шансы, множители, оценка ника
function tier(id){return TIERS.filter(function(t){return t.id==id})[0]}
function ti(id){return TIERS.indexOf(tier(id))}
function level(){return Math.floor(Math.sqrt(S.xp/25))+1}
function lf(){return Math.max(S.luck>0?LUCK_F:1,S.pity||1)}
function noteBest(r){if(!r)return;if(!S.best||worth(r)>worth(S.best))S.best={u:r.u,tier:r.tier,base:r.base,k:r.k,odds:r.odds,ts:r.ts||Date.now()}}
function pickTier(){var w=TIERS.map(function(t,i){return t.w*(i>=2?lf():1)}),sum=w.reduce(function(a,b){return a+b},0),r=Math.random()*sum;for(var i=0;i<w.length;i++){r-=w[i];if(r<=0)return TIERS[i]}return TIERS[0]}
function oddsOf(t){var w=TIERS.map(function(x,i){return x.w*(i>=2?lf():1)}),sum=w.reduce(function(a,b){return a+b},0);return Math.round(sum/(t.w*(TIERS.indexOf(t)>=2?lf():1)))}
function baseFor(id){var g=RNG[id];return Math.round(g[0]+Math.pow(Math.random(),1.4)*(g[1]-g[0]))}
// Лесенка: подряд идущие символы по возрастанию или убыванию (abc, cba, 123, 987)
function ladder(u){var best=1,run=1,pd=0,dig=false,bd=false,n=u.length,i;
 for(i=1;i<n;i++){var a=u.charCodeAt(i-1),b=u.charCodeAt(i),st=b-a,ad=a>=48&&a<=57,bg=b>=48&&b<=57,al=a>=97&&a<=122,bl=b>=97&&b<=122;
  if((st==1||st==-1)&&((ad&&bg)||(al&&bl))){run=(st==pd)?run+1:2;pd=st;if(bg&&run>=3)bd=true;if(run>best)best=run}else{run=1;pd=0}}
 return best>=3&&(bd||best*2>=n)}
function mult(u){var m=1,tg=[],pr=[],n=u.length,dg=(u.match(/\d/g)||[]).length;
 function add(x,lb){m*=x;tg.push(lb);pr.push([lb,x])}
 // слово: топ-слово > статусное > красивое слово > имя
 if(NSET.d[u])add(5,'топ-слово');else if(NSET.s[u])add(2.5,'статусное слово');else if(NSET.w[u])add(2,'красивое слово');else if(NSET.n[u])add(1.5,'настоящее имя');
 // длина
 if(n<=3)add(3,'3 символа');else if(n==4)add(2,'4 символа');else if(n==5)add(1.2,'5 символов');else if(n==6)add(1.1,'6 символов');else if(n<=8)add(1.05,'7–8 символов');
 // буквы
 if(n>=3&&u===u.split('').reverse().join(''))add(2,'зеркальный ник');
 if(n==1)add(5,'одна буква');else if(/^([a-z])\1+$/.test(u))add(3,'повтор буквы');else if(n>=4&&/^(..)\1+$/.test(u))add(1.5,'ритм');
 else if(/([a-z])\1\1/.test(u))add(2,'три одинаковые буквы');else if(/([a-z])\1/.test(u))add(1.15,'две одинаковые буквы');
 if(ladder(u))add(2,'лесенка');
 // цифры
 var yr=/(19|20)\d\d$/.test(u),pat=true;
 if(/(\d)\1{3}/.test(u))add(3,'четыре одинаковые цифры');
 else if(/(777|888|999|000|007)/.test(u))add(2,'красивые цифры');
 else if(/(\d)\1{2}/.test(u))add(1.5,'три одинаковые цифры');
 else if(/(\d)\1/.test(u))add(1.2,'две одинаковые цифры');
 else pat=false;
 if(yr)add(1.5,'год');
 else if(!pat&&dg>=4&&!ladder(u))add(.8,'много цифр');
 if(u.indexOf('_')>=0)add(.9,'подчёркивание');
 return{m:m,tags:tg,parts:pr}}
// Бонус прокрутки: после того как выпал ник, выпадает множитель, на который умножается его цена
var BONUS=[{k:1,w:46},{k:1.5,w:22},{k:2,w:15},{k:3,w:9},{k:5,w:4.5},{k:10,w:2.2},{k:25,w:1},{k:100,w:.3}];
function rollBonus(){var s=0,r,i;BONUS.forEach(function(b){s+=b.w});r=Math.random()*s;for(i=0;i<BONUS.length;i++){r-=BONUS[i].w;if(r<=0)return BONUS[i].k}return 1}
function bonusOf(r){return r&&r.k>1?r.k:1}
function bonusColor(k){return k>=100?'#ffd700':k>=25?'#ff3b30':k>=10?'#ff9500':k>=5?'#a855f7':k>=2?'#3b82f6':k>1?'#34c759':'#8e8e93'}
function worthNoBonus(r){return Math.max(1,Math.round((r.base!=null?r.base:tier(r.tier).pts)*mult(r.u).m))}
function worth(r){return Math.max(1,Math.round((r.base!=null?r.base:tier(r.tier).pts)*mult(r.u).m*bonusOf(r)))}
function multText(r){var x=mult(r.u),b=r.base!=null?r.base:tier(r.tier).pts,k=bonusOf(r),pp=x.parts.slice();if(k>1)pp.push(['бонус',k]);if(!pp.length)return 'Цена: '+money(b);return 'Цена: '+money(b)+' '+pp.map(function(p){return '× '+fm(p[1])+' '+p[0]}).join(' ')+' = '+money(worth(r))}
function mxParts(r){var p=mult(r.u).parts.slice(),k=bonusOf(r);if(k>1)p.push(['бонус',k]);return p}
function mxTotal(r){return mult(r.u).m*bonusOf(r)}
// Панель множителей под ником: каждый фактор отдельной плашкой, внизу итог (всё перемножается)
function mxHtml(r,anim){if(!r)return '';var p=mxParts(r),tot=mxTotal(r),col=bonusColor(tot);
 if(!p.length)return '<div class="mxe">без множителей</div>';
 return '<div class="mxrow">'+p.map(function(x,i){var b=x[0]=='бонус';return '<span class="mxc'+(b?' bn':'')+(anim?' in':'')+'" style="'+(b?'color:'+bonusColor(x[1])+';':'')+(anim?'animation-delay:'+(i*120)+'ms':'')+'"><i>'+x[0]+'</i><b>×'+fm(x[1])+'</b></span>'}).join('')+'</div>'+
  '<div class="mxt'+(anim?' in':'')+(tot>=10?' hot':'')+'" style="color:'+col+(anim?';animation-delay:'+(p.length*120)+'ms':'')+'"><small>общий множитель</small><b>×'+fm(tot)+'</b></div>'}
function mx(u){var m=mult(u).m;return m>1?' · ×'+fm(m):''}
