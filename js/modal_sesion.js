//==================== Varibales globales
let inicioSesion = false;
let usuarios;
let urlBaseUs = "https://6617f92b9a41b1b3dfbbdd87.mockapi.io/teacherJOB/users";

//=============================================
//boton cerrar
$("#modal-sesion-btn-cerrar").addEventListener("click", () => {
	$("#iniciar-sesion").classList.add("ocultar");
});
$("#modal-sesion-btn-cerrar2").addEventListener("click", () => {
	$("#cerrar-sesion").classList.add("ocultar");
});

//=============================================
$("#btn-cancelar-sesion").addEventListener("click", () => {
	$("#iniciar-sesion").classList.add("ocultar");
});
$("#btn-cancelar-sesion2").addEventListener("click", () => {
	$("#cerrar-sesion").classList.add("ocultar");
});

//==========================================
$("#btn-SALIR-sesion").addEventListener("click", () => {
	$("#cerrar-sesion").classList.add("ocultar");
	$("#enlace-sesion").innerHTML = "Iniciar Sesión";

	//Deshabilitar botones
	$("#btn-nueva-inscri").setAttribute("disabled", "");
	$("#btn-borrar-ver").setAttribute("disabled", "");
	$("#btn-editar-ver").setAttribute("disabled", "");
	inicioSesion = false;
	//Sacar logo de usuario
	$("#nav-img-us").setAttribute("src","img/usuario.jpg");
});

//=============================================
$("#usuario").addEventListener("change", () => {
	$("#mns-modal").innerHTML = "";

	let us = usuarios.find((e) => e.usuario === $("#usuario").value);

	if (us === undefined) {
		mnsUsuarioContasIncorrecto("usuario");
	} else {
		$("#contrasenia").removeAttribute("disabled");
		$("#modal-sesion-img").setAttribute("src", `${us.foto}`);
	}
});

//=============================================
$("#btn-iniciar-sesion").addEventListener("click", () => {
	$("#mns-modal").innerHTML = "";
	let contra = $("#contrasenia").value;

	let us = usuarios.find((e) => e.usuario === $("#usuario").value);

	if (us.contrasenia !== contra) {
		mnsUsuarioContasIncorrecto("contrasenia");
	} else {
		$("#iniciar-sesion").classList.add("ocultar");
		$("#enlace-sesion").innerHTML = "Cerrar Sesión";
		//habilitar botones
		$("#btn-nueva-inscri").removeAttribute("disabled");
		$("#btn-borrar-ver").removeAttribute("disabled");
		$("#btn-editar-ver").removeAttribute("disabled");

		inicioSesion = true;
		//Mostrar logo de usuario
		$("#nav-img-us").setAttribute("src", `${us.foto}`);
		console.log("inicio  ", us.usuario);
	}
});

//========================================================
// MENSAJE que DESAPARECE DSPS DE 5segundos
function mnsUsuarioContasIncorrecto(donde) {
	$("#mns-modal").classList.remove("ocultar");

	if (donde === "usuario") {
		$("#contrasenia").setAttribute("disabled", "");
		$("#mns-modal").innerHTML = "Usuario incorrecto";
	} else {
		$("#mns-modal").innerHTML = "Contraseña incorrecta";
	}
	setTimeout(function () {
		$("#mns-modal").classList.add("ocultar");
	}, 3000);
}

// ===================================================
// Buscar usuarios
let buscarUsuarios = async () => {
	try {
		let respuestaFetch = await fetch(urlBaseUs, {
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

//--------------------------
// viene de main.js
let funcionesInicioSesion = async () => {
	if (inicioSesion) {
		//salir sesión
		$("#cerrar-sesion").classList.remove("ocultar");
	} else {
		//iniciar sesión
		usuarios = await buscarUsuarios();
		$("#iniciar-sesion").classList.remove("ocultar");
		$("#mns-modal").innerHTML = "";
		$("#modal-sesion-img").setAttribute("src", "img/usuario.jpg");
		$("#modal-sesion-form").reset();
	}
};
