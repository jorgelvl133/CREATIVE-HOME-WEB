/* Libro de Reclamaciones: arma la hoja con los datos del cliente y la envía por WhatsApp.
   La web no guarda nada: los datos viajan solo en el mensaje que envía el propio cliente. */
(function () {
  var NUM = "51912516310";
  var $ = function (id) { return document.getElementById(id); };
  var f = $("lr"), er = $("er"), ok = $("ok"), hj = $("hj");

  // número de hoja: fecha y hora + 3 cifras al azar (ej. CH-20261125-1432-517)
  var d = new Date(), z = function (n) { return (n < 10 ? "0" : "") + n; };
  var nro = "CH-" + d.getFullYear() + z(d.getMonth() + 1) + z(d.getDate()) + "-" + z(d.getHours()) + z(d.getMinutes()) + "-" + String(Math.floor(Math.random() * 900) + 100);
  var fec = z(d.getDate()) + "/" + z(d.getMonth() + 1) + "/" + d.getFullYear();
  $("nro").textContent = nro; $("fec").textContent = fec;

  function v(id) { return $(id).value.trim(); }
  function r(n) { var x = f.querySelector('input[name="' + n + '"]:checked'); return x ? x.value : ""; }
  function prov(k) { var e = document.querySelector('[data-p="' + k + '"]'); return e ? e.textContent : ""; }

  var texto = "";
  f.addEventListener("submit", function (e) {
    e.preventDefault();
    var falta = [];
    if (v("nom").length < 3) falta.push("nombre");
    if (v("dom").length < 5) falta.push("domicilio");
    var dni = $("tdoc").value === "DNI";
    if (dni ? !/^\d{8}$/.test(v("ndoc")) : v("ndoc").length < 6) falta.push(dni ? "DNI de 8 dígitos" : "número de documento");
    if (v("tel").replace(/\D/g, "").length < 9) falta.push("celular");
    if (v("cor") && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v("cor"))) falta.push("correo válido");
    if (v("des").length < 3) falta.push("descripción del producto");
    if (v("det").length < 10) falta.push("detalle");
    if (v("ped").length < 3) falta.push("pedido");
    if (!$("acp").checked) falta.push("aceptar la declaración");
    if (falta.length) { er.textContent = "Falta completar: " + falta.join(", ") + "."; er.classList.add("on"); er.scrollIntoView({ block: "center" }); return; }
    er.classList.remove("on");
    texto =
      "LIBRO DE RECLAMACIONES - HOJA N.° " + nro + "\n" +
      "Fecha: " + fec + "\n" +
      "Proveedor: " + prov("razon") + " (Creative Home) - RUC " + prov("ruc") + "\n\n" +
      "1. CONSUMIDOR\n" +
      "Nombre: " + v("nom") + "\n" +
      "Domicilio: " + v("dom") + "\n" +
      $("tdoc").value + ": " + v("ndoc") + "\n" +
      "Celular: " + v("tel") + (v("cor") ? "\nCorreo: " + v("cor") : "") +
      (v("apo") ? "\nPadre/madre/apoderado: " + v("apo") : "") + "\n\n" +
      "2. BIEN CONTRATADO\n" +
      r("bien") + ": " + v("des") + (v("mon") ? "\nMonto reclamado: S/ " + v("mon") : "") + "\n\n" +
      "3. DETALLE\n" +
      "Tipo: " + r("tipo") + "\n" +
      "Detalle: " + v("det") + "\n" +
      "Pedido: " + v("ped");
    hj.textContent = texto;            // textContent: nunca se interpreta como código
    f.hidden = true; ok.classList.add("on");
    ok.scrollIntoView({ block: "start" });
  });
  $("bwa").addEventListener("click", function () {
    window.open("https://wa.me/" + NUM + "?text=" + encodeURIComponent(texto.slice(0, 3500)), "_blank", "noopener,noreferrer");
  });
  $("bpr").addEventListener("click", function () { window.print(); });
  $("bed").addEventListener("click", function () { ok.classList.remove("on"); f.hidden = false; f.scrollIntoView({ block: "start" }); });
})();
