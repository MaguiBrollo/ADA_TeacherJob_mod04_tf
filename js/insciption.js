// ============================================
// Variables globales (main.js)
let inscripcion = {};

// ============================================
const buscarArea = (busco) => {
	return area.find((e) => e.cod === busco) ?? -1;
};
const buscarRegional = (busco) => {
	return reg.find((e) => e.cod === busco) ?? -1;
};

// ===================================================
// Limpiar input
function limpiarVolver() {
	$("#cont-inscripcion").classList.add("ocultar");
	$("#menu-aspirantes").classList.remove("ocultar");

	$("#apellidos").value = "";
	$("#nombres").value = "";
	$("#sexo").value = "";
	$("#telefono").value = "";
	$("#correo").value = "";
	$("#url-foto").value = "";
	// $("#area").value = "";
	// $("#regional").value = "";
	$("#titulo").value = "";
	$("#hs-dispo").value = "";
	$("#puntaje").value = "";
}

// ===================================================
// Cancelar inscripción
$("#btn-cancelar-insc").addEventListener("click", () => {
	limpiarVolver();
});

// ============================================
// Nueva Inscripción
$("#btn-agregar-insc").addEventListener("click", () => {
	inscripcion = {
		apellidos: $("#apellidos").value,
		nombres: $("#nombres").value,
		sexo: $("#sexo").value,
		telefono: $("#telefono").value,
		email: $("#correo").value,
		foto_perfil: $("#url-foto").value,
		area: $("#area").value,
		regional: $("#regional").value,
		titulo_area: $("#titulo").value,
		horas_dispo: $("#hs-dispo").value,
		puntaje: $("#puntaje").value,
	};

	registrarInscripcion(inscripcion);

	limpiarVolver();
});

// -------------------------
let registrarInscripcion = async (inscrip) => {
	try {
		let peticion = await fetch(urlBase + "teacher", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json; charset=utf-8",
			},
			body: JSON.stringify(inscrip),
		});
	} catch (error) {
		console.log("ERROR - Nueva Inscripción: ", error);
	}
	mostrarTodosAspirantes(); // (aspirant.js)
};

// ====================================
// Vienes de aspirant.js
function funcionesInscrpcion() {
	cargarArea($("#area")); //(aspirant.js)
	cargarRegional($("#regional"));
	cargarHsDispoMin($("#hs-dispo"));
}
