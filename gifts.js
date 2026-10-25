// Подарки за TON (картинки из репозитория nft-grade). Хранятся в S.gf = [{g, n, ts}], продаются игрокам на маркете.
var GF_MAX=60,GF_SELL=.7;
var GIFTS=[['candy-cane','Candy Cane',.05],['jelly-bunny','Jelly Bunny',.06],['fresh-socks','Fresh Socks',.08],['ginger-cookie','Ginger Cookie',.1],['astral-shard','Astral Shard',.15],['love-potion','Love Potion',.2],['chill-flame','Chill Flame',.25],['spy-agaric','Spy Agaric',.3],['scared-cat','Scared Cat',.35],['durovs-cap','Durov’s Cap',.6],['witch-hat','Witch Hat',.8],['ion-gem','Ion Gem',1],['hex-pot','Hex Pot',1.2],['loot-bag','Loot Bag',2],['mini-oscar','Mini Oscar',3],['plush-pepe','Plush Pepe',5],['heroic-helmet','Heroic Helmet',8]];
function gInfo(id){for(var i=0;i<GIFTS.length;i++)if(GIFTS[i][0]==id)return{id:id,name:GIFTS[i][1],ton:GIFTS[i][2],ix:i};return null}
function gColor(ix){return ix>=14?'#ffd54a':ix>=9?'#a78bfa':ix>=4?'#2aabee':'#7f91a4'}
function gfFull(){return (S.gf||[]).length>=GF_MAX}
function gfNew(id){return{g:id,n:Date.now().toString(36)+Math.random().toString(36).slice(2,7),ts:Date.now()}}
function buyGift(id){var g=gInfo(id);if(!g)return{err:'item'};if(gfFull()){toast('Слишком много подарков: '+GF_MAX+'/'+GF_MAX);return{err:'full'}}
 if((S.ton||0)<g.ton){toast('Не хватает TON');return{err:'poor'}}
 S.ton=r3((S.ton||0)-g.ton);S.gf=S.gf||[];S.gf.unshift(gfNew(id));led('Подарок '+g.name);save();toast('🎁 '+g.name+' куплен');return{ok:1}}
function sellGift(n){var it=(S.gf||[]).filter(function(x){return x.n==n})[0];if(!it)return{err:'item'};var g=gInfo(it.g);if(!g)return{err:'item'};
 var v=r3(g.ton*GF_SELL);S.gf=S.gf.filter(function(x){return x!==it});S.ton=r3((S.ton||0)+v);led('Продан подарок '+g.name);save();toast('Продано: '+g.name+' · +'+tonF(v)+' TON');return{ok:1,v:v}}
