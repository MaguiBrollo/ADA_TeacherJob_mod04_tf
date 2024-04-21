//======== Variables globales (main.js) =========

// ============================================
// Input Select - Area
const area = [
	{ cod: "mate", nom: "Matemática" },
	{ cod: "biol", nom: "Biología" },
	{ cod: "hist", nom: "Historia" },
	{ cod: "geog", nom: "Geografía" },
	{ cod: "tecn", nom: "Tecnología" },
	{ cod: "feyc", nom: "F.E. y Ciudadana" },
	{ cod: "leli", nom: "Lengua y Literatura" },
	{ cod: "fisi", nom: "Física" },
	{ cod: "quim", nom: "Química" },
	{ cod: "filo", nom: "Filosofía" },
	{ cod: "edfi", nom: "Educación Física" },
	{ cod: "info", nom: "Informática" },
	{ cod: "econ", nom: "Economía" },
	{ cod: "ingl", nom: "Inglés" },
];

function cargarArea(input_select) {
	let area_listado = `<option value="SELEC" selected>Seleccione...</option>`;
	area.sort((a, b) => {
		return a.nom.localeCompare(b.nom);
	});
	for (var i = 0; i < area.length; i++) {
		area_listado +=
			`<option value="` + area[i].cod + `">` + area[i].nom + `</option>`;
	}
	input_select.innerHTML = area_listado;
}

// ============================================
// Input Select - Regional
const reg = [
	{ cod: 1, nom: "RI - Pompeya" },
	{ cod: 2, nom: "RII - Castelli" },
	{ cod: 3, nom: "RIII - Bermejo" },
	{ cod: 4, nom: "RIV - S. Peña" },
	{ cod: 5, nom: "RV - San Martín" },
	{ cod: 6, nom: "RVI - La Leonesa" },
	{ cod: 7, nom: "RVII - C. Elisa" },
	{ cod: 8, nom: "RVIII - Las Breñas" },
	{ cod: 9, nom: "RIX - V. Ángela" },
	{ cod: 10, nom: "RX - Resistencia" },
];

function cargarRegional(input_select) {
	let reg_listado = `<option value="SELEC" selected>Seleccione...</option>`;
	for (var i = 0; i < reg.length; i++) {
		reg_listado +=
			`<option value="` + reg[i].cod + `">` + reg[i].nom + `</option>`;
	}
	input_select.innerHTML = reg_listado;
}

// ============================================
// Input Select - Hs Disponibles (mínimo)
function cargarHsDispoMin(input_select) {
	let hs_listado = `<option value="SELEC" selected>Seleccione...</option>`;
	const hs = [2, 3, 4, 5, 6, 7, 8, 9, 10];
	for (var i = 0; i < hs.length; i++) {
		hs_listado += `<option value="` + hs[i] + `">` + hs[i] + `</option>`;
	}
	input_select.innerHTML = hs_listado;
}

// ===================================================
// Ver-Ocultar Filtros
$("#ocultar-filtros").addEventListener("click", () => {
	$("#contenedor-filtros").classList.toggle("ocultar");
	if ($("#contenedor-filtros").classList.contains("ocultar")) {
		$(
			"#aspirante-i"
		).innerHTML = `<i class="fa-regular fa-eye"></i><p>Mostrar </p>`;
	} else {
		$(
			"#aspirante-i"
		).innerHTML = `<i class="fa-regular fa-eye-slash"></i><p>Ocultar </p>`;
	}
});

// ===================================================
// Buscar ASPIRANTES (MOCKAPI.IO)
function buscarTodosAspirantes() {
	fetch(urlBase + "teacher", {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json; charset=utf-8",
		},
	})
		.then((respuesta) => {
			return respuesta.json();
		})
		.then((datos) => {
			aspiListado = [...datos];
		})
		.catch((error) => {
			console.log("ERROR - BUSCAR TODOS LOS ASPIRANTES: ", error);
		});
}

// ===================================================
//  Seleccionar Filtros
$("#filtro-orden").addEventListener("change", filtrar);
$("#filtro-area").addEventListener("change", filtrar);
$("#filtro-regional").addEventListener("change", filtrar);
$("#filtro-horas").addEventListener("change", filtrar);
$("#filtro-sexo").addEventListener("change", filtrar);

// ===================================================
//  función de filtrado.
function filtrar() {
	// para educación física
	if ($("#filtro-area").value === "edfi") {
		$("#filtro-sexo").removeAttribute("disabled");
	} else {
		$("#filtro-sexo").setAttribute("disabled", "");
	}
}

// ===================================================
function listarAspirantes() {
	$("#aspirante-cont-card").innerHTML = "";
	for (const asp of aspiListado) {
		$("#aspirante-cont-card").innerHTML += `

			<div class="tarjeta">
				<div class="tarjeta__encabezado">
					<div class="tarjeta__circulo"></div>
					<div class="tarjeta__img">
						<img
							class="tarjeta__img-img"
							src="${asp.foto_perfil}"
							alt=""
						/>
					</div>
				</div>

				<div class="tarjeta__descripcion">
					<h4 class="tarjeta__descripcion-h3">${asp.apellidos}</h4>
					<h4 class="tarjeta__descripcion-h4">${asp.nombres}</h4>
					<p class="tarjeta__descripcion-p">${asp.titulo_area}</p>	
					<p class="tarjeta__descripcion-p">Puntaje: ${asp.puntaje} - Hs.Disp.: ${asp.horas_dispo}</p>	
					
				</div>

				<div class="tarjeta__btn-ver-mas">
						<button class="boton__enlace--p btn-ver-mas" data-idAspirante="${asp.id}">
							Ver más
						</button>
					</div>
			</div>
			`;
	}
	generarVerMas(document.querySelectorAll(".btn-ver-mas"));
}

// ===================================================
// BOTON Ver Más
function generarVerMas(btns) {
	btns.forEach((btn) =>
		btn.addEventListener("click", () => {
			//--- inscription.js
			verMasAspirante(btn.getAttribute("data-idAspirante"));
		})
	);
}

// ===================================================
//  Nueva inscripción
$("#btn-nueva-inscri").addEventListener("click", () => {
	$("#menu-aspirantes").classList.add("ocultar");
	$("#cont-inscripcion").classList.remove("ocultar");
	//Habilita título y botones
	$("#inscripcion-titulo").innerHTML = "Nueva Inscripción";
	$("#btn-editar-aspi").classList.add("ocultar");
	$("#btn-nuevo-aspi").classList.remove("ocultar");

	funcionesInscrpcion(); //inscription.js
});

// ===================================================
// Muestra spinner
function mostrarTodosAspirantes() {
	$("#aspirante-cont-card").innerHTML = "";
	$("#cont-sin-aspi").classList.add("ocultar");
	$("#spinner").removeAttribute("hidden");

	buscarTodosAspirantes();

	setTimeout(() => {
		$("#spinner").setAttribute("hidden", "");

		filtrar();

		if (aspiListado.length > 0) {
			$("#cont-con-aspi").classList.remove("ocultar");
			listarAspirantes();
		} else {
			$("#cont-sin-aspi").classList.remove("ocultar");
			$("#cont-con-aspi").classList.add("ocultar");
		}
	}, 2000);
}

// ====================================
// Viene de main.js
function funcionesAspirantes() {
	cargarArea($("#filtro-area"));
	cargarRegional($("#filtro-regional"));
	cargarHsDispoMin($("#filtro-horas"));
	//--------------------------------------
	mostrarTodosAspirantes();
}
