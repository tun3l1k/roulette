// Мелкие помощники: случайность, форматирование, тосты, тема
function rnd(a){return a[Math.floor(Math.random()*a.length)]}
function ri(a,b){return a+Math.floor(Math.random()*(b-a+1))}
var V='aeiou',C='bcdfghklmnprstvz';
function pron(n){var s='';for(var i=0;i<n;i++)s+=(i%2?rnd(V):rnd(C));return s}
function $(i){return document.getElementById(i)}
function fmt(n){return String(n).replace(/\B(?=(\d{3})+(?!\d))/g,' ')}
function r3(x){return Math.round(x*1000)/1000}
function tonF(v){return v.toFixed(3).replace(/0+$/,'').replace(/\.$/,'').replace('.',',')}
var TQ_=[],TB_=false;
function toast(m){TQ_.push(m);if(TQ_.length>4)TQ_.shift();if(!TB_)nextToast()}
function nextToast(){var m=TQ_.shift();if(m===undefined){TB_=false;return}TB_=true;var t=$('toast');t.textContent=m;t.classList.add('show');setTimeout(function(){if(TQ_.length)nextToast();else{t.classList.remove('show');TB_=false}},TQ_.length?1500:2400)}
function abbr(n){n=Math.round(n);if(n<1000)return String(n);var U=[[1e12,'трлн'],[1e9,'млрд'],[1e6,'м'],[1e3,'к']];
 for(var i=0;i<U.length;i++){if(n>=U[i][0]){var v=n/U[i][0],s=v<10?Math.floor(v*100+1e-9)/100:v<100?Math.floor(v*10+1e-9)/10:Math.floor(v);return String(s).replace('.',',')+U[i][1]}}return String(n)}
function theme(){var r=document.documentElement;if(S.theme=='auto')r.removeAttribute('data-theme');else r.setAttribute('data-theme',S.theme)}
function esc(t){return String(t).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function fm(m){return String(Math.round(m*10)/10).replace('.',',')}
function dt(ts){var d=new Date(ts);return ('0'+d.getDate()).slice(-2)+'.'+('0'+(d.getMonth()+1)).slice(-2)+' '+('0'+d.getHours()).slice(-2)+':'+('0'+d.getMinutes()).slice(-2)}
function dk(d){return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()}
function tleft(ms){var t=Math.max(0,Math.ceil(ms/1000));return Math.floor(t/60)+':'+('0'+t%60).slice(-2)}
