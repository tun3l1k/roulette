// Колесо фортуны: попытки копятся (1 за 5 часов, до лимита), купленные не сгорают
var WBUSY=false,WA_=null;
function wcap(){return isPrem()?5:3}
function wheelSync(){if(S.wt===undefined){S.wt=(Date.now()-(S.wheelAt||0)>=wheelMs())?1:0;S.wl=S.wt?Date.now():(S.wheelAt||Date.now())}
 var ms=wheelMs(),now=Date.now(),cap=wcap();
 if(S.wt>=cap){S.wl=now;return}
 var k=Math.floor((now-S.wl)/ms);if(k>0){S.wt=Math.min(cap,S.wt+k);S.wl+=k*ms;if(S.wt>=cap)S.wl=now}}
function wheelReady(){wheelSync();return S.wt>0}
function wheelLeft(){wheelSync();if(S.wt>=wcap())return '';var t=Math.max(0,Math.ceil((wheelMs()-(Date.now()-S.wl))/60000));return Math.floor(t/60)+' ч '+(t%60)+' мин'}
function prizeText(p){return p.t=='star'?money(p.v):p.t=='luck'?'удача ×3 на '+p.v+' прокруток':p.t=='free'?'бесплатная прокрутка':p.t=='gift'?'случайный NFT-подарок':tonF(p.v)+' TON'}
function prizeChance(p){var tot=WHEEL.reduce(function(a,b){return a+b.w},0),v=p.w/tot*100;return (v<10?String(Math.round(v*10)/10):String(Math.round(v))).replace('.',',')+'%'}
var WG={luck:'<circle cx="9" cy="9" r="3.4"/><circle cx="15" cy="9" r="3.4"/><circle cx="9" cy="14.6" r="3.4"/><circle cx="15" cy="14.6" r="3.4"/>',
 free:'<path d="M3 8h18v3a2 2 0 0 0 0 4v3H3v-3a2 2 0 0 0 0-4z"/>',
 gift:'<rect x="3" y="9" width="18" height="12" rx="1.5"/><rect x="2" y="6" width="20" height="4" rx="1"/><path d="M12 6c-2-4-6-3-5 0M12 6c2-4 6-3 5 0" fill="none" stroke="#fff" stroke-width="2"/>',
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
function spinWheel(){wheelSync();if(S.wt<=0||WBUSY)return;var tot=WHEEL.reduce(function(a,b){return a+b.w},0),r=Math.random()*tot,k=0;
 for(var i=0;i<WHEEL.length;i++){r-=WHEEL[i].w;if(r<=0){k=i;break}}
 if(S.wt>=wcap())S.wl=Date.now();S.wt--;
 var pr=WHEEL[k],st=360/WHEEL.length,prev=S.wrot||0;S.wheelAt=Date.now();
 if(pr.t=='star')S.yuz+=pr.v;else if(pr.t=='luck')S.luck=(S.luck||0)+pr.v;else if(pr.t=='free')S.free=(S.free||0)+pr.v;else if(pr.t=='ton')S.ton=r3((S.ton||0)+pr.v);
 if(pr.t=='gift')giveGift(randGiftType());led('Колесо фортуны');tq('wheel');
 var delta=(((-k*st-prev)%360)+360)%360+360*5,tgt=prev+delta+(Math.random()*st*.6-st*.3);S.wrot=((tgt%360)+360)%360;save();WBUSY=true;
 var w=document.getElementById('wheelsvg');if(w){w.style.transition='transform 4.6s cubic-bezier(.12,.7,.1,1)';w.style.transform='rotate('+tgt+'deg)'}
 var tk=setInterval(function(){hap({type:'selection_change'})},260);
 setTimeout(function(){clearInterval(tk);WBUSY=false;hap({type:'notification',notification_type:'success'});toast('Выигрыш: '+prizeText(pr));if(scr=='wheel')draw()},4700)}
