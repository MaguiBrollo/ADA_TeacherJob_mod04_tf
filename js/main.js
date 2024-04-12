//=============================================
// Se usa en TODOS los js, en lugar de: "const btn_nueva_oper = document.getElementById("btn-nueva-oper");"
const $ = (selector) => document.querySelector(selector);
//======

/* ================== Menú y Menú Hamburguesa  ================ */
$("#nav-btn-abrir").addEventListener("click", () => {
	$("#nav-btn-abrir").setAttribute("hidden", "");
	$("#nav-btn-cerrar").removeAttribute("hidden");

	$("#nav-cont-menu").classList.remove("ocultar");
});

function cerrarMenuNav() {
	/* Este If es un parche porque con SASS no funciona bien el poner y sacar clases*/
	//if (window.innerWidth < `${md_px}`) {
	//}
	$("#nav-btn-cerrar").setAttribute("hidden", "");
	$("#nav-btn-abrir").removeAttribute("hidden");
	$("#nav-cont-menu").classList.add("ocultar");
}

$("#nav-btn-cerrar").addEventListener("click", cerrarMenuNav);

function mostrar(mostrar) {
	$("#menu-inicio").classList.add("ocultar");
	$("#menu-busquedas").classList.add("ocultar");
	$("#menu-inscripcion").classList.add("ocultar");

	mostrar.classList.remove("ocultar");
}

$("#enlace-inicio").addEventListener("click", () => {
	cerrarMenuNav();
	mostrar($("#menu-inicio"));
});

$("#enlace-busquedas").addEventListener("click", () => {
	cerrarMenuNav();
	mostrar($("#menu-busquedas"));
});
$("#enlace-inscripcion").addEventListener("click", () => {
	cerrarMenuNav();
	mostrar($("#menu-inscripcion"));
});

/* ------------------------------------------------------------------------------------------------ */
