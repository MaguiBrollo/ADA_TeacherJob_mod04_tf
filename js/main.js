/* ========= FUNCIONES GLOBALES =============== */
// Se usa en TODOS los js, en lugar de: "const btn_nueva_oper = document.getElementById("btn-nueva-oper");"
const $ = (selector) => document.querySelector(selector);

// ============================================
// Menú y Menú Hamburgues
$("#nav-btn-abrir").addEventListener("click", () => {
	$("#nav-btn-abrir").setAttribute("hidden", "");
	$("#nav-btn-cerrar").removeAttribute("hidden");
	$("#nav-cont-menu").classList.remove("ocultar");
});

function cerrarMenuNav() {
	$("#nav-btn-cerrar").setAttribute("hidden", "");
	$("#nav-btn-abrir").removeAttribute("hidden");
	$("#nav-cont-menu").classList.add("ocultar");
}

$("#nav-btn-cerrar").addEventListener("click", cerrarMenuNav);

function mostrar(mostrar) {
	$("#menu-inicio").classList.add("ocultar");
	$("#menu-aspirantes").classList.add("ocultar");
	$("#cont-inscripcion").classList.add("ocultar"); //inscripcion
	$("#cont-ver-mas").classList.add("ocultar"); //inscripcion
	$("#ver-mas-un").classList.add("ocultar"); //inscripcion

	mostrar.classList.remove("ocultar");
}

$("#enlace-inicio").addEventListener("click", () => {
	cerrarMenuNav();
	mostrar($("#menu-inicio"));
});

$("#enlace-aspirantes").addEventListener("click", () => {
	cerrarMenuNav();
	mostrar($("#menu-aspirantes"));
	funcionesAspirantes(); //aspirantes.js
});

$("#enlace-sesion").addEventListener("click", () => {
	cerrarMenuNav();
	funcionesInicioSesion(); //modal_sesion.js
});


// -- Fecla arriba

window.addEventListener('scroll', () =>{
	funcionDeScroll();
})

let funcionDeScroll = () =>{
	if(window.scrollY > 20){
		$("#flecha").classList.remove("ocultar")
	}else{
		$("#flecha").classList.add("ocultar");
	}
}

$("#flecha").addEventListener("click",()=>{
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
});
/* ------------------------------------------------------------------------------------------------ */
