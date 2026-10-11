// Настройки игры: редкости, словари, диапазоны, курс, задания
var TIERS=[
 {id:'common',name:'обычный',icon:'⚪',color:'#9e9e9e',w:55,pts:1},
 {id:'norm',name:'необычный',icon:'🟢',color:'#34c759',w:25,pts:3},
 {id:'rare',name:'редкий',icon:'🔵',color:'#3b82f6',w:12,pts:10},
 {id:'epic',name:'эпический',icon:'🟣',color:'#a855f7',w:5,pts:30},
 {id:'legend',name:'легендарный',icon:'🟠',color:'#ff9500',w:2,pts:100},
 {id:'mythic',name:'мифический',icon:'🔴',color:'#ff3b30',w:0.8,pts:500},
 {id:'divine',name:'божественный',icon:'🌟',color:'#ffd700',w:0.2,pts:2000}
];
var NAMES=['alexander','dmitry','sergey','andrew','michael','nikolay','vladimir','natalia','svetlana','victoria','daniel','kirill','eugene','maxim','artem','olivia','sophia','natasha'];
var SURN=['ivanov','petrov','smirnov','volkov','kuznetsov','popov','sokolov','morozov'];
var SHORTN=['max','alex','anna','ivan','oleg','lena','dima','mike','sam','nick','kate','john','olga'];
var WORDS=['fox','wolf','king','neo','sun','moon','lion','star','fire','ice','cat','god','zen','sky','wave','gold','ace','boss'];
var DIVINE=['dubai','moscow','london','paris','bitcoin','crypto','tokyo','nft','casino','elon'];
var BOTS=[['crypto_king',4200],['neo_wolf',1800],['dubai_boss',900],['lena_star',350],['max_ivanov_99',60]];
var RATE=50000;
var RNG={common:[1,5],norm:[5,20],rare:[20,80],epic:[80,300],legend:[300,1000],mythic:[1000,5000],divine:[5000,20000]};
var TASKS=[{id:'spin10',title:'Сделай 10 прокруток',goal:10,rew:50},{id:'keep3',title:'Оставь 3 ника в коллекции',goal:3,rew:40},{id:'sell5',title:'Продай 5 ников',goal:5,rew:40},{id:'rare1',title:'Выбей редкий ник или выше',goal:1,rew:150},{id:'bid1',title:'Сделай ставку на аукционе',goal:1,rew:30},{id:'list1',title:'Выставь ник на аукцион',goal:1,rew:30}];
var COST=100;
var WHEEL_MS=5*3600*1000;
var WHEEL=[
 {id:'s50',lb:'50⭐',c:'#ff9f0a',w:28,t:'star',v:50},
 {id:'s150',lb:'150⭐',c:'#34c759',w:27,t:'star',v:150},
 {id:'gift',lb:'🎁',c:'#2AABEE',w:9,t:'gift',v:1},
 {id:'luck',lb:'🍀',c:'#a855f7',w:12,t:'luck',v:10},
 {id:'free',lb:'🎟',c:'#ff5d8f',w:12,t:'free',v:1},
 {id:'s1000',lb:'1к⭐',c:'#ffc83d',w:7,t:'star',v:1000},
 {id:'ton',lb:'💎',c:'#4f9bff',w:2.5,t:'ton',v:0.005},
 {id:'s5000',lb:'5к⭐',c:'#ff3b30',w:2.5,t:'star',v:5000}];
var XPT={common:1,norm:2,rare:5,epic:15,legend:40,mythic:100,divine:300};
