// Деньги и продажа: звёзды, TON, продажа ников
function money(n){return fmt(Math.round(n))+' ⭐'}
function cash(v,c){return c=='ton'?tonF(v)+' TON':money(v)}
function fS(n){return abbr(n)}
function fT(n){return tonF(Math.max(0,r3(n)))}
function balHtml(){return SI(16)+' '+fS(S.yuz)+((S.ton||0)>0?' &nbsp; '+TI(16)+' '+tonF(S.ton):'')}
function bulkList(){return S.coll.filter(function(c){return ti(c.tier)<=1&&mult(c.u).m<=1&&c.u!=S.main})}
function sellPending(){var sc=S.pending;if(!sc)return;var g=worth(sc);S.yuz+=g;led('Продажа @'+sc.u);tq('sell5');S.pending=null;cur=null;save();hap({type:'impact',impact_style:'light'});toast('💰 Продано @'+sc.u+' · +'+money(g));paintHome(1)}
function sellOne(u){var c=S.coll.filter(function(x){return x.u==u})[0];if(!c)return;var g=worth(c);S.yuz+=g;led('Продажа @'+u);tq('sell5');S.coll=S.coll.filter(function(x){return x.u!=u});save();hap({type:'impact',impact_style:'light'});toast('💰 Продано @'+u+' · +'+money(g));draw()}
function sellBulk(){var bl=bulkList();if(!bl.length)return;var tot=bl.reduce(function(a,c){return a+worth(c)},0);S.coll=S.coll.filter(function(c){return bl.indexOf(c)<0});S.yuz+=tot;led('Массовая продажа ('+bl.length+')');tq('sell5',bl.length);save();hap({type:'impact',impact_style:'medium'});toast('💰 Продано '+bl.length+' шт. · +'+money(tot));draw()}
