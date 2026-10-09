// Мелкие помощники: случайность, форматирование, тосты, тема
function rnd(a){return a[Math.floor(Math.random()*a.length)]}
function ri(a,b){return a+Math.floor(Math.random()*(b-a+1))}
var V='aeiou',C='bcdfghklmnprstvz';
function pron(n){var s='';for(var i=0;i<n;i++)s+=(i%2?rnd(V):rnd(C));return s}
function $(i){return document.getElementById(i)}
function fmt(n){return String(n).replace(/\B(?=(\d{3})+(?!\d))/g,' ')}
function r3(x){return Math.round(x*1000)/1000}
function tonF(v){return v.toFixed(3).replace(/0+$/,'').replace(/\.$/,'').replace('.',',')}
function toast(m){var t=$('toast');t.textContent=m;t.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(function(){t.classList.remove('show')},2400)}
function theme(){var r=document.documentElement;if(S.theme=='auto')r.removeAttribute('data-theme');else r.setAttribute('data-theme',S.theme)}
function esc(t){return String(t).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function fm(m){return String(Math.round(m*10)/10).replace('.',',')}
function dt(ts){var d=new Date(ts);return ('0'+d.getDate()).slice(-2)+'.'+('0'+(d.getMonth()+1)).slice(-2)+' '+('0'+d.getHours()).slice(-2)+':'+('0'+d.getMinutes()).slice(-2)}
function dk(d){return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()}
function tleft(ms){var t=Math.max(0,Math.ceil(ms/1000));return Math.floor(t/60)+':'+('0'+t%60).slice(-2)}
