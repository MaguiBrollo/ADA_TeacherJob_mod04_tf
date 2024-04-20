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
// Modal Borrar (Ver Mas)
$("#btn-borrar-ver").addEventListener("click", () => {
	$("#modal-eliminar").classList.remove("ocultar");
});
$("#modal-eliminar-btn-cerrar").addEventListener("click", () => {
	$("#modal-eliminar").classList.add("ocultar");
});
$("#btn-eliminar-aspi").addEventListener("click", async () => {
	//funcion eliminar
	await borrarAspirante();
	$("#modal-eliminar").classList.add("ocultar");
	$("#cont-ver-mas").classList.add("ocultar");
	$("#ver-mas-un").classList.add("ocultar");
	$("#menu-aspirantes").classList.remove("ocultar");

	mostrarTodosAspirantes(); //aspirant.js
});
$("#btn-cancelar-Eliminar-aspi").addEventListener("click", () => {
	$("#modal-eliminar").classList.add("ocultar");
});


let borrarAspirante = async (idCat) => {
	try {
		const peticion = await fetch(
			`${urlBase}/teacher/${idAspiranteParaBorrar}`,
			{
				method: "DELETE",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json; charset=utf-8",
				},
			}
		);
	} catch (error) {
		console.log("ERROR - Borrar un Aspirante: ", error);
	}
	
};


// ===================================================
// Ver Mas (datos de un aspirante - incripción)
//------------ viene de aspirant.js
let idAspiranteParaBorrar;
function verMasAspirante(idAspirante) {
	idAspiranteParaBorrar = idAspirante;
	fetch(`${urlBase}/teacher/${idAspirante}`)
		.then((res) => res.json())
		.then((data) => {
			mostrarVerMas(data);
		})
		.catch((err) => console.log(err));
}

//------------ muestra un aspirante
function mostrarVerMas(aspi) {
	$("#aspirante-cont-card").innerHTML = "";
	$("#ver-mas-un-aspi").innerHTML = "";
	$("#menu-aspirantes").classList.add("ocultar");
	$("#cont-ver-mas").classList.remove("ocultar");
	$("#spinner-ver-mas").removeAttribute("hidden");

	setTimeout(() => {
		$("#spinner-ver-mas").setAttribute("hidden", "");
		$("#ver-mas-un").classList.remove("ocultar");
		mostrar(aspi);
	}, 2000);
}

function mostrar(asp) {
	$("#ver-mas-un-aspi").innerHTML = `
	<div>	
		<div class="vermas__encabezado">
			<div class="vermas__circulo"></div>
			<div class="vermas__img">
				<img
					class="vermas__img-img"
					src="${asp.foto_perfil}"
					alt=""
				/>
			</div>
		</div>

		<div class="vermas__descripcion">
			<h4 class="vermas__descripcion-h4"> ${asp.apellidos} </h4>
			<h4 class="vermas__descripcion-h4"> ${asp.nombres} </h4>
			<p class="vermas__descripcion-p"> ${asp.telefono} </p>	
			
			<p class="vermas__descripcion-p"> ${asp.email} </p>
			<p class="vermas__descripcion-p">
				Area: ${buscarArea(asp.area).nom} - 
				Regional: ${buscarRegional(asp.regional).nom}
			</p>		
			<p class="vermas__descripcion-p"> ${asp.titulo_area} </p>	
			<p class="vermas__descripcion-p"> Puntaje: 
				${asp.puntaje} - Hs.Disp.: ${asp.horas_dispo}
			</p>	
		</div>
	</div>
`;
}

// ===================================================
// Cancelar VerMas
$("#btn-volver-ver").addEventListener("click", () => {
	$("#cont-ver-mas").classList.add("ocultar");
	$("#ver-mas-un").classList.add("ocultar");
	$("#menu-aspirantes").classList.remove("ocultar");
	mostrarTodosAspirantes(); //aspirant.js
});

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
		email: $("#correo").value.toUpperCase(),
		foto_perfil: $("#url-foto").value,
		area: $("#area").value,
		regional: parseInt($("#regional").value),
		titulo_area: quitaAcentos($("#titulo").value).toUpperCase(),
		horas_dispo: parseInt($("#hs-dispo").value),
		puntaje: parseInt($("#puntaje").value),
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
