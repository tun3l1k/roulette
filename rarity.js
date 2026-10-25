// Математика редкости и цены: шансы, множители, оценка ника
function tier(id){return TIERS.filter(function(t){return t.id==id})[0]}
function ti(id){return TIERS.indexOf(tier(id))}
function level(){return Math.floor(Math.sqrt(S.xp/25))+1}
function lf(){return Math.max(S.luck>0?LUCK_F:1,S.pity||1)}
function noteBest(r){if(!r)return;if(!S.best||worth(r)>worth(S.best))S.best={u:r.u,tier:r.tier,base:r.base,k:r.k,odds:r.odds,ts:r.ts||Date.now()}}
function pickTier(){var w=TIERS.map(function(t,i){return t.w*(i>=2?lf():1)}),sum=w.reduce(function(a,b){return a+b},0),r=Math.random()*sum;for(var i=0;i<w.length;i++){r-=w[i];if(r<=0)return TIERS[i]}return TIERS[0]}
function oddsOf(t){var w=TIERS.map(function(x,i){return x.w*(i>=2?lf():1)}),sum=w.reduce(function(a,b){return a+b},0);return Math.round(sum/(t.w*(TIERS.indexOf(t)>=2?lf():1)))}
function baseFor(id){var g=RNG[id];return Math.round(g[0]+Math.pow(Math.random(),1.4)*(g[1]-g[0]))}
function mult(u){var m=1,tg=[],pr=[],n=u.length;
 function add(x,lb){m*=x;tg.push(lb);pr.push([lb,x])}
 if(NSET.d[u])add(5,'топ-слово');else if(NSET.w[u])add(2,'слово');else if(NSET.n[u])add(1.5,'имя');
 if(n<=3)add(3,'короткий');else if(n==4)add(2,'короткий');
 if(n>=3&&u===u.split('').reverse().join(''))add(2,'зеркало');
 if(/(777|888|999|000|007|123|321)/.test(u))add(2,'красивые цифры');
 else if(/(\d)\1{2,}/.test(u))add(1.5,'ровные цифры');
 if(n==1)add(5,'одна буква');else if(/^([a-z])\1+$/.test(u))add(3,'повтор буквы');else if(n>=4&&/^(..)\1+$/.test(u))add(1.5,'ритм');
 if(/(19|20)\d\d$/.test(u))add(1.5,'год');
 return{m:m,tags:tg,parts:pr}}
// Бонус прокрутки: после того как выпал ник, выпадает множитель, на который умножается его цена
var BONUS=[{k:1,w:46},{k:1.5,w:22},{k:2,w:15},{k:3,w:9},{k:5,w:4.5},{k:10,w:2.2},{k:25,w:1},{k:100,w:.3}];
function rollBonus(){var s=0,r,i;BONUS.forEach(function(b){s+=b.w});r=Math.random()*s;for(i=0;i<BONUS.length;i++){r-=BONUS[i].w;if(r<=0)return BONUS[i].k}return 1}
function bonusOf(r){return r&&r.k>1?r.k:1}
function bonusColor(k){return k>=100?'#ffd700':k>=25?'#ff3b30':k>=10?'#ff9500':k>=5?'#a855f7':k>=2?'#3b82f6':k>1?'#34c759':'#8e8e93'}
function worthNoBonus(r){return Math.max(1,Math.round((r.base!=null?r.base:tier(r.tier).pts)*mult(r.u).m))}
function worth(r){return Math.max(1,Math.round((r.base!=null?r.base:tier(r.tier).pts)*mult(r.u).m*bonusOf(r)))}
function multText(r){var x=mult(r.u),b=r.base!=null?r.base:tier(r.tier).pts,k=bonusOf(r),pp=x.parts.slice();if(k>1)pp.push(['бонус',k]);if(!pp.length)return 'Цена: '+money(b);return 'Цена: '+money(b)+' '+pp.map(function(p){return '× '+fm(p[1])+' '+p[0]}).join(' ')+' = '+money(worth(r))}
function mx(u){var m=mult(u).m;return m>1?' · ×'+fm(m):''}
