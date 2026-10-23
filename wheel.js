// Колесо фортуны: попытки копятся (1 за 5 часов, до лимита), купленные не сгорают
var WBUSY=false,WA_=null;
function wcap(){return isPrem()?5:3}
function wheelSync(){if(S.wt===undefined){S.wt=(Date.now()-(S.wheelAt||0)>=wheelMs())?1:0;S.wl=S.wt?Date.now():(S.wheelAt||Date.now())}
 var ms=wheelMs(),now=Date.now(),cap=wcap();
 if(S.wt>=cap){S.wl=now;return}
 var k=Math.floor((now-S.wl)/ms);if(k>0){S.wt=Math.min(cap,S.wt+k);S.wl+=k*ms;if(S.wt>=cap)S.wl=now}}
function wheelReady(){wheelSync();return S.wt>0}
function wheelLeft(){wheelSync();if(S.wt>=wcap())return '';var t=Math.max(0,Math.ceil((wheelMs()-(Date.now()-S.wl))/60000));return Math.floor(t/60)+' ч '+(t%60)+' мин'}
function prizeText(p){return p.t=='star'?money(p.v):p.t=='luck'?'удача ×3 на '+p.v+' прокруток':p.t=='free'?'бесплатная прокрутка':tonF(p.v)+' TON'}
function prizeChance(p){var tot=WHEEL.reduce(function(a,b){return a+b.w},0),v=p.w/tot*100;return (v<10?String(Math.round(v*10)/10):String(Math.round(v))).replace('.',',')+'%'}
var WG={luck:'<circle cx="9" cy="9" r="3.4"/><circle cx="15" cy="9" r="3.4"/><circle cx="9" cy="14.6" r="3.4"/><circle cx="15" cy="14.6" r="3.4"/>',
 free:'<path d="M3 8h18v3a2 2 0 0 0 0 4v3H3v-3a2 2 0 0 0 0-4z"/>',
 ton:'<path d="M6 5h12l4 6-10 11L2 11z"/>'};
function wheelSvg(){var n=WHEEL.length,st=360/n,p='',tx='';
 for(var i=0;i<n;i++){var a=-90+i*st,s=(a-st/2)*Math.PI/180,e=(a+st/2)*Math.PI/180,x1=100+96*Math.cos(s),y1=100+96*Math.sin(s),x2=100+96*Math.cos(e),y2=100+96*Math.sin(e),mx=100+64*Math.cos(a*Math.PI/180),my=100+64*Math.sin(a*Math.PI/180),pr=WHEEL[i];
  p+='<path d="M100 100L'+x1.toFixed(2)+' '+y1.toFixed(2)+'A96 96 0 0 1 '+x2.toFixed(2)+' '+y2.toFixed(2)+'Z" fill="'+pr.c+'" stroke="var(--grp)" stroke-width="2.5"/>';
  tx+=pr.t=='star'?'<text transform="translate('+mx.toFixed(1)+' '+my.toFixed(1)+') rotate('+(a+90)+')" text-anchor="middle" dominant-baseline="middle" font-size="15" font-weight="800" fill="#fff">'+abbr(pr.v)+'</text>':'<g fill="#fff" transform="translate('+mx.toFixed(1)+' '+my.toFixed(1)+') rotate('+(a+90)+') scale(.85) translate(-12 -12)">'+WG[pr.t]+'</g>'}
 return '<div class="wheelwrap"><svg class="wptr" viewBox="0 0 24 24" width="30" height="30"><path d="M4 3h16l-8 17z" fill="var(--text)" stroke="var(--grp)" stroke-width="2" stroke-linejoin="round"/></svg><svg id="wheelsvg" viewBox="0 0 200 200" class="wheel" style="transform:rotate('+(S.wrot||0)+'deg)">'+p+tx+'<circle cx="100" cy="100" r="13" fill="var(--grp)"/><circle cx="100" cy="100" r="5" fill="var(--text)"/></svg></div>'}
function wheelHtml(){wheelSync();var n=S.wt,cap=wcap(),rd=n>0,tot=Math.max(cap,n),pips='';WA_=rd+':'+n;
 for(var i=0;i<tot;i++)pips+='<i class="'+(i<n?'on':'')+'"></i>';
 return '<div class="wtop2"><div class="wpips">'+pips+'</div><div class="wcnt"><b>'+n+'</b><small>'+(n<cap?'попыток · +1 через <span id="wtimer">'+wheelLeft()+'</span>':'попыток · максимум '+cap+' (купленные сверх лимита не сгорают)')+'</small></div></div>'+wheelSvg()+
  '<button class="pbtn" style="width:100%;margin-top:4px;'+(rd?'':'opacity:.5')+'" '+(rd?'data-act="wheel"':'disabled')+'>Крутить</button>'+
  '<div class="sec">Призы</div><div class="grp">'+WHEEL.map(function(p){return '<div class="go"><span style="width:12px;height:12px;border-radius:50%;background:'+p.c+';flex:none"></span><span>'+prizeText(p)+'</span><small>'+prizeChance(p)+'</small></div>'}).join('')+'</div><div class="foot">Одна попытка копится раз в '+(isPrem()?'3 часа (Premium)':'5 часов'+'')+'. Лимит накопления: '+cap+'.</div>'}
function spinWheel(){if(WBUSY||!wheelReady())return;WBUSY=true;
 var p=SRV()?srvRun('wheelRoll',[],{raw:true}):Promise.resolve({res:wheelRoll(),msgs:[]});
 p.then(function(o){var r=o&&o.res;if(!r||r.err){WBUSY=false;if(o&&o.err)toast('Нет связи с сервером');draw();return}
  var w=document.getElementById('wheelsvg');if(w){w.style.transition='transform 4.6s cubic-bezier(.12,.7,.1,1)';w.style.transform='rotate('+r.tgt+'deg)'}
  var tk=setInterval(function(){hap({type:'selection_change'})},260);
  setTimeout(function(){clearInterval(tk);WBUSY=false;hap({type:'notification',notification_type:'success'});toast('Выигрыш: '+r.prize);(o.msgs||[]).forEach(function(m){toast(m)});if(scr=='wheel')draw()},4700)})}
