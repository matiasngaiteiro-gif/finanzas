const STORE_KEY = 'nexo-finanzas-v1';
const CATEGORY_COLORS = ['#c8f135','#334254','#4c78ff','#e3a62f','#845fd6','#0d9f69','#e65353','#68b6c9'];
const CATEGORIES = ['Vivienda','Alimentación','Transporte','Servicios','Salud','Ocio','Compras','Educación','Impuestos','Ingresos','Ahorro','Otros'];
const VIEW_META = {
  dashboard:['RESUMEN PERSONAL','Tu economía, hoy'], movements:['REGISTRO COMPLETO','Movimientos'],
  planning:['CONTROL MENSUAL','Planificación'], commitments:['AGENDA FINANCIERA','Vencimientos'],
  wealth:['BALANCE GENERAL','Patrimonio'], reports:['ANÁLISIS PERSONAL','Informes'], settings:['CONTROL Y PRIVACIDAD','Configuración']
};

const $ = (s, p=document) => p.querySelector(s);
const $$ = (s, p=document) => [...p.querySelectorAll(s)];
const today = new Date();
const iso = d => d.toISOString().slice(0,10);
const monthKey = d => (typeof d === 'string' ? d : iso(d)).slice(0,7);
const uid = () => crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`;
const dateInMonth = (offset=0, day=5) => { const d=new Date(today.getFullYear(),today.getMonth()+offset,Math.min(day,28),12); return iso(d); };
const esc = value => String(value ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));

function initialData(){
  return {
    version:1,
    settings:{currency:'ARS',workspace:'Mis finanzas'},
    accounts:[
      {id:'a1',name:'Cuenta principal',type:'bank',balance:1328500,limit:0},
      {id:'a2',name:'Billetera virtual',type:'wallet',balance:184300,limit:0},
      {id:'a3',name:'Efectivo',type:'cash',balance:78500,limit:0},
      {id:'a4',name:'Inversiones',type:'investment',balance:920000,limit:0},
      {id:'a5',name:'Tarjeta de crédito',type:'credit',balance:-346200,limit:1200000}
    ],
    transactions:[
      {id:uid(),date:dateInMonth(0,1),type:'income',description:'Sueldo',category:'Ingresos',account:'a1',amount:2888000,fixed:true},
      {id:uid(),date:dateInMonth(0,2),type:'expense',description:'Alquiler',category:'Vivienda',account:'a1',amount:850000,fixed:true},
      {id:uid(),date:dateInMonth(0,3),type:'expense',description:'Expensas',category:'Vivienda',account:'a1',amount:150000,fixed:true},
      {id:uid(),date:dateInMonth(0,5),type:'expense',description:'Supermercado',category:'Alimentación',account:'a5',amount:126450,fixed:false},
      {id:uid(),date:dateInMonth(0,7),type:'expense',description:'Internet',category:'Servicios',account:'a1',amount:38500,fixed:true},
      {id:uid(),date:dateInMonth(0,9),type:'income',description:'Proyecto freelance',category:'Ingresos',account:'a2',amount:500000,fixed:false},
      {id:uid(),date:dateInMonth(0,11),type:'expense',description:'Combustible',category:'Transporte',account:'a5',amount:84500,fixed:false},
      {id:uid(),date:dateInMonth(0,13),type:'expense',description:'Gimnasio',category:'Salud',account:'a2',amount:45000,fixed:true},
      {id:uid(),date:dateInMonth(0,15),type:'expense',description:'Cena',category:'Ocio',account:'a5',amount:62700,fixed:false},
      {id:uid(),date:dateInMonth(-1,1),type:'income',description:'Sueldo',category:'Ingresos',account:'a1',amount:2760000,fixed:true},
      {id:uid(),date:dateInMonth(-1,2),type:'expense',description:'Alquiler',category:'Vivienda',account:'a1',amount:850000,fixed:true},
      {id:uid(),date:dateInMonth(-1,8),type:'expense',description:'Consumos del mes',category:'Compras',account:'a5',amount:610000,fixed:false},
      {id:uid(),date:dateInMonth(-2,1),type:'income',description:'Sueldo',category:'Ingresos',account:'a1',amount:2640000,fixed:true},
      {id:uid(),date:dateInMonth(-2,12),type:'expense',description:'Gastos mensuales',category:'Otros',account:'a1',amount:1720000,fixed:false},
      {id:uid(),date:dateInMonth(-3,1),type:'income',description:'Ingresos',category:'Ingresos',account:'a1',amount:2580000,fixed:true},
      {id:uid(),date:dateInMonth(-3,14),type:'expense',description:'Gastos mensuales',category:'Otros',account:'a1',amount:1890000,fixed:false},
      {id:uid(),date:dateInMonth(-4,1),type:'income',description:'Ingresos',category:'Ingresos',account:'a1',amount:2500000,fixed:true},
      {id:uid(),date:dateInMonth(-4,14),type:'expense',description:'Gastos mensuales',category:'Otros',account:'a1',amount:2010000,fixed:false},
      {id:uid(),date:dateInMonth(-5,1),type:'income',description:'Ingresos',category:'Ingresos',account:'a1',amount:2420000,fixed:true},
      {id:uid(),date:dateInMonth(-5,14),type:'expense',description:'Gastos mensuales',category:'Otros',account:'a1',amount:1960000,fixed:false}
    ],
    budgets:[
      {id:uid(),category:'Vivienda',amount:1050000},{id:uid(),category:'Alimentación',amount:300000},
      {id:uid(),category:'Transporte',amount:180000},{id:uid(),category:'Servicios',amount:160000},
      {id:uid(),category:'Ocio',amount:200000},{id:uid(),category:'Salud',amount:100000}
    ],
    commitments:[
      {id:uid(),name:'Alquiler',amount:850000,type:'expense',category:'Vivienda',day:2,account:'a1',paidMonths:[monthKey(today)]},
      {id:uid(),name:'Expensas',amount:150000,type:'expense',category:'Vivienda',day:8,account:'a1',paidMonths:[monthKey(today)]},
      {id:uid(),name:'Internet',amount:38500,type:'expense',category:'Servicios',day:12,account:'a1',paidMonths:[]},
      {id:uid(),name:'Tarjeta de crédito',amount:346200,type:'expense',category:'Compras',day:18,account:'a1',paidMonths:[]},
      {id:uid(),name:'Seguro',amount:68600,type:'expense',category:'Servicios',day:24,account:'a1',paidMonths:[]},
      {id:uid(),name:'Sueldo',amount:2888000,type:'income',category:'Ingresos',day:1,account:'a1',paidMonths:[monthKey(today)]}
    ],
    goals:[
      {id:uid(),name:'Fondo de emergencia',target:4200000,current:1680000,due:dateInMonth(8,1)},
      {id:uid(),name:'Viaje',target:1800000,current:640000,due:dateInMonth(5,1)}
    ],
    debts:[{id:uid(),name:'Compra en cuotas',balance:420000,payment:70000,rate:0}]
  };
}

let state = load();
let selectedMonth = monthKey(today);
let movementType = 'all';
let dialogMode = '';

function load(){
  try { const raw=localStorage.getItem(STORE_KEY); return raw ? JSON.parse(raw) : initialData(); }
  catch { return initialData(); }
}
function save(){ localStorage.setItem(STORE_KEY,JSON.stringify(state)); }
function money(n, compact=false){
  const opts={style:'currency',currency:state.settings.currency||'ARS',maximumFractionDigits:0};
  if(compact && Math.abs(n)>=1000000) return `${n<0?'-':''}$ ${(Math.abs(n)/1000000).toFixed(1).replace('.',',')} M`;
  return new Intl.NumberFormat('es-AR',opts).format(Number(n)||0).replace('ARS','$');
}
function currentTransactions(){ return state.transactions.filter(t=>monthKey(t.date)===selectedMonth); }
function sums(list=currentTransactions()){
  return list.reduce((a,t)=>{ if(t.type==='income')a.income+=+t.amount; if(t.type==='expense')a.expense+=+t.amount; return a; },{income:0,expense:0});
}
function accountName(id){ return state.accounts.find(a=>a.id===id)?.name || 'Sin cuenta'; }
function monthLabel(key=selectedMonth){ const [y,m]=key.split('-'); return new Intl.DateTimeFormat('es-AR',{month:'long',year:'numeric'}).format(new Date(+y,+m-1,1)); }
function dayMonth(date){ return new Intl.DateTimeFormat('es-AR',{day:'2-digit',month:'short'}).format(new Date(`${date}T12:00:00`)).replace('.',''); }
function toast(message){ const el=$('#toast'); el.textContent=message; el.classList.add('show'); clearTimeout(toast.timer); toast.timer=setTimeout(()=>el.classList.remove('show'),2400); }
function expenseByCategory(list=currentTransactions()){
  return list.filter(t=>t.type==='expense').reduce((a,t)=>(a[t.category]=(a[t.category]||0)+(+t.amount),a),{});
}

function navigate(view){
  $$('.view').forEach(v=>v.classList.toggle('active',v.id===`view-${view}`));
  $$('[data-view]').forEach(b=>b.classList.toggle('active',b.dataset.view===view));
  const [eye,title]=VIEW_META[view]; $('#view-eyebrow').textContent=eye; $('#view-title').textContent=title;
  window.scrollTo({top:0,behavior:'smooth'}); render();
}

function render(){
  renderDashboard(); renderMovements(); renderPlanning(); renderCommitments(); renderWealth(); renderReports();
  $('#currency-setting').value=state.settings.currency||'ARS'; $('#workspace-name').value=state.settings.workspace||'';
}

function renderDashboard(){
  const tx=currentTransactions(), {income,expense}=sums(tx), balance=income-expense;
  const assets=state.accounts.filter(a=>a.type!=='credit').reduce((s,a)=>s+Math.max(0,+a.balance),0);
  const cards=Math.abs(state.accounts.filter(a=>a.type==='credit').reduce((s,a)=>s+Math.min(0,+a.balance),0));
  const debts=state.debts.reduce((s,d)=>s+(+d.balance),0)+cards; const net=assets-debts;
  const budgetTotal=state.budgets.reduce((s,b)=>s+(+b.amount),0); const used=budgetTotal?Math.round(expense/budgetTotal*100):0;
  const rate=income?Math.round(balance/income*100):0; const score=Math.max(0,Math.min(100,Math.round((rate+25)*1.6-(used>100?used-100:0))));
  $('#net-worth').textContent=money(net); $('#health-score').textContent=score;
  $('#month-income').textContent=money(income); $('#month-expense').textContent=money(expense); $('#month-balance').textContent=money(balance);
  $('#income-count').textContent=`${tx.filter(t=>t.type==='income').length} movimientos`;
  $('#expense-count').textContent=`${tx.filter(t=>t.type==='expense').length} movimientos`;
  $('#savings-rate').textContent=`${rate}% de ahorro`; $('#budget-used').textContent=`${used}%`;
  $('#budget-progress').style.width=`${Math.min(100,used)}%`; $('#budget-progress').style.background=used>100?'var(--red)':'var(--lime)';
  renderCashflow(); renderDashboardDues(); renderCategories(); renderRecent();
}

function renderCashflow(){
  const months=[]; for(let i=5;i>=0;i--){ const d=new Date(today.getFullYear(),today.getMonth()-i,1); const k=monthKey(d); const ss=sums(state.transactions.filter(t=>monthKey(t.date)===k)); months.push({k,label:new Intl.DateTimeFormat('es-AR',{month:'short'}).format(d).replace('.',''),...ss}); }
  const max=Math.max(...months.flatMap(m=>[m.income,m.expense]),1);
  $('#cashflow-chart').innerHTML=months.map(m=>`<div class="chart-group" title="${esc(m.label)}: ${money(m.income)} / ${money(m.expense)}"><i class="chart-bar income" style="height:${m.income/max*100}%"></i><i class="chart-bar expense" style="height:${m.expense/max*100}%"></i><small>${esc(m.label)}</small></div>`).join('');
}
function renderDashboardDues(){
  const items=[...state.commitments].filter(c=>!c.paidMonths?.includes(selectedMonth)).sort((a,b)=>a.day-b.day).slice(0,4);
  $('#dashboard-dues').innerHTML=items.length?items.map(c=>`<div class="due-item"><div class="due-date"><strong>${c.day}</strong>${monthLabel().slice(0,3)}</div><div><h3>${esc(c.name)}</h3><p>${esc(c.category)} · pendiente</p></div><strong class="${c.type==='income'?'positive':''}">${money(c.amount)}</strong></div>`).join(''):'<div class="empty-state"><strong>Todo al día</strong><span>No quedan vencimientos pendientes.</span></div>';
  const pending=state.commitments.filter(c=>!c.paidMonths?.includes(selectedMonth)).length; $('#due-badge').textContent=pending; $('#due-badge').classList.toggle('hidden',!pending);
}
function renderCategories(){
  const map=expenseByCategory(), entries=Object.entries(map).sort((a,b)=>b[1]-a[1]), total=entries.reduce((s,[,v])=>s+v,0);
  $('#donut-total').textContent=money(total,true);
  if(!entries.length){ $('#category-donut').style.background='#edf0f2'; $('#category-legend').innerHTML='<span class="empty-state">Sin gastos este mes</span>'; return; }
  let cursor=0; const stops=entries.slice(0,6).map(([k,v],i)=>{const start=cursor;cursor+=v/total*100;return `${CATEGORY_COLORS[i]} ${start}% ${cursor}%`;});
  $('#category-donut').style.background=`conic-gradient(${stops.join(',')})`;
  $('#category-legend').innerHTML=entries.slice(0,5).map(([k,v],i)=>`<div class="category-line"><i style="background:${CATEGORY_COLORS[i]}"></i><span>${esc(k)}</span><strong>${money(v)}</strong></div>`).join('');
}
function renderRecent(){
  const rows=[...currentTransactions()].sort((a,b)=>b.date.localeCompare(a.date)).slice(0,5);
  $('#recent-transactions').innerHTML=rows.length?rows.map(t=>`<div class="compact-row"><div class="category-icon">${esc(t.category.slice(0,1))}</div><div><h3>${esc(t.description)}</h3><p>${dayMonth(t.date)} · ${esc(t.category)}</p></div><strong class="${t.type==='income'?'positive':'negative'}">${t.type==='income'?'+':'−'} ${money(t.amount)}</strong></div>`).join(''):'<div class="empty-state"><strong>Sin actividad</strong><span>Registrá tu primer movimiento.</span></div>';
}

function filteredTransactions(){
  const q=$('#transaction-search').value.trim().toLowerCase(), cat=$('#category-filter').value;
  return currentTransactions().filter(t=>(movementType==='all'||t.type===movementType)&&(cat==='all'||t.category===cat)&&(!q||`${t.description} ${t.category} ${accountName(t.account)}`.toLowerCase().includes(q))).sort((a,b)=>b.date.localeCompare(a.date));
}
function renderMovements(){
  const select=$('#category-filter'); const old=select.value; select.innerHTML='<option value="all">Todas las categorías</option>'+CATEGORIES.map(c=>`<option>${c}</option>`).join(''); select.value=CATEGORIES.includes(old)?old:'all';
  const list=filteredTransactions(), ss=sums(list);
  $('#filtered-result').textContent=money(ss.income-ss.expense); $('#filtered-income').textContent=money(ss.income); $('#filtered-expense').textContent=money(ss.expense);
  $('#transaction-table').innerHTML=list.map(t=>`<tr><td>${dayMonth(t.date)}</td><td class="transaction-name">${esc(t.description)}</td><td>${esc(t.category)}</td><td>${esc(accountName(t.account))}</td><td><span class="status-pill">Registrado</span></td><td class="amount-cell ${t.type==='income'?'positive':'negative'}">${t.type==='income'?'+':'−'} ${money(t.amount)}</td><td><button class="row-menu" data-delete-transaction="${t.id}" aria-label="Eliminar movimiento">×</button></td></tr>`).join('');
  $('#transaction-empty').classList.toggle('hidden',list.length>0);
}

function renderPlanning(){
  const {income,expense}=sums(), planned=state.budgets.reduce((s,b)=>s+(+b.amount),0), available=income-planned, percent=planned?Math.round(expense/planned*100):0;
  $('#plan-remaining').textContent=money(available); $('#planning-percent').textContent=`${percent}%`;
  $('#planning-ring').style.background=`conic-gradient(${percent>100?'var(--red)':'var(--lime)'} 0 ${Math.min(100,percent)}%,#24303d ${Math.min(100,percent)}%)`;
  const spent=expenseByCategory();
  $('#budget-list').innerHTML=state.budgets.length?state.budgets.map(b=>{const actual=spent[b.category]||0,p=Math.round(actual/b.amount*100);return `<article class="budget-card"><div class="budget-card-head"><h3>${esc(b.category)}</h3><button data-delete-budget="${b.id}" aria-label="Eliminar">×</button></div><div class="budget-values"><span><strong>${money(actual)}</strong> gastados</span><span>${money(b.amount)} límite</span></div><div class="budget-track"><span class="${p>100?'over':''}" style="width:${Math.min(100,p)}%"></span></div></article>`}).join(''):'<div class="empty-state"><strong>Sin presupuestos</strong><span>Definí límites para controlar el mes.</span></div>';
  $('#goal-grid').innerHTML=state.goals.length?state.goals.map(g=>{const p=Math.round(g.current/g.target*100);return `<article class="goal-card"><span>META DE AHORRO</span><h3>${esc(g.name)}</h3><div class="goal-money"><strong>${money(g.current)}</strong><small>de ${money(g.target)}</small></div><div class="goal-progress"><span style="width:${Math.min(100,p)}%"></span></div><div class="goal-footer"><span>${p}% completado</span><button class="text-button" data-contribute="${g.id}">Aportar</button></div></article>`}).join(''):'<div class="empty-state"><strong>Sin metas</strong><span>Creá un objetivo concreto de ahorro.</span></div>';
}

function renderCommitments(){
  const pending=state.commitments.filter(c=>!c.paidMonths?.includes(selectedMonth));
  const out=pending.filter(c=>c.type==='expense').reduce((s,c)=>s+(+c.amount),0); const inc=pending.filter(c=>c.type==='income').reduce((s,c)=>s+(+c.amount),0);
  $('#commitment-summary').innerHTML=`<div class="commitment-stat"><span>Pagos pendientes</span><strong>${money(out)}</strong></div><div class="commitment-stat"><span>Ingresos esperados</span><strong>${money(inc)}</strong></div><div class="commitment-stat"><span>Compromisos registrados</span><strong>${state.commitments.length}</strong></div>`;
  $('#commitment-list').innerHTML=[...state.commitments].sort((a,b)=>a.day-b.day).map(c=>{const paid=c.paidMonths?.includes(selectedMonth);return `<article class="commitment-card"><div class="commitment-day"><strong>${c.day}</strong><small>${monthLabel().slice(0,3)}</small></div><div class="commitment-info"><h3>${esc(c.name)}</h3><p>${esc(c.category)} · ${esc(accountName(c.account))}</p></div><strong class="${c.type==='income'?'positive':''}">${money(c.amount)}</strong><button class="pay-button ${paid?'paid':''}" data-pay="${c.id}" ${paid?'disabled':''}>${paid?'Registrado':'Marcar '+(c.type==='income'?'cobrado':'pagado')}</button></article>`}).join('');
  renderCalendar();
}
function renderCalendar(){
  const [y,m]=selectedMonth.split('-').map(Number), first=new Date(y,m-1,1), days=new Date(y,m,0).getDate(); let lead=(first.getDay()+6)%7;
  $('#calendar-title').textContent=monthLabel(); const dueDays=new Set(state.commitments.map(c=>+c.day)); let html='';
  for(let i=0;i<lead;i++) html+='<span class="calendar-day muted"></span>';
  for(let d=1;d<=days;d++) html+=`<span class="calendar-day ${dueDays.has(d)?'has-due':''}">${d}</span>`;
  $('#mini-calendar').innerHTML=html;
}

function renderWealth(){
  const positiveAccounts=state.accounts.filter(a=>a.type!=='credit'); const assets=positiveAccounts.reduce((s,a)=>s+Math.max(0,+a.balance),0);
  const cardDebt=Math.abs(state.accounts.filter(a=>a.type==='credit').reduce((s,a)=>s+Math.min(0,+a.balance),0)); const debt=state.debts.reduce((s,d)=>s+(+d.balance),0)+cardDebt;
  $('#wealth-total').textContent=money(assets-debt); $('#asset-total').textContent=money(assets); $('#debt-total').textContent=money(debt);
  const typeNames={bank:'Cuenta bancaria',wallet:'Billetera virtual',cash:'Efectivo',investment:'Inversión',credit:'Tarjeta de crédito'};
  $('#account-list').innerHTML=state.accounts.map(a=>{const usage=a.type==='credit'&&a.limit?Math.abs(a.balance)/a.limit*100:0;return `<article class="account-card"><div class="account-logo">${esc(a.name.slice(0,2).toUpperCase())}</div><div><h3>${esc(a.name)}</h3><p>${typeNames[a.type]||a.type}${a.type==='credit'?' · límite '+money(a.limit):''}</p></div><strong class="${a.balance<0?'negative':''}">${money(a.balance)}</strong>${a.type==='credit'?`<div class="credit-usage"><span style="width:${Math.min(100,usage)}%"></span></div>`:''}</article>`}).join('');
  $('#debt-list').innerHTML=state.debts.length?state.debts.map(d=>`<article class="debt-card"><div class="account-logo">D</div><div><h3>${esc(d.name)}</h3><p>Cuota ${money(d.payment)} · tasa ${d.rate||0}%</p></div><strong class="negative">${money(d.balance)}</strong></article>`).join(''):'<div class="empty-state"><strong>Sin deudas</strong><span>No registraste préstamos u obligaciones.</span></div>';
}

function renderReports(){
  const {income,expense}=sums(), result=income-expense, avg=state.transactions.filter(t=>t.type==='expense'&&monthKey(t.date)===selectedMonth).length?expense/state.transactions.filter(t=>t.type==='expense'&&monthKey(t.date)===selectedMonth).length:0;
  $('#report-kpis').innerHTML=`<div class="report-kpi"><span>Tasa de ahorro</span><strong>${income?Math.round(result/income*100):0}%</strong><small>del ingreso mensual</small></div><div class="report-kpi"><span>Gasto promedio</span><strong>${money(avg)}</strong><small>por movimiento</small></div><div class="report-kpi"><span>Gastos fijos</span><strong>${money(currentTransactions().filter(t=>t.type==='expense'&&t.fixed).reduce((s,t)=>s+(+t.amount),0))}</strong><small>comprometidos este mes</small></div><div class="report-kpi"><span>Resultado</span><strong class="${result>=0?'positive':'negative'}">${money(result)}</strong><small>ingresos menos gastos</small></div>`;
  const months=[]; for(let i=5;i>=0;i--){const d=new Date(today.getFullYear(),today.getMonth()-i,1),k=monthKey(d),ss=sums(state.transactions.filter(t=>monthKey(t.date)===k));months.push({label:new Intl.DateTimeFormat('es-AR',{month:'short'}).format(d).replace('.',''),v:ss.income-ss.expense});}
  const max=Math.max(...months.map(m=>Math.abs(m.v)),1); $('#trend-chart').innerHTML=months.map(m=>{const h=Math.max(3,Math.abs(m.v)/max*82);return `<div class="trend-column" style="--h:${h}%"><strong class="${m.v<0?'negative':''}">${money(m.v,true)}</strong><i class="trend-bar" style="height:${h}%;background:${m.v<0?'var(--red)':'var(--blue)'}"></i><small>${m.label}</small></div>`}).join('');
  const categories=Object.entries(expenseByCategory()).sort((a,b)=>b[1]-a[1]), top=categories[0]; const fixed=currentTransactions().filter(t=>t.type==='expense'&&t.fixed).reduce((s,t)=>s+(+t.amount),0); const variable=expense-fixed;
  const insights=[
    {i:'%',t:'Capacidad de ahorro',d:income?`Conservaste ${Math.max(0,Math.round(result/income*100))}% de lo que ingresó en el mes.`:'Registrá ingresos para calcular tu capacidad de ahorro.'},
    {i:'1',t:'Mayor categoría',d:top?`${top[0]} concentra ${Math.round(top[1]/expense*100)}% de tus gastos.`:'Todavía no hay gastos para comparar.'},
    {i:'↺',t:'Compromisos',d:`Tenés ${state.commitments.filter(c=>!c.paidMonths?.includes(selectedMonth)).length} vencimientos pendientes en el mes seleccionado.`}
  ];
  $('#insights').innerHTML=insights.map(x=>`<div class="insight"><i>${x.i}</i><div><strong>${x.t}</strong><span>${x.d}</span></div></div>`).join('');
  $('#category-ranking').innerHTML=categories.length?categories.slice(0,6).map(([k,v],i)=>`<div class="rank-row"><span>${i+1}</span><div class="rank-main"><label>${esc(k)}</label><div class="rank-track"><i style="width:${v/categories[0][1]*100}%"></i></div></div><strong>${money(v)}</strong></div>`).join(''):'<div class="empty-state">Sin datos</div>';
  const fp=expense?Math.round(fixed/expense*100):0; $('#expense-structure').innerHTML=`<div class="structure-donut" style="background:conic-gradient(var(--dark) 0 ${fp}%,var(--lime) ${fp}% 100%)"></div><div class="structure-legend"><div class="structure-item"><span>Fijos · ${fp}%</span><strong>${money(fixed)}</strong></div><div class="structure-item"><span>Variables · ${100-fp}%</span><strong>${money(variable)}</strong></div></div>`;
}

function options(items, valueKey='id', labelKey='name'){ return items.map(i=>`<option value="${esc(i[valueKey])}">${esc(i[labelKey])}</option>`).join(''); }
function categoryOptions(selected=''){ return CATEGORIES.map(c=>`<option ${c===selected?'selected':''}>${c}</option>`).join(''); }
function openDialog(mode, extra={}){
  dialogMode=mode; const fields=$('#dialog-fields'); let title='',kicker='NUEVO REGISTRO',submit='Guardar';
  if(mode==='transaction'){
    title='Nuevo movimiento'; fields.innerHTML=`<div class="type-selector"><button type="button" class="active" data-tx-type="expense">Gasto</button><button type="button" data-tx-type="income">Ingreso</button><button type="button" data-tx-type="transfer">Transferencia</button></div><input type="hidden" name="type" value="expense"><label class="full">Concepto<input name="description" required maxlength="60" placeholder="Ej. supermercado"></label><label>Importe<input name="amount" type="number" min="0.01" step="0.01" required placeholder="0"></label><label>Fecha<input name="date" type="date" required value="${iso(today)}"></label><label>Categoría<select name="category">${categoryOptions()}</select></label><label>Cuenta<select name="account">${options(state.accounts)}</select></label><label>Tipo de gasto<select name="fixed"><option value="false">Variable</option><option value="true">Fijo</option></select></label><label class="full">Nota<input name="note" maxlength="100" placeholder="Opcional"></label>`;
  } else if(mode==='budget'){title='Agregar presupuesto';fields.innerHTML=`<label class="full">Categoría<select name="category">${categoryOptions()}</select></label><label class="full">Límite mensual<input name="amount" type="number" min="1" required></label>`;
  } else if(mode==='goal'){title='Nueva meta de ahorro';fields.innerHTML=`<label class="full">Nombre<input name="name" required maxlength="50" placeholder="Ej. fondo de emergencia"></label><label>Objetivo<input name="target" type="number" min="1" required></label><label>Ahorrado hasta hoy<input name="current" type="number" min="0" value="0" required></label><label class="full">Fecha objetivo<input name="due" type="date" required value="${dateInMonth(6,1)}"></label>`;
  } else if(mode==='commitment'){title='Nuevo compromiso';fields.innerHTML=`<label class="full">Nombre<input name="name" required maxlength="50" placeholder="Ej. alquiler"></label><label>Importe<input name="amount" type="number" min="1" required></label><label>Tipo<select name="type"><option value="expense">Pago</option><option value="income">Ingreso</option></select></label><label>Día de cada mes<input name="day" type="number" min="1" max="28" required value="10"></label><label>Categoría<select name="category">${categoryOptions()}</select></label><label class="full">Cuenta<select name="account">${options(state.accounts)}</select></label>`;
  } else if(mode==='account'){title='Nueva cuenta';fields.innerHTML=`<label class="full">Nombre<input name="name" required maxlength="40"></label><label>Tipo<select name="type"><option value="bank">Cuenta bancaria</option><option value="wallet">Billetera virtual</option><option value="cash">Efectivo</option><option value="investment">Inversión</option><option value="credit">Tarjeta de crédito</option></select></label><label>Saldo actual<input name="balance" type="number" step="0.01" required value="0"></label><label class="full">Límite de crédito<input name="limit" type="number" min="0" value="0"></label>`;
  } else if(mode==='debt'){title='Nueva deuda';fields.innerHTML=`<label class="full">Nombre<input name="name" required maxlength="50"></label><label>Saldo pendiente<input name="balance" type="number" min="1" required></label><label>Cuota mensual<input name="payment" type="number" min="0" required value="0"></label><label class="full">Tasa anual (%)<input name="rate" type="number" min="0" step="0.01" value="0"></label>`;
  } else if(mode==='contribute'){title='Aportar a la meta'; fields.innerHTML=`<input type="hidden" name="goal" value="${extra.id}"><label class="full">Importe del aporte<input name="amount" type="number" min="1" required></label>`; submit='Registrar aporte';}
  $('#dialog-title').textContent=title; $('#dialog-kicker').textContent=kicker; $('#dialog-submit').textContent=submit; $('#app-dialog').showModal();
}
function closeDialog(){ $('#app-dialog').close(); $('#dialog-form').reset(); }
function formObject(form){ return Object.fromEntries(new FormData(form).entries()); }
function submitDialog(e){
  e.preventDefault(); const v=formObject(e.currentTarget);
  if(dialogMode==='transaction'){
    const t={id:uid(),date:v.date,type:v.type,description:v.description.trim(),category:v.type==='transfer'?'Ahorro':v.category,account:v.account,amount:+v.amount,fixed:v.fixed==='true',note:v.note}; state.transactions.push(t);
    const a=state.accounts.find(x=>x.id===v.account); if(a) a.balance+=(v.type==='income'?1:-1)*(+v.amount);
  } else if(dialogMode==='budget'){ const existing=state.budgets.find(b=>b.category===v.category); if(existing)existing.amount=+v.amount;else state.budgets.push({id:uid(),category:v.category,amount:+v.amount});
  } else if(dialogMode==='goal') state.goals.push({id:uid(),name:v.name.trim(),target:+v.target,current:+v.current,due:v.due});
  else if(dialogMode==='commitment') state.commitments.push({id:uid(),name:v.name.trim(),amount:+v.amount,type:v.type,category:v.category,day:+v.day,account:v.account,paidMonths:[]});
  else if(dialogMode==='account') state.accounts.push({id:uid(),name:v.name.trim(),type:v.type,balance:+v.balance,limit:+v.limit});
  else if(dialogMode==='debt') state.debts.push({id:uid(),name:v.name.trim(),balance:+v.balance,payment:+v.payment,rate:+v.rate});
  else if(dialogMode==='contribute'){ const g=state.goals.find(x=>x.id===v.goal); if(g)g.current=Math.min(g.target,g.current+(+v.amount)); }
  save(); closeDialog(); render(); toast('Información guardada');
}

function deleteTransaction(id){
  const t=state.transactions.find(x=>x.id===id); if(!t||!confirm(`Eliminar “${t.description}”?`))return;
  const a=state.accounts.find(x=>x.id===t.account); if(a)a.balance-=(t.type==='income'?1:-1)*(+t.amount);
  state.transactions=state.transactions.filter(x=>x.id!==id); save(); render(); toast('Movimiento eliminado');
}
function payCommitment(id){
  const c=state.commitments.find(x=>x.id===id); if(!c)return; c.paidMonths=c.paidMonths||[]; if(c.paidMonths.includes(selectedMonth))return;
  c.paidMonths.push(selectedMonth); const date=`${selectedMonth}-${String(Math.min(28,c.day)).padStart(2,'0')}`;
  state.transactions.push({id:uid(),date,type:c.type,description:c.name,category:c.category,account:c.account,amount:c.amount,fixed:true,fromCommitment:c.id});
  const a=state.accounts.find(x=>x.id===c.account); if(a)a.balance+=(c.type==='income'?1:-1)*(+c.amount); save(); render(); toast(c.type==='income'?'Ingreso registrado':'Pago registrado');
}
function exportData(){
  const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a'); a.href=url;a.download=`nexo-finanzas-${iso(today)}.json`;a.click();URL.revokeObjectURL(url);toast('Copia exportada');
}

function registerWebMCP(){
  const context=document.modelContext;
  if(!context?.registerTool)return;
  const register=tool=>{ try{ void Promise.resolve(context.registerTool(tool)).catch(()=>{}); }catch{} };
  register({
    name:'read_financial_summary',title:'Consultar resumen financiero',
    description:'Devuelve ingresos, gastos, resultado y patrimonio del mes seleccionado sin modificar datos.',
    inputSchema:{type:'object',properties:{},additionalProperties:false},annotations:{readOnlyHint:true,untrustedContentHint:false},
    execute(){const ss=sums();const assets=state.accounts.reduce((n,a)=>n+(+a.balance),0);const debts=state.debts.reduce((n,d)=>n+(+d.balance),0);return{month:selectedMonth,income:ss.income,expense:ss.expense,result:ss.income-ss.expense,netWorth:assets-debts,currency:state.settings.currency};}
  });
  register({
    name:'create_financial_transaction',title:'Registrar movimiento financiero',
    description:'Registra un ingreso o gasto en Nexo y actualiza la cuenta elegida.',
    inputSchema:{type:'object',properties:{type:{type:'string',enum:['income','expense']},description:{type:'string',minLength:1},amount:{type:'number',exclusiveMinimum:0},date:{type:'string'},category:{type:'string'},accountId:{type:'string'}},required:['type','description','amount','date','category','accountId'],additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},
    execute(input){
      if(!input||!['income','expense'].includes(input.type)||!Number.isFinite(input.amount)||input.amount<=0||!/^\d{4}-\d{2}-\d{2}$/.test(input.date)||!state.accounts.some(a=>a.id===input.accountId))throw new Error('Movimiento inválido');
      const item={id:uid(),date:input.date,type:input.type,description:String(input.description).trim(),category:String(input.category),account:input.accountId,amount:input.amount,fixed:false};
      if(!item.description)throw new Error('El concepto es obligatorio');state.transactions.push(item);const account=state.accounts.find(a=>a.id===input.accountId);account.balance+=(input.type==='income'?1:-1)*input.amount;save();render();return{id:item.id,status:'registered'};
    }
  });
}
async function importData(file){
  try{const data=JSON.parse(await file.text());if(!data.accounts||!data.transactions)throw new Error();state=data;save();render();toast('Copia restaurada');}
  catch{toast('El archivo no es una copia válida');}
}

document.addEventListener('click',e=>{
  const view=e.target.closest('[data-view]')?.dataset.view || e.target.closest('[data-view-link]')?.dataset.viewLink; if(view){navigate(view);return;}
  const type=e.target.closest('[data-type]')?.dataset.type;if(type){movementType=type;$$('#movement-tabs button').forEach(b=>b.classList.toggle('active',b.dataset.type===type));renderMovements();return;}
  const txType=e.target.closest('[data-tx-type]')?.dataset.txType;if(txType){$$('[data-tx-type]').forEach(b=>b.classList.toggle('active',b.dataset.txType===txType));$('[name=type]').value=txType;return;}
  const delTx=e.target.closest('[data-delete-transaction]')?.dataset.deleteTransaction;if(delTx){deleteTransaction(delTx);return;}
  const delBudget=e.target.closest('[data-delete-budget]')?.dataset.deleteBudget;if(delBudget){state.budgets=state.budgets.filter(b=>b.id!==delBudget);save();render();toast('Presupuesto eliminado');return;}
  const pay=e.target.closest('[data-pay]')?.dataset.pay;if(pay){payCommitment(pay);return;}
  const contribution=e.target.closest('[data-contribute]')?.dataset.contribute;if(contribution){openDialog('contribute',{id:contribution});return;}
});

$('#month-filter').value=selectedMonth;
$('#month-filter').addEventListener('change',e=>{selectedMonth=e.target.value;render();});
$('#add-transaction').onclick=()=>openDialog('transaction'); $('#mobile-add').onclick=()=>openDialog('transaction');
$('#add-budget').onclick=()=>openDialog('budget'); $('#add-goal').onclick=()=>openDialog('goal'); $('#add-commitment').onclick=()=>openDialog('commitment'); $('#add-account').onclick=()=>openDialog('account'); $('#add-debt').onclick=()=>openDialog('debt');
$('#dialog-close').onclick=closeDialog; $('#dialog-cancel').onclick=closeDialog; $('#dialog-form').addEventListener('submit',submitDialog);
$('#transaction-search').addEventListener('input',renderMovements); $('#category-filter').addEventListener('change',renderMovements);
$('#quick-search').onclick=()=>{navigate('movements');setTimeout(()=>$('#transaction-search').focus(),100)};
$('#save-settings').onclick=()=>{state.settings.currency=$('#currency-setting').value;state.settings.workspace=$('#workspace-name').value.trim()||'Mis finanzas';save();render();toast('Preferencias guardadas')};
$('#export-data').onclick=exportData; $('#import-data').addEventListener('change',e=>e.target.files[0]&&importData(e.target.files[0]));
$('#reset-data').onclick=()=>{if(confirm('Se eliminarán todos los datos de este dispositivo. Esta acción no se puede deshacer.')){state={...initialData(),transactions:[],budgets:[],commitments:[],goals:[],debts:[],accounts:[]};save();render();toast('Aplicación reiniciada')}};
window.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();navigate('movements');$('#transaction-search').focus()}if(e.key==='Escape'&&$('#app-dialog').open)closeDialog()});
if('serviceWorker'in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
render();
registerWebMCP();
