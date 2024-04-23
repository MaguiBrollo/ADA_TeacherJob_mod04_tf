//======== Variables globales (main.js) =========

/* ======================== BREAKPOINT ========================  */
let breakPoint768 = () =>
	parseInt(getComputedStyle(document.documentElement).getPropertyValue("--md"));

// ============================================
// Mantener vsible los filtros a pantalla >= 768
function mostrarFiltros768() {
	if (
		window.innerWidth >= breakPoint768() &&
		$("#contenedor-filtros").classList.contains("ocultar")
	) {
		$(
			"#ocultar-filtros"
		).innerHTML = `<i class="fa-regular fa-eye-slash"></i><p>Ocultar </p>`;
		$("#contenedor-filtros").classList.remove("ocultar");
	}
}
window.visualViewport.addEventListener("resize", () => {
	if (
		window.innerWidth >= breakPoint768() &&
		$("#contenedor-filtros").classList.contains("ocultar")
	) {
		$(
			"#ocultar-filtros"
		).innerHTML = `<i class="fa-regular fa-eye-slash"></i><p>Ocultar </p>`;
		$("#contenedor-filtros").classList.remove("ocultar");
	}

	if (window.innerWidth < breakPoint768()) {
		$(
			"#ocultar-filtros"
		).innerHTML = `<i class="fa-regular fa-eye"></i><p>Mostrar </p>`;
		$("#contenedor-filtros").classList.add("ocultar");
	}
});

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

let cargarArea = (input_select) => {
	let area_listado = `<option value="SEL" selected>Seleccione...</option>`;
	area.sort((a, b) => {
		return a.nom.localeCompare(b.nom);
	});
	for (var i = 0; i < area.length; i++) {
		area_listado +=
			`<option value="` + area[i].cod + `">` + area[i].nom + `</option>`;
	}
	input_select.innerHTML = area_listado;
};

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

let cargarRegional = (input_select) => {
	let reg_listado = `<option value="SEL" selected>Seleccione...</option>`;
	for (var i = 0; i < reg.length; i++) {
		reg_listado +=
			`<option value="` + reg[i].cod + `">` + reg[i].nom + `</option>`;
	}
	input_select.innerHTML = reg_listado;
};

// ============================================
// Input Select - Hs Disponibles (mínimo)
let cargarHsDispoMin = (input_select) => {
	let hs_listado = `<option value="SEL" selected>Seleccione...</option>`;
	const hs = [2, 3, 4, 5, 6, 7, 8, 9, 10];
	for (var i = 0; i < hs.length; i++) {
		hs_listado += `<option value="` + hs[i] + `">` + hs[i] + `</option>`;
	}
	input_select.innerHTML = hs_listado;
};

// ===================================================
// Ver-Ocultar Filtros
$("#ocultar-filtros").addEventListener("click", () => {
	$("#contenedor-filtros").classList.toggle("ocultar");
	if ($("#contenedor-filtros").classList.contains("ocultar")) {
		$(
			"#ocultar-filtros"
		).innerHTML = `<i class="fa-regular fa-eye"></i><p>Mostrar </p>`;
	} else {
		$(
			"#ocultar-filtros"
		).innerHTML = `<i class="fa-regular fa-eye-slash"></i><p>Ocultar </p>`;
	}
});

// ===================================================
// Limpiar Filtros y mostrar TODOS
$("#limpiar-filtros").addEventListener("click", () => {
	$("#contenedor-filtros").reset();
	mostrarAspirantes("todos");
});

// ===================================================
// Limpiar Filtros y mostrar TODOS
$("#buscar-filtros").addEventListener("click", () => {
	mostrarAspirantes("filtros");
});

// ===================================================
// Habilitar input "sexo" solo para educación física
$("#filtro-area").addEventListener("change", () => {
	if ($("#filtro-area").value === "edfi") {
		$("#filtro-sexo").removeAttribute("disabled");
	} else {
		$("#filtro-sexo").setAttribute("disabled", "");
	}
});

// ===================================================
// Buscar ASPIRANTES (MOCKAPI.IO)
let buscarAspirantes = (url) => {
	fetch(url, {
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
			console.log("ERROR - BUSCAR ASPIRANTES: ", error);
		});
};

// ===================================================
// BOTON Ver Más
let generarVerMas = (btns) => {
	btns.forEach((btn) =>
		btn.addEventListener("click", () => {
			//--- inscription.js
			verMasAspirante(btn.getAttribute("data-idAspirante"));
		})
	);
};

// ===================================================
let listarAspirantes = () => {
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
};

// ===================================================
// Muestra spinner
let mostrarAspirantes = (cuantos) => {
	let filtroPor;
	let ordenPor;

	$("#aspirante-cont-card").innerHTML = "";
	$("#cont-sin-aspi").classList.add("ocultar");
	$("#spinner").removeAttribute("hidden");

	if (cuantos === "todos") {
		filtroPor = "Filtros: Ninguno";
		ordenPor = "Orden: Mayor Puntje";
		let param = new URLSearchParams(`sortBy=puntaje&order=desc`);
		buscarAspirantes(`${urlBase}/?${param}`);
	} else {
		let param = armarQueryParam();
		buscarAspirantes(`${urlBase}/?${param}`);
	}

	setTimeout(() => {
		$("#spinner").setAttribute("hidden", "");

		if (aspiListado.length > 0) {
			$("#cont-con-aspi").classList.remove("ocultar");
			$("#filtrado-por").innerHTML = filtroPor;
			$("#ordenado-por").innerHTML = ordenPor;
			listarAspirantes();
		} else {
			$("#cont-sin-aspi").classList.remove("ocultar");
			$("#cont-con-aspi").classList.add("ocultar");
		}
	}, 2000);
};

// ===================================================
// Filtrar
let armarQueryParam = () => {
	let sexo;
	let orden;
	let area = $("#filtro-area").value === "SEL" ? "" : $("#filtro-area").value;
	let regi =
		$("#filtro-regional").value === "SEL"
			? ""
			: parseInt($("#filtro-regional").value);
	let hs =
		$("#filtro-horas").value === "SEL"
			? ""
			: parseInt($("#filtro-horas").value);

	if ($("#filtro-sexo").value === "SEL" || $("#filtro-sexo").value === "mix") {
		sexo = "";
	} else {
		sexo = $("#filtro-sexo").value;
	}
	if ($("#filtro-orden").value === "MAY") {
		orden = "desc";
		ordenPor = "Orden: Mayor Puntaje";
	} else {
		orden = "asc";
		ordenPor = "Orden: Menor Puntaje";
	}

	filtroPor = "Filtros";
	console.log(
		`area=${area}&regional=${regi}&horas_dispo>-${hs}&sexo=${sexo}&sortBy=puntaje&order=${orden}`
	);
	let x = new URLSearchParams(
		`area=${area}&regional=${regi}&horas_dispo>%3D${hs}&sexo=${sexo}&sortBy=puntaje&order=${orden}`
	);
	return x;

	//ejem

	//https://6617f92b9a41b1b3dfbbdd87.mockapi.io/teacherJOB/teacher?area=edfi&regional=5&sexo=&horas_dispo>%3D&sortBy=puntaje&order=asc
};

// ===================================================
//  Nueva inscripción
$("#btn-nueva-inscri").addEventListener("click", () => {
	$("#menu-aspirantes").classList.add("ocultar");
	$("#cont-inscripcion").classList.remove("ocultar");
	$("#inscripcion-form").reset();

	//Habilita título y botones
	$("#inscripcion-titulo").innerHTML = "Nueva Inscripción";
	$("#btn-editar-aspi").classList.add("ocultar");
	$("#btn-nuevo-aspi").classList.remove("ocultar");

	funcionesInscrpcion(); //inscription.js
});

// ====================================
// Viene de main.js
let funcionesAspirantes = () => {
	cargarArea($("#filtro-area"));
	cargarRegional($("#filtro-regional"));
	cargarHsDispoMin($("#filtro-horas"));
	//--------------------------------------
	mostrarFiltros768();
	mostrarAspirantes("todos");
};
