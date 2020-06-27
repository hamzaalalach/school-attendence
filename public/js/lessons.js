//---------------GET TEACHERS----------------------//

/*const renderBranches = (branches) => {
	branches.forEach(element => {
		renderBranche(element);
	});

}*/
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
const renderLesson = (e) => {
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
	<td class="intitule">${e.intitule}</td>
	<td class="enseignant">${$("#enseignant option[value="+e.teacher+"]").text()}</td>
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

		$('input[name="intitule"]').val($(".intitule", $row).text());
		//$('input[name="coordonnateur"]').val($(".coordonnateur", $row).text());
		
	});

};
const renderResults = (branches, page = 1, resPerPage = 8) => {
	let start, end;
	start = (page - 1) * resPerPage;
	end = page * resPerPage;
	branches.slice(start, end).forEach(element => renderLesson(element));
	
	createPagination(page);

}


class Lessons {
	constructor() {}
	async getResults() {
		try {
            const res = await axios.get(`http://localhost:5000/api/lessons`);
			const t = await axios.get(`http://localhost:5000/api/teachers`);
			const b=await axios.get(`http://localhost:5000/api/branches`);
            this.result = res.data.lessons;
			this.teachers=t.data.teachers;
			this.branches=b.data.branches;
            console.log(this.result);

		} catch (err) {
			alert(err)
		}
	}

};
const renderOption=(e)=>{
	const html=`<option value="${e._id}">${e.nom+' '+e.prenom}</option>`;
	document.getElementById('enseignant').insertAdjacentHTML('beforeend',html);
}
const renderSelectOptions = (teachers) => {
	teachers.forEach(element => {
		renderOption(element);
	});

}
const renderBrancheOption=(e)=>{
	const html=`<label for="${e._id}">
	<input type="checkbox" id="${e._id}" value="${e._id}"/> ${e.label}</label>`;
	
	document.getElementById('checkboxes').insertAdjacentHTML('beforeend',html);
	//document.getElementById('.filiere').insertAdjacentHTML('beforeend',html);
}
const renderMultilist = (branches) => {
	branches.forEach(element => {
		renderBrancheOption(element);
	});

}

const state = {};
const controlBranches = async () => {
	state.search = new Lessons();


    await state.search.getResults();
	renderSelectOptions(state.search.teachers);
	renderMultilist(state.search.branches);
	renderOptions(state.search.teachers);
    renderResults(state.search.result);
    //console.log(state.search.result);


}
controlBranches();

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

const postLesson = async () => {
	const Nom = $("#intitule").val();
	const Teacher = $("#enseignant").val();
	try {
		const gl = await axios.post(`http://localhost:5000/api/lessons`, {
			intitule: Nom,
			teacher: Teacher,
			
		});
        renderLesson(gl.data.lesson);
        
	} catch (err) {
		alert(err)
	}
};

const clearInputs=()=>{
	$('#filiere').val('');
	//$('#coordonnateur').val('');
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
	postLesson();
	closeModal();
})

//------------------DELETE TEACHER-------------------//

const deleteTeacher = async (id) => {
	try {
		await axios.delete(`http://localhost:5000/api/lessons/${id}`);
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
const updateFiliere = async (id) => {
	const Intitule = $('input[name="intitule"]').val();
	const Teacher = $('#ens').val();
	
	try {
		const gl = await axios.patch(`http://localhost:5000/api/lessons/${id}`, {
			intitule: Intitule,
			teacher: Teacher,
			
		});
		

	} catch (err) {
		alert(err)
	}
};
const render=(e)=>{
	const html=`<option value="${e._id}">${e.nom+' '+e.prenom}</option>`;
	//document.getElementById('filiere').insertAdjacentHTML('beforeend',html);
	document.getElementById('ens').insertAdjacentHTML('beforeend',html);
}
const renderOptions = (branches) => {
	branches.forEach(element => {
		render(element);
    });
}
const UIupdate = (id) => {
	var $row = document.getElementById(id);
	console.log($row);
	$(".intitule", $row).text($('input[name="intitule"]').val());
	$(".enseignant", $row).text($("#ens option[value="+$('#ens').val()+"]").text());
	
}
document.querySelector('tbody').addEventListener('click', (e) => {
	
	var id = e.target.parentNode.parentNode.parentNode.parentNode.id;
	if (id) {
		state.Id=id;
		
	}
});

$("#editForm").submit(function (event) {
	event.preventDefault();
	UIupdate(state.Id);
	
	updateFiliere(state.Id);
	closeModal();

})

