// Авто-продажа: правила для каждой редкости (продать / оставить / спросить), признаки, лимиты
var TAGS=['короткий','имя','слово','зеркало','красивые цифры','ровные цифры','одна буква','повтор буквы','ритм','год','топ-слово'];
function keepTags(){return S.autoTags||TAGS}
function autoRules(){if(S.arules)return S.arules;var m=S.autoMax||0;return TIERS.map(function(t,i){return i<=m?'sell':'ask'})}
function autoAction(r){if(!S.auto)return 'ask';var a=autoRules()[ti(r.tier)]||'ask';if(a!='sell')return a;
 var tg=mult(r.u).tags,kt=keepTags();for(var i=0;i<tg.length;i++)if(kt.indexOf(tg[i])>=0)return S.autoTagAct||'ask';
 if(S.autoCap&&worth(r)>=S.autoCap)return S.autoCapAct||'ask';return 'sell'}
function willAuto(r){return autoAction(r)!='ask'}
function autoToast(m){if(S.autoNotify)toast(m)}
function logAuto(r,g,a){S.autoLog=S.autoLog||[];S.autoLog.unshift({u:r.u,tier:r.tier,g:g,a:a,t:Date.now()});if(S.autoLog.length>30)S.autoLog.pop()}
function autoHandle(r){var a=autoAction(r);if(a=='ask')return;
 setTimeout(function(){var p=S.pending;if(!p||p.u!=r.u||p.ts!=r.ts||REVL)return;autoResolve()},1800)}
function applyPreset(i){var P=[{r:['sell','ask','ask','ask','ask','ask','ask'],tag:'ask'},{r:['sell','sell','ask','ask','ask','ask','ask'],tag:'ask'},{r:['sell','sell','keep','keep','keep','keep','keep'],tag:'keep'},{r:['sell','sell','sell','sell','ask','ask','ask'],tag:'sell'}][i];
 S.arules=P.r;S.autoTagAct=P.tag;S.autoCap=0;S.autoTags=undefined;S.auto=true;save()}
var RACTL={sell:'Продать',keep:'Оставить',ask:'Спросить'};
function segAct(cur,attr,vals){return '<div class="seg3">'+vals.map(function(v){return '<button class="'+(cur==v?'on':'')+'" data-'+attr+'="'+v+'">'+RACTL[v]+'</button>'}).join('')+'</div>'}
function autoHtml(){var dim=S.auto?'':'opacity:.5',kt=keepTags(),ru=autoRules(),log=(S.autoLog||[]).slice(0,6);
 return '<div class="grp">'+tgRow('💰','#ff9500','Авто-продажа','auto')+'</div>'+
  '<div class="sec">Быстрые режимы</div><div class="seg"><button data-ap="0">Осторожно</button><button data-ap="1">Баланс</button><button data-ap="2">Коллекционер</button><button data-ap="3">Агрессивно</button></div>'+
  '<div class="foot" style="margin-top:6px">«Коллекционер» продаёт дешёвое, а редкое сохраняет сам, автопрокрут не останавливается.</div>'+
  '<div class="sec">Что делать с каждой редкостью</div><div class="grp" style="'+dim+'">'+TIERS.map(function(t,i){return '<div class="rule"><span class="rdt" style="background:'+t.color+'"></span><b>'+t.name+'</b>'+segAct(ru[i],'ru-'+i,['sell','keep','ask'])+'</div>'}).join('')+'</div>'+
  '<div class="sec">Не продавать дороже</div><div class="seg" style="'+dim+'">'+[[0,'Без лимита'],[100,'100'],[500,'500'],[2000,'2к'],[10000,'10к']].map(function(x){return '<button class="'+((S.autoCap||0)==x[0]?'on':'')+'" data-ac="'+x[0]+'">'+x[1]+'</button>'}).join('')+'</div>'+
  ((S.autoCap||0)?'<div class="rule" style="margin-top:8px"><b style="flex:1">Если дороже лимита</b>'+segAct(S.autoCapAct||'ask','ca',['keep','ask'])+'</div>':'')+
  '<div class="sec">Ники с признаками</div><div class="grp" style="'+dim+'">'+TAGS.map(function(x){return '<button class="go" data-at="'+x+'"><span style="text-transform:capitalize">'+x+'</span><span class="sw'+(kt.indexOf(x)>=0?' on':'')+'"></span></button>'}).join('')+'</div>'+
  '<div class="rule" style="margin-top:8px"><b style="flex:1">Что делать с ними</b>'+segAct(S.autoTagAct||'ask','ta',['sell','keep','ask'])+'</div>'+
  '<div class="sec">Автопрокрут</div><div class="grp"><div class="go"><span>Резерв баланса (не тратить ниже)</span></div></div><div class="seg">'+[[0,'Нет'],[500,'500'],[2000,'2к'],[10000,'10к']].map(function(x){return '<button class="'+((S.asMin||0)==x[0]?'on':'')+'" data-ar="'+x[0]+'">'+x[1]+'</button>'}).join('')+'</div>'+
  '<div class="grp" style="margin-top:10px"><div class="go"><span>Лимит прокруток за запуск</span></div></div><div class="seg">'+[[0,'Без лимита'],[50,'50'],[200,'200'],[500,'500']].map(function(x){return '<button class="'+((S.asLimit||0)==x[0]?'on':'')+'" data-al="'+x[0]+'">'+x[1]+'</button>'}).join('')+'</div>'+
  '<div class="grp" style="margin-top:14px">'+tgRow('✨','#5ac8fa','Уведомления об авто-действиях','autoNotify')+'</div>'+
  '<div class="stats3" style="margin-top:14px"><div class="stat"><b>'+(S.autoN||0)+'</b><small>продано</small></div><div class="stat"><b>'+(S.autoKept||0)+'</b><small>сохранено</small></div><div class="stat"><b>'+abbr(S.autoSum||0)+'</b><small>заработано ⭐</small></div></div>'+
  (log.length?'<div class="sec">Последние действия</div><div class="grp">'+log.map(function(e){var t=tier(e.tier);return '<div class="go it" style="border-color:'+t.color+'"><b>@'+e.u+'</b><small>'+(e.a=='keep'?'сохранён':'+'+money(e.g))+'</small></div>'}).join('')+'</div>':'')+
  '<div class="foot">После прокрутки ник показывается 1–2 секунды, потом срабатывает правило. «Спросить» значит, что решение за тобой, автопрокрут на этом остановится.</div>'}
