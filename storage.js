// Сохранение прогресса (localStorage) и состояние игры
function load(k,d){try{var v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}}
function save(){try{localStorage.setItem('ur3',JSON.stringify(S))}catch(e){}}
var S=load('ur3',{coll:[],hist:[],spins:0,yuz:10000,g1:1,xp:0,main:null,luck:0,theme:'auto'});
var cur=null,busy=false,scr='home';
