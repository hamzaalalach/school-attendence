//const { response } = require("express");




const inputs = document.querySelectorAll(".input");


function addcl() {
	let parent = this.parentNode.parentNode;
	parent.classList.add("focus");
}

function remcl() {
	let parent = this.parentNode.parentNode;
	if (this.value == "") {
		parent.classList.remove("focus");
	}
}


inputs.forEach(input => {
	input.addEventListener("focus", addcl);
	input.addEventListener("blur", remcl);
});

$("#loginForm").submit(function (event) {
			event.preventDefault();
			$.ajax({
				type: "POST",
				url: "http://localhost:5000/users/login",
				data: ({
					email: $('#email').val(),
					password: $('#password').val()
				}),
				success: function (result) {
					if(result){
						const Toast = Swal.mixin({
							toast: true,
							position: 'top-end',
							showConfirmButton: false,
							timer: 1200,
							timerProgressBar: true,
							onOpen: (toast) => {
							  toast.addEventListener('mouseenter', Swal.stopTimer)
							  toast.addEventListener('mouseleave', Swal.resumeTimer)
							}
						  })
						  
						  Toast.fire({
							icon: 'success',
							title: 'Connecté avec succès'
						  })
						  setTimeout(()=>window.location='http://localhost:5000/chairman/teachers', 1200);
						
						
						  
					}
				},
				error: function (xhr, ajaxOptions, thrownError) {
					Swal.fire({
						icon: 'error',
						title: 'échec de la connexion',
						text: 'L\'email ou le mot de passe entré n\'est pas valide. Veuillez réessayer',
						confirmButtonColor: '#32be8f'
						
					  })
				  }
					
			});
			/*return false;*/
		});
