/* ===========Filtro área ============= */
function cargarArea(input_select) {
	let area_listado;
	const area = [
		{ cod: "mate", nom: "Matemática" },
		{ cod: "biol", nom: "Biología" },
		{ cod: "hist", nom: "Historia" },
		{ cod: "geog", nom: "Geografía" },
		{ cod: "Tecn", nom: "Tecnología" },
		{ cod: "feyc", nom: "F.E. y Ciudadana" },
		{ cod: "leli", nom: "Lengua y Literatura" },
		{ cod: "fisi", nom: "Física" },
		{ cod: "quim", nom: "Química" },
		{ cod: "filo", nom: "Filosofía" },
		{ cod: "edfi", nom: "Educación Física" },
		{ cod: "Info", nom: "Informática" },
		{ cod: "econ", nom: "Economía" },
		{ cod: "ingl", nom: "Inglés" },
	];

	area.sort((a, b) => {
		return a.nom.localeCompare(b.nom);
	});
	for (var i = 0; i < area.length; i++) {
		area_listado +=
			`<option value="` + area[i].cod + `">` + area[i].nom + `</option>`;
	}
	input_select.innerHTML += area_listado;
}

/* ======== Filtro Regional ============ */

function cargarRegional(input_select) {
	let reg_listado;
	const reg = [
		{ cod: "1", nom: "R I       Pompeya" },
		{ cod: "2", nom: "R II      Castelli" },
		{ cod: "3", nom: "R III     Bermejo" },
		{ cod: "4", nom: "R IV - A  S. Peña" },
		{ cod: "44", nom: "R IV - B  Quitilipi" },
		{ cod: "5", nom: "R V       San Martín" },
		{ cod: "6", nom: "R VI      La Leonesa" },
		{ cod: "7", nom: "R VII     C. Elisa" },
		{ cod: "8", nom: "R VIII-A  Las Breñas" },
		{ cod: "88", nom: "R VIII-B  G. Pinedo" },
		{ cod: "9", nom: "R IX      V. Ángela" },
		{ cod: "10", nom: "R X - A   Resistencia" },
		{ cod: "101", nom: "R X - B   Resistencia" },
		{ cod: "102", nom: "R X - C   Resistencia" },
	];

	for (var i = 0; i < reg.length; i++) {
		reg_listado +=
			`<option value="` + reg[i].cod + `">` + reg[i].nom + `</option>`;
	}
	input_select.innerHTML += reg_listado;
}

/* ======== Filtro Hs Disponibles (mínimo) ============ */

function cargarHsDispoMin(input_select) {
	let hs_listado;
	const hs = [2, 3, 4, 5, 6, 7, 8, 9, 10];

	for (var i = 0; i < hs.length; i++) {
		hs_listado += `<option value="` + hs[i] + `">` + hs[i] + `</option>`;
	}
	input_select.innerHTML += hs_listado;
}

/* ======== Ver-Ocultar Filtros ============ */
const ocultar_filtros = document.getElementById("ocultar-filtros");
const contenedor_filtros = document.getElementById("contenedor-filtros");

$("#ocultar-filtros").addEventListener("click", () => {
	$("#contenedor-filtros").classList.toggle("ocultar");
	if ($("#contenedor-filtros").classList.contains("ocultar")) {
		$(
			"#busqueda-i"
		).innerHTML = `<i class="fa-regular fa-eye"></i><p>Mostrar </p>`;
	} else {
		$(
			"#busqueda-i"
		).innerHTML = `<i class="fa-regular fa-eye-slash"></i><p>Ocultar </p>`;
	}
});

/* ======== Seleccionar Filtros ============ */
$("#filtro-orden").addEventListener("change", filtrar);
$("#filtro-area").addEventListener("change", filtrar);
$("#filtro-regional").addEventListener("change", filtrar);
$("#filtro-horas").addEventListener("change", filtrar);
$("#filtro-sexo").addEventListener("change", filtrar);

function filtrar() {
	// para educación física
	if ($("#filtro-area").value === "edfi") {
		$("#filtro-sexo").removeAttribute("disabled");
	} else {
		$("#filtro-sexo").setAttribute("disabled", "");
	}

	//-- el resto
}

// ====================================
// Vienes de main.js
function funcionesBusquedas() {
	cargarArea($("#filtro-area"));
	cargarRegional($("#filtro-regional"));
	cargarHsDispoMin($("#filtro-horas"));
}
