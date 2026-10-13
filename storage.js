// Сохранение прогресса (localStorage) и состояние игры
function load(k,d){try{var v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}}
function save(){S.sv=Date.now();try{localStorage.setItem('ur3',JSON.stringify(S))}catch(e){}if(typeof cloudSoon=='function')cloudSoon()}
var FRESH=(function(){try{return localStorage.getItem('ur3')===null}catch(e){return true}})();
var S=load('ur3',{coll:[],hist:[],spins:0,yuz:1500,g1:1,g2:1,g3:1,xp:0,luck:0,theme:'auto'});
var cur=null,busy=false,scr='home';
