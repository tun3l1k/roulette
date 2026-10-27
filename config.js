// Настройки игры: редкости, словари, диапазоны, курс, задания
var APP_VER='2.4.2';
var NEWS_URL='https://t.me/UsernameRouletteNews',SUPPORT_URL='https://t.me/TUN3L';
var PAY_LIVE=false; // true, когда подключена настоящая оплата Telegram Stars
var TIERS=[
 {id:'common',name:'обычный',icon:'⚪',color:'#9e9e9e',bd:['#8794a8','#3b4658'],w:52,pts:3},
 {id:'norm',name:'необычный',icon:'🟢',color:'#34c759',bd:['#46c27d','#17673f'],w:25,pts:9},
 {id:'rare',name:'редкий',icon:'🔵',color:'#3b82f6',bd:['#5a9bff','#1d3f99'],w:12.5,pts:21},
 {id:'epic',name:'эпический',icon:'🟣',color:'#a855f7',bd:['#b57bff','#4f2196'],w:6.5,pts:36},
 {id:'legend',name:'легендарный',icon:'🟠',color:'#ff9500',bd:['#ffb04a','#b24a0c'],w:3,pts:66},
 {id:'mythic',name:'мифический',icon:'🔴',color:'#ff3b30',bd:['#ff6a5c','#8f1515'],w:0.8,pts:135},
 {id:'divine',name:'божественный',icon:'🌟',color:'#ffd700',bd:['#ffd75a','#b8560a'],w:0.2,pts:520}
];
var BOTS=[['crypto_king',4200],['neo_wolf',1800],['dubai_boss',900],['lena_star',350],['max_ivanov_99',60]];
var RATE=50000;
var RNG={common:[2,5],norm:[5,15],rare:[10,32],epic:[16,55],legend:[30,100],mythic:[61,207],divine:[234,796]};
var TASKS=[{id:'spin10',title:'Сделай 10 прокруток',goal:10,rew:50,ic:'repeat'},{id:'keep3',title:'Оставь 3 ника в коллекции',goal:3,rew:40,ic:'plus'},{id:'sell5',title:'Продай 5 ников',goal:5,rew:40,ic:'tag'},{id:'rare1',title:'Выбей редкий ник',goal:1,rew:150,ic:'star'},{id:'bid1',title:'Сделай ставку на аукционе',goal:1,rew:30,ic:'hammer'},{id:'list1',title:'Выставь ник на маркет',goal:1,rew:30,ic:'list'},{id:'wheel',title:'Крутани колесо фортуны',goal:1,rew:60,ic:'wheel'}];
var WTASKS=[{id:'w_spin',ev:'spin10',title:'Сделай 100 прокруток',goal:100,rew:600,ic:'repeat'},{id:'w_rare',ev:'rare1',title:'Выбей 5 редких ников',goal:5,rew:1000,ic:'star'},{id:'w_sell',ev:'sell5',title:'Продай 30 ников',goal:30,rew:700,ic:'tag'},{id:'w_bid',ev:'bid1',title:'Сделай 5 ставок',goal:5,rew:500,ic:'hammer'},{id:'w_wheel',ev:'wheel',title:'Крутани колесо 3 раза',goal:3,rew:500,ic:'wheel'}];
var COST=100,COLL_MAX=50; // COLL_MAX: сколько ников помещается в коллекции
var LUCK_F=1.5,LUCK_COST=300; // удача: множитель шанса редких и цена за 10 прокруток (подобрано так, чтобы не окупаться)
var WHEEL_MS=5*3600*1000;
var WHEEL=[
 {id:'s50',c:'#5ac8fa',w:28,t:'star',v:50},
 {id:'s150',c:'#34c759',w:27,t:'star',v:150},
 {id:'luck',c:'#a259f7',w:12,t:'luck',v:10},
 {id:'free',c:'#ff5d8f',w:12,t:'free',v:1},
 {id:'s1000',c:'#ffb020',w:7,t:'star',v:1000},
 {id:'ton',c:'#0098ea',w:2.5,t:'ton',v:0.005},
 {id:'s5000',c:'#ff6a5f',w:2.5,t:'star',v:5000}];
var XPT={common:1,norm:2,rare:5,epic:15,legend:40,mythic:100,divine:300};
