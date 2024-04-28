/* =========== VARIABLES GLOBALES ============= */
let inscripcion = {};
let objAspirante;
let id;
let nuevaInscripcion = true;

// ============================================
let quitaAcentos = (frase) => {
	frase = frase.replace(/[áäâàÁÀÄÂ]/g, "a");
	frase = frase.replace(/[éëêèÉÈËÊ]/g, "e");
	frase = frase.replace(/[íïîìÍÌÏÎ]/g, "i");
	frase = frase.replace(/[óöôòÓÒÖÔ]/g, "o");
	frase = frase.replace(/[úüûùÚÚÜÛ]/g, "u");
	return frase;
};

// ===================================================
// Ver Mas (datos de un aspirante)  (viene de aspirant.js)
let verMasAspirante = async (idAspirante) => {
	id = idAspirante;
	await fetch(`${urlBase}/${idAspirante}`)
		.then((res) => res.json())
		.then((data) => {
			objAspirante = data;
			mostrarVerMas(data);
		})
		.catch((err) =>
			console.log("ERROR: buscar un aspirante para Ver Más: ", err)
		);
};
//-------------------------
let mostrarVerMas = (aspi) => {
	$("#aspirante-cont-card").innerHTML = "";
	$("#ver-mas-un-aspi").innerHTML = "";
	$("#menu-aspirantes").classList.add("ocultar");
	$("#cont-ver-mas").classList.remove("ocultar");
	$("#spinner-ver-mas").removeAttribute("hidden");

	setTimeout(() => {
		$("#spinner-ver-mas").setAttribute("hidden", "");
		$("#ver-mas-un").classList.remove("ocultar");
		mostrarUno(aspi);
	}, 2000);
};
//---------------------
let mostrarUno = (asp) => {
	$("#btn-volver-ver").focus();

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
			<p class="vermas__descripcion-p"> 
					Hs.Disp.: ${asp.horas_dispo} -
					Puntaje: ${asp.puntaje}
			</p>	
		</div>
	</div>
`;
};

// ===================================================
// VER MAS -  Cancelar
$("#btn-volver-ver").addEventListener("click", () => {
	$("#cont-ver-mas").classList.add("ocultar");
	$("#ver-mas-un").classList.add("ocultar");
	$("#menu-aspirantes").classList.remove("ocultar");
	$("#cont-inscripcion").classList.add("ocultar");
	mostrarAspirantes(); //aspirant.js
});

// ===================================================
// VER MAS - MODAL Eliminar
$("#btn-borrar-ver").addEventListener("click", () => {
	$("#cont-inscripcion").classList.add("ocultar");
	$("#modal-eliminar").classList.remove("ocultar");
	$("#btn-cancelar-Eliminar-aspi").focus();
});

$("#modal-eliminar-btn-cerrar").addEventListener("click", () => {
	$("#modal-eliminar").classList.add("ocultar");
});

$("#btn-eliminar-aspi").addEventListener("click", async () => {
	$("#cont-inscripcion").classList.add("ocultar");
	//funcion eliminar
	await borrarAspirante();
	$("#modal-eliminar").classList.add("ocultar");
	$("#cont-ver-mas").classList.add("ocultar");
	$("#ver-mas-un").classList.add("ocultar");
	$("#menu-aspirantes").classList.remove("ocultar");

	mostrarAspirantes(); //aspirant.js
});
//----- Función eliminar
let borrarAspirante = async () => {
	try {
		const peticion = await fetch(`${urlBase}/${id}`, {
			method: "DELETE",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json; charset=utf-8",
			},
		});
	} catch (error) {
		console.log("ERROR - Borrar un Aspirante: ", error);
	}
};
// ===================================================
// VER MAS -  Cancelar eliminar
$("#btn-cancelar-Eliminar-aspi").addEventListener("click", () => {
	$("#modal-eliminar").classList.add("ocultar");
});

// ============================================
// VER MAS -  Editar
$("#btn-editar-ver").addEventListener("click", () => {
	window.scrollBy(0, 3000);

	funcionesInscripcion();
	nuevaInscripcion = false;

	$("#apellidos").value = objAspirante.apellidos;
	$("#nombres").value = objAspirante.nombres;
	$("#sexo").value = objAspirante.sexo;
	$("#telefono").value = objAspirante.telefono;
	$("#correo").value = objAspirante.email;
	$("#url-foto").value = objAspirante.foto_perfil;
	$("#area").value = objAspirante.area;
	$("#regional").value = objAspirante.regional;
	$("#titulo").value = objAspirante.titulo_area;
	$("#hs-dispo").value = objAspirante.horas_dispo;
	$("#puntaje").value = objAspirante.puntaje;

	$("#cont-inscripcion").classList.remove("ocultar");
	$("#apellidos").focus();
	$("#inscripcion-titulo").innerHTML = "Editar Inscripción";
	$("#btn-nuevo-aspi").classList.add("ocultar");
	$("#btn-editar-aspi").classList.remove("ocultar");
});

// ===================================================
// VER MAS -  Cancelar EDITAR
$("#btn-cancelar-editar").addEventListener("click", () => {
	$("#inscripcion-form").reset();
	$("#cont-inscripcion").classList.add("ocultar");
});

// ============================================
// Guarda la inscripción editada.
let registrarEditarInscripcion = async (inscrip) => {
	try {
		let peticion = await fetch(`${urlBase}/${id}`, {
			method: "PUT",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json; charset=utf-8",
			},
			body: JSON.stringify(inscrip),
		});
	} catch (error) {
		console.log("ERROR - Editar datos de Aspirante: ", error);
	}
};

// ============================================
//                 INSCRIPCIÓN
// ============================================
// Nueva Inscripción  | VER MAS: Guardar Editar
$("#inscripcion-form").addEventListener("submit", async (e) => {
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

	if (nuevaInscripcion) {
		//Viene de Nueva inscripción
		await registrarInscripcion(inscripcion);
		$("#inscripcion-form").reset();
		$("#cont-inscripcion").classList.add("ocultar");
		$("#menu-aspirantes").classList.remove("ocultar");
	} else {
		//Viene de "Ver mas Editar"
		await registrarEditarInscripcion(inscripcion);
		$("#inscripcion-form").reset();
		$("#cont-inscripcion").classList.add("ocultar");
		$("#ver-mas-un").classList.add("ocultar");
		await verMasAspirante(id);
	}
});

// -------------------------
let registrarInscripcion = async (inscrip) => {
	try {
		let peticion = await fetch(urlBase, {
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
	mostrarAspirantes(); // (aspirant.js)
};

// ===================================================
// Cancelar inscripción
$("#btn-cancelar-insc").addEventListener("click", () => {
	$("#inscripcion-form").reset();
	$("#cont-inscripcion").classList.add("ocultar");
	$("#menu-aspirantes").classList.remove("ocultar");
});

// ====================================
// Vienes de aspirant.js
let funcionesInscripcion = () => {
	$("#menu-aspirantes").classList.add("ocultar");
	$("#cont-inscripcion").classList.remove("ocultar");
	$("#inscripcion-form").reset();
	$("#apellidos").focus();
	$("#inscripcion-titulo").innerHTML = "Nueva Inscripción";
	$("#btn-editar-aspi").classList.add("ocultar");
	$("#btn-nuevo-aspi").classList.remove("ocultar");
	cargarArea($("#area")); //(aspirant.js)
	cargarRegional($("#regional"));
	nuevaInscripcion = true;
};
