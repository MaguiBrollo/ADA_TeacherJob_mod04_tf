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

function quitaAcentos(frase) {
	frase = frase.replace(/[áäâà]/g, "a");
	frase = frase.replace(/[éëêè]/g, "e");
	frase = frase.replace(/[íïîì]/g, "i");
	frase = frase.replace(/[óöôò]/g, "o");
	frase = frase.replace(/[úüûù]/g, "u");
	return frase;
}

// ===================================================
// Cancelar inscripción
$("#btn-cancelar-insc").addEventListener("click", () => {
	$("#nueva-alumna-form").reset();
	$("#cont-inscripcion").classList.add("ocultar");
	$("#menu-aspirantes").classList.remove("ocultar");
});

// ============================================
// Nueva Inscripción
/* $("#btn-agregar-insc").addEventListener("click", () => { */
$("#nueva-alumna-form").addEventListener("submit", (e) => {
	e.preventDefault();

	inscripcion = {
		apellidos: quitaAcentos($("#apellidos").value).toUpperCase(),
		nombres: quitaAcentos($("#nombres").value).toUpperCase(),
		sexo: $("#sexo").value,
		telefono: $("#telefono").value,
		email: quitaAcentos($("#correo").value).toUpperCase(),
		foto_perfil: $("#url-foto").value,
		area: $("#area").value,
		regional: $("#regional").value,
		titulo_area: quitaAcentos($("#titulo").value).toUpperCase(),
		horas_dispo: $("#hs-dispo").value,
		puntaje: $("#puntaje").value,
	};

	registrarInscripcion(inscripcion);

	$("#nueva-alumna-form").reset();
	$("#cont-inscripcion").classList.add("ocultar");
	$("#menu-aspirantes").classList.remove("ocultar");
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
