/* Creative Home: lógica de la página.
   Va en un archivo aparte (y no dentro del HTML) para que el escudo de seguridad (CSP)
   pueda bloquear cualquier código escrito dentro de la página. */
document.documentElement.classList.add("js");

var NUM = "51912516310";
var $ = function (id) { return document.getElementById(id); };

/* ---------- Catálogo ---------- */
var CO = [{n:"Blanco",k:"blanco",h:"#f1edea"},{n:"Amaya",k:"amaya",h:"#d8b07c"},{n:"Bavaria",k:"bavaria",h:"#c49a72"},{n:"Habano",k:"habano",h:"#9a6232"},{n:"Nogal Verona",k:"nogal-verona",h:"#6e4a2c"}];
// fotos: img/<modelo>-<color>-1.jpg (abierta) y -2.jpg (cerrada); las -s.jpg son las miniaturas del catálogo
function FT(m){return CO.map(function(c){return ["img/"+m+"-"+c.k+"-1.jpg","img/"+m+"-"+c.k+"-2.jpg"]})}
// p = precio en blanco, pc = precio en cualquier otro color
function PRC(x,c){return x.co&&c>0&&x.pc?x.pc:x.p}
var P=[
{n:"Zapatera Milano 24",t:"Zapatera · 24 pares",p:380,pc:420,d:"Nuestra estrella: 24 pares en cajones abatibles. Medidas: 120 cm de alto, 89 de ancho y 27 de fondo.",co:CO,im:FT("milano24")},
{n:"Zapatera Milano 36",t:"Zapatera · 36 pares",p:560,pc:640,d:"El diseño Milano con capacidad para 36 pares. Medidas: 128 cm de alto, 89 de ancho y 37 de fondo.",co:CO,im:FT("milano24")},
{n:"Zapatera Milano 16",t:"Zapatera · 16 pares",p:340,pc:360,d:"Milano en formato más compacto, para 16 pares. Medidas: 85 cm de alto, 89 de ancho y 27 de fondo.",co:CO,im:FT("milano16")},
{n:"Zapatera Florencia",t:"Zapatera · 16 pares + cajón",p:400,pc:440,d:"16 pares y un cajoncito extra para lo pequeño. Medidas: 100 cm de alto, 89 de ancho y 27 de fondo.",co:CO,im:FT("florencia")}];

/* ---------- Delivery por distrito: número = precio fijo; texto = precio por confirmar ---------- */
var D={"Ancón":80,"Ate":60,"Barranco":40,"Bellavista":40,"Breña":40,"Callao":50,"Carabayllo":60,"Cercado de Lima":40,"Chorrillos":60,"Comas":60,"El Agustino":40,"Independencia":40,"Jesús María":40,"La Molina":60,"La Victoria":40,"Lince":40,"Los Olivos":50,"Lurín":"A consultar","Magdalena del Mar":40,"Miraflores":40,"Pueblo Libre":40,"Puente Piedra":60,"Rímac":30,"San Borja":40,"San Isidro":40,"San Juan de Lurigancho":"S/ 40 a 60","San Juan de Miraflores":60,"San Luis":40,"San Martín de Porres":40,"San Miguel":40,"Santa Anita":40,"Santiago de Surco":60,"Surquillo":40,"Villa El Salvador":60,"Villa María del Triunfo":60};
function DTX(f){return typeof f=="number"?"S/ "+f:f}

$("gr").innerHTML=P.map(function(x,k){var s=x.im&&x.im[0][0];return '<div class="cd" role="button" tabindex="0" data-k="'+k+'" aria-label="Ver '+x.n+', desde S/ '+x.p+'"><i>0'+(k+1)+'</i>'+'<div class="zi">'+(s?'<img src="'+s.replace(/\.jpg$/,"-s.jpg")+'" width="640" height="640" loading="lazy" decoding="async" alt="'+x.n+' en color Blanco">':'<div class="ph0">Foto pendiente</div>')+'</div>'+'<div class="in"><h3>'+x.n+'</h3><small>'+x.t+'</small><b><span class="ds">Desde</span> S/ '+x.p+'</b></div></div>'}).join("");
$("di").innerHTML='<option value="">Elige tu distrito</option>'+Object.keys(D).map(function(k){return '<option value="'+k+'">'+k+' · '+DTX(D[k])+'</option>'}).join("");
$("qd").innerHTML='<option value="">Elige tu distrito</option>'+Object.keys(D).map(function(k){return '<option>'+k+'</option>'}).join("")+'<option>Otro distrito o provincia</option>';

/* ---------- Ventana del producto ---------- */
var cur=0,si=0,ci=0,lf;
function imgs(){var x=P[cur];return (x.im&&x.im[ci])||[null,null]}
function cOf(){return P[cur].co?ci:0}
function draw(){var s=imgs(),x=P[cur],o=s[si],h=o?'<img src="'+o+'" width="1200" height="1200" decoding="async" alt="'+x.n+(x.co?' color '+x.co[ci].n:'')+(si?', cerrada':', abierta')+'">':'<div class="ph0">'+(x.co?'Foto en color '+x.co[ci].n:'Foto pendiente')+' ('+(si+1)+'/2)</div>';
h+='<button type="button" class="ar p" data-mv="-1" aria-label="Foto anterior">‹</button><button type="button" class="ar n" data-mv="1" aria-label="Foto siguiente">›</button><div class="dts">'+s.map(function(_,j){return '<button type="button" aria-label="Foto '+(j+1)+' de '+s.length+'" class="'+(j==si?'on':'')+'" data-go="'+j+'"></button>'}).join("")+'</div>';
$("sl").innerHTML=h;if(s[1-si])(new Image).src=s[1-si];
var cs=$("cs");$("cl0").style.display=cs.style.display=x.co?"":"none";
if(x.co){cs.innerHTML=x.co.map(function(c,j){return '<button class="'+(j==ci?'on':'')+'" style="background:'+c.h+'" title="'+c.n+'" aria-label="'+c.n+'" aria-pressed="'+(j==ci)+'" type="button" data-pc="'+j+'"></button>'}).join("");$("cn").textContent=x.co[ci].n}}
function mv(d){si=(si+d+2)%2;draw()}
function go(j){si=j;draw()}
function pc(j){ci=j;si=0;draw();calc()}
function openP(k){cur=k;si=0;ci=0;var x=P[k];$("mn").textContent=x.n;$("mdsc").textContent=x.d;draw();calc();lf=document.activeElement;$("dcd").open=false;$("ov").classList.add("on");document.body.style.overflow="hidden";document.documentElement.classList.add("lk");document.querySelector(".mdi").scrollTop=0;document.querySelector(".x").focus()}
function cl(){var o=$("ov");if(!o.classList.contains("on"))return;o.classList.remove("on");document.body.style.overflow="";document.documentElement.classList.remove("lk");if(lf&&lf.focus)lf.focus()}
function calc(){var d=$("di").value,f=D[d],pr=PRC(P[cur],ci),n=typeof f=="number";$("mp").textContent="S/ "+pr;$("df").textContent=d?DTX(f):"Elige tu distrito";$("tt").textContent=n?"S/ "+(pr+f):"S/ "+pr+" + delivery";$("bd").textContent=d?DTX(f)+" · "+d:"Elige tu distrito"}

/* ---------- WhatsApp ---------- */
function wa(m){window.open("https://wa.me/"+NUM+"?text="+encodeURIComponent(String(m).slice(0,1500)),"_blank","noopener,noreferrer")}
function order(){var x=P[cur],d=$("di").value,c=x.co?" color "+x.co[cOf()].n:"",f=D[d],pr=PRC(x,cOf()),dl=!d?" Aún no elijo distrito, ¿me ayudan con el delivery?":typeof f=="number"?" Delivery a "+d+" (S/ "+f+"). Total: S/ "+(pr+f)+".":" Delivery a "+d+(f=="A consultar"?" (por confirmar).":" ("+f+", por confirmar).");wa("Hola Creative Home, quiero pedir: "+x.n+c+" (S/ "+pr+")."+dl)}
function tg(b){b.setAttribute("aria-pressed",b.classList.toggle("on"));$("qh").classList.remove("on")}
function quote(){var s=[].map.call(document.querySelectorAll(".sv button.on"),function(b){return b.textContent}),i=$("idea").value.trim(),d=$("qd").value.trim();if(!s.length){$("qh").classList.add("on");document.querySelector(".sv button").focus();return}wa("Hola Creative Home, quiero cotizar un diseño a medida.\nMe interesa: "+s.join(", ")+"."+(d?"\nDistrito: "+d:"")+(i?"\nDetalles: "+i:""))}

/* ---------- Un solo "oído" para todos los botones (en vez de código dentro del HTML) ---------- */
document.addEventListener("click",function(e){
  var t=e.target.closest("[data-open],[data-wa],[data-act],[data-mv],[data-go],[data-pc],.cd,.sv button,.x");
  if(!t)return;
  if(t.hasAttribute("data-wa")){e.preventDefault();wa(t.getAttribute("data-wa"))}
  else if(t.hasAttribute("data-open"))openP(+t.getAttribute("data-open"));
  else if(t.matches(".cd"))openP(+t.getAttribute("data-k"));
  else if(t.hasAttribute("data-mv"))mv(+t.getAttribute("data-mv"));
  else if(t.hasAttribute("data-go"))go(+t.getAttribute("data-go"));
  else if(t.hasAttribute("data-pc"))pc(+t.getAttribute("data-pc"));
  else if(t.getAttribute("data-act")=="order")order();
  else if(t.matches(".x"))cl();
  else if(t.matches(".sv button"))tg(t);
});
$("gr").addEventListener("keydown",function(e){var c=e.target.closest(".cd");if(c&&(e.key==="Enter"||e.key===" ")){e.preventDefault();openP(+c.getAttribute("data-k"))}});
$("ov").addEventListener("click",function(e){if(e.target===this)cl()});
$("di").addEventListener("change",calc);
document.querySelector(".qf").addEventListener("submit",function(e){e.preventDefault();quote()});

var tx=0,sd=$("sl");sd.addEventListener("touchstart",function(e){tx=e.touches[0].clientX},{passive:true});sd.addEventListener("touchend",function(e){var d=e.changedTouches[0].clientX-tx;if(Math.abs(d)>40)mv(d<0?1:-1)});

/* ---------- Menú ---------- */
var hd=document.querySelector("header"),mt=$("mt");
function navT(o){hd.classList.toggle("open",o);mt.setAttribute("aria-expanded",o?"true":"false");mt.setAttribute("aria-label",o?"Cerrar menú":"Abrir menú")}
mt.addEventListener("click",function(){navT(!hd.classList.contains("open"))});
document.querySelectorAll("#nv a").forEach(function(a){a.addEventListener("click",function(){navT(false)})});
document.addEventListener("click",function(e){if(hd.classList.contains("open")&&!hd.contains(e.target))navT(false)});
window.addEventListener("resize",function(){if(window.innerWidth>760)navT(false)});
document.addEventListener("keydown",function(e){var o=$("ov").classList.contains("on");
if(e.key==="Escape"){cl();navT(false)}
else if(o&&(e.key==="ArrowLeft"||e.key==="ArrowRight")&&!/INPUT|SELECT|TEXTAREA/.test(e.target.tagName))mv(e.key==="ArrowLeft"?-1:1);
else if(o&&e.key==="Tab"){var q=[].filter.call(document.querySelectorAll(".md button,.md select,.md input,.md summary,.md a"),function(n){return n.offsetParent}),a=q[0],z=q[q.length-1];if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}});

if("IntersectionObserver" in window){
// sección actual en el menú
var lk={};document.querySelectorAll("#nv a").forEach(function(a){lk[a.getAttribute("href").slice(1)]=a});
var sp=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){for(var k in lk)lk[k].removeAttribute("aria-current");var a=lk[x.target.id];if(a)a.setAttribute("aria-current","true")}})},{rootMargin:"-45% 0px -50% 0px"});
document.querySelectorAll("main section[id],footer[id]").forEach(function(n){sp.observe(n)});
// el formulario "a medida" tiene su propio botón de WhatsApp: el flotante se aparta mientras está en pantalla
new IntersectionObserver(function(en){document.querySelector(".fab").classList.toggle("hd",en[0].isIntersecting)},{rootMargin:"-30% 0px 0px 0px"}).observe(document.querySelector(".qf"));
// aparición suave de los bloques, una sola vez
var rv=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add("in");rv.unobserve(x.target);setTimeout(function(n){n.classList.remove("rv","in");n.style.removeProperty("--d")},1300,x.target)}})},{rootMargin:"0px 0px -8% 0px"});
document.querySelectorAll("#estrella h2,.st,#catalogo h2,.cu>div,.ab>div,.fc .w>div,.fm .w>div").forEach(function(n){n.style.setProperty("--d",(n.previousElementSibling&&n.parentNode.matches(".cu,.ab,.fc .w")?.08:0)+"s");n.classList.add("rv");rv.observe(n)});
}

/* ---------- Demo "Tu mueble en tres toques": solo se mueve en pantalla ---------- */
(function(){var st=$("hc");if(!st||!("IntersectionObserver" in window))return;
var q=function(x){return st.querySelector(x)},scr=q(".hs"),dot=q(".hdt"),cn=q(".hcn"),hp=q(".hpr"),dv=q(".hdv"),tv=q(".htv"),bt=q(".hbt"),sw=st.querySelectorAll(".hsws i"),op=st.querySelectorAll(".hm div"),cur=0;
function S(k,v){st.setAttribute("data-"+k,v)}
function base(){S("s",1);S("c",0);S("d",0);cn.textContent="Blanco";hp.textContent="S/ 380";dv.textContent="San Isidro · S/ 40";tv.textContent="S/ 420";op[1].classList.remove("hv")}
if(matchMedia("(prefers-reduced-motion:reduce)").matches){S("s",3);S("c",1);cn.textContent="Amaya";hp.textContent="S/ 420";dv.textContent="Surco · S/ 60";tv.textContent="S/ 480";return}
function to(el){var a=el.getBoundingClientRect(),b=scr.getBoundingClientRect();dot.style.transform="translate("+(a.left-b.left+a.width/2)+"px,"+(a.top-b.top+a.height/2)+"px)"}
async function play(id){
function w(ms){return new Promise(function(r){setTimeout(r,ms)}).then(function(){if(id!==cur)throw 0})}
async function tap(el){to(el);dot.classList.add("on");await w(700);dot.classList.add("pr");await w(160);dot.classList.remove("pr")}
try{to(sw[0]);while(1){
await w(900);
await tap(sw[1]);S("c",1);cn.textContent="Amaya";hp.textContent="S/ 420";tv.textContent="S/ 460";await w(900);
S("s",2);await tap(q(".hsel"));S("d",1);await w(500);
await tap(op[1]);op[1].classList.add("hv");await w(180);S("d",0);dv.textContent="Surco · S/ 60";
for(var n=460;n<=480;n+=2){tv.textContent="S/ "+n;await w(90)}
await w(700);
S("s",3);await tap(bt);bt.classList.add("pr");await w(150);bt.classList.remove("pr");dot.classList.remove("on");
S("chat",1);await w(650);S("sent",1);
base();S("s",3);await w(2400);
S("sent",0);S("chat",0);await w(350);S("s",1);to(sw[0]);await w(500)}}catch(e){}}
new IntersectionObserver(function(en){if(en[0].isIntersecting){play(++cur)}else{cur++;dot.classList.remove("on");S("chat",0);S("sent",0);base()}},{threshold:.35}).observe(st)})();

/* ---------- Regla de medir en los separadores ---------- */
document.querySelectorAll(".ru").forEach(function(r){
r.setAttribute("aria-hidden","true");r.innerHTML='<div class="rf"></div><div class="rn"></div><div class="rm"><i></i><b></b></div>';
var n=r.querySelector(".rn"),m=r.querySelector(".rm"),f=r.querySelector(".rf"),lb=m.querySelector("b");
function nums(){var h="";for(var i=1;i*40<r.clientWidth;i++)h+='<span style="left:'+i*40+'px">'+i+'</span>';n.innerHTML=h}
nums();window.addEventListener("resize",nums);
function at(x){var w=r.clientWidth;x=Math.round(Math.max(0,Math.min(w,x))/4)*4;m.style.transform="translateX("+x+"px)";f.style.transform="scaleX("+x/w+")";lb.textContent=(x/40).toFixed(1).replace(".",",")+" cm";lb.classList.toggle("fl",x>w-110)}
r.addEventListener("pointermove",function(e){r.classList.remove("au");r.classList.add("on");at(e.clientX-r.getBoundingClientRect().left)});
r.addEventListener("pointerleave",function(){r.classList.remove("on")});
if("IntersectionObserver" in window&&!matchMedia("(prefers-reduced-motion:reduce)").matches)new IntersectionObserver(function(en,o){if(!en[0].isIntersecting)return;o.disconnect();at(0);r.classList.add("au","on");requestAnimationFrame(function(){requestAnimationFrame(function(){at(Math.min(r.clientWidth*.42,720))})});setTimeout(function(){if(r.classList.contains("au"))r.classList.remove("on","au")},2600)},{threshold:1}).observe(r)});
