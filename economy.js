// Деньги и продажа: звёзды, TON, продажа ников
function money(n){return fmt(Math.round(n))+' ⭐'}
function cash(v,c){return c=='ton'?tonF(v)+' TON':money(v)}
function fS(n){return abbr(n)}
function fT(n){var s=tonF(Math.max(0,r3(n))),i=s.indexOf(',');return i<0?s:s.slice(0,i)+'<span class="dec">'+s.slice(i)+'</span>'}
function balHtml(){return SI(16)+' '+fS(S.yuz)+((S.ton||0)>0?' &nbsp; '+TI(16)+' '+tonF(S.ton):'')}
function collFull(){return S.coll.length>=COLL_MAX}
function keepPending(){var pk=S.pending;if(!pk)return;if(collFull()){toast('Коллекция заполнена: '+COLL_MAX+'/'+COLL_MAX+'. Продай или скрафти лишние ники');return{err:'full'}}if(!S.coll.some(function(x){return x.u==pk.u}))S.coll.unshift(pk);tq('keep3');S.pending=null;cur=null;save();paintHome(1)}
function bulkList(){return S.coll.filter(function(c){return ti(c.tier)<=1&&mult(c.u).m<=1&&c.u!=S.main})}
function sellPending(){var sc=S.pending;if(!sc)return;var g=worth(sc);S.yuz+=g;led('Продажа @'+sc.u);tq('sell5');S.pending=null;cur=null;save();hap({type:'impact',impact_style:'light'});toast('💰 Продано @'+sc.u+' · +'+money(g));paintHome(1)}
function sellOne(u){var c=S.coll.filter(function(x){return x.u==u})[0];if(!c)return;var g=worth(c);S.yuz+=g;led('Продажа @'+u);tq('sell5');S.coll=S.coll.filter(function(x){return x.u!=u});save();hap({type:'impact',impact_style:'light'});draw()}
function sellBulk(){var bl=bulkList();if(!bl.length)return;var tot=bl.reduce(function(a,c){return a+worth(c)},0);S.coll=S.coll.filter(function(c){return bl.indexOf(c)<0});S.yuz+=tot;led('Массовая продажа ('+bl.length+')');tq('sell5',bl.length);save();hap({type:'impact',impact_style:'medium'});draw()}
