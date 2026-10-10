// Колесо фортуны: одна попытка раз в 5 часов
var WBUSY=false,WA_=null;
function wheelReady(){return Date.now()-(S.wheelAt||0)>=wheelMs()}
function wheelLeft(){var t=Math.max(0,Math.ceil((wheelMs()-(Date.now()-(S.wheelAt||0)))/60000));return Math.floor(t/60)+' ч '+(t%60)+' мин'}
function prizeText(p){return p.t=='star'?money(p.v):p.t=='luck'?'удача ×3 на '+p.v+' прокруток':p.t=='free'?'бесплатная прокрутка':tonF(p.v)+' TON'}
function wheelSvg(){var n=WHEEL.length,st=360/n,p='',tx='';
 for(var i=0;i<n;i++){var a=-90+i*st,s=(a-st/2)*Math.PI/180,e=(a+st/2)*Math.PI/180,x1=100+95*Math.cos(s),y1=100+95*Math.sin(s),x2=100+95*Math.cos(e),y2=100+95*Math.sin(e),mx=100+62*Math.cos(a*Math.PI/180),my=100+62*Math.sin(a*Math.PI/180);
  p+='<path d="M100 100L'+x1.toFixed(2)+' '+y1.toFixed(2)+'A95 95 0 0 1 '+x2.toFixed(2)+' '+y2.toFixed(2)+'Z" fill="'+WHEEL[i].c+'" stroke="#fff" stroke-opacity=".55" stroke-width="1.5"/>';
  tx+='<text x="0" y="0" transform="translate('+mx.toFixed(1)+' '+my.toFixed(1)+') rotate('+(a+90)+')" text-anchor="middle" dominant-baseline="middle" font-size="14" font-weight="800" fill="#fff">'+WHEEL[i].lb+'</text>'}
 return '<div class="wheelwrap"><svg class="wptr" viewBox="0 0 24 24" width="34" height="34"><path d="M4 4h16l-8 17z" fill="#fff" stroke="#e53935" stroke-width="1.6" stroke-linejoin="round"/></svg><svg id="wheelsvg" viewBox="0 0 200 200" class="wheel" style="transform:rotate('+(S.wrot||0)+'deg)"><circle cx="100" cy="100" r="98" fill="#1b2a4e"/>'+p+tx+'<circle cx="100" cy="100" r="14" fill="#fff" stroke="#3b1d6e" stroke-width="3"/></svg></div>'}
function wheelHtml(){var rd=wheelReady();WA_=rd;
 return wheelSvg()+'<div class="wmeta">'+(rd?'<button class="pbtn" style="width:100%" data-act="wheel">Крутить колесо</button>':'<button class="pbtn" style="width:100%;opacity:.55" disabled>Следующая попытка через <span id="wtimer">'+wheelLeft()+'</span></button>')+'</div>'+
 '<div class="sec">Призы</div><div class="grp">'+WHEEL.map(function(p){return '<div class="go"><span style="width:12px;height:12px;border-radius:50%;background:'+p.c+';flex:none"></span><span>'+p.lb+' '+prizeText(p)+'</span></div>'}).join('')+'</div><div class="foot">Одна попытка раз в '+(isPrem()?'3 часа (Premium)':'5 часов')+'</div>'}
function spinWheel(){if(!wheelReady()||WBUSY)return;var tot=WHEEL.reduce(function(a,b){return a+b.w},0),r=Math.random()*tot,k=0;
 for(var i=0;i<WHEEL.length;i++){r-=WHEEL[i].w;if(r<=0){k=i;break}}
 var pr=WHEEL[k],st=360/WHEEL.length,prev=S.wrot||0;S.wheelAt=Date.now();
 if(pr.t=='star')S.yuz+=pr.v;else if(pr.t=='luck')S.luck=(S.luck||0)+pr.v;else if(pr.t=='free')S.free=(S.free||0)+pr.v;else if(pr.t=='ton')S.ton=r3((S.ton||0)+pr.v);led('Колесо фортуны');
 var delta=(((-k*st-prev)%360)+360)%360+360*5,tgt=prev+delta+(Math.random()*st*.6-st*.3);S.wrot=((tgt%360)+360)%360;save();WBUSY=true;
 var w=document.getElementById('wheelsvg');if(w){w.style.transition='transform 4.6s cubic-bezier(.12,.7,.1,1)';w.style.transform='rotate('+tgt+'deg)'}
 var tk=setInterval(function(){hap({type:'selection_change'})},260);
 setTimeout(function(){clearInterval(tk);WBUSY=false;hap({type:'notification',notification_type:'success'});toast('🎡 Выигрыш: '+prizeText(pr));if(scr=='wheel')draw()},4700)}
