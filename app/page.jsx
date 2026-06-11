"use client";

import { useState, useEffect, useCallback, useRef } from "react";

/* ═══ STORAGE ═══ */
const SK = "fluxia-app-v3";
const AK = "fluxia-auth-v1";

async function loadStore() {
  try {
    if (typeof window === "undefined") return null;
    const r = window.localStorage.getItem(SK);
    return r ? JSON.parse(r) : null;
  } catch {
    return null;
  }
}

async function saveStore(d) {
  try {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(SK, JSON.stringify(d));
  } catch (e) {
    console.error(e);
  }
}

async function loadAuth() {
  try {
    if (typeof window === "undefined") return null;
    const r = window.localStorage.getItem(AK);
    return r ? JSON.parse(r) : null;
  } catch {
    return null;
  }
}

async function saveAuth(d) {
  try {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(AK, JSON.stringify(d));
  } catch (e) {
    console.error(e);
  }
}

/* ═══ COLORS ═══ */
const C = {
  bg:"#06060b", bg2:"rgba(255,255,255,.03)", bg3:"rgba(255,255,255,.06)",
  bdr:"rgba(255,255,255,.07)", bdrH:"rgba(255,255,255,.15)",
  t1:"#f0f0f0", t2:"#9ca3af", t3:"#4b5563",
  vi:"#8b5cf6", ind:"#6366f1", rose:"#e879a8", blue:"#60a5fa", green:"#4ade80",
  gold:"#fbbf24", red:"#ef4444", orange:"#f97316",
};
const priC = { alta:C.red, media:C.gold, baja:C.blue };
const phC = {"Fase 1":"#818cf8","Fase 2":"#e879a8","Fase 3":"#4ade80","Fase 4":"#fbbf24","Fase 5":"#60a5fa"};
const stgC = { Lead:"#60a5fa",Demo:"#818cf8",Propuesta:"#c084fc",Cierre:"#fbbf24",Onboarding:"#f97316",Activo:"#4ade80"};
 
/* ═══ DEFAULT CRM DATA ═══ */
const KC = ["Por hacer","En progreso","En revisión","Completado"];
const PC = ["Lead","Demo","Propuesta","Cierre","Onboarding","Activo"];
const DT = [
  {id:"t1",title:"Contratar VPS Hetzner CX22",col:"Por hacer",priority:"alta",phase:"Fase 1",day:"Día 1",notes:[],activity:[]},
  {id:"t2",title:"Registrar dominio fluxia.cl",col:"Por hacer",priority:"alta",phase:"Fase 1",day:"Día 1",notes:[],activity:[]},
  {id:"t3",title:"Constituir SpA en empresaenundia.cl",col:"Por hacer",priority:"alta",phase:"Fase 1",day:"Día 1",notes:[],activity:[]},
  {id:"t4",title:"Instalar Docker + Docker Compose",col:"Por hacer",priority:"alta",phase:"Fase 1",day:"Día 1-2",notes:[],activity:[]},
  {id:"t5",title:"Instalar Claude Code + 14 agentes",col:"Por hacer",priority:"alta",phase:"Fase 1",day:"Día 1",notes:[],activity:[]},
  {id:"t6",title:"Desplegar n8n + PostgreSQL + Redis",col:"Por hacer",priority:"alta",phase:"Fase 1",day:"Día 2-3",notes:[],activity:[]},
  {id:"t7",title:"Configurar Nginx + SSL",col:"Por hacer",priority:"alta",phase:"Fase 1",day:"Día 3-4",notes:[],activity:[]},
  {id:"t8",title:"Conectar APIs: OpenAI, Google, WA",col:"Por hacer",priority:"alta",phase:"Fase 1",day:"Día 4-5",notes:[],activity:[]},
  {id:"t9",title:"Inicio actividades SII",col:"Por hacer",priority:"alta",phase:"Fase 1",day:"Día 3-10",notes:[],activity:[]},
  {id:"t10",title:"Auditoría seguridad @cybersecurity",col:"Por hacer",priority:"media",phase:"Fase 1",day:"Día 5",notes:[],activity:[]},
  {id:"t11",title:"Demo 1: Bot WhatsApp + IA",col:"Por hacer",priority:"alta",phase:"Fase 2",day:"Día 8-10",notes:[],activity:[]},
  {id:"t12",title:"Demo 2: Secretaria IA + memoria",col:"Por hacer",priority:"alta",phase:"Fase 2",day:"Día 11-14",notes:[],activity:[]},
  {id:"t13",title:"Demo 3: CRM automático leads",col:"Por hacer",priority:"alta",phase:"Fase 2",day:"Día 15-17",notes:[],activity:[]},
  {id:"t14",title:"Demo 4: Cobranza automática",col:"Por hacer",priority:"media",phase:"Fase 2",day:"Día 17-18",notes:[],activity:[]},
  {id:"t15",title:"Demo 5: Ecommerce + facturación",col:"Por hacer",priority:"media",phase:"Fase 2",day:"Día 18-21",notes:[],activity:[]},
  {id:"t16",title:"Construir fluxia.cl",col:"Por hacer",priority:"alta",phase:"Fase 3",day:"Día 22-24",notes:[],activity:[]},
  {id:"t17",title:"Deploy Vercel + SEO",col:"Por hacer",priority:"alta",phase:"Fase 3",day:"Día 24",notes:[],activity:[]},
  {id:"t18",title:"Crear RRSS: IG + LinkedIn",col:"Por hacer",priority:"media",phase:"Fase 3",day:"Día 25",notes:[],activity:[]},
  {id:"t19",title:"Template landing clínica",col:"Por hacer",priority:"alta",phase:"Fase 3",day:"Día 26",notes:[],activity:[]},
  {id:"t20",title:"Portal de cliente (dashboard)",col:"Por hacer",priority:"alta",phase:"Fase 3",day:"Día 29-31",notes:[],activity:[]},
  {id:"t21",title:"Kit de ventas por rubro",col:"Por hacer",priority:"alta",phase:"Fase 4",day:"Día 34",notes:[],activity:[]},
  {id:"t22",title:"Contrato tipo con @legal",col:"Por hacer",priority:"alta",phase:"Fase 4",day:"Día 35",notes:[],activity:[]},
  {id:"t23",title:"INICIAR PROSPECCIÓN",col:"Por hacer",priority:"alta",phase:"Fase 4",day:"Día 38",notes:[],activity:[]},
  {id:"t24",title:"Cerrar primer cliente",col:"Por hacer",priority:"alta",phase:"Fase 4",day:"Sem 7",notes:[],activity:[]},
  {id:"t25",title:"Onboarding cliente 1",col:"Por hacer",priority:"alta",phase:"Fase 4",day:"Sem 7-8",notes:[],activity:[]},
  {id:"t26",title:"Automatizar facturación",col:"Por hacer",priority:"media",phase:"Fase 5",day:"Sem 11",notes:[],activity:[]},
  {id:"t27",title:"Dashboard CEO",col:"Por hacer",priority:"alta",phase:"Fase 5",day:"Sem 11",notes:[],activity:[]},
];
 
const DEF_CLIENTS = [];
 
const DEF = { tasks:DT, pipeline:[], clients:DEF_CLIENTS, nid:100, content:[], trades:[], bootcamp:{} };
const DEF_CREDS = { user:process.env.NEXT_PUBLIC_ADMIN_USER||"admin", pass:process.env.NEXT_PUBLIC_ADMIN_PASS||"fluxia2025" };
 
/* ═══ MICRO COMPONENTS ═══ */
function Logo({s=28}){return <svg width={s} height={s} viewBox="0 0 100 100" fill="none"><defs><linearGradient id="flg" x1="0" y1="100" x2="100" y2="0"><stop offset="0%" stopColor="#e879a8"/><stop offset="50%" stopColor="#c084fc"/><stop offset="100%" stopColor="#60a5fa"/></linearGradient></defs><path d="M50 10C50 10,75 10,80 35C85 60,65 70,50 50C35 70,15 60,20 35C25 10,50 10,50 10Z" stroke="url(#flg)" strokeWidth="3.5" fill="none" opacity=".9"/><path d="M50 90C50 90,75 90,80 65C85 40,65 30,50 50C35 30,15 40,20 65C25 90,50 90,50 90Z" stroke="url(#flg)" strokeWidth="3.5" fill="none" opacity=".9"/><path d="M10 50C10 50,10 25,35 20C60 15,70 35,50 50C70 65,60 85,35 80C10 75,10 50,10 50Z" stroke="url(#flg)" strokeWidth="3.5" fill="none" opacity=".7"/><path d="M90 50C90 50,90 25,65 20C40 15,30 35,50 50C30 65,40 85,65 80C90 75,90 50,90 50Z" stroke="url(#flg)" strokeWidth="3.5" fill="none" opacity=".7"/></svg>}
function Badge({text,color}){return <span style={{fontSize:10,fontWeight:600,color,background:`${color}15`,padding:"2px 8px",borderRadius:6,letterSpacing:.3,textTransform:"uppercase"}}>{text}</span>}
function Dot({color,glow}){return <span style={{width:8,height:8,borderRadius:"50%",background:color,display:"inline-block",boxShadow:glow?`0 0 8px ${color}80`:"none"}}/>}
function Stat({label,value,color=C.t1,sub}){return <div style={{background:C.bg2,border:`1px solid ${C.bdr}`,borderRadius:14,padding:"14px 16px",flex:"1 1 130px",minWidth:120}}><div style={{fontSize:11,color:C.t2,marginBottom:3}}>{label}</div><div style={{fontSize:24,fontWeight:700,color}}>{value}</div>{sub&&<div style={{fontSize:10,color:C.t3,marginTop:2}}>{sub}</div>}</div>}
function Btn({children,primary,onClick,style:s={}}){return <button onClick={onClick} style={{padding:"8px 16px",fontSize:12,fontWeight:600,border:primary?"none":`1px solid ${C.bdr}`,borderRadius:8,cursor:"pointer",fontFamily:"inherit",background:primary?"linear-gradient(135deg,#7c3aed,#6366f1)":"transparent",color:primary?"#fff":C.t2,...s}}>{children}</button>}
function Input({value,onChange,placeholder,type="text",style:s={}}){return <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} style={{width:"100%",padding:"10px 14px",background:"rgba(255,255,255,.04)",border:`1px solid ${C.bdr}`,borderRadius:9,color:C.t1,fontSize:13,outline:"none",fontFamily:"inherit",boxSizing:"border-box",...s}} onFocus={e=>e.target.style.borderColor="rgba(139,92,246,.5)"} onBlur={e=>e.target.style.borderColor=C.bdr}/>}
function Card({children,style:s={}}){const[h,setH]=useState(false);return <div style={{background:h?C.bg3:C.bg2,border:`1px solid ${h?C.bdrH:C.bdr}`,borderRadius:12,padding:"14px 16px",transition:"all .15s",...s}} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}>{children}</div>}
function MiniChart({data,dk,color,h=90}){const max=Math.max(...data.map(d=>d[dk]),1);return <div style={{display:"flex",alignItems:"flex-end",gap:3,height:h}}>{data.map((d,i)=><div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3}}><span style={{fontSize:9,color:C.t3}}>{d[dk]}</span><div style={{width:"100%",maxWidth:32,height:(d[dk]/max)*(h-22),background:`linear-gradient(180deg,${color},${color}40)`,borderRadius:"4px 4px 1px 1px",transition:"height .5s"}}/><span style={{fontSize:9,color:C.t3}}>{d.d}</span></div>)}</div>}
function LeadBadge({status}){const s={hot:{bg:"rgba(239,68,68,.12)",c:"#f87171",l:"Hot"},warm:{bg:"rgba(251,191,36,.12)",c:"#fbbf24",l:"Warm"},cold:{bg:"rgba(96,165,250,.12)",c:"#60a5fa",l:"Cold"}}[status];return <span style={{background:s.bg,color:s.c,fontSize:10,fontWeight:600,padding:"2px 8px",borderRadius:12,textTransform:"uppercase"}}>{s.l}</span>}
 
function useInView(th=0.08){const ref=useRef(null);const[v,setV]=useState(false);useEffect(()=>{const el=ref.current;if(!el)return;const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){setV(true);obs.disconnect()}},{threshold:th});obs.observe(el);return()=>obs.disconnect()},[]);return[ref,v]}
function Sec({children,id,style}){const[ref,v]=useInView();return <section ref={ref} id={id} style={{opacity:v?1:0,transform:v?"translateY(0)":"translateY(28px)",transition:"all .8s cubic-bezier(.16,1,.3,1)",...style}}>{children}</section>}
function STitle({eyebrow,title,subtitle}){return <div style={{textAlign:"center",marginBottom:48,maxWidth:680,marginLeft:"auto",marginRight:"auto"}}>{eyebrow&&<span style={{fontSize:12,fontWeight:600,color:"#a78bfa",textTransform:"uppercase",letterSpacing:1.5,display:"block",marginBottom:12}}>{eyebrow}</span>}<h2 style={{fontSize:"clamp(24px,4vw,36px)",fontWeight:700,color:"#f5f5f5",margin:"0 0 14px",lineHeight:1.2}}>{title}</h2>{subtitle&&<p style={{fontSize:16,color:"#9ca3af",lineHeight:1.6,margin:0}}>{subtitle}</p>}</div>}
function SvcCard({s}){const[h,setH]=useState(false);return <div style={{background:h?"rgba(255,255,255,.045)":"rgba(255,255,255,.025)",border:`1px solid ${h?"rgba(255,255,255,.14)":"rgba(255,255,255,.06)"}`,borderRadius:18,padding:"28px 24px",transition:"all .3s",position:"relative",transform:h?"translateY(-2px)":"none"}} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}>{s.tag&&<span style={{position:"absolute",top:14,right:14,fontSize:10,fontWeight:700,color:s.tagColor,background:`${s.tagColor}12`,padding:"3px 10px",borderRadius:10,textTransform:"uppercase",letterSpacing:.5}}>{s.tag}</span>}<span style={{fontSize:28,display:"block",marginBottom:14}}>{s.icon}</span><h3 style={{fontSize:16,fontWeight:600,color:"#f0f0f0",margin:"0 0 8px"}}>{s.title}</h3><p style={{fontSize:13,color:"#9ca3af",lineHeight:1.6,margin:0}}>{s.desc}</p></div>}
 
/* ═══ LANDING DATA ═══ */
const SVC_CORE=[{icon:"🏢",title:"ERP a medida",desc:"Sistema integrado que conecta ventas, finanzas, inventario, agenda y operaciones. Diseñado para tu rubro.",tag:"Producto principal",tagColor:"#c084fc"},{icon:"📊",title:"CRM + Dashboard",desc:"Gestiona leads y clientes con clasificación IA. Dashboard en tiempo real para decidir con datos.",tag:"Diferenciador",tagColor:"#4ade80"},{icon:"🌐",title:"Landing Page",desc:"Tu vitrina digital con dominio propio conectada directo a tu ERP. Cada lead entra al sistema.",tag:null}];
const SVC_AUTO=[{icon:"⚡",title:"Bot WhatsApp + IA",desc:"Atención automática 24/7 conectada a tu ERP. Responde, agenda y registra."},{icon:"📅",title:"Agenda IA",desc:"Gestiona citas, cancela y reagenda solo. Recuerda el contexto de cada cliente."},{icon:"💰",title:"Cobranza y Facturación",desc:"Recordatorios automáticos escalonados y facturación electrónica integrada al SII."}];
const ERP_MODS=[{n:"Ventas y CRM",d:"Pipeline, leads, seguimiento",i:"📈"},{n:"Finanzas",d:"Facturación SII, flujo de caja",i:"💰"},{n:"Inventario",d:"Stock, alertas reposición",i:"📦"},{n:"Agenda y RRHH",d:"Citas, turnos, horarios",i:"📅"},{n:"Atención cliente",d:"Bot IA, tickets, historial",i:"💬"},{n:"Reportes y BI",d:"Dashboard CEO, KPIs",i:"📊"}];
const PRICING=[{name:"Esencial",pr:"150.000",pl:"120.000",setup:"300k–450k",features:["Landing page con dominio propio","CRM básico con clasificación IA","Bot WhatsApp + IA 24/7","Dashboard de métricas","Facturación básica SII"],pop:false},{name:"Profesional",pr:"220.000",pl:"180.000",setup:"500k–800k",features:["Todo lo del Esencial","ERP: ventas + finanzas + agenda","CRM con pipeline automático","Portal de cliente exclusivo","Reportes mensuales de ROI","3 módulos a elegir"],pop:true},{name:"Empresa",pr:"380.000",pl:"300.000",setup:"900k–1.8M",features:["Todo lo del Profesional","ERP completo, todos los módulos","Integraciones custom","Inventario + control stock","Automatización multi-canal","SLA prioritario < 2 hrs"],pop:false}];
const FAQS=[{q:"¿Qué diferencia tiene con un SAP?",a:"Nuestro ERP es liviano, se implementa en 7 días, cuesta una fracción e incluye IA. No necesitas departamento de TI."},{q:"¿Puedo empezar con pocos módulos?",a:"Sí. Empieza con lo que necesitas hoy y activa más módulos cuando crezcas."},{q:"¿Cuánto tarda la implementación?",a:"5-10 días hábiles. En la primera semana ya tienes tu sistema funcionando."},{q:"¿Hay permanencia mínima?",a:"No. Si el primer mes no ves resultados, devolvemos tu dinero."},{q:"¿Se integra con facturación SII?",a:"Sí. Emite boletas y facturas electrónicas directamente desde tu ERP."},{q:"¿Mis datos están seguros?",a:"Servidores privados con encriptación y backups diarios. Cumplimos Ley 19.628."}];
const SECTORS=[{n:"Clínicas y dentistas",p:"Agenda caótica + pacientes perdidos + facturación manual"},{n:"Psicólogos y coaches",p:"Agenda, pagos y fichas en 5 herramientas distintas"},{n:"Gimnasios y academias",p:"Cobranza manual, sin métricas de retención"},{n:"Restaurantes y cafés",p:"Reservas por teléfono, sin control de inventario"},{n:"Centros estéticos",p:"Agendamiento repetitivo, seguimiento sin sistema"},{n:"Retail y e-commerce",p:"Inventario desconectado de ventas"}];

const DEMOS_CATALOG=[
  {id:"dm1",niche:"Clínicas",icon:"🏥",color:"#818cf8",demo:"ERP + Agenda médica",type:"ERP",status:"construido",desc:"Citas, fichas de pacientes y facturación SII integrada."},
  {id:"dm2",niche:"Psicólogos",icon:"🧠",color:"#c084fc",demo:"Agenda + fichas + pagos",type:"ERP",status:"construido",desc:"Sesiones, fichas confidenciales y cobros automáticos."},
  {id:"dm3",niche:"Gimnasios",icon:"🏋️",color:"#4ade80",demo:"Membresías + cobranza",type:"ERP",status:"en progreso",desc:"Control de socios, cuotas y recordatorios de pago."},
  {id:"dm4",niche:"Restaurantes",icon:"🍽️",color:"#f97316",demo:"Reservas + inventario",type:"ERP",status:"pendiente",desc:"Reservas online y control de insumos en tiempo real."},
  {id:"dm5",niche:"Estética",icon:"💆",color:"#e879a8",demo:"Agenda + fidelización",type:"ERP",status:"en progreso",desc:"Citas, historial de tratamientos y programa de puntos."},
  {id:"dm6",niche:"Retail",icon:"🛍️",color:"#fbbf24",demo:"CRM + cuenta corriente",type:"CRM",status:"construido",desc:"Clientas, cuentas corrientes y cobranza automatizada."},
  {id:"dm7",niche:"Bot WhatsApp",icon:"⚡",color:"#60a5fa",demo:"Atención IA 24/7",type:"Bot",status:"construido",desc:"Responde, agenda y registra leads sin intervención humana."},
  {id:"dm8",niche:"Landing Page",icon:"🌐",color:"#34d399",demo:"Vitrina digital + dominio",type:"Web",status:"construido",desc:"Landing profesional conectada al ERP del cliente."},
];
const platC={Instagram:"#e879a8",LinkedIn:"#60a5fa",TikTok:"#f87171","WhatsApp":"#4ade80",Blog:"#fbbf24"};
const contStC={idea:{c:"#6366f1",label:"Idea"},redactado:{c:"#fbbf24",label:"Redactado"},publicado:{c:"#4ade80",label:"Publicado"}};
const CONT_COLS=["Idea","Redactando","Listo","Publicado"];
const CONT_COL_C={"Idea":"#6366f1","Redactando":"#fbbf24","Listo":"#c084fc","Publicado":"#4ade80"};
const IDEAS_POR_NICHO={
  "Clínicas":["¿Cuánto pierde tu clínica por cada inasistencia? Así lo resolvemos","De agenda en papel a sistema digital: caso real en 7 días","3 razones por las que los pacientes no vuelven (y cómo evitarlo con IA)"],
  "Psicólogos":["Gestiona fichas, sesiones y cobros desde un solo lugar","¿Cuánto tiempo pierdes en tareas admin que no son terapia?","Confidencialidad + digitalización: sí es posible"],
  "Gimnasios":["El error que hace perder socios cada mes (y cómo evitarlo)","Cobranza automática = cero llamadas incómodas","De 50 a 200 socios sin contratar más staff"],
  "Restaurantes":["Reservas online + control de insumos en un solo sistema","¿Cuánto inventario se pierde sin un sistema? Los números sorprenden","El restaurante que digitalizó en una semana: así quedó"],
  "Estética":["Agenda llena, sin llamadas: así funciona el bot de citas","Historial de tratamientos que te hace ver profesional","Fidelización automática: cumpleaños, recordatorios y promos"],
  "Retail":["Tienda Armario: cuenta corriente digital para todas las clientas","Cuentas corrientes manuales → sistema digital en 3 días","Tu cliente siempre sabe lo que debe: portal de cuenta corriente"],
  "Bot WhatsApp":["Tu negocio atendiendo a las 3am: así funciona el bot de IA","Del mensaje a la cita agendada: 0 intervención humana","Bot + memoria: recuerda a cada cliente como si lo conocieras"],
  "Landing Page":["Tu web + tu ERP conectados: cada visita entra al CRM","De Instagram a web propia: así se ve en 7 días","Landing que convierte vs landing que solo informa"],
};
 
/* ═══════════════════════════════════════════ */
/* ═══ MAIN APP COMPONENT                 ═══ */
/* ═══════════════════════════════════════════ */
export default function FluxiaApp() {
  const [mode, setMode] = useState("landing"); // landing | login | admin
  const [auth, setAuth] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState("kanban");
  const [selectedTask, setSelectedTask] = useState(null);
  const [filterPhase, setFilterPhase] = useState("all");
  const [addingTask, setAddingTask] = useState(false);
  const [addingDeal, setAddingDeal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [clientTab, setClientTab] = useState("dashboard");
  // Forms
  const [nt,setNt]=useState("");const[np,setNp]=useState("media");const[nph,setNph]=useState("Fase 1");
  const [dn,setDn]=useState("");const[db,setDb]=useState("");const[dv,setDv]=useState("");const[di,setDi]=useState("");const[ds,setDs]=useState("Clínica");const[dClientId,setDClientId]=useState("");
  // Landing
  const [formData,setFD]=useState({name:"",business:"",phone:"",message:""});
  const [formPlan,setFormPlan]=useState("");const[formSector,setFormSector]=useState("");
  const [formSent,setFS]=useState(false);const[openFaq,setOF]=useState(null);const[scrolled,setSc]=useState(false);
  // Login
  const [lu,setLu]=useState("");const[lp,setLp]=useState("");const[loginErr,setLE]=useState(false);
  // New client form
  const [addingClient,setAddingClient]=useState(false);
  const [ncName,setNcName]=useState("");const[ncContact,setNcContact]=useState("");const[ncPlan,setNcPlan]=useState("Esencial");
  const [ncSector,setNcSector]=useState("Clínica");const[ncEmail,setNcEmail]=useState("");const[ncPhone,setNcPhone]=useState("");
  const [ncRut,setNcRut]=useState("");const[ncMrr,setNcMrr]=useState("");
  const [addingLead,setAddingLead]=useState(false);
  const [ldName,setLdName]=useState("");const[ldService,setLdService]=useState("");const[ldSrc,setLdSrc]=useState("WhatsApp");const[ldStatus,setLdStatus]=useState("warm");
  const [addingInvoice,setAddingInvoice]=useState(false);
  const [invMonth,setInvMonth]=useState("");const[invAmount,setInvAmount]=useState("");
  // Contenido
  const [addingContent,setAddingContent]=useState(false);
  const [ctNiche,setCtNiche]=useState("Clínicas");const[ctTitle,setCtTitle]=useState("");
  const [ctPlatform,setCtPlatform]=useState("Instagram");const[ctType,setCtType]=useState("Post");const[ctCol,setCtCol]=useState("Idea");
  const [selectedContent,setSelectedContent]=useState(null);
  // Trading
  const [tradingTab,setTradingTab]=useState("bootcamp");
  const [addingTrade,setAddingTrade]=useState(false);
  const [trPair,setTrPair]=useState("EUR/USD");
  const [trDir,setTrDir]=useState("long");
  const [trEntry,setTrEntry]=useState("");
  const [trSL,setTrSL]=useState("");
  const [trTP,setTrTP]=useState("");
  const [trResult,setTrResult]=useState("");
  const [trStatus,setTrStatus]=useState("win");
  const [trSetup,setTrSetup]=useState("IFVG");
  const [trNotes,setTrNotes]=useState("");
  const [calcCapital,setCalcCapital]=useState("10000");
  const [calcRiskPct,setCalcRiskPct]=useState("1");
  const [calcEntry,setCalcEntry]=useState("");
  const [calcSL,setCalcSL]=useState("");
 
  useEffect(()=>{
    Promise.all([loadStore(),loadAuth()]).then(([d])=>{
      setData(d||DEF);
      setAuth(DEF_CREDS);
      setLoading(false);
    });
    const h=()=>setSc(window.scrollY>40);window.addEventListener("scroll",h);return()=>window.removeEventListener("scroll",h);
  },[]);
 
  useEffect(()=>{if(data&&!loading)saveStore(data)},[data,loading]);
  const up=useCallback(fn=>setData(p=>{const n=JSON.parse(JSON.stringify(p));fn(n);return n}),[]);
  const now=new Date().toLocaleDateString("es-CL",{day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"});
 
  if(loading) return <div style={{fontFamily:"'DM Sans',system-ui",background:C.bg,color:C.t1,minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}><Logo s={48}/></div>;
 
  const handleLogin=()=>{
    if(lu===auth.user&&lp===auth.pass){setMode("admin");setLE(false);setLu("");setLp("")}
    else setLE(true);
  };
 
 
  /* ═══════════════════════════════════ */
  /* ═══ TASK DETAIL PANEL          ═══ */
  /* ═══════════════════════════════════ */
  const TaskDetail = () => {
    const task = (data?.tasks||[]).find(t=>t.id===selectedTask);
    const [note,setNote]=useState("");
    if(!task) return null;
    return <div style={{position:"fixed",inset:0,zIndex:100,display:"flex",justifyContent:"flex-end"}} onClick={()=>setSelectedTask(null)}>
      <div style={{width:400,maxWidth:"90vw",height:"100vh",background:"#0d0d18",borderLeft:`1px solid ${C.bdr}`,padding:"24px 20px",overflowY:"auto",boxShadow:"-8px 0 40px rgba(0,0,0,.5)"}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <span style={{fontSize:11,color:C.vi,fontWeight:600,textTransform:"uppercase",letterSpacing:1}}>Detalle</span>
          <button onClick={()=>setSelectedTask(null)} style={{background:"none",border:"none",color:C.t3,fontSize:20,cursor:"pointer"}}>×</button>
        </div>
        <h3 style={{fontSize:17,fontWeight:600,color:C.t1,margin:"0 0 10px"}}>{task.title}</h3>
        <div style={{display:"flex",gap:5,marginBottom:14,flexWrap:"wrap"}}>
          <Badge text={task.priority} color={priC[task.priority]}/><Badge text={task.phase} color={phC[task.phase]||C.vi}/><Badge text={task.col} color={C.t2}/>
          {task.day&&<span style={{fontSize:11,color:C.t3}}>{task.day}</span>}
        </div>
        <div style={{marginBottom:14}}>
          <div style={{fontSize:11,color:C.t2,marginBottom:5,fontWeight:500}}>Mover a:</div>
          <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
            {KC.filter(c=>c!==task.col).map(c=><Btn key={c} onClick={()=>up(d=>{const tk=d.tasks.find(x=>x.id===task.id);if(tk){(tk.activity=tk.activity||[]).push({text:`Movido a "${c}"`,date:now});tk.col=c}})}>{c}</Btn>)}
          </div>
        </div>
        <div style={{marginBottom:16}}>
          <div style={{fontSize:11,color:C.t2,marginBottom:5,fontWeight:500}}>Agregar nota:</div>
          <div style={{display:"flex",gap:6}}><Input value={note} onChange={setNote} placeholder="Escribe..." style={{flex:1}}/><Btn primary onClick={()=>{if(note.trim()){up(d=>{const tk=d.tasks.find(x=>x.id===task.id);if(tk)(tk.notes=tk.notes||[]).push({text:note.trim(),date:now})});setNote("")}}}>+</Btn></div>
        </div>
        <div style={{fontSize:11,color:C.t2,marginBottom:8,fontWeight:500}}>Timeline:</div>
        <div style={{borderLeft:`2px solid ${C.bdr}`,marginLeft:8,paddingLeft:14}}>
          {[...(task.notes||[])].reverse().map((n,i)=><div key={i} style={{marginBottom:12,position:"relative"}}><div style={{position:"absolute",left:-20,top:4,width:8,height:8,borderRadius:"50%",background:C.vi,border:`2px solid ${C.bg}`}}/><div style={{fontSize:12,color:C.t1,lineHeight:1.5}}>{n.text}</div><div style={{fontSize:10,color:C.t3,marginTop:1}}>{n.date}</div></div>)}
          {[...(task.activity||[])].reverse().map((a,i)=><div key={`a${i}`} style={{marginBottom:12,position:"relative"}}><div style={{position:"absolute",left:-20,top:4,width:8,height:8,borderRadius:"50%",background:C.t3,border:`2px solid ${C.bg}`}}/><div style={{fontSize:12,color:C.t2}}>{a.text}</div><div style={{fontSize:10,color:C.t3,marginTop:1}}>{a.date}</div></div>)}
          {(task.notes||[]).length===0&&(task.activity||[]).length===0&&<div style={{fontSize:12,color:C.t3}}>Sin actividad aún</div>}
        </div>
      </div>
    </div>;
  };
 
  /* ═══════════════════════════════════ */
  /* ═══ CONTENT PANEL              ═══ */
  /* ═══════════════════════════════════ */
  const ContentPanel = () => {
    const ct=(data?.content||[]).find(c=>c.id===selectedContent);
    const [localTitle,setLocalTitle]=useState(ct?.title||"");
    const [localCopy,setLocalCopy]=useState(ct?.copy||"");
    const [copied,setCopied]=useState(false);
    useEffect(()=>{if(ct){setLocalTitle(ct.title||"");setLocalCopy(ct.copy||"")}},[selectedContent]);
    if(!ct)return null;
    const demo=DEMOS_CATALOG.find(d=>d.niche===ct.niche);
    const curCol=ct.col||"Idea";
    const nextColIdx=CONT_COLS.indexOf(curCol)+1;
    const nextCol=nextColIdx<CONT_COLS.length?CONT_COLS[nextColIdx]:null;
    const save=()=>up(d=>{const c2=(d.content||[]).find(x=>x.id===ct.id);if(c2){c2.title=localTitle;c2.copy=localCopy}});
    const copyClip=()=>{navigator.clipboard?.writeText(localCopy||localTitle);setCopied(true);setTimeout(()=>setCopied(false),2000)};
    return <div style={{position:"fixed",inset:0,zIndex:100,display:"flex",justifyContent:"flex-end"}} onClick={()=>{save();setSelectedContent(null)}}>
      <div style={{width:440,maxWidth:"92vw",height:"100vh",background:"#0d0d18",borderLeft:`1px solid ${C.bdr}`,padding:"24px 20px",overflowY:"auto",boxShadow:"-8px 0 48px rgba(0,0,0,.6)",display:"flex",flexDirection:"column",gap:12}} onClick={e=>e.stopPropagation()}>
        {/* Header */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <div style={{width:34,height:34,borderRadius:9,background:`${demo?.color||C.vi}15`,border:`1px solid ${demo?.color||C.vi}25`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17}}>{demo?.icon||"📄"}</div>
            <div><div style={{fontSize:13,fontWeight:600,color:demo?.color||C.vi}}>{ct.niche}</div><div style={{fontSize:10,color:C.t3}}>{ct.type} · {ct.platform}</div></div>
          </div>
          <button onClick={()=>{save();setSelectedContent(null)}} style={{background:"none",border:"none",color:C.t3,fontSize:22,cursor:"pointer",lineHeight:1}}>×</button>
        </div>
        {/* Progress bar de columnas */}
        <div style={{display:"flex",gap:3}}>
          {CONT_COLS.map(col=><div key={col} style={{flex:1,textAlign:"center",padding:"5px 0",borderRadius:7,background:curCol===col?`${CONT_COL_C[col]}22`:"transparent",border:curCol===col?`1px solid ${CONT_COL_C[col]}60`:`1px solid ${C.bdr}`,fontSize:10,color:curCol===col?CONT_COL_C[col]:C.t3,fontWeight:curCol===col?600:400,cursor:"pointer",transition:"all .15s"}} onClick={()=>up(d=>{const c2=(d.content||[]).find(x=>x.id===ct.id);if(c2)c2.col=col})}>{col}</div>)}
        </div>
        {/* Título */}
        <div>
          <label style={{display:"block",fontSize:11,color:C.t2,marginBottom:4,fontWeight:500}}>Título / hook</label>
          <textarea value={localTitle} onChange={e=>setLocalTitle(e.target.value)} rows={2} style={{width:"100%",padding:"10px 14px",background:"rgba(255,255,255,.04)",border:`1px solid ${C.bdr}`,borderRadius:9,color:C.t1,fontSize:13,outline:"none",fontFamily:"inherit",resize:"none",boxSizing:"border-box",lineHeight:1.5}} onFocus={e=>e.target.style.borderColor="rgba(139,92,246,.5)"} onBlur={e=>{e.target.style.borderColor=C.bdr;save()}}/>
        </div>
        {/* Copy */}
        <div style={{flex:1,display:"flex",flexDirection:"column"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
            <label style={{fontSize:11,color:C.t2,fontWeight:500}}>Copy del post</label>
            <button onClick={copyClip} style={{fontSize:10,padding:"3px 12px",borderRadius:6,border:`1px solid ${copied?C.green:C.bdr}`,background:"transparent",color:copied?C.green:C.t2,cursor:"pointer",fontFamily:"inherit",transition:"all .2s"}}>{copied?"✓ Copiado":"Copiar texto"}</button>
          </div>
          <textarea value={localCopy} onChange={e=>setLocalCopy(e.target.value)} placeholder="Escribe el texto completo del post aquí..." rows={9} style={{flex:1,width:"100%",padding:"10px 14px",background:"rgba(255,255,255,.04)",border:`1px solid ${C.bdr}`,borderRadius:9,color:C.t1,fontSize:12,outline:"none",fontFamily:"inherit",resize:"vertical",lineHeight:1.65,boxSizing:"border-box"}} onFocus={e=>e.target.style.borderColor="rgba(139,92,246,.5)"} onBlur={e=>{e.target.style.borderColor=C.bdr;save()}}/>
        </div>
        {/* Ideas si no hay copy */}
        {localCopy.length<10&&IDEAS_POR_NICHO[ct.niche]&&<div>
          <div style={{fontSize:11,color:C.t3,marginBottom:5}}>💡 Ideas para arrancar (clic para usar):</div>
          {IDEAS_POR_NICHO[ct.niche].map((idea,i)=><button key={i} onClick={()=>setLocalCopy(idea)} style={{display:"block",width:"100%",textAlign:"left",padding:"7px 10px",marginBottom:4,background:"rgba(255,255,255,.02)",border:`1px solid ${C.bdr}`,borderRadius:7,color:C.t2,fontSize:11,cursor:"pointer",fontFamily:"inherit",lineHeight:1.5,transition:"all .15s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=demo?.color||C.vi;e.currentTarget.style.color=C.t1}} onMouseLeave={e=>{e.currentTarget.style.borderColor=C.bdr;e.currentTarget.style.color=C.t2}}>{idea}</button>)}
        </div>}
        {/* Acciones */}
        <div style={{display:"flex",gap:6,paddingTop:4,borderTop:`1px solid ${C.bdr}`}}>
          {nextCol&&<Btn primary onClick={()=>{save();up(d=>{const c2=(d.content||[]).find(x=>x.id===ct.id);if(c2)c2.col=nextCol});setSelectedContent(null)}}>→ Mover a {nextCol}</Btn>}
          <Btn onClick={()=>{save();setSelectedContent(null)}}>Guardar y cerrar</Btn>
        </div>
      </div>
    </div>;
  };

  /* ═══════════════════════════════════ */
  /* ═══ LANDING PAGE               ═══ */
  /* ═══════════════════════════════════ */
  if (mode === "landing" || mode === "login") return (
    <div style={{fontFamily:"'DM Sans',system-ui,sans-serif",background:C.bg,color:"#e5e5e5",overflowX:"hidden"}}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
      <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>
        <div style={{position:"absolute",top:-300,left:"50%",transform:"translateX(-50%)",width:900,height:900,background:"radial-gradient(circle,rgba(139,92,246,.08) 0%,transparent 60%)"}}/>
      </div>
 
      {/* NAV */}
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,backdropFilter:"blur(20px)",background:scrolled?"rgba(6,6,11,.88)":"transparent",borderBottom:scrolled?"1px solid rgba(255,255,255,.06)":"1px solid transparent",transition:"all .3s"}}>
        <div style={{maxWidth:1100,margin:"0 auto",padding:"0 24px",display:"flex",alignItems:"center",justifyContent:"space-between",height:68}}>
          <a href="#" style={{textDecoration:"none",display:"flex",alignItems:"center",gap:10}}><Logo s={32}/><span style={{fontSize:21,fontWeight:700,color:"#f5f5f5"}}>Fluxia</span></a>
          <div style={{display:"flex",alignItems:"center",gap:24}}>
            <style>{`@media(min-width:768px){.nv{display:block !important}}`}</style>
            {[["Servicios","#servicios"],["ERP","#erp"],["Precios","#precios"],["FAQ","#faq"]].map(([l,h])=><a key={l} href={h} className="nv" style={{fontSize:14,color:"#9ca3af",textDecoration:"none",display:"none"}} onMouseEnter={e=>e.target.style.color="#f0f0f0"} onMouseLeave={e=>e.target.style.color="#9ca3af"}>{l}</a>)}
            <button onClick={()=>setMode("login")} style={{fontSize:12,color:C.t2,background:"none",border:`1px solid ${C.bdr}`,padding:"7px 16px",borderRadius:8,cursor:"pointer",fontFamily:"inherit",transition:"all .2s"}} onMouseEnter={e=>{e.target.style.borderColor=C.bdrH;e.target.style.color=C.t1}} onMouseLeave={e=>{e.target.style.borderColor=C.bdr;e.target.style.color=C.t2}}>
              Acceso
            </button>
            <a href="#contacto" style={{fontSize:13,fontWeight:600,color:"#fff",background:"linear-gradient(135deg,#7c3aed,#6366f1)",padding:"10px 22px",borderRadius:10,textDecoration:"none"}}>Agendar demo</a>
          </div>
        </div>
      </nav>
 
      {/* HERO */}
      <header style={{position:"relative",zIndex:1,maxWidth:1100,margin:"0 auto",padding:"150px 24px 80px",textAlign:"center"}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"linear-gradient(135deg,rgba(139,92,246,.12),rgba(232,121,168,.08))",border:"1px solid rgba(139,92,246,.2)",borderRadius:24,padding:"7px 20px",marginBottom:28,fontSize:13,fontWeight:600}}>
          <span style={{width:6,height:6,borderRadius:"50%",background:"#4ade80",boxShadow:"0 0 8px #4ade8060"}}/><span style={{color:"#c084fc"}}>Lanzamiento</span><span style={{color:"#9ca3af"}}>—</span><span style={{color:"#fbbf24"}}>3 meses con precio especial</span>
        </div>
        <h1 style={{fontSize:"clamp(32px,6vw,56px)",fontWeight:800,color:"#f8f8fa",lineHeight:1.08,margin:"0 auto 24px",maxWidth:850,letterSpacing:-1.5}}>El sistema operativo digital<span style={{display:"block",background:"linear-gradient(135deg,#e879a8,#c084fc,#818cf8,#60a5fa)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>que tu negocio necesita</span></h1>
        <p style={{fontSize:"clamp(16px,2.5vw,19px)",color:"#9ca3af",lineHeight:1.65,maxWidth:640,margin:"0 auto 40px"}}>ERP + CRM + automatización con IA. Todo integrado, todo a medida, todo tuyo. Implementado en 7 días, no en 6 meses.</p>
        <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
          <a href="#contacto" style={{fontSize:15,fontWeight:600,color:"#fff",background:"linear-gradient(135deg,#7c3aed,#6366f1)",padding:"16px 36px",borderRadius:12,textDecoration:"none",boxShadow:"0 4px 24px rgba(124,58,237,.3)"}}>Ver demo gratis →</a>
          <a href="#precios" style={{fontSize:15,fontWeight:500,color:"#d1d5db",background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",padding:"16px 32px",borderRadius:12,textDecoration:"none"}}>Ver precios</a>
        </div>
        <div style={{display:"flex",justifyContent:"center",gap:44,marginTop:60,flexWrap:"wrap"}}>
          {[{v:"7 días",l:"Implementación"},{v:"1/10",l:"del costo de un SAP"},{v:"100%",l:"A medida"},{v:"$0",l:"Si no funciona"}].map((s,i)=><div key={i} style={{textAlign:"center"}}><div style={{fontSize:28,fontWeight:700,color:"#f0f0f0"}}>{s.v}</div><div style={{fontSize:12,color:"#6b7280",marginTop:4}}>{s.l}</div></div>)}
        </div>
      </header>
 
      <div style={{position:"relative",zIndex:1,maxWidth:1100,margin:"0 auto",padding:"0 24px"}}>
        {/* Services */}
        <Sec id="servicios" style={{padding:"80px 0 40px"}}><STitle eyebrow="Servicios principales" title="Tu negocio completo en un solo sistema" subtitle="ERP a medida + CRM inteligente + presencia web. Los pilares de la transformación digital para PYMEs."/><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:14}}>{SVC_CORE.map((s,i)=><SvcCard key={i} s={s}/>)}</div></Sec>
 
        {/* ERP Modules */}
        <Sec id="erp" style={{padding:"60px 0 80px"}}><STitle eyebrow="Módulos ERP" title="Elige los módulos que necesitas" subtitle="No pagas por lo que no usas. Empieza con 2-3 y agrega más cuando crezcas."/><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:12}}>{ERP_MODS.map((m,i)=><div key={i} style={{display:"flex",alignItems:"flex-start",gap:14,padding:"20px",background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.06)",borderRadius:14,transition:"all .2s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,.14)";e.currentTarget.style.background="rgba(255,255,255,.04)"}} onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,.06)";e.currentTarget.style.background="rgba(255,255,255,.02)"}}><span style={{fontSize:22,flexShrink:0}}>{m.i}</span><div><div style={{fontSize:14,fontWeight:600,color:"#e5e5e5"}}>{m.n}</div><p style={{fontSize:12,color:"#6b7280",margin:"4px 0 0",lineHeight:1.5}}>{m.d}</p></div></div>)}</div></Sec>
 
        {/* Automation */}
        <Sec style={{padding:"40px 0 80px"}}><STitle eyebrow="Automatización" title="Potencia extra con IA" subtitle="Complementos que hacen que tu ERP trabaje solo."/><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:14}}>{SVC_AUTO.map((s,i)=><SvcCard key={i} s={s}/>)}</div></Sec>
 
        {/* Sectors */}
        <Sec style={{padding:"60px 0"}}><STitle eyebrow="Rubros" title="¿En qué rubro estás?" subtitle="Nuestro ERP se adapta a tu operación específica."/><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:12}}>{SECTORS.map((s,i)=><div key={i} style={{display:"flex",alignItems:"flex-start",gap:14,padding:"18px 20px",background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.05)",borderRadius:14}}><span style={{width:8,height:8,borderRadius:"50%",background:"linear-gradient(135deg,#c084fc,#60a5fa)",marginTop:6,flexShrink:0}}/><div><span style={{fontSize:14,fontWeight:600,color:"#e5e5e5"}}>{s.n}</span><p style={{fontSize:12,color:"#6b7280",margin:"4px 0 0",lineHeight:1.5}}>{s.p}</p></div></div>)}</div></Sec>
 
        {/* Pricing */}
        <Sec id="precios" style={{padding:"80px 0"}}><STitle eyebrow="Precios" title="Planes claros, sin letra chica" subtitle="ERP completo por una fracción del costo tradicional."/>
          <div style={{background:"linear-gradient(135deg,rgba(251,191,36,.08),rgba(139,92,246,.06))",border:"1px solid rgba(251,191,36,.2)",borderRadius:14,padding:"16px 24px",textAlign:"center",marginBottom:28,display:"flex",alignItems:"center",justifyContent:"center",gap:10,flexWrap:"wrap"}}><span style={{fontSize:18}}>🚀</span><span style={{fontSize:14,color:"#fbbf24",fontWeight:600}}>Precio de lanzamiento</span><span style={{fontSize:14,color:"#d1d5db"}}>— 3 meses con precio especial</span></div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:14,alignItems:"start"}}>{PRICING.map((p,i)=><div key={i} style={{background:p.pop?"rgba(124,58,237,.06)":"rgba(255,255,255,.025)",border:p.pop?"1px solid rgba(124,58,237,.3)":"1px solid rgba(255,255,255,.06)",borderRadius:20,padding:"32px 26px",position:"relative"}}>
            {p.pop&&<span style={{position:"absolute",top:-12,left:"50%",transform:"translateX(-50%)",fontSize:11,fontWeight:700,color:"#fff",background:"linear-gradient(135deg,#7c3aed,#6366f1)",padding:"5px 18px",borderRadius:20,whiteSpace:"nowrap"}}>MÁS POPULAR</span>}
            <h3 style={{fontSize:20,fontWeight:700,color:"#f0f0f0",margin:"0 0 14px"}}>{p.name}</h3>
            <div style={{marginBottom:4}}><span style={{fontSize:14,color:"#6b7280",textDecoration:"line-through"}}>${p.pr}</span><span style={{fontSize:10,color:"#fbbf24",marginLeft:8,fontWeight:600,background:"rgba(251,191,36,.1)",padding:"2px 7px",borderRadius:5}}>LANZAMIENTO</span></div>
            <div style={{display:"flex",alignItems:"baseline",gap:4,marginBottom:4}}><span style={{fontSize:36,fontWeight:800,color:"#f5f5f5"}}>${p.pl}</span><span style={{fontSize:14,color:"#6b7280"}}>CLP/mes</span></div>
            <div style={{fontSize:12,color:"#6b7280",marginBottom:4}}>por 3 meses · luego ${p.pr}/mes</div>
            <div style={{fontSize:11,color:"#4b5563",marginBottom:22}}>Implementación: ${p.setup} CLP</div>
            <div style={{borderTop:"1px solid rgba(255,255,255,.06)",paddingTop:18}}>{p.features.map((f,j)=><div key={j} style={{display:"flex",alignItems:"flex-start",gap:8,padding:"6px 0",fontSize:13,color:"#d1d5db"}}><span style={{color:"#4ade80",fontSize:13,fontWeight:700,marginTop:1}}>✓</span><span>{f}</span></div>)}</div>
            <a href="#contacto" style={{display:"block",textAlign:"center",marginTop:22,padding:"13px",borderRadius:12,fontSize:14,fontWeight:600,textDecoration:"none",...(p.pop?{background:"linear-gradient(135deg,#7c3aed,#6366f1)",color:"#fff",boxShadow:"0 4px 20px rgba(124,58,237,.25)"}:{background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",color:"#d1d5db"})}}>Solicitar demo</a>
          </div>)}</div>
        </Sec>
 
        {/* FAQ */}
        <Sec id="faq" style={{padding:"80px 0"}}><STitle eyebrow="Preguntas frecuentes" title="Lo que siempre nos preguntan"/><div style={{maxWidth:680,margin:"0 auto"}}>{FAQS.map((f,i)=><div key={i} style={{borderBottom:"1px solid rgba(255,255,255,.06)",cursor:"pointer"}} onClick={()=>setOF(openFaq===i?null:i)}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"18px 0"}}><span style={{fontSize:15,fontWeight:500,color:openFaq===i?"#f0f0f0":"#d1d5db",flex:1}}>{f.q}</span><span style={{fontSize:18,color:"#6b7280",transform:openFaq===i?"rotate(45deg)":"rotate(0)",transition:"transform .3s",flexShrink:0,marginLeft:16}}>+</span></div><div style={{maxHeight:openFaq===i?200:0,overflow:"hidden",transition:"max-height .4s cubic-bezier(.16,1,.3,1)"}}><p style={{fontSize:14,color:"#9ca3af",lineHeight:1.7,margin:"0 0 18px",paddingRight:40}}>{f.a}</p></div></div>)}</div></Sec>
 
        {/* Contact */}
        <Sec id="contacto" style={{padding:"80px 0 60px"}}><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:40,alignItems:"center"}}>
          <div>
            <span style={{fontSize:12,fontWeight:600,color:"#a78bfa",textTransform:"uppercase",letterSpacing:1.5,display:"block",marginBottom:12}}>Contacto</span>
            <h2 style={{fontSize:"clamp(24px,4vw,34px)",fontWeight:700,color:"#f5f5f5",margin:"0 0 14px",lineHeight:1.2}}>¿Listo para tu ERP a medida?</h2>
            <p style={{fontSize:15,color:"#9ca3af",lineHeight:1.7,margin:"0 0 28px"}}>Déjanos tus datos y te contactamos en menos de 2 horas con un diagnóstico personalizado.</p>
            {[{i:"🏢",t:"ERP a medida para tu rubro"},{i:"📊",t:"CRM + Dashboard en tiempo real"},{i:"⚡",t:"Implementado en 7 días"},{i:"🔒",t:"Sin permanencia"}].map((b,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:12,fontSize:14,color:"#d1d5db",marginBottom:12}}><span>{b.i}</span>{b.t}</div>)}
          </div>
          <div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.08)",borderRadius:20,padding:"30px 26px"}}>
            {formSent?<div style={{textAlign:"center",padding:"40px 0"}}><div style={{fontSize:48,marginBottom:16}}>✓</div><h3 style={{fontSize:20,fontWeight:600,color:"#4ade80",margin:"0 0 8px"}}>Enviado</h3><p style={{fontSize:14,color:"#9ca3af"}}>Te contactaremos en menos de 2 horas.</p></div>:<>
              {[{l:"Tu nombre",k:"name",t:"text",p:"Ej: María González"},{l:"Tu negocio",k:"business",t:"text",p:"Ej: Clínica Sonríe"},{l:"WhatsApp",k:"phone",t:"tel",p:"+56 9 1234 5678"}].map(f=><div key={f.k} style={{marginBottom:16}}><label style={{display:"block",fontSize:12,color:"#9ca3af",marginBottom:5,fontWeight:500}}>{f.l}</label><input type={f.t} placeholder={f.p} value={formData[f.k]} onChange={e=>setFD({...formData,[f.k]:e.target.value})} style={{width:"100%",padding:"11px 14px",background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.1)",borderRadius:10,color:"#f0f0f0",fontSize:13,outline:"none",fontFamily:"inherit",boxSizing:"border-box"}} onFocus={e=>e.target.style.borderColor="rgba(124,58,237,.5)"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,.1)"}/></div>)}
              <div style={{marginBottom:16}}>
                <label style={{display:"block",fontSize:12,color:"#9ca3af",marginBottom:8,fontWeight:500}}>Plan de interés</label>
                <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{["Esencial","Profesional","Empresa","No sé aún"].map(p=><button key={p} type="button" onClick={()=>setFormPlan(formPlan===p?"":p)} style={{fontSize:12,padding:"6px 12px",borderRadius:8,border:formPlan===p?"1px solid #7c3aed":"1px solid rgba(255,255,255,.1)",background:formPlan===p?"rgba(124,58,237,.15)":"rgba(255,255,255,.03)",color:formPlan===p?"#c084fc":"#9ca3af",cursor:"pointer",fontFamily:"inherit",transition:"all .2s"}}>{p}</button>)}</div>
              </div>
              <div style={{marginBottom:20}}>
                <label style={{display:"block",fontSize:12,color:"#9ca3af",marginBottom:8,fontWeight:500}}>Rubro de tu empresa</label>
                <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{["Clínica / Dentista","Psicólogo / Coach","Gimnasio / Academia","Restaurante / Café","Centro estético","Retail","Otro"].map(s=><button key={s} type="button" onClick={()=>setFormSector(formSector===s?"":s)} style={{fontSize:12,padding:"6px 12px",borderRadius:8,border:formSector===s?"1px solid #6366f1":"1px solid rgba(255,255,255,.1)",background:formSector===s?"rgba(99,102,241,.15)":"rgba(255,255,255,.03)",color:formSector===s?"#818cf8":"#9ca3af",cursor:"pointer",fontFamily:"inherit",transition:"all .2s"}}>{s}</button>)}</div>
              </div>
              <button onClick={async()=>{if(formData.name&&formData.phone){try{await fetch("https://formspree.io/f/xqewnnon",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({nombre:formData.name,negocio:formData.business||"—",whatsapp:formData.phone,plan:formPlan||"No indicado",rubro:formSector||"No indicado"})});setFS(true);setFD({name:"",business:"",phone:"",message:""});setFormPlan("");setFormSector("");setTimeout(()=>setFS(false),5000)}catch{const subject=encodeURIComponent("Solicitud de diagnóstico — Fluxia");const body=encodeURIComponent(`Nombre: ${formData.name}\nNegocio: ${formData.business||"—"}\nWhatsApp: ${formData.phone}\nPlan: ${formPlan||"No indicado"}\nRubro: ${formSector||"No indicado"}`);window.open(`mailto:agencia.fluxia.spa@gmail.com?subject=${subject}&body=${body}`,"_blank");setFS(true);setTimeout(()=>setFS(false),5000)}}}} style={{width:"100%",padding:"13px",background:"linear-gradient(135deg,#7c3aed,#6366f1)",border:"none",borderRadius:12,color:"#fff",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit",boxShadow:"0 4px 20px rgba(124,58,237,.25)"}}>Quiero mi diagnóstico gratis →</button>
            </>}
          </div>
        </div></Sec>
 
        {/* Footer */}
        <footer style={{borderTop:"1px solid rgba(255,255,255,.06)",padding:"36px 0 20px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:16}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}><Logo s={22}/><div><span style={{fontSize:14,fontWeight:600,color:"#d1d5db"}}>Fluxia SpA</span><p style={{fontSize:11,color:"#4b5563",margin:"2px 0 0"}}>ERP, CRM & Automatización con IA · Santiago, Chile</p></div></div>
        </footer>
      </div>
 
 
      {mode==="login"&&<div style={{position:"fixed",inset:0,zIndex:200,background:"rgba(0,0,0,.7)",backdropFilter:"blur(12px)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}} onClick={()=>setMode("landing")}>
        <div style={{width:380,maxWidth:"100%",background:"#0d0d1a",border:`1px solid ${C.bdr}`,borderRadius:20,padding:"40px 32px",boxShadow:"0 20px 60px rgba(0,0,0,.6)"}} onClick={e=>e.stopPropagation()}>
          <div style={{textAlign:"center",marginBottom:28}}>
            <Logo s={40}/>
            <h2 style={{fontSize:22,fontWeight:700,color:C.t1,margin:"12px 0 4px"}}>Acceso Fluxia</h2>
            <p style={{fontSize:13,color:C.t2,margin:0}}>Ingresa tus credenciales para acceder al panel</p>
          </div>
          <div style={{marginBottom:16}}>
            <label style={{display:"block",fontSize:12,color:C.t2,marginBottom:5,fontWeight:500}}>Usuario</label>
            <Input value={lu} onChange={setLu} placeholder=""/>
          </div>
          <div style={{marginBottom:20}}>
            <label style={{display:"block",fontSize:12,color:C.t2,marginBottom:5,fontWeight:500}}>Contraseña</label>
            <Input value={lp} onChange={setLp} placeholder="" type="password"/>
          </div>
          {loginErr&&<div style={{fontSize:12,color:C.red,textAlign:"center",marginBottom:12}}>Usuario o contraseña incorrectos</div>}
          <button onClick={handleLogin} style={{width:"100%",padding:"13px",background:"linear-gradient(135deg,#7c3aed,#6366f1)",border:"none",borderRadius:10,color:"#fff",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit",boxShadow:"0 4px 20px rgba(124,58,237,.25)"}}>
            Ingresar
          </button>
        </div>
      </div>}
    </div>
  );
 
  /* ═══════════════════════════════════ */
  /* ═══ ADMIN DASHBOARD            ═══ */
  /* ═══════════════════════════════════ */
  const tasks=data?.tasks||[],pipeline=data?.pipeline||[],clients=data?.clients||[];
  const done=tasks.filter(t=>t.col==="Completado").length;
  const mrr=clients.reduce((s,c)=>s+(c.mrr||0),0);
  const pipeVal=pipeline.filter(d=>d.col!=="Activo").reduce((s,d)=>s+(d.value||0),0);
  const ft=filterPhase==="all"?tasks:tasks.filter(t=>t.phase===filterPhase);
  const NAV=[{id:"kanban",icon:"▦",l:"Kanban"},{id:"pipeline",icon:"◈",l:"Pipeline"},{id:"clients",icon:"◎",l:"Clientes"},{id:"metrics",icon:"▤",l:"Métricas"},{id:"contenido",icon:"✦",l:"Contenido"},{id:"trading",icon:"◉",l:"Trading"}];
 
  return (
    <div style={{fontFamily:"'DM Sans',system-ui,sans-serif",background:C.bg,color:C.t1,minHeight:"100vh",display:"flex"}}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet"/>
 
      {/* SIDEBAR */}
      <aside style={{width:210,minHeight:"100vh",background:"rgba(10,10,18,.95)",borderRight:`1px solid ${C.bdr}`,padding:"18px 10px",display:"flex",flexDirection:"column",position:"sticky",top:0,flexShrink:0}}>
        <div style={{display:"flex",alignItems:"center",gap:8,padding:"0 8px",marginBottom:24}}><Logo s={26}/><div><div style={{fontSize:16,fontWeight:700}}>Fluxia</div><div style={{fontSize:10,color:C.t3}}>Panel de control</div></div></div>
        <nav style={{flex:1}}>
          {NAV.map(n=><button key={n.id} onClick={()=>{setPage(n.id);setSelectedTask(null);setSelectedClient(null)}} style={{display:"flex",alignItems:"center",gap:9,width:"100%",padding:"9px 11px",marginBottom:2,borderRadius:9,border:"none",cursor:"pointer",fontFamily:"inherit",fontSize:13,fontWeight:500,textAlign:"left",background:page===n.id?"rgba(139,92,246,.12)":"transparent",color:page===n.id?C.vi:C.t2}}><span style={{fontSize:15,opacity:.7}}>{n.icon}</span>{n.l}</button>)}
        </nav>
        <div style={{borderTop:`1px solid ${C.bdr}`,paddingTop:14}}>
          <div style={{fontSize:10,color:C.t3,marginBottom:6,fontWeight:600,textTransform:"uppercase",letterSpacing:1,padding:"0 8px"}}>Resumen</div>
          {[{l:"Avance",v:`${tasks.length>0?Math.round(done/tasks.length*100):0}%`,c:C.green},{l:"MRR",v:`$${mrr>0?(mrr/1000).toFixed(0)+"k":"0"}`,c:C.green},{l:"Pipeline",v:`$${pipeVal>0?(pipeVal/1000).toFixed(0)+"k":"0"}`,c:C.vi},{l:"Clientes",v:clients.length+"",c:C.blue}].map((s,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"4px 8px",fontSize:11}}><span style={{color:C.t3}}>{s.l}</span><span style={{color:s.c,fontWeight:600}}>{s.v}</span></div>)}
          <button onClick={()=>setMode("landing")} style={{display:"flex",alignItems:"center",gap:6,width:"100%",padding:"8px 8px",marginTop:10,borderRadius:8,border:"none",cursor:"pointer",fontFamily:"inherit",fontSize:11,color:C.t2,background:"none"}} onMouseEnter={e=>e.target.style.color=C.t1} onMouseLeave={e=>e.target.style.color=C.t2}>← Volver a la web</button>
        </div>
      </aside>
 
      {/* MAIN */}
      <main style={{flex:1,padding:"18px 22px",overflowY:"auto",minHeight:"100vh",position:"relative"}}>
 
        {/* KANBAN */}
        {page==="kanban"&&<>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14,flexWrap:"wrap",gap:8}}>
            <h1 style={{fontSize:20,fontWeight:700,margin:0}}>Kanban — Roadmap 90 días</h1>
            <Btn primary onClick={()=>setAddingTask(true)}>+ Tarea</Btn>
          </div>
          <div style={{display:"flex",gap:4,marginBottom:14,flexWrap:"wrap"}}>
            <button onClick={()=>setFilterPhase("all")} style={{fontSize:11,padding:"4px 10px",borderRadius:6,border:filterPhase==="all"?`1px solid ${C.vi}`:`1px solid ${C.bdr}`,background:filterPhase==="all"?"rgba(139,92,246,.12)":"transparent",color:filterPhase==="all"?C.vi:C.t2,cursor:"pointer",fontFamily:"inherit"}}>Todas</button>
            {Object.entries(phC).map(([ph,c])=><button key={ph} onClick={()=>setFilterPhase(ph)} style={{fontSize:11,padding:"4px 10px",borderRadius:6,border:filterPhase===ph?`1px solid ${c}`:`1px solid ${C.bdr}`,background:filterPhase===ph?`${c}15`:"transparent",color:filterPhase===ph?c:C.t2,cursor:"pointer",fontFamily:"inherit"}}>{ph}</button>)}
          </div>
          {addingTask&&<Card style={{marginBottom:14,maxWidth:380}}>
            <Input value={nt} onChange={setNt} placeholder="Título..." style={{marginBottom:6}}/>
            <div style={{display:"flex",gap:4,marginBottom:6}}>{["alta","media","baja"].map(p=><button key={p} onClick={()=>setNp(p)} style={{fontSize:10,padding:"3px 7px",borderRadius:5,border:np===p?`1px solid ${priC[p]}`:`1px solid ${C.bdr}`,background:np===p?`${priC[p]}20`:"transparent",color:np===p?priC[p]:C.t2,cursor:"pointer",fontFamily:"inherit",textTransform:"capitalize"}}>{p}</button>)}</div>
            <div style={{display:"flex",gap:4,marginBottom:8}}>{Object.entries(phC).map(([ph,c])=><button key={ph} onClick={()=>setNph(ph)} style={{fontSize:10,padding:"3px 7px",borderRadius:5,border:nph===ph?`1px solid ${c}`:`1px solid ${C.bdr}`,background:nph===ph?`${c}18`:"transparent",color:nph===ph?c:C.t2,cursor:"pointer",fontFamily:"inherit"}}>{ph}</button>)}</div>
            <div style={{display:"flex",gap:6}}><Btn primary onClick={()=>{if(nt.trim()){up(d=>{d.tasks.push({id:`t${d.nid++}`,title:nt.trim(),col:"Por hacer",priority:np,phase:nph,day:"",notes:[],activity:[]})});setNt("");setAddingTask(false)}}}>Crear</Btn><Btn onClick={()=>setAddingTask(false)}>Cancelar</Btn></div>
          </Card>}
          <div style={{display:"grid",gridTemplateColumns:`repeat(${KC.length},1fr)`,gap:10}}>
            {KC.map(col=>{const ct=ft.filter(t=>t.col===col);return <div key={col}><div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8,padding:"0 4px"}}><span style={{fontSize:13,fontWeight:600,color:C.t1}}>{col}</span><span style={{fontSize:10,color:C.t3,background:"rgba(255,255,255,.05)",padding:"1px 6px",borderRadius:8}}>{ct.length}</span></div><div style={{minHeight:60}}>{ct.map(t=><Card key={t.id} style={{marginBottom:7,cursor:"pointer"}}><div onClick={()=>setSelectedTask(t.id)} style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:6}}><span style={{fontSize:12,fontWeight:500,color:C.t1,lineHeight:1.4,flex:1}}>{t.title}</span><div style={{display:"flex",gap:4,alignItems:"center"}}><button onClick={e=>{e.stopPropagation();const nx=KC[(KC.indexOf(t.col)+1)%KC.length];up(d=>{const tk=d.tasks.find(x=>x.id===t.id);if(tk){(tk.activity=tk.activity||[]).push({text:`→ ${nx}`,date:now});tk.col=nx}})}} style={{background:"none",border:"none",color:C.t3,cursor:"pointer",fontSize:12,padding:0}}>→</button><button onClick={e=>{e.stopPropagation();up(d=>{d.tasks=d.tasks.filter(x=>x.id!==t.id)})}} style={{background:"none",border:"none",color:C.t3,cursor:"pointer",fontSize:14,padding:0,lineHeight:1}} onMouseEnter={e=>e.currentTarget.style.color=C.red} onMouseLeave={e=>e.currentTarget.style.color=C.t3}>×</button></div></div><div style={{display:"flex",gap:4,marginTop:6,flexWrap:"wrap"}}><Badge text={t.priority} color={priC[t.priority]}/>{t.phase&&<Badge text={t.phase} color={phC[t.phase]||C.vi}/>}{(t.notes||[]).length>0&&<span style={{fontSize:10,color:C.t3}}>💬{t.notes.length}</span>}</div></Card>)}</div></div>})}
          </div>
          {selectedTask&&<TaskDetail/>}
        </>}
 
        {/* PIPELINE */}
        {page==="pipeline"&&<>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><h1 style={{fontSize:20,fontWeight:700,margin:0}}>Pipeline de ventas</h1><Btn primary onClick={()=>setAddingDeal(true)}>+ Deal</Btn></div>
          {addingDeal&&<Card style={{marginBottom:14,maxWidth:420}}>
            <div style={{fontSize:13,fontWeight:600,color:C.t1,marginBottom:10}}>Nuevo deal</div>
            {clients.length>0&&<div style={{marginBottom:10}}>
              <label style={{display:"block",fontSize:10,color:C.t3,marginBottom:4}}>Cargar desde cliente existente</label>
              <select value={dClientId} onChange={e=>{const id=e.target.value;setDClientId(id);if(id){const cl=clients.find(c=>c.id===id);if(cl){setDn(cl.contact||cl.name);setDb(cl.name);setDv(String(cl.mrr||""));setDs(cl.sector||"Clínica")}}else{setDn("");setDb("");setDv("");setDs("Clínica")}}} style={{width:"100%",padding:"9px 12px",background:"rgba(255,255,255,.04)",border:`1px solid ${C.bdr}`,borderRadius:8,color:dClientId?C.t1:C.t3,fontSize:12,outline:"none",fontFamily:"inherit",cursor:"pointer",appearance:"none",WebkitAppearance:"none"}}>
                <option value="" style={{background:"#0d0d18",color:C.t2}}>— Nuevo prospecto (manual) —</option>
                {clients.map(cl=><option key={cl.id} value={cl.id} style={{background:"#0d0d18",color:C.t1}}>{cl.name} · Plan {cl.plan} · ${cl.mrr>0?cl.mrr.toLocaleString("es-CL"):"—"}/mes</option>)}
              </select>
            </div>}
            <div style={{height:1,background:C.bdr,margin:"4px 0 10px"}}/>
            <Input value={dn} onChange={setDn} placeholder="Nombre contacto *" style={{marginBottom:6}}/>
            <Input value={db} onChange={setDb} placeholder="Nombre negocio" style={{marginBottom:6}}/>
            <div style={{display:"flex",gap:6,marginBottom:6}}>
              <div style={{flex:1}}><label style={{display:"block",fontSize:10,color:C.t3,marginBottom:3}}>Mensualidad CLP</label><Input value={dv} onChange={setDv} placeholder="Ej: 180000" type="number"/></div>
              <div style={{flex:1}}><label style={{display:"block",fontSize:10,color:C.t3,marginBottom:3}}>Implementación CLP</label><Input value={di} onChange={setDi} placeholder="Ej: 500000" type="number"/></div>
            </div>
            <div style={{marginBottom:10}}><label style={{display:"block",fontSize:10,color:C.t3,marginBottom:4}}>Sector</label><div style={{display:"flex",gap:3,flexWrap:"wrap"}}>{["Clínica","Psicólogo","Gimnasio","Restaurante","Estética","Retail","Otro"].map(s=><button key={s} onClick={()=>setDs(s)} style={{fontSize:10,padding:"3px 7px",borderRadius:5,border:ds===s?`1px solid ${C.vi}`:`1px solid ${C.bdr}`,background:ds===s?"rgba(139,92,246,.12)":"transparent",color:ds===s?C.vi:C.t2,cursor:"pointer",fontFamily:"inherit"}}>{s}</button>)}</div></div>
            <div style={{display:"flex",gap:6}}><Btn primary onClick={()=>{if(dn.trim()){up(d=>{d.pipeline.push({id:`d${d.nid++}`,name:dn.trim(),business:db,value:parseInt(dv)||0,impl:parseInt(di)||0,sector:ds,col:"Lead",clientId:dClientId||null})});setDn("");setDb("");setDv("");setDi("");setDs("Clínica");setDClientId("");setAddingDeal(false)}}}>Crear deal</Btn><Btn onClick={()=>{setAddingDeal(false);setDClientId("");setDn("");setDb("");setDv("");setDi("")}}>Cancelar</Btn></div>
          </Card>}
          <div style={{display:"grid",gridTemplateColumns:`repeat(${PC.length},1fr)`,gap:8}}>
            {PC.map(col=>{const deals=pipeline.filter(d=>d.col===col);return <div key={col}><div style={{display:"flex",alignItems:"center",gap:5,marginBottom:8,padding:"0 4px"}}><Dot color={stgC[col]}/><span style={{fontSize:12,fontWeight:600,color:C.t1}}>{col}</span><span style={{fontSize:10,color:C.t3,background:"rgba(255,255,255,.05)",padding:"1px 6px",borderRadius:8}}>{deals.length}</span></div><div style={{minHeight:60}}>{deals.map(d=><Card key={d.id} style={{marginBottom:7}}><div style={{display:"flex",justifyContent:"space-between"}}><div><div style={{fontSize:13,fontWeight:600,color:C.t1}}>{d.name}</div><div style={{fontSize:11,color:C.t2}}>{d.business}</div></div><div style={{display:"flex",gap:4}}><button onClick={()=>{const nx=PC[(PC.indexOf(d.col)+1)%PC.length];up(dt=>{const dl=dt.pipeline.find(x=>x.id===d.id);if(dl)dl.col=nx})}} style={{background:"none",border:"none",color:C.t3,cursor:"pointer",fontSize:12}}>→</button><button onClick={()=>up(dt=>{dt.pipeline=dt.pipeline.filter(x=>x.id!==d.id)})} style={{background:"none",border:"none",color:C.t3,cursor:"pointer",fontSize:14,lineHeight:1}} onMouseEnter={e=>e.currentTarget.style.color=C.red} onMouseLeave={e=>e.currentTarget.style.color=C.t3}>×</button></div></div><div style={{marginTop:6}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:3}}><span style={{fontSize:10,color:C.t3}}>Mensualidad</span><span style={{fontSize:13,fontWeight:700,color:stgC[d.col]||C.vi}}>${d.value>0?d.value.toLocaleString("es-CL"):"—"}</span></div><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5}}><span style={{fontSize:10,color:C.t3}}>Implementación</span><span style={{fontSize:13,fontWeight:600,color:C.gold}}>${d.impl>0?d.impl.toLocaleString("es-CL"):"—"}</span></div><Badge text={d.sector} color={C.t2}/></div></Card>)}</div></div>})}
          </div>
        </>}
 
        {/* CLIENTS */}
        {page==="clients"&&<>
          {!selectedClient?<>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
              <h1 style={{fontSize:20,fontWeight:700,margin:0}}>Clientes activos</h1>
              <Btn primary onClick={()=>setAddingClient(true)}>+ Nuevo cliente</Btn>
            </div>
            {addingClient&&<Card style={{marginBottom:16,maxWidth:560}}>
              <div style={{fontSize:14,fontWeight:600,color:C.t1,marginBottom:12}}>Nuevo cliente</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
                <div><label style={{display:"block",fontSize:11,color:C.t2,marginBottom:4,fontWeight:500}}>Nombre empresa *</label><Input value={ncName} onChange={setNcName} placeholder="Ej: Clínica Sonríe"/></div>
                <div><label style={{display:"block",fontSize:11,color:C.t2,marginBottom:4,fontWeight:500}}>Nombre contacto</label><Input value={ncContact} onChange={setNcContact} placeholder="Ej: María González"/></div>
                <div><label style={{display:"block",fontSize:11,color:C.t2,marginBottom:4,fontWeight:500}}>Email</label><Input value={ncEmail} onChange={setNcEmail} placeholder="contacto@empresa.cl" type="email"/></div>
                <div><label style={{display:"block",fontSize:11,color:C.t2,marginBottom:4,fontWeight:500}}>Teléfono</label><Input value={ncPhone} onChange={setNcPhone} placeholder="+56 9 1234 5678" type="tel"/></div>
                <div><label style={{display:"block",fontSize:11,color:C.t2,marginBottom:4,fontWeight:500}}>RUT empresa</label><Input value={ncRut} onChange={setNcRut} placeholder="12.345.678-9"/></div>
                <div><label style={{display:"block",fontSize:11,color:C.t2,marginBottom:4,fontWeight:500}}>MRR mensual (CLP)</label><Input value={ncMrr} onChange={setNcMrr} placeholder="180000" type="number"/></div>
              </div>
              <div style={{marginBottom:8}}>
                <label style={{display:"block",fontSize:11,color:C.t2,marginBottom:4,fontWeight:500}}>Plan contratado</label>
                <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{["Esencial","Profesional","Empresa"].map(p=><button key={p} onClick={()=>{setNcPlan(p);const pm={"Esencial":"120000","Profesional":"180000","Empresa":"300000"};setNcMrr(pm[p]||"")}} style={{fontSize:11,padding:"4px 10px",borderRadius:6,border:ncPlan===p?`1px solid ${C.vi}`:`1px solid ${C.bdr}`,background:ncPlan===p?"rgba(139,92,246,.12)":"transparent",color:ncPlan===p?C.vi:C.t2,cursor:"pointer",fontFamily:"inherit"}}>{p}<span style={{display:"block",fontSize:9,color:ncPlan===p?C.vi:C.t3,fontWeight:400}}>{"Esencial"===p?"$120k":"Profesional"===p?"$180k":"$300k"}/mes</span></button>)}</div>
              </div>
              <div style={{marginBottom:12}}>
                <label style={{display:"block",fontSize:11,color:C.t2,marginBottom:4,fontWeight:500}}>Sector</label>
                <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{["Clínica","Psicólogo","Gimnasio","Restaurante","Estética","Retail","Otro"].map(s=><button key={s} onClick={()=>setNcSector(s)} style={{fontSize:11,padding:"4px 10px",borderRadius:6,border:ncSector===s?`1px solid ${C.ind}`:`1px solid ${C.bdr}`,background:ncSector===s?"rgba(99,102,241,.12)":"transparent",color:ncSector===s?C.ind:C.t2,cursor:"pointer",fontFamily:"inherit"}}>{s}</button>)}</div>
              </div>
              <div style={{display:"flex",gap:6}}>
                <Btn primary onClick={()=>{if(ncName.trim()){const month=new Date().toLocaleDateString("es-CL",{month:"short",year:"numeric"});up(d=>{d.clients.push({id:`c${d.nid++}`,name:ncName.trim(),contact:ncContact,plan:ncPlan,sector:ncSector,email:ncEmail,phone:ncPhone,rut:ncRut,since:month,status:"active",mrr:parseInt(ncMrr)||0,bot:{status:"online",conversations:0,leads:0,appointments:0,responseTime:"—",uptime:100},weeklyData:[{d:"L",conv:0,leads:0,apt:0},{d:"M",conv:0,leads:0,apt:0},{d:"X",conv:0,leads:0,apt:0},{d:"J",conv:0,leads:0,apt:0},{d:"V",conv:0,leads:0,apt:0},{d:"S",conv:0,leads:0,apt:0},{d:"D",conv:0,leads:0,apt:0}],recentLeads:[],invoices:[]})});setNcName("");setNcContact("");setNcPlan("Esencial");setNcSector("Clínica");setNcEmail("");setNcPhone("");setNcRut("");setNcMrr("");setAddingClient(false)}}}>Crear cliente</Btn>
                <Btn onClick={()=>{setAddingClient(false);setNcName("");setNcContact("");setNcEmail("");setNcPhone("");setNcRut("");setNcMrr("");}}>Cancelar</Btn>
              </div>
            </Card>}
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:12}}>
              {clients.map(cl=><Card key={cl.id} style={{cursor:"pointer"}}><div onClick={()=>{setSelectedClient(cl.id);setClientTab("dashboard")}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                  <div><div style={{fontSize:15,fontWeight:600}}>{cl.name}</div><div style={{fontSize:11,color:C.t2,marginTop:2}}>Plan {cl.plan} · {cl.sector}</div></div>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <div style={{display:"flex",alignItems:"center",gap:5}}><Dot color={C.green} glow/><span style={{fontSize:11,color:C.green}}>Activo</span></div>
                    <button onClick={e=>{e.stopPropagation();if(window.confirm(`¿Eliminar a "${cl.name}"? Esta acción no se puede deshacer.`)){up(d=>{d.clients=d.clients.filter(c=>c.id!==cl.id)})}}} style={{background:"none",border:`1px solid ${C.bdr}`,borderRadius:6,color:C.t3,cursor:"pointer",fontSize:11,padding:"3px 8px",fontFamily:"inherit",lineHeight:1}} onMouseEnter={e=>{e.currentTarget.style.borderColor=C.red;e.currentTarget.style.color=C.red}} onMouseLeave={e=>{e.currentTarget.style.borderColor=C.bdr;e.currentTarget.style.color=C.t3}}>Eliminar</button>
                  </div>
                </div>
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}><Stat label="MRR" value={`$${cl.mrr>0?(cl.mrr/1000).toFixed(0)+"k":"0"}`} color={C.green}/><Stat label="Leads" value={cl.bot?.leads||0} color={C.vi}/><Stat label="Citas" value={cl.bot?.appointments||0} color={C.blue}/></div>
              </div></Card>)}
              {clients.length===0&&<div style={{padding:30,color:C.t3,fontSize:13}}>Sin clientes activos aún. Crea el primero con el botón superior.</div>}
            </div>
          </>:<>{(()=>{const cl=clients.find(c=>c.id===selectedClient);if(!cl)return null;
            return<><button onClick={()=>setSelectedClient(null)} style={{background:"none",border:"none",color:C.vi,fontSize:12,cursor:"pointer",fontFamily:"inherit",padding:0,marginBottom:10}}>← Volver</button>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:18,flexWrap:"wrap"}}><h1 style={{fontSize:20,fontWeight:700,margin:0}}>{cl.name}</h1><Badge text={`Plan ${cl.plan}`} color={C.vi}/><div style={{display:"flex",alignItems:"center",gap:4}}><Dot color={C.green} glow/><span style={{fontSize:11,color:C.green}}>Online</span></div></div>
              <div style={{display:"flex",gap:2,marginBottom:18,borderBottom:`1px solid ${C.bdr}`}}>{["dashboard","leads","services","billing"].map(t=><button key={t} onClick={()=>setClientTab(t)} style={{padding:"8px 16px",fontSize:12,fontWeight:500,border:"none",borderBottom:clientTab===t?`2px solid ${C.vi}`:"2px solid transparent",background:"none",color:clientTab===t?C.t1:C.t2,cursor:"pointer",fontFamily:"inherit",textTransform:"capitalize"}}>{t}</button>)}</div>
              {clientTab==="dashboard"&&<><div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:16}}><Stat label="Conversaciones" value={cl.bot?.conversations||0}/><Stat label="Leads" value={cl.bot?.leads||0} color={C.vi}/><Stat label="Citas" value={cl.bot?.appointments||0} color={C.green}/><Stat label="Respuesta" value={cl.bot?.responseTime||"—"} color={C.gold}/></div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 260px",gap:12}}><Card><div style={{fontSize:13,fontWeight:600,marginBottom:12}}>Actividad semanal</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}><div><div style={{fontSize:10,color:C.t3,marginBottom:4}}>Conversaciones</div><MiniChart data={cl.weeklyData} dk="conv" color={C.vi}/></div><div><div style={{fontSize:10,color:C.t3,marginBottom:4}}>Citas</div><MiniChart data={cl.weeklyData} dk="apt" color={C.green}/></div></div></Card>
                  <Card><div style={{fontSize:13,fontWeight:600,marginBottom:12}}>Estado bot</div>{[{l:"Uptime",v:`${cl.bot?.uptime}%`},{l:"Respuesta",v:cl.bot?.responseTime},{l:"Modelo",v:"GPT-4o mini"},{l:"Memoria",v:"Activada"}].map((r,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:i<3?`1px solid ${C.bdr}`:"none",fontSize:12}}><span style={{color:C.t2}}>{r.l}</span><span style={{color:C.t1,fontWeight:500}}>{r.v}</span></div>)}</Card></div></>}
              {clientTab==="leads"&&<div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                  <span style={{fontSize:13,fontWeight:600,color:C.t1}}>Leads <span style={{fontSize:11,color:C.t3,fontWeight:400}}>({(cl.recentLeads||[]).length})</span></span>
                  <Btn primary onClick={()=>setAddingLead(!addingLead)}>{addingLead?"Cancelar":"+ Agregar lead"}</Btn>
                </div>
                {addingLead&&<Card style={{marginBottom:10}}>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
                    <div><label style={{display:"block",fontSize:11,color:C.t2,marginBottom:3}}>Nombre *</label><Input value={ldName} onChange={setLdName} placeholder="Ej: María González"/></div>
                    <div><label style={{display:"block",fontSize:11,color:C.t2,marginBottom:3}}>Servicio de interés</label><Input value={ldService} onChange={setLdService} placeholder="Ej: Bot WhatsApp"/></div>
                  </div>
                  <div style={{display:"flex",gap:10,marginBottom:10,flexWrap:"wrap"}}>
                    <div><label style={{display:"block",fontSize:11,color:C.t2,marginBottom:4}}>Fuente</label><div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{["WhatsApp","Web","Referido","Instagram","Otro"].map(s=><button key={s} onClick={()=>setLdSrc(s)} style={{fontSize:10,padding:"3px 8px",borderRadius:5,border:ldSrc===s?`1px solid ${C.blue}`:`1px solid ${C.bdr}`,background:ldSrc===s?"rgba(96,165,250,.12)":"transparent",color:ldSrc===s?C.blue:C.t2,cursor:"pointer",fontFamily:"inherit"}}>{s}</button>)}</div></div>
                    <div><label style={{display:"block",fontSize:11,color:C.t2,marginBottom:4}}>Temperatura</label><div style={{display:"flex",gap:4}}>{[["hot","Hot 🔥"],["warm","Warm ☀️"],["cold","Cold 🧊"]].map(([v,l])=><button key={v} onClick={()=>setLdStatus(v)} style={{fontSize:10,padding:"3px 8px",borderRadius:5,border:ldStatus===v?`1px solid ${C.gold}`:`1px solid ${C.bdr}`,background:ldStatus===v?"rgba(251,191,36,.12)":"transparent",color:ldStatus===v?C.gold:C.t2,cursor:"pointer",fontFamily:"inherit"}}>{l}</button>)}</div></div>
                  </div>
                  <Btn primary onClick={()=>{if(ldName.trim()){up(d=>{const c2=d.clients.find(x=>x.id===selectedClient);if(c2){(c2.recentLeads=c2.recentLeads||[]).push({name:ldName.trim(),service:ldService||"—",src:ldSrc,status:ldStatus,time:new Date().toLocaleDateString("es-CL",{day:"2-digit",month:"short"})});c2.bot=c2.bot||{};c2.bot.leads=(c2.bot.leads||0)+1}});setLdName("");setLdService("");setLdSrc("WhatsApp");setLdStatus("warm");setAddingLead(false)}}}>Guardar lead</Btn>
                </Card>}
                <Card>
                  {(cl.recentLeads||[]).length===0
                    ?<div style={{textAlign:"center",padding:"24px 0"}}><div style={{fontSize:28,marginBottom:8}}>📭</div><div style={{fontSize:12,color:C.t3}}>Sin leads aún. Agrega el primero con el botón superior.</div></div>
                    :[...(cl.recentLeads||[])].reverse().map((ld,i,arr)=><div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 0",borderBottom:i<arr.length-1?`1px solid ${C.bdr}`:"none",flexWrap:"wrap",gap:6}}>
                      <div style={{display:"flex",alignItems:"center",gap:8}}>
                        <div style={{width:28,height:28,borderRadius:"50%",background:"rgba(255,255,255,.06)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:600,color:C.t2}}>{ld.name.split(" ").map(n=>n[0]).join("")}</div>
                        <div><div style={{fontSize:12,fontWeight:500,color:C.t1}}>{ld.name}</div><div style={{fontSize:10,color:C.t3}}>{ld.service} · {ld.src}</div></div>
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:6}}><LeadBadge status={ld.status}/><span style={{fontSize:10,color:C.t3}}>{ld.time}</span></div>
                    </div>)
                  }
                </Card>
              </div>}
              {clientTab==="services"&&<div>
                <div style={{fontSize:12,color:C.t2,marginBottom:8}}>Servicios incluidos en el Plan <span style={{color:C.vi,fontWeight:600}}>{cl.plan}</span></div>
                <Card style={{marginBottom:10}}>
                  {(PRICING.find(p=>p.name===cl.plan)?.features||[]).map((s,i,arr)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"7px 0",borderBottom:i<arr.length-1?`1px solid ${C.bdr}`:"none",fontSize:12}}><span style={{color:C.green,fontWeight:700,fontSize:13}}>✓</span><span style={{color:C.t1}}>{s}</span></div>)}
                </Card>
                <div style={{fontSize:12,color:C.t2,marginBottom:8}}>Estado del sistema</div>
                <Card>
                  {[
                    {l:"Bot WhatsApp + IA",v:"Activo",c:C.green},
                    {l:"Dashboard métricas",v:"Activo",c:C.green},
                    {l:"CRM básico",v:"Activo",c:C.green},
                    {l:"Landing Page",v:"Activo",c:C.green},
                    {l:"ERP completo",v:cl.plan==="Esencial"?"No incluido":"Activo",c:cl.plan==="Esencial"?C.t3:C.green},
                    {l:"Portal cliente",v:cl.plan==="Esencial"?"No incluido":"Activo",c:cl.plan==="Esencial"?C.t3:C.green},
                  ].map((r,i,arr)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:i<arr.length-1?`1px solid ${C.bdr}`:"none",fontSize:12}}>
                    <span style={{color:C.t2}}>{r.l}</span>
                    <div style={{display:"flex",alignItems:"center",gap:5}}><Dot color={r.c}/><span style={{color:r.c,fontWeight:500}}>{r.v}</span></div>
                  </div>)}
                </Card>
              </div>}
              {clientTab==="billing"&&<div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                  <div><span style={{fontSize:13,fontWeight:600,color:C.t1}}>Facturación</span><span style={{fontSize:11,color:C.t3,marginLeft:8}}>MRR: <span style={{color:C.green,fontWeight:600}}>${(cl.mrr||0).toLocaleString("es-CL")}</span>/mes</span></div>
                  <Btn primary onClick={()=>setAddingInvoice(!addingInvoice)}>{addingInvoice?"Cancelar":"+ Registrar pago"}</Btn>
                </div>
                {addingInvoice&&<Card style={{marginBottom:10}}>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
                    <div><label style={{display:"block",fontSize:11,color:C.t2,marginBottom:3}}>Mes *</label><Input value={invMonth} onChange={setInvMonth} placeholder={`Ej: ${new Date().toLocaleDateString("es-CL",{month:"long",year:"numeric"})}`}/></div>
                    <div><label style={{display:"block",fontSize:11,color:C.t2,marginBottom:3}}>Monto CLP</label><Input value={invAmount} onChange={setInvAmount} placeholder={String(cl.mrr||0)} type="number"/></div>
                  </div>
                  <Btn primary onClick={()=>{if(invMonth.trim()){up(d=>{const c2=d.clients.find(x=>x.id===selectedClient);if(c2)(c2.invoices=c2.invoices||[]).push({month:invMonth.trim(),amount:parseInt(invAmount)||c2.mrr||0,date:new Date().toLocaleDateString("es-CL",{day:"2-digit",month:"short",year:"numeric"})})});setInvMonth("");setInvAmount("");setAddingInvoice(false)}}}>Guardar pago</Btn>
                </Card>}
                <Card>
                  {(cl.invoices||[]).length===0
                    ?<div style={{textAlign:"center",padding:"24px 0"}}><div style={{fontSize:28,marginBottom:8}}>🧾</div><div style={{fontSize:12,color:C.t3}}>Sin pagos registrados. Agrega el primero con el botón superior.</div></div>
                    :<>
                      {[...(cl.invoices||[])].reverse().map((inv,i,arr)=><div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:i<arr.length-1?`1px solid ${C.bdr}`:"none"}}>
                        <div><div style={{fontSize:13,fontWeight:500,color:C.t1}}>{inv.month}</div>{inv.date&&<div style={{fontSize:10,color:C.t3,marginTop:1}}>{inv.date}</div>}</div>
                        <div style={{display:"flex",alignItems:"center",gap:10}}><span style={{fontSize:14,fontWeight:700,color:C.t1}}>${inv.amount?.toLocaleString("es-CL")}</span><Badge text="Pagado" color={C.green}/></div>
                      </div>)}
                      <div style={{marginTop:10,paddingTop:10,borderTop:`1px solid ${C.bdr}`,display:"flex",justifyContent:"space-between",fontSize:12}}>
                        <span style={{color:C.t2}}>Total facturado</span>
                        <span style={{color:C.green,fontWeight:700}}>${(cl.invoices||[]).reduce((s,inv)=>s+(inv.amount||0),0).toLocaleString("es-CL")}</span>
                      </div>
                    </>
                  }
                </Card>
              </div>}
            </>})()}
          </>}
        </>}
 
        {/* CONTENIDO */}
        {page==="contenido"&&<>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
            <div><h1 style={{fontSize:20,fontWeight:700,margin:0}}>Demos & Contenido</h1><p style={{fontSize:11,color:C.t3,margin:"3px 0 0"}}>Catálogo de demos por nicho · pipeline de publicaciones</p></div>
            <Btn primary onClick={()=>setAddingContent(true)}>+ Nueva pieza</Btn>
          </div>
          <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap"}}>
            <Stat label="Demos listos" value={DEMOS_CATALOG.filter(d=>d.status==="construido").length} color={C.green} sub="para mostrar"/>
            <Stat label="En desarrollo" value={DEMOS_CATALOG.filter(d=>d.status==="en progreso").length} color={C.gold}/>
            {CONT_COLS.map(col=>{const n=(data?.content||[]).filter(c=>(c.col||"Idea")===col).length;return n>0?<Stat key={col} label={col} value={n} color={CONT_COL_C[col]}/>:null})}
          </div>

          {addingContent&&<Card style={{marginBottom:14,maxWidth:540}}>
            <div style={{fontSize:13,fontWeight:600,color:C.t1,marginBottom:10}}>Nueva pieza de contenido</div>
            <div style={{marginBottom:8}}>
              <label style={{display:"block",fontSize:11,color:C.t2,marginBottom:4}}>Nicho</label>
              <div style={{display:"flex",gap:3,flexWrap:"wrap"}}>{DEMOS_CATALOG.map(d=><button key={d.niche} onClick={()=>setCtNiche(d.niche)} style={{fontSize:10,padding:"3px 8px",borderRadius:5,border:ctNiche===d.niche?`1px solid ${d.color}`:`1px solid ${C.bdr}`,background:ctNiche===d.niche?`${d.color}18`:"transparent",color:ctNiche===d.niche?d.color:C.t2,cursor:"pointer",fontFamily:"inherit"}}>{d.icon} {d.niche}</button>)}</div>
            </div>
            {IDEAS_POR_NICHO[ctNiche]&&<div style={{marginBottom:8}}>
              <label style={{display:"block",fontSize:11,color:C.t3,marginBottom:5}}>💡 Ideas para {ctNiche} (clic para usar):</label>
              {IDEAS_POR_NICHO[ctNiche].map((idea,i)=><button key={i} onClick={()=>setCtTitle(idea)} style={{display:"block",width:"100%",textAlign:"left",padding:"6px 9px",marginBottom:3,background:ctTitle===idea?"rgba(139,92,246,.1)":"rgba(255,255,255,.02)",border:ctTitle===idea?`1px solid ${C.vi}`:`1px solid ${C.bdr}`,borderRadius:6,color:ctTitle===idea?C.vi:C.t2,fontSize:11,cursor:"pointer",fontFamily:"inherit",lineHeight:1.4,transition:"all .15s"}}>{idea}</button>)}
            </div>}
            <Input value={ctTitle} onChange={setCtTitle} placeholder="O escribe tu propio título..." style={{marginBottom:8}}/>
            <div style={{display:"flex",gap:10,marginBottom:8,flexWrap:"wrap"}}>
              <div><label style={{display:"block",fontSize:11,color:C.t2,marginBottom:4}}>Plataforma</label><div style={{display:"flex",gap:3,flexWrap:"wrap"}}>{Object.entries(platC).map(([p,c])=><button key={p} onClick={()=>setCtPlatform(p)} style={{fontSize:10,padding:"3px 8px",borderRadius:5,border:ctPlatform===p?`1px solid ${c}`:`1px solid ${C.bdr}`,background:ctPlatform===p?`${c}15`:"transparent",color:ctPlatform===p?c:C.t2,cursor:"pointer",fontFamily:"inherit"}}>{p}</button>)}</div></div>
              <div><label style={{display:"block",fontSize:11,color:C.t2,marginBottom:4}}>Tipo</label><div style={{display:"flex",gap:3,flexWrap:"wrap"}}>{["Post","Carrusel","Reel","Historia","Artículo"].map(t=><button key={t} onClick={()=>setCtType(t)} style={{fontSize:10,padding:"3px 8px",borderRadius:5,border:ctType===t?`1px solid ${C.vi}`:`1px solid ${C.bdr}`,background:ctType===t?"rgba(139,92,246,.12)":"transparent",color:ctType===t?C.vi:C.t2,cursor:"pointer",fontFamily:"inherit"}}>{t}</button>)}</div></div>
            </div>
            <div style={{marginBottom:10}}>
              <label style={{display:"block",fontSize:11,color:C.t2,marginBottom:4}}>Columna inicial</label>
              <div style={{display:"flex",gap:4}}>{CONT_COLS.map(col=><button key={col} onClick={()=>setCtCol(col)} style={{fontSize:10,padding:"3px 10px",borderRadius:5,border:ctCol===col?`1px solid ${CONT_COL_C[col]}`:`1px solid ${C.bdr}`,background:ctCol===col?`${CONT_COL_C[col]}15`:"transparent",color:ctCol===col?CONT_COL_C[col]:C.t2,cursor:"pointer",fontFamily:"inherit"}}>{col}</button>)}</div>
            </div>
            <div style={{display:"flex",gap:6}}><Btn primary onClick={()=>{if(ctTitle.trim()){up(d=>{(d.content=d.content||[]).push({id:`ct${d.nid++}`,niche:ctNiche,title:ctTitle.trim(),copy:"",platform:ctPlatform,type:ctType,col:ctCol,date:new Date().toLocaleDateString("es-CL",{day:"2-digit",month:"short"})})});setCtTitle("");setCtCol("Idea");setAddingContent(false)}}}>Crear</Btn><Btn onClick={()=>{setAddingContent(false);setCtTitle("")}}>Cancelar</Btn></div>
          </Card>}

          <details style={{marginBottom:14}}>
            <summary style={{fontSize:11,color:C.t2,fontWeight:600,textTransform:"uppercase",letterSpacing:.5,cursor:"pointer",userSelect:"none",listStyle:"none",display:"flex",alignItems:"center",gap:6,paddingBottom:2}}>
              <span>▸</span> Catálogo de demos — {DEMOS_CATALOG.filter(d=>d.status==="construido").length} listos · {DEMOS_CATALOG.filter(d=>d.status==="en progreso").length} en progreso
            </summary>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))",gap:8,marginTop:10}}>
              {DEMOS_CATALOG.map(dm=>{
                const piezas=(data?.content||[]).filter(c=>c.niche===dm.niche).length;
                const stMap={construido:{c:C.green,l:"Listo"},"en progreso":{c:C.gold,l:"En progreso"},pendiente:{c:C.t3,l:"Pendiente"}};
                const st=stMap[dm.status]||stMap.pendiente;
                return <div key={dm.id} style={{background:C.bg2,border:`1px solid ${C.bdr}`,borderRadius:11,padding:"12px",position:"relative",overflow:"hidden",transition:"border-color .2s"}} onMouseEnter={e=>e.currentTarget.style.borderColor=`${dm.color}50`} onMouseLeave={e=>e.currentTarget.style.borderColor=C.bdr}>
                  <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${dm.color},${dm.color}20)`}}/>
                  <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:7}}><span style={{fontSize:18}}>{dm.icon}</span><div><div style={{fontSize:12,fontWeight:600,color:C.t1}}>{dm.niche}</div><div style={{fontSize:10,color:C.t3}}>{dm.demo}</div></div></div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <span style={{fontSize:9,fontWeight:600,color:st.c,background:`${st.c}12`,padding:"2px 7px",borderRadius:5}}>● {st.l}</span>
                    <div style={{display:"flex",gap:5,alignItems:"center"}}><span style={{fontSize:10,color:C.t3}}>{piezas} piezas</span><button onClick={()=>{setCtNiche(dm.niche);setAddingContent(true)}} style={{fontSize:11,padding:"1px 8px",borderRadius:5,border:`1px solid ${dm.color}40`,background:"transparent",color:dm.color,cursor:"pointer",fontFamily:"inherit",lineHeight:1.6}}>+</button></div>
                  </div>
                </div>
              })}
            </div>
          </details>

          <div style={{fontSize:11,color:C.t2,fontWeight:600,textTransform:"uppercase",letterSpacing:.5,marginBottom:10}}>Pipeline de publicaciones</div>
          {(data?.content||[]).length===0
            ?<div style={{textAlign:"center",padding:"52px 0",color:C.t3}}>
              <div style={{fontSize:36,marginBottom:12,opacity:.4}}>✦</div>
              <div style={{fontSize:13,marginBottom:4}}>Sin piezas de contenido aún</div>
              <div style={{fontSize:12}}>Crea la primera con <span style={{color:C.vi,cursor:"pointer"}} onClick={()=>setAddingContent(true)}>+ Nueva pieza</span></div>
            </div>
            :<div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>
              {CONT_COLS.map(col=>{
                const colItems=(data?.content||[]).filter(c=>(c.col||"Idea")===col);
                const colC2=CONT_COL_C[col];
                const nextIdx=CONT_COLS.indexOf(col)+1;
                return <div key={col}>
                  <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:8,padding:"0 2px"}}>
                    <div style={{width:7,height:7,borderRadius:"50%",background:colC2,boxShadow:`0 0 6px ${colC2}60`}}/>
                    <span style={{fontSize:12,fontWeight:600,color:C.t1}}>{col}</span>
                    <span style={{fontSize:10,color:C.t3,background:"rgba(255,255,255,.05)",padding:"1px 6px",borderRadius:8,marginLeft:2}}>{colItems.length}</span>
                  </div>
                  <div style={{minHeight:80}}>
                    {colItems.map(ct=>{
                      const demo=DEMOS_CATALOG.find(d=>d.niche===ct.niche);
                      const plc=platC[ct.platform]||C.t2;
                      return <div key={ct.id} style={{background:C.bg2,border:`1px solid ${C.bdr}`,borderRadius:10,padding:"10px 11px",marginBottom:6,cursor:"pointer",transition:"all .15s"}} onClick={()=>setSelectedContent(ct.id)} onMouseEnter={e=>{e.currentTarget.style.background=C.bg3;e.currentTarget.style.borderColor=C.bdrH}} onMouseLeave={e=>{e.currentTarget.style.background=C.bg2;e.currentTarget.style.borderColor=C.bdr}}>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
                          <span style={{fontSize:16,lineHeight:1}}>{demo?.icon||"📄"}</span>
                          <div style={{display:"flex",gap:2}}>
                            {nextIdx<CONT_COLS.length&&<button onClick={e=>{e.stopPropagation();up(d=>{const c2=(d.content||[]).find(x=>x.id===ct.id);if(c2)c2.col=CONT_COLS[nextIdx]})}} title={`→ ${CONT_COLS[nextIdx]}`} style={{background:"none",border:"none",color:C.t3,cursor:"pointer",fontSize:12,padding:"0 2px",lineHeight:1}}>→</button>}
                            <button onClick={e=>{e.stopPropagation();up(d=>{d.content=(d.content||[]).filter(x=>x.id!==ct.id)})}} style={{background:"none",border:"none",color:C.t3,cursor:"pointer",fontSize:15,padding:"0 2px",lineHeight:1}} onMouseEnter={e=>e.currentTarget.style.color=C.red} onMouseLeave={e=>e.currentTarget.style.color=C.t3}>×</button>
                          </div>
                        </div>
                        <div style={{fontSize:11,fontWeight:500,color:C.t1,lineHeight:1.4,marginBottom:5}}>{ct.title}</div>
                        {ct.copy&&<div style={{fontSize:10,color:C.t3,lineHeight:1.4,overflow:"hidden",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",marginBottom:5}}>{ct.copy}</div>}
                        <div style={{display:"flex",gap:4,alignItems:"center",flexWrap:"wrap"}}>
                          <span style={{fontSize:9,color:plc,fontWeight:600,background:`${plc}12`,padding:"1px 6px",borderRadius:4}}>{ct.platform}</span>
                          <span style={{fontSize:9,color:C.t3}}>{ct.type}</span>
                          {ct.copy&&ct.copy.length>10&&<span style={{fontSize:9,color:C.green,marginLeft:"auto"}}>✓ copy</span>}
                        </div>
                      </div>
                    })}
                  </div>
                </div>
              })}
            </div>
          }
          {selectedContent&&<ContentPanel/>}
        </>}

        {/* TRADING */}
        {page==="trading"&&<>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14,flexWrap:"wrap",gap:8}}>
            <div><h1 style={{fontSize:20,fontWeight:700,margin:0}}>Trading Lab</h1><p style={{fontSize:11,color:C.t3,margin:"3px 0 0"}}>Bootcamp Fede Esses · Diario de trades · Calculadora de riesgo</p></div>
            {tradingTab==="diario"&&<Btn primary onClick={()=>setAddingTrade(true)}>+ Registrar trade</Btn>}
          </div>
          {(()=>{const trd=data?.trades||[];const wins=trd.filter(t=>t.status==="win");const totalPL=trd.reduce((s,t)=>s+(t.result||0),0);const winRate=trd.length>0?Math.round(wins.length/trd.length*100):0;const rrTrades=trd.filter(t=>t.rr>0);const avgRR=rrTrades.length>0?(rrTrades.reduce((s,t)=>s+(t.rr||0),0)/rrTrades.length).toFixed(1):0;const completed=Object.values(data?.bootcamp||{}).filter(d=>d.status==="completado").length;return <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap"}}><Stat label="Días completados" value={`${completed}/50`} color={C.green} sub="del bootcamp"/><Stat label="Trades" value={trd.length} sub={`${wins.length}G · ${trd.length-wins.length}P`}/><Stat label="Win rate" value={`${winRate}%`} color={winRate>=50?C.green:C.red}/><Stat label="R:R prom." value={`${avgRR}R`} color={C.vi}/><Stat label="P&L total" value={`${totalPL>=0?"+":""}${totalPL}$`} color={totalPL>=0?C.green:C.red} sub="USD simulado"/></div>})()}
          <div style={{display:"flex",gap:2,marginBottom:18,borderBottom:`1px solid ${C.bdr}`}}>
            {[["bootcamp","📚 Bootcamp"],["diario","📓 Diario"],["calc","🧮 Calculadora"],["stats","📊 Stats"]].map(([tid,tl])=><button key={tid} onClick={()=>setTradingTab(tid)} style={{padding:"8px 16px",fontSize:12,fontWeight:500,border:"none",borderBottom:tradingTab===tid?`2px solid ${C.vi}`:"2px solid transparent",background:"none",color:tradingTab===tid?C.t1:C.t2,cursor:"pointer",fontFamily:"inherit"}}>{tl}</button>)}
          </div>

          {tradingTab==="bootcamp"&&<>
            <div style={{marginBottom:12}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                <span style={{fontSize:13,fontWeight:600,color:C.t1}}>Progreso del bootcamp — Fede Esses</span>
                <a href="https://www.youtube.com/playlist?list=PL4hId-DTkHg50047_yeFJOvPK1rOCrSoR" target="_blank" rel="noopener noreferrer" style={{fontSize:11,color:C.vi,textDecoration:"none"}}>▶ Ver en YouTube →</a>
              </div>
              {(()=>{const comp=Object.values(data?.bootcamp||{}).filter(d=>d.status==="completado").length;const pct=Math.round(comp/50*100);return <div><div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:C.t2,marginBottom:4}}><span>{comp} / 50 días completados</span><span style={{color:C.green,fontWeight:600}}>{pct}%</span></div><div style={{height:6,background:"rgba(255,255,255,.06)",borderRadius:4}}><div style={{height:"100%",width:`${pct}%`,background:`linear-gradient(90deg,${C.vi},${C.green})`,borderRadius:4,transition:"width .5s"}}/></div></div>})()}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(165px,1fr))",gap:6}}>
              {Array.from({length:50},(_,i)=>i+1).map(day=>{
                const bd=(data?.bootcamp||{})[day]||{status:"pendiente",notes:""};
                const sC={pendiente:C.t3,viendo:C.gold,completado:C.green}[bd.status];
                const sI={pendiente:"○",viendo:"◑",completado:"●"}[bd.status];
                const titles={1:"Arranca Ahora",2:"¿Qué es el trading?",3:"Categorías de trading",4:"Entendiendo los mercados",5:"Herramientas y plataformas",6:"Cómo leer un gráfico",7:"Tipos de órdenes",8:"Estructura de mercado",9:"Máximos y mínimos",10:"Tendencias y rangos",11:"Zonas de soporte/resistencia",12:"Velas japonesas",13:"SMC: Smart Money Concepts",14:"Liquidity y sweeps",15:"Fair Value Gap (FVG)",16:"IFVG: Inverse FVG",17:"Modelo de trading IFVG",18:"Confirmaciones de entrada",19:"Stop Loss y Take Profit",20:"Risk Management básico",21:"Gestión de capital",22:"Calculadora de posición",23:"Broker y plataforma",24:"TradingView básico",25:"TradingView avanzado",26:"Sesiones del mercado Forex",27:"Correlaciones de pares",28:"Análisis fundamental básico",29:"Noticias y su impacto",30:"Psicología del trader",31:"Errores comunes",32:"Diario de trading",33:"Reglas de trading",34:"Proceso de mejora",35:"Revisión de semana",36:"Cómo hacer backtesting",37:"Backtesting manual",38:"Ejemplos de backtesting",39:"Métricas de rendimiento",40:"Optimizando la estrategia",41:"Backtesting futuros",42:"Forward testing",43:"Demo trading",44:"Pasando a real",45:"Gestión emocional",46:"Racha perdedora",47:"Scaling de cuenta",48:"Consistencia",49:"Rutina del trader",50:"Cierre del bootcamp"};
                return <div key={day} style={{background:C.bg2,border:`1px solid ${bd.status==="completado"?C.green+"40":C.bdr}`,borderRadius:10,padding:"10px 12px",cursor:"pointer",transition:"all .15s"}} onClick={()=>{const sts=["pendiente","viendo","completado"];const cur=sts.indexOf(bd.status);up(dt=>{if(!dt.bootcamp)dt.bootcamp={};if(!dt.bootcamp[day])dt.bootcamp[day]={status:"pendiente",notes:""};dt.bootcamp[day].status=sts[(cur+1)%3]})}} onMouseEnter={e=>{e.currentTarget.style.borderColor=`${sC}80`;e.currentTarget.style.background=C.bg3}} onMouseLeave={e=>{e.currentTarget.style.borderColor=bd.status==="completado"?C.green+"40":C.bdr;e.currentTarget.style.background=C.bg2}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:3}}>
                    <span style={{fontSize:10,color:C.t3,fontWeight:600}}>Día {day}</span>
                    <span style={{color:sC,fontSize:14}}>{sI}</span>
                  </div>
                  <div style={{fontSize:11,color:bd.status==="completado"?C.t1:C.t2,fontWeight:bd.status==="completado"?500:400,lineHeight:1.3}}>{titles[day]}</div>
                </div>
              })}
            </div>
            <div style={{marginTop:10,fontSize:11,color:C.t3,textAlign:"center"}}>Clic en cada día para ciclar: ○ Pendiente → ◑ Viendo → ● Completado</div>
          </>}

          {tradingTab==="diario"&&<>
            {addingTrade&&<Card style={{marginBottom:14,maxWidth:580}}>
              <div style={{fontSize:13,fontWeight:600,color:C.t1,marginBottom:10}}>Registrar trade (paper trading)</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
                <div><label style={{display:"block",fontSize:11,color:C.t2,marginBottom:4}}>Par de divisas</label><div style={{display:"flex",gap:3,flexWrap:"wrap"}}>{["EUR/USD","GBP/USD","USD/JPY","XAU/USD","NAS100"].map(p=><button key={p} onClick={()=>setTrPair(p)} style={{fontSize:10,padding:"3px 7px",borderRadius:5,border:trPair===p?`1px solid ${C.vi}`:`1px solid ${C.bdr}`,background:trPair===p?"rgba(139,92,246,.12)":"transparent",color:trPair===p?C.vi:C.t2,cursor:"pointer",fontFamily:"inherit"}}>{p}</button>)}</div></div>
                <div><label style={{display:"block",fontSize:11,color:C.t2,marginBottom:4}}>Dirección</label><div style={{display:"flex",gap:6}}><button onClick={()=>setTrDir("long")} style={{flex:1,padding:"7px",borderRadius:7,border:trDir==="long"?`1px solid ${C.green}`:`1px solid ${C.bdr}`,background:trDir==="long"?"rgba(74,222,128,.1)":"transparent",color:trDir==="long"?C.green:C.t2,cursor:"pointer",fontFamily:"inherit",fontSize:12,fontWeight:600}}>▲ Long</button><button onClick={()=>setTrDir("short")} style={{flex:1,padding:"7px",borderRadius:7,border:trDir==="short"?`1px solid ${C.red}`:`1px solid ${C.bdr}`,background:trDir==="short"?"rgba(239,68,68,.1)":"transparent",color:trDir==="short"?C.red:C.t2,cursor:"pointer",fontFamily:"inherit",fontSize:12,fontWeight:600}}>▼ Short</button></div></div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6,marginBottom:8}}>
                <div><label style={{display:"block",fontSize:11,color:C.t2,marginBottom:3}}>Entrada</label><Input value={trEntry} onChange={setTrEntry} placeholder="1.0850" type="number"/></div>
                <div><label style={{display:"block",fontSize:11,color:C.t2,marginBottom:3}}>Stop Loss</label><Input value={trSL} onChange={setTrSL} placeholder="1.0820" type="number"/></div>
                <div><label style={{display:"block",fontSize:11,color:C.t2,marginBottom:3}}>Take Profit</label><Input value={trTP} onChange={setTrTP} placeholder="1.0910" type="number"/></div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
                <div><label style={{display:"block",fontSize:11,color:C.t2,marginBottom:4}}>Estado final</label><div style={{display:"flex",gap:4}}>{[["win","✓ Win",C.green],["loss","✗ Loss",C.red],["be","= BE",C.gold]].map(([v,l,c])=><button key={v} onClick={()=>setTrStatus(v)} style={{flex:1,padding:"6px",borderRadius:6,border:trStatus===v?`1px solid ${c}`:`1px solid ${C.bdr}`,background:trStatus===v?`${c}18`:"transparent",color:trStatus===v?c:C.t2,cursor:"pointer",fontFamily:"inherit",fontSize:11,fontWeight:600}}>{l}</button>)}</div></div>
                <div><label style={{display:"block",fontSize:11,color:C.t2,marginBottom:3}}>P&L USD (simulado)</label><Input value={trResult} onChange={setTrResult} placeholder="Ej: 120 o -60" type="number"/></div>
              </div>
              <div style={{marginBottom:8}}><label style={{display:"block",fontSize:11,color:C.t2,marginBottom:4}}>Setup utilizado</label><div style={{display:"flex",gap:3,flexWrap:"wrap"}}>{["IFVG","FVG","MSS","BOS","OB","Otro"].map(s=><button key={s} onClick={()=>setTrSetup(s)} style={{fontSize:10,padding:"3px 8px",borderRadius:5,border:trSetup===s?`1px solid ${C.vi}`:`1px solid ${C.bdr}`,background:trSetup===s?"rgba(139,92,246,.12)":"transparent",color:trSetup===s?C.vi:C.t2,cursor:"pointer",fontFamily:"inherit"}}>{s}</button>)}</div></div>
              <Input value={trNotes} onChange={setTrNotes} placeholder="Notas opcionales sobre el trade..." style={{marginBottom:8}}/>
              <div style={{display:"flex",gap:6}}><Btn primary onClick={()=>{if(trEntry&&trSL){const en=parseFloat(trEntry),sl=parseFloat(trSL),tp=parseFloat(trTP||"0");const risk=Math.abs(en-sl);const reward=tp?Math.abs(tp-en):0;const rr=risk>0&&reward>0?parseFloat((reward/risk).toFixed(1)):0;up(d=>{(d.trades=d.trades||[]).push({id:`tr${d.nid++}`,date:new Date().toLocaleDateString("es-CL",{day:"2-digit",month:"short",year:"numeric"}),pair:trPair,dir:trDir,entry:en,sl,tp:tp||null,result:parseFloat(trResult)||0,status:trStatus,setup:trSetup,rr,notes:trNotes})});setTrEntry("");setTrSL("");setTrTP("");setTrResult("");setTrNotes("");setAddingTrade(false)}}}>Guardar trade</Btn><Btn onClick={()=>{setAddingTrade(false);setTrEntry("");setTrSL("");setTrTP("");setTrResult("");setTrNotes("")}}>Cancelar</Btn></div>
            </Card>}
            {(data?.trades||[]).length===0&&!addingTrade
              ?<div style={{textAlign:"center",padding:"52px 0",color:C.t3}}><div style={{fontSize:36,marginBottom:12,opacity:.4}}>📓</div><div style={{fontSize:13,marginBottom:4}}>Sin trades registrados aún</div><div style={{fontSize:12,marginBottom:12}}>Practica con paper trading (sin dinero real) mientras estudias el bootcamp</div><button onClick={()=>setAddingTrade(true)} style={{fontSize:12,color:C.vi,background:"none",border:`1px solid ${C.vi}`,padding:"7px 18px",borderRadius:8,cursor:"pointer",fontFamily:"inherit"}}>+ Registrar primer trade</button></div>
              :<div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}><thead><tr>{["Fecha","Par","Dir","Entrada","SL","TP","R:R","Setup","P&L","Estado",""].map(h=><th key={h} style={{textAlign:"left",padding:"8px 10px",borderBottom:`1px solid ${C.bdr}`,fontSize:10,fontWeight:600,color:C.t3,letterSpacing:.5,textTransform:"uppercase",whiteSpace:"nowrap"}}>{h}</th>)}</tr></thead><tbody>{[...(data?.trades||[])].reverse().map(t=>{const dC=t.dir==="long"?C.green:C.red;const sC2={win:C.green,loss:C.red,be:C.gold}[t.status];return <tr key={t.id} style={{borderBottom:`1px solid ${C.bdr}`}} onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,.02)"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}><td style={{padding:"9px 10px",color:C.t3,whiteSpace:"nowrap"}}>{t.date}</td><td style={{padding:"9px 10px",fontWeight:600,color:C.t1}}>{t.pair}</td><td style={{padding:"9px 10px"}}><span style={{color:dC,fontWeight:700}}>{t.dir==="long"?"▲":"▼"}</span> <span style={{color:dC,fontWeight:600,fontSize:10}}>{t.dir.toUpperCase()}</span></td><td style={{padding:"9px 10px",color:C.t2,fontFamily:"monospace",fontSize:11}}>{t.entry}</td><td style={{padding:"9px 10px",color:C.red,fontFamily:"monospace",fontSize:11}}>{t.sl}</td><td style={{padding:"9px 10px",color:C.green,fontFamily:"monospace",fontSize:11}}>{t.tp||"—"}</td><td style={{padding:"9px 10px",color:C.vi,fontWeight:600}}>{t.rr?`${t.rr}R`:"—"}</td><td style={{padding:"9px 10px"}}><span style={{fontSize:10,color:C.vi,background:"rgba(139,92,246,.1)",padding:"2px 6px",borderRadius:4}}>{t.setup}</span></td><td style={{padding:"9px 10px",fontWeight:700,color:t.result>=0?C.green:C.red}}>{t.result>=0?"+":""}{t.result}$</td><td style={{padding:"9px 10px"}}><span style={{fontSize:10,fontWeight:600,color:sC2,background:`${sC2}15`,padding:"2px 8px",borderRadius:4,textTransform:"uppercase"}}>{t.status}</span></td><td style={{padding:"9px 10px"}}><button onClick={()=>up(d=>{d.trades=d.trades.filter(x=>x.id!==t.id)})} style={{background:"none",border:"none",color:C.t3,cursor:"pointer",fontSize:14,lineHeight:1}} onMouseEnter={e=>e.currentTarget.style.color=C.red} onMouseLeave={e=>e.currentTarget.style.color=C.t3}>×</button></td></tr>})}</tbody></table></div>
            }
          </>}

          {tradingTab==="calc"&&<>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:16,maxWidth:780}}>
              <Card>
                <div style={{fontSize:13,fontWeight:600,color:C.t1,marginBottom:14}}>Calculadora de tamaño de posición</div>
                <div style={{marginBottom:10}}><label style={{display:"block",fontSize:11,color:C.t2,marginBottom:4}}>Capital total (USD)</label><Input value={calcCapital} onChange={setCalcCapital} placeholder="10000" type="number"/></div>
                <div style={{marginBottom:10}}><label style={{display:"block",fontSize:11,color:C.t2,marginBottom:4}}>% Riesgo por trade</label><div style={{display:"flex",gap:4,marginBottom:6}}>{["0.5","1","1.5","2"].map(r=><button key={r} onClick={()=>setCalcRiskPct(r)} style={{flex:1,padding:"7px",borderRadius:6,border:calcRiskPct===r?`1px solid ${C.vi}`:`1px solid ${C.bdr}`,background:calcRiskPct===r?"rgba(139,92,246,.12)":"transparent",color:calcRiskPct===r?C.vi:C.t2,cursor:"pointer",fontFamily:"inherit",fontSize:12,fontWeight:600}}>{r}%</button>)}</div></div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}><div><label style={{display:"block",fontSize:11,color:C.t2,marginBottom:4}}>Precio entrada</label><Input value={calcEntry} onChange={setCalcEntry} placeholder="1.0850" type="number"/></div><div><label style={{display:"block",fontSize:11,color:C.t2,marginBottom:4}}>Stop Loss</label><Input value={calcSL} onChange={setCalcSL} placeholder="1.0820" type="number"/></div></div>
                <div style={{padding:"10px 12px",background:"rgba(139,92,246,.05)",border:`1px solid ${C.vi}20`,borderRadius:8,fontSize:11,color:C.t2,lineHeight:1.6}}>💡 Regla del bootcamp: <span style={{color:C.t1,fontWeight:600}}>nunca arriesgues más del 1-2%</span> de tu capital por trade</div>
              </Card>
              <Card>
                <div style={{fontSize:13,fontWeight:600,color:C.t1,marginBottom:14}}>Resultado</div>
                {(()=>{const cap=parseFloat(calcCapital)||0;const risk=parseFloat(calcRiskPct)||1;const entry=parseFloat(calcEntry)||0;const sl=parseFloat(calcSL)||0;if(!cap||!entry||!sl||entry===sl)return <div style={{color:C.t3,fontSize:12,textAlign:"center",paddingTop:20}}>Completa los campos para ver el resultado</div>;const riskUSD=cap*(risk/100);const slD=Math.abs(entry-sl);const slPips=Math.round(slD*10000);const pipV=10;const lots=(riskUSD/(slPips*pipV)).toFixed(3);const miniLots=(riskUSD/(slPips*pipV*0.1)).toFixed(2);const microLots=(riskUSD/(slPips*pipV*0.01)).toFixed(1);return <div>{[{l:"Capital en riesgo",v:`$${riskUSD.toFixed(0)} USD`,c:C.gold},{l:"Pips de riesgo (SL)",v:`${slPips} pips`,c:C.t1},{l:"Lotes estándar",v:lots,c:C.vi},{l:"Mini lotes (÷10)",v:miniLots,c:C.t2},{l:"Micro lotes (÷100)",v:microLots,c:C.t2}].map((r,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:i<4?`1px solid ${C.bdr}`:"none"}}><span style={{fontSize:12,color:C.t2}}>{r.l}</span><span style={{fontSize:14,fontWeight:700,color:r.c}}>{r.v}</span></div>)}<div style={{marginTop:12,padding:"10px 12px",background:"rgba(74,222,128,.05)",border:`1px solid ${C.green}25`,borderRadius:8}}><div style={{fontSize:10,color:C.green,fontWeight:600,marginBottom:2}}>PARA PRINCIPIANTES</div><div style={{fontSize:11,color:C.t2}}>Usa <span style={{color:C.t1,fontWeight:600}}>{microLots} micro lotes</span>. Con SL de {slPips} pips, arriesgas <span style={{color:C.gold,fontWeight:600}}>${riskUSD.toFixed(0)}</span></div></div></div>})()}
              </Card>
            </div>
            <Card style={{marginTop:12,maxWidth:780}}>
              <div style={{fontSize:13,fontWeight:600,color:C.t1,marginBottom:10}}>Glosario esencial — Bootcamp Fede Esses</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:8}}>
                {[{t:"IFVG",d:"Inverse Fair Value Gap. Estrategia estrella de Fede. Zona de desequilibrio donde el precio tiende a revertir."},{t:"FVG",d:"Fair Value Gap. Hueco entre velas que el mercado tiende a rellenar. Base del método SMC."},{t:"MSS",d:"Market Structure Shift. Cambio de tendencia. Señal clave para entrar en dirección del nuevo movimiento."},{t:"BOS",d:"Break of Structure. Rotura de máximo o mínimo previo. Confirma la dirección del mercado."},{t:"OB",d:"Order Block. Zona donde instituciones acumulan órdenes. Alta probabilidad de reacción del precio."},{t:"R:R",d:"Risk:Reward. 1:2 = por cada $1 arriesgado buscas $2 de ganancia. Mínimo recomendado: 1:1.5."},{t:"Pip",d:"Mínimo movimiento de precio en Forex. EUR/USD: 1 pip = 0.0001. 10 pips = 0.0010."},{t:"Lote",d:"Unidad de posición. Estándar=100k, Mini=10k, Micro=1k unidades de la divisa base."}].map((g,i)=><div key={i} style={{padding:"10px 12px",background:"rgba(255,255,255,.02)",border:`1px solid ${C.bdr}`,borderRadius:8}}><div style={{fontSize:12,fontWeight:700,color:C.vi,marginBottom:3}}>{g.t}</div><div style={{fontSize:11,color:C.t2,lineHeight:1.5}}>{g.d}</div></div>)}
              </div>
            </Card>
          </>}

          {tradingTab==="stats"&&(()=>{const trd=data?.trades||[];if(trd.length===0)return <div style={{textAlign:"center",padding:"60px 0",color:C.t3}}><div style={{fontSize:36,marginBottom:12,opacity:.4}}>📊</div><div style={{fontSize:13,marginBottom:4}}>Sin estadísticas aún</div><div style={{fontSize:12}}>Registra al menos un trade en el Diario para ver tus métricas</div></div>;const wins=trd.filter(t=>t.status==="win");const losses=trd.filter(t=>t.status==="loss");const winRate=Math.round(wins.length/trd.length*100);const totalPL=trd.reduce((s,t)=>s+(t.result||0),0);const rrT=trd.filter(t=>t.rr>0);const avgRR=rrT.length>0?(rrT.reduce((s,t)=>s+(t.rr||0),0)/rrT.length).toFixed(2):0;const avgW=wins.length>0?(wins.reduce((s,t)=>s+(t.result||0),0)/wins.length).toFixed(0):0;const avgL=losses.length>0?(losses.reduce((s,t)=>s+Math.abs(t.result||0),0)/losses.length).toFixed(0):0;const pf=parseFloat(avgL)>0?((parseFloat(avgW)*wins.length)/(parseFloat(avgL)*losses.length)).toFixed(2):"∞";const bySetup={};trd.forEach(t=>{if(!bySetup[t.setup])bySetup[t.setup]={total:0,wins:0};bySetup[t.setup].total++;if(t.status==="win")bySetup[t.setup].wins++});return <><div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap"}}><Stat label="Total trades" value={trd.length}/><Stat label="Win rate" value={`${winRate}%`} color={winRate>=50?C.green:C.red}/><Stat label="P&L total" value={`${totalPL>=0?"+":""}${totalPL}$`} color={totalPL>=0?C.green:C.red}/><Stat label="R:R prom." value={`${avgRR}R`} color={C.vi}/><Stat label="Profit Factor" value={pf} color={parseFloat(pf)>=1||pf==="∞"?C.green:C.red}/></div><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:12,maxWidth:780}}><Card><div style={{fontSize:13,fontWeight:600,marginBottom:10}}>Rendimiento detallado</div>{[{l:"Trades ganados",v:`${wins.length} (${winRate}%)`,c:C.green},{l:"Trades perdidos",v:`${losses.length} (${100-winRate}%)`,c:C.red},{l:"Ganancia promedio",v:`$${avgW}`,c:C.green},{l:"Pérdida promedio",v:`$${avgL}`,c:C.red},{l:"R:R promedio",v:`${avgRR}:1`,c:C.vi}].map((r,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:i<4?`1px solid ${C.bdr}`:"none",fontSize:12}}><span style={{color:C.t2}}>{r.l}</span><span style={{color:r.c,fontWeight:600}}>{r.v}</span></div>)}</Card><Card><div style={{fontSize:13,fontWeight:600,marginBottom:10}}>Efectividad por setup</div>{Object.entries(bySetup).map(([setup,sd])=>{const wr=Math.round(sd.wins/sd.total*100);return <div key={setup} style={{marginBottom:10}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span style={{fontSize:11,color:C.vi,fontWeight:600}}>{setup}</span><span style={{fontSize:11,color:wr>=50?C.green:C.red,fontWeight:600}}>{wr}% · {sd.total} trades</span></div><div style={{height:4,background:"rgba(255,255,255,.06)",borderRadius:3}}><div style={{height:"100%",width:`${wr}%`,background:wr>=50?C.green:C.red,borderRadius:3}}/></div></div>})}{Object.keys(bySetup).length===0&&<div style={{fontSize:12,color:C.t3}}>Sin setups registrados</div>}</Card></div></>})()}
        </>}

        {/* METRICS */}
        {page==="metrics"&&<>
          <h1 style={{fontSize:20,fontWeight:700,margin:"0 0 14px"}}>Dashboard CEO</h1>
          <div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap"}}><Stat label="Tareas" value={`${done}/${tasks.length}`} sub={`${tasks.length>0?Math.round(done/tasks.length*100):0}%`}/><Stat label="MRR" value={`$${mrr>0?(mrr/1000).toFixed(0)+"k":"0"}`} color={C.green} sub={`${clients.length} clientes`}/><Stat label="Pipeline" value={`$${pipeVal>0?(pipeVal/1000).toFixed(0)+"k":"0"}`} color={C.vi}/><Stat label="P.E." value={mrr>=38000?"✓":"—"} color={mrr>=38000?C.green:C.gold}/></div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:12}}>
            <Card><div style={{fontSize:13,fontWeight:600,marginBottom:12}}>Avance por fase</div>{Object.entries(phC).map(([ph,c])=>{const total=tasks.filter(t=>t.phase===ph).length,d2=tasks.filter(t=>t.phase===ph&&t.col==="Completado").length,pct=total>0?Math.round(d2/total*100):0;return <div key={ph} style={{marginBottom:10}}><div style={{display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:3}}><span style={{color:c,fontWeight:500}}>{ph}</span><span style={{color:C.t3}}>{d2}/{total}</span></div><div style={{height:5,background:"rgba(255,255,255,.06)",borderRadius:3}}><div style={{height:"100%",width:`${pct}%`,background:c,borderRadius:3,transition:"width .5s"}}/></div></div>})}</Card>
            <Card><div style={{fontSize:13,fontWeight:600,marginBottom:12}}>Funnel</div>{PC.map(col=>{const count=pipeline.filter(d=>d.col===col).length;return <div key={col} style={{display:"flex",alignItems:"center",gap:8,marginBottom:7}}><Dot color={stgC[col]}/><span style={{fontSize:11,color:C.t2,flex:1}}>{col}</span><span style={{fontSize:16,fontWeight:700,color:stgC[col]}}>{count}</span></div>})}</Card>
            <Card><div style={{fontSize:13,fontWeight:600,marginBottom:12}}>Financiero</div>{[{l:"MRR",v:`$${mrr.toLocaleString("es-CL")}`,c:C.green},{l:"Pipeline",v:`$${pipeVal.toLocaleString("es-CL")}`,c:C.vi},{l:"Costos fijos",v:"$38.000",c:C.t2},{l:"Var/cliente",v:"$7.300",c:C.t2},{l:"Margen",v:mrr>0?`${Math.round((mrr-clients.length*7300-38000)/mrr*100)}%`:"—",c:C.green}].map((r,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:i<4?`1px solid ${C.bdr}`:"none",fontSize:12}}><span style={{color:C.t2}}>{r.l}</span><span style={{color:r.c,fontWeight:600}}>{r.v}</span></div>)}</Card>
          </div>
        </>}
      </main>
    </div>
  );
}
