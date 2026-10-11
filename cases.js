// Кейсы с подарками (открываешь кейс и выигрываешь подарок Telegram)
var CASES=[
 {id:'farm',n:'Farm',cc:'star',price:100,art:['🐸','💎','🍑'],c:['#7a4cf5','#1a0f3a'],w:{candy:40,vice:35,snoop:18,mood:5,cigar:2},nft:0},
 {id:'autumn',n:'Autumn',cc:'star',price:400,art:['🧢','🎃','🔥'],c:['#ff8a3d','#34120a'],w:{candy:5,vice:10,snoop:35,mood:30,cigar:20},nft:0,lim:5,tag:'ЛИМИТИРОВАН'},
 {id:'movie',n:'Movie',cc:'star',price:1000,art:['🎬','🍿','🕶️'],c:['#ffb020','#2a1a06'],w:{vice:5,snoop:25,mood:40,cigar:30},nft:1,tag:'НОВОЕ'},
 {id:'space',n:'Space',cc:'ton',price:0.05,art:['🪐','🚀','👾'],c:['#8a5cff','#080b36'],w:{snoop:10,mood:40,cigar:50},nft:1,boost:1,tag:'НОВОЕ'},
 {id:'love',n:'Love',cc:'star',price:200,art:['💙','💍','✨'],c:['#3aa0ff','#0b2150'],w:{candy:20,vice:30,snoop:30,mood:15,cigar:5},nft:0}];
var CV=null,CBUSY=false;
function CASE(id){return CASES.filter(function(c){return c.id==id})[0]}
function caseLeft(c){if(!c.lim)return null;var d=dk(new Date()),L=(S.cl&&S.cl[c.id]);return c.lim-((L&&L.d==d)?L.n:0)}
function caseCost(c){return c.cc=='ton'?tonF(c.price)+' TON':money(c.price)}
function casePrice(c){return '<span class="cpr">'+(c.cc=='ton'?TI(15)+tonF(c.price):SI(15)+fmt(c.price))+'</span>'}
function caseArt(c,big){return '<div class="cart'+(big?' bigc':'')+'" style="background:radial-gradient(120% 90% at 50% 100%,'+c.c[0]+'77,transparent 62%),linear-gradient(160deg,'+c.c[0]+','+c.c[1]+')"><span class="ca1">'+c.art[0]+'</span><span class="ca2">'+c.art[1]+'</span><span class="ca3">'+c.art[2]+'</span>'+(c.tag?'<span class="ctag '+(c.tag=='НОВОЕ'?'new':'lim')+'">'+(c.tag=='НОВОЕ'?'✦ ':'')+c.tag+'</span>':'')+'</div>'}
function casesHtml(){return '<div class="cgrid2">'+CASES.map(function(c){return '<button class="ccase" data-g="case:'+c.id+'">'+caseArt(c)+'<div class="cinfo"><b>'+c.n+'</b>'+casePrice(c)+'</div></button>'}).join('')+'</div><div class="foot">Открой кейс и получи подарок Telegram. В некоторых кейсах подарки сразу улучшены до NFT.</div>'}
function caseDetail(){var c=CASE(CV);if(!c)return '<div class="empty">Кейс не найден</div>';var left=caseLeft(c),ids=Object.keys(c.w);
 return '<div class="ccase solo">'+caseArt(c,1)+'</div><div style="text-align:center;margin-top:12px"><div style="font-size:24px;font-weight:800">'+c.n+'</div><div class="ls" style="margin-top:2px">'+(c.nft?'Подарки сразу улучшены до NFT'+(c.boost?', редкие признаки чаще':''):'Обычные подарки, их можно улучшить до NFT')+'</div>'+(left!==null?'<div class="ls" style="margin-top:2px">Сегодня осталось: '+left+' из '+c.lim+'</div>':'')+'</div>'+
  '<div class="sec">Что может выпасть</div><div class="grp">'+ids.map(function(id){var t=GT(id);return '<div class="go"><span class="gmini" style="background:linear-gradient(145deg,#3a4a68,#1f2a40)">'+t.e+'</span><span>'+t.n+'</span><small>от '+money(t.base)+'</small></div>'}).join('')+'</div>'+
  '<button class="pbtn" style="width:100%;margin-top:16px;'+(left===0?'opacity:.5':'')+'" data-g="copen:'+c.id+'">Открыть · '+caseCost(c)+'</button>'}
function pickCaseType(c){var ids=Object.keys(c.w),t=ids.reduce(function(a,k){return a+c.w[k]},0),r=Math.random()*t;for(var i=0;i<ids.length;i++){r-=c.w[ids[i]];if(r<=0)return ids[i]}return ids[0]}
function openCase(id){var c=CASE(id);if(!c||CBUSY)return;
 var left=caseLeft(c);if(left!==null&&left<=0)return toast('Лимит на сегодня исчерпан');
 if(!pay(c.cc,c.price,'Кейс «'+c.n+'»'))return toast('Не хватает '+(c.cc=='ton'?'TON':'звёзд'));
 if(c.lim){S.cl=S.cl||{};var d=dk(new Date());if(!S.cl[id]||S.cl[id].d!=d)S.cl[id]={d:d,n:0};S.cl[id].n++}
 var g=giveGift(pickCaseType(c));if(c.nft)mkNft(g,c.boost||0);glog('Из кейса «'+c.n+'»: '+gname(g));save();CBUSY=true;caseAnim(c,g)}
function caseAnim(c,g){var N=46,WIN=38,tiles='',o=document.createElement('div');
 for(var i=0;i<N;i++){var ty=i==WIN?GT(g.type):GT(randGiftType());tiles+='<div class="ctile">'+ty.e+'</div>'}
 o.className='ov';o.innerHTML='<div class="sh"><p>'+esc(c.n)+'</p><div class="cwin"><div class="cptr"></div><div class="cstrip" id="cstrip">'+tiles+'</div></div><div id="cres" style="min-height:120px"></div></div>';
 document.body.appendChild(o);
 var st=o.querySelector('#cstrip'),win=o.querySelector('.cwin'),off=WIN*84+38-(win.clientWidth||320)/2+(Math.random()*36-18);
 var tk=setInterval(function(){hap({type:'selection_change'})},140);
 setTimeout(function(){st.style.transition='transform 4.4s cubic-bezier(.1,.75,.1,1)';st.style.transform='translateX(-'+off+'px)'},60);
 function close(){clearInterval(tk);o.remove();CBUSY=false;draw()}
 setTimeout(function(){clearInterval(tk);hap({type:'notification',notification_type:'success'});var w=giftWorth(g),r=giftRar(g),res=document.getElementById('cres');
  if(res)res.innerHTML='<div class="cresc">'+giftArt(g)+'<div><b>'+esc(gname(g))+'</b><small>'+(g.up?GRN[r]+' NFT':'Подарок')+' · оценка '+money(w)+'</small></div></div><div class="row2"><button class="act" data-co="sell">Продать · '+money(Math.round(w*.7))+'</button><button class="pbtn" style="flex:1" data-co="keep">Забрать</button></div><button class="pbtn gray" style="width:100%;margin-top:8px" data-co="again">Открыть ещё · '+caseCost(c)+'</button>'},4600);
 o.addEventListener('click',function(e){var b=e.target.closest('[data-co]');if(!b)return;var v=b.getAttribute('data-co');
  if(v=='keep')close();else if(v=='sell'){clearInterval(tk);o.remove();CBUSY=false;sellGift(g.id)}else if(v=='again'){close();openCase(c.id)}})}
