/* =========== VARIABLES GLOBALES ============= */
let filtroPor;
let ordenPor;
let pasoPorFiltros = false;
let urlBase = "https://6617f92b9a41b1b3dfbbdd87.mockapi.io/teacherJOB/teacher";

/* =========== FUNCIONES GLOBALES ============= */
const buscarArea = (busco) => {
	return area.find((e) => e.cod === busco) ?? -1;
};
const buscarRegional = (busco) => {
	return reg.find((e) => e.cod === busco) ?? -1;
};

/* ======================== BREAKPOINT ========================  */
let breakPoint768 = () =>
	parseInt(getComputedStyle(document.documentElement).getPropertyValue("--md"));

// ============================================
// Mantener visible los filtros a pantalla >= 768
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
	if (
		!(
			$("#filtro-area").value === "SEL" &&
			$("#filtro-regional").value === "SEL" &&
			$("#filtro-horas").value === "SEL" &&
			$("#filtro-orden").value === "SEL"
		)
	) {
		$("#contenedor-filtros").reset();
		pasoPorFiltros = false;
		mostrarAspirantes();
	}
});

// ===================================================
// Filtrar y mostrar filtrados.
$("#buscar-filtros").addEventListener("click", () => {
	if (
		$("#filtro-area").value === "SEL" &&
		$("#filtro-regional").value === "SEL" &&
		$("#filtro-horas").value === "SEL" &&
		$("#filtro-orden").value === "SEL"
	) {
		mnsSeleccionarFiltros();
	} else {
		pasoPorFiltros = true;
		mostrarAspirantes();
	}
});

//========================================================
// MENSAJE que DESAPARECE DSPS DE 5segundos
function mnsSeleccionarFiltros() {
	$("#mns-seleccionar-filtros").classList.remove("ocultar");
	setTimeout(function () {
		$("#mns-seleccionar-filtros").classList.add("ocultar");
	}, 3000);
}

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
// Buscar ASPIRANTES
let buscarAspirantes = async (url) => {
	try {
		let respuestaFetch = await fetch(url, {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json; charset=utf-8",
			},
		});
		let listado = await respuestaFetch.json();
		return listado;
	} catch (error) {
		console.log("ERROR - buscar aspirantes: ", error);
	}
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
let listarAspirantes = (aspirantes) => {
	$("#filtrado-por").innerHTML = filtroPor;
	$("#ordenado-por").innerHTML = ordenPor;

	$("#aspirante-cont-card").innerHTML = "";
	for (const asp of aspirantes) {
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
let mostrarAspirantes = async () => {
	$("#filtrado-por").innerHTML = "";
	$("#ordenado-por").innerHTML = "";
	$("#aspirante-cont-card").innerHTML = "";

	$("#cont-sin-aspi").classList.add("ocultar");
	$("#spinner").removeAttribute("hidden");

	let aspirantes = await filtrar();

	setTimeout(() => {
		$("#spinner").setAttribute("hidden", "");

		if (aspirantes.length > 0) {
			$("#cont-con-aspi").classList.remove("ocultar");
			listarAspirantes(aspirantes);
		} else {
			$("#cont-sin-aspi").classList.remove("ocultar");
			$("#cont-con-aspi").classList.add("ocultar");
		}
	}, 2000);
};

// ===================================================
// Filtrar
let filtrar = async () => {
	if (!pasoPorFiltros) {
		let param = `sortBy=puntaje&order=desc`;

		let respuesta = await buscarAspirantes(`${urlBase}/?${param}`);

		filtroPor = "Filtros: Ninguno";
		ordenPor = `Orden: Mayor puntaje | Aspirantes: ${respuesta.length}`;

		return respuesta;
	} else {
		let area;
		let areaF;
		let regi;
		let regiF;
		let sexo;
		let sexoF;
		let orden;
		let hs_d;

		if ($("#filtro-area").value === "SEL") {
			area = "";
			areaF = "Todas";
		} else {
			area = $("#filtro-area").value;
			areaF = buscarArea($("#filtro-area").value).nom;
		}

		if ($("#filtro-regional").value === "SEL") {
			regi = "";
			regiF = "Todas";
		} else {
			regi = $("#filtro-regional").value;
			regiF = buscarRegional(parseInt($("#filtro-regional").value)).nom;
		}

		hs_d =
			$("#filtro-horas").value === "SEL"
				? 0
				: parseInt($("#filtro-horas").value);

		if (
			$("#filtro-sexo").value === "SEL" ||
			$("#filtro-sexo").value === "mix"
		) {
			sexo = "";
			sexoF = "Todos";
		} else {
			sexo = $("#filtro-sexo").value;
			sexoF = $("#filtro-sexo").value === "fem" ? "Mujeres" : "Varones";
		}
		if ($("#filtro-orden").value === "MAY") {
			orden = "desc";
			ordenPor = "Orden: Mayor puntaje";
		} else {
			orden = "asc";
			ordenPor = "Orden: Menor puntaje";
		}

		filtroPor = `Filtros: ${areaF} | ${regiF} | >= ${hs_d}| ${sexoF}`;
		let param = `area=${area}&regional=${regi}&sexo=${sexo}&sortBy=puntaje&order=${orden}`;
		//ejem
		//https://6617f92b9a41b1b3dfbbdd87.mockapi.io/teacherJOB/teacher?area=edfi&regional=5&sexo=&horas_dispo=2&sortBy=puntaje&order=asc
		//----

		let listado = await buscarAspirantes(`${urlBase}/?${param}`);

		let filtrado = listado.filter((e) => e.horas_dispo >= hs_d);

		ordenPor += ` | Aspirantes: ${filtrado.length}`;

		return filtrado;
	}
};

// ===================================================
//  Nueva inscripción
$("#btn-nueva-inscri").addEventListener("click", () => {
	funcionesInscripcion(); //inscription.js
});

// ====================================
// Viene de main.js
let funcionesAspirantes = () => {
	mostrarFiltros768(); //Para ver desplegados los filtros

	if (!pasoPorFiltros) {
		//Si nunca pasó por filtros.
		cargarArea($("#filtro-area"));
		cargarRegional($("#filtro-regional"));
		cargarHsDispoMin($("#filtro-horas"));
	}
	mostrarAspirantes();
};
