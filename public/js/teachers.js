//---------------GET TEACHERS----------------------//
clearResults = () => {
	document.querySelector('tbody').innerHTML = '';
	document.querySelector('.pagination').innerHTML = '';
};

const createPagination = (page) => {
	const html = `
                <li class="page-item prev"  data-goto=${page - 1}><a href="#">Previous</a></li>
                
                <li class="page-item active">
                  <a href="#" class="page-link">${page}</a>
                </li>
               
                <li class="page-item next" id="next" data-goto=${page + 1}>
                  <a href="#" class="page-link">Next</a>
				</li>`
	document.querySelector('.pagination').insertAdjacentHTML('beforeend', html);
}

const renderTeacher = (e) => {
	const html = `<tr id="${e._id}">
	<td>
	<span>
	<span>
      <span class="custom-checkbox">
        <input
          type="checkbox"
          id="checkbox1"
          name="options[]"
          value="1"
        />
        <label for="checkbox1"></label>
	  </span>
	</span>
	</span>
    </td>
	<td class="nom">${e.nom}</td>
	<td class="prenom">${e.prenom } </td>
    <td class="email">${e.email}</td>
    <td class="adresse">${e.adresse}</td>
	<td class="telephone">${e.telephone}</td>
	<td class="view"><span><span><a href="#displayEmployeeModal"
	
	data-toggle="modal"
	
	><ion-icon name="eye-outline"></ion-icon></a></span></span></td>
	<td>
	  <span>
      <a
		href="#editEmployeeModal"
		
        class="edit"
        data-toggle="modal"
        ><i
          class="material-icons"
          data-toggle="tooltip"
          title="Modifier"
          >&#xE254;</i
        ></a
	  >
	  </span>
      <a
        href="#deleteEmployeeModal"
        class="delete"
        data-toggle="modal"
        ><i
          class="material-icons"
          data-toggle="tooltip"
          title="Supprimer"
          >&#xE872;</i
        ></a
      >
    </td>
  </tr>`;
	document.querySelector('tbody').insertAdjacentHTML("beforeend", html);
	$(".edit").click(function () {
		var $row = $(this).closest("tr");

		$('input[name="nom"]').val($(".nom", $row).text());
		$('input[name="prenom"]').val($(".prenom", $row).text());
		$('input[name="email"]').val($(".email", $row).text());
		$('input[name="adresse"]').val($(".adresse", $row).text());
		$('input[name="telephone"]').val($(".telephone", $row).text());
	});




};
const renderLessons=(t,id)=>{
	t.forEach(element =>{
		if(element.teacher==id){
			document.querySelector('.displayLessons').insertAdjacentHTML('beforeend',`<li>${element.intitule}</li>`)
		}
	});
}
const renderResults = (teachers, page = 1, resPerPage = 8) => {
	let start, end;
	start = (page - 1) * resPerPage;
	end = page * resPerPage;
	teachers.slice(start, end).forEach(element => renderTeacher(element));
	
	createPagination(page);

}

class Teachers {
	constructor() {}
	async getResults() {
		try {
			const res = await axios.get(`http://localhost:5000/api/teachers`);
			const l = await axios.get(`http://localhost:5000/api/lessons`);
			this.result = res.data.teachers;
			this.lessons=l.data.lessons;
			console.log(this.lessons);

		} catch (err) {
			alert(err)
		}
	}

};
const state = {};
const controlTeachers = async () => {
	state.search = new Teachers();


	await state.search.getResults();

	//console.log(state.search);
	renderResults(state.search.result);
	renderLessons(state.search.lessons,state.IDd);


}
controlTeachers();

document.querySelector('.pagination').addEventListener('click', e => {
	const btn = e.target.closest('.page-item');
	const goto = parseInt(btn.dataset.goto);
	const pages = Math.ceil(state.search.result.length / 8);

	if (goto >= 1 && goto <= pages) {
		clearResults();
		renderResults(state.search.result, goto);
	}
});

//-------------------ADD TEACHER-----------------//

const postTeacher = async () => {
	const Nom = $("#nom").val();
	const Prenom = $("#prenom").val();
	const Email = $("#email").val();
	const Adresse = $("#adresse").val();
	const Telephone = $("#telephone").val();
	try {
		const gl = await axios.post(`http://localhost:5000/api/teachers`, {
			nom: Nom,
			prenom: Prenom,
			email: Email,
			adresse: Adresse,
			telephone: Telephone
		});
		renderTeacher(gl.data.teacher);
	} catch (err) {
		alert(err)
	}
};
const clearInputs=()=>{
	$('#nom').val('');
	$('#prenom').val('');
	$('#email').val('');
	$('#adresse').val('');
	$('#telephone').val('');
}
const closeModal=()=>{
	$('.modal').removeClass('in');
	$('.modal').removeClass('show');
	$('.modal').attr('aria-hidden','true');
	$('.modal').css('display','none');
	$('.modal-backdrop').remove();
	$('body').removeClass('modal-open');
	$('body').attr('style','');
}
$("#addd").click(function () {
	clearInputs();
});
$("#addForm").submit(function (event) {

	event.preventDefault();
	
	postTeacher();
	closeModal();
	
})

//------------------DELETE TEACHER-------------------//

const deleteTeacher = async (id) => {
	try {
		await axios.delete(`http://localhost:5000/api/teachers/${id}`);
	} catch (err) {
		alert(err)
	}
};

document.querySelector('tbody').addEventListener('click', (e) => {
	var id = e.target.parentNode.parentNode.parentNode.id;
	
	if (id) {

		deleteTeacher(id);
		document.getElementById(id).remove();
	}
});


//----------------UPDATE TEACHER------------------------//
const updateTeacher = async (id) => {
	const Nom = $('input[name="nom"]').val();
	const Prenom = $('input[name="prenom"]').val();
	const Email = $('input[name="email"]').val();
	const Adresse = $('input[name="adresse"]').val();
	const Telephone = $('input[name="telephone"]').val();
	try {
		const gl = await axios.patch(`http://localhost:5000/api/teachers/${id}`, {
			nom: Nom,
			prenom: Prenom,
			email: Email,
			adresse: Adresse,
			telephone: Telephone
		});
		//UIupdate(id, gl.data.teacher);

	} catch (err) {
		alert(err)
	}
};

const UIupdate = (id) => {
	var $row = document.getElementById(id);
	//console.log($row);
	$(".nom", $row).text($('input[name="nom"]').val());
	$(".prenom", $row).text($('input[name="prenom"]').val());
	$(".email", $row).text($('input[name="email"]').val());
	$(".adresse", $row).text($('input[name="adresse"]').val());
	$(".telephone", $row).text($('input[name="telephone"]').val());
}

document.querySelector('tbody').addEventListener('click', (e) => {

	var id = e.target.parentNode.parentNode.parentNode.parentNode.id;
	var I = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.id;
	document.querySelector('.displayLessons').innerHTML='';
	renderLessons(state.search.lessons,I);
	//console.log(state.IDd);
	if (id) {
		state.Id=id;
		
		
		
		
	}
});

$("#editForm").submit(function (e) {
	e.preventDefault();
	updateTeacher(state.Id);
	UIupdate(state.Id);
	closeModal();
});