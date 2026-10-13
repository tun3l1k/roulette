// Картинка для сторис: красивая карточка с ником, редкостью и ценой
function rrect(c,x,y,w,h,r){c.beginPath();c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath()}
function fitFont(c,text,maxW,start,weight){var px=start;c.font=weight+' '+px+'px -apple-system,Helvetica,Arial,sans-serif';while(c.measureText(text).width>maxW&&px>28){px-=4;c.font=weight+' '+px+'px -apple-system,Helvetica,Arial,sans-serif'}return px}
function starPath(c,cx,cy,R){c.beginPath();for(var i=0;i<10;i++){var a=-Math.PI/2+i*Math.PI/5,r=i%2?R*.45:R;c.lineTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r)}c.closePath()}
function hexA(hex,a){var n=parseInt(hex.slice(1),16);return 'rgba('+(n>>16)+','+((n>>8)&255)+','+(n&255)+','+a+')'}
function drawShare(c,o){var W=1080,H=1920,col=o.color,F='-apple-system,Helvetica,Arial,sans-serif';
 var g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,'#0e1621');g.addColorStop(1,hexA(col,.55));c.fillStyle=g;c.fillRect(0,0,W,H);
 var rg=c.createRadialGradient(540,760,40,540,760,760);rg.addColorStop(0,hexA(col,.45));rg.addColorStop(1,hexA(col,0));c.fillStyle=rg;c.fillRect(0,0,W,H);
 c.textAlign='center';c.textBaseline='middle';
 c.fillStyle='rgba(255,255,255,.7)';c.font='600 38px '+F;c.fillText('Ю З Е Р О К :   Р У Л Е Т К А',540,150);
 rrect(c,90,330,900,1040,64);c.fillStyle='rgba(255,255,255,.08)';c.fill();c.lineWidth=4;c.strokeStyle=hexA(col,.85);c.stroke();
 var ag=c.createLinearGradient(430,430,650,650);ag.addColorStop(0,col);ag.addColorStop(1,hexA(col,.55));
 c.beginPath();c.arc(540,520,110,0,Math.PI*2);c.fillStyle=ag;c.fill();c.fillStyle='#fff';c.font='800 120px '+F;c.fillText(o.initial,540,528);
 var t='@'+o.nick;fitFont(c,t,800,120,'800');c.fillStyle='#fff';c.fillText(t,540,740);
 c.font='700 44px '+F;var tw=c.measureText(o.tierName).width+80;rrect(c,540-tw/2,830,tw,84,42);c.fillStyle=col;c.fill();c.fillStyle='#fff';c.fillText(o.tierName,540,873);
 var chips=o.mults.slice(0,4),y=980;
 if(chips.length){c.font='600 36px '+F;var ws=chips.map(function(x){return c.measureText(x).width+48}),tot=ws.reduce(function(a,b){return a+b},0)+16*(chips.length-1),x=540-tot/2;
  chips.forEach(function(s,i){rrect(c,x,y-34,ws[i],68,34);c.fillStyle='rgba(255,255,255,.16)';c.fill();c.fillStyle='#fff';c.textAlign='left';c.fillText(s,x+24,y+2);c.textAlign='center';x+=ws[i]+16})}
 starPath(c,380,1180,50);c.fillStyle='#ffc83d';c.fill();
 var p=o.price;fitFont(c,p,520,120,'800');c.fillStyle='#fff';c.textAlign='left';c.fillText(p,450,1186);c.textAlign='center';
 c.fillStyle='rgba(255,255,255,.55)';c.font='500 34px '+F;c.fillText(o.formula,540,1290);
 c.fillStyle='#fff';c.font='700 52px '+F;c.fillText(o.who,540,1500);
 c.fillStyle='rgba(255,255,255,.7)';c.font='500 40px '+F;c.fillText('Попробуй и ты!',540,1590);
 rrect(c,150,1650,780,110,55);c.fillStyle='rgba(42,171,238,.95)';c.fill();var ln=o.link;fitFont(c,ln,700,44,'700');c.fillStyle='#fff';c.fillText(ln,540,1706);
 return c}
function shareInfo(rec){var t=tier(rec.tier),m=mult(rec.u),b=rec.base!=null?rec.base:t.pts,nm=TG?(TG.username?'@'+TG.username:(TG.first_name||'Игрок')):'Игрок',lk=refLink();
 return{nick:rec.u,initial:rec.u.charAt(0).toUpperCase(),tierName:t.name.toUpperCase(),color:t.color,
  mults:m.parts.map(function(p){return p[0]+' ×'+fm(p[1])}),price:fmt(worth(rec)),
  formula:fmt(b)+(m.parts.length?' '+m.parts.map(function(p){return '× '+fm(p[1])}).join(' '):''),
  who:'Выбил(а) '+nm,link:lk?lk.replace('https://',''):(RBOT?'t.me/'+RBOT:'t.me/UsernameRouletteNews'),text:'Мне выпал @'+rec.u+' ('+t.name+', '+money(worth(rec))+') в «Юзерок: Рулетка»! Попробуй и ты'}}
function shareNick(rec){if(!rec)return;var o=shareInfo(rec),cv=document.createElement('canvas');cv.width=1080;cv.height=1920;
 try{drawShare(cv.getContext('2d'),o)}catch(e){toast('Не получилось создать картинку');return}
 var url='';try{url=cv.toDataURL('image/png')}catch(e){}
 var ov=document.createElement('div');ov.className='ov';
 ov.innerHTML='<div class="sh"><p>Картинка для сторис</p><img class="shimg" src="'+url+'" alt=""><div class="row2" style="margin-top:12px"><button class="act" data-sx="link">Отправить ссылку</button><button class="pbtn" style="flex:1" data-sx="img">Поделиться</button></div><button class="pbtn gray" style="width:100%;margin-top:8px" data-sx="close">Закрыть</button><div class="foot" style="margin-top:8px">Если кнопка не открывает меню, нажми на картинку и удерживай, чтобы сохранить её.</div></div>';
 ov.addEventListener('click',function(e){var b=e.target.closest('[data-sx]');if(!b&&e.target!==ov)return;var v=b?b.getAttribute('data-sx'):'close';
  if(v=='close'){ov.remove();return}
  if(v=='link'){var l=refLink(),u2='https://t.me/share/url?url='+encodeURIComponent(l||'https://t.me/UsernameRouletteNews')+'&text='+encodeURIComponent(o.text);openTg(u2);return}
  if(v=='img'){cv.toBlob(function(bl){try{var f=new File([bl],'username-roulette.png',{type:'image/png'});
    if(navigator.canShare&&navigator.canShare({files:[f]})&&navigator.share){navigator.share({files:[f],text:o.text}).catch(function(){})}
    else toast('Нажми на картинку и удерживай, чтобы сохранить')}catch(e){toast('Нажми на картинку и удерживай, чтобы сохранить')}},'image/png')}});
 document.body.appendChild(ov)}
