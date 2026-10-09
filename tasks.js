// Ежедневные задания и бонус дня
function tqE(){var k=dk(new Date());if(!S.tq||S.tq.day!=k)S.tq={day:k,p:{},c:{}}}
function tq(id,n){tqE();var t=TASKS.filter(function(x){return x.id==id})[0];if(!t)return;S.tq.p[id]=Math.min(t.goal,(S.tq.p[id]||0)+(n||1));save()}
function allClaimed(){return TASKS.every(function(t){return S.tq.c[t.id]})}
function claimable(){tqE();var n=0;TASKS.forEach(function(t){if((S.tq.p[t.id]||0)>=t.goal&&!S.tq.c[t.id])n++});if(allClaimed()&&!S.tq.c.chest)n++;return n}
function chestInfo(){var y=new Date();y.setDate(y.getDate()-1);var n=(S.lastChest==dk(y))?(S.streak||0)+1:1;return{n:n,rew:200+50*(Math.min(n,7)-1)}}
function streakNow(){var y=new Date();y.setDate(y.getDate()-1);return(S.lastChest==dk(new Date())||S.lastChest==dk(y))?(S.streak||0):0}
function dayLeft(){var n=new Date(),m=new Date(n);m.setHours(24,0,0,0);var t=Math.floor((m-n)/60000);return Math.floor(t/60)+' ч '+(t%60)+' мин'}
