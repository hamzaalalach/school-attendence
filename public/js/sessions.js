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

const renderStudent = (e) => {
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
    <td class="lecon">${$("#lecon option[value="+e.lesson+"]").text()}</td>
	<td class="salle">${e.salle}</td>
	<td class="heure">${e.heure } </td>
    <td class="date">${e.date.substr(0,10)}</td>
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
        $('input[name="salle"]').val($(".salle", $row).text());
		$('input[name="heure"]').val($(".heure", $row).text());
		$('input[name="date"]').val($(".date", $row).text());
		
		//$('input[name="filiere"]').val($(".filiere", $row).text());
		
	});




};
const renderResults = (teachers, page = 1, resPerPage = 8) => {
	let start, end;
	start = (page - 1) * resPerPage;
	end = page * resPerPage;
	teachers.slice(start, end).forEach(element => renderStudent(element));
	
	createPagination(page);

}

class Sessions {
	constructor() {}
	async getResults() {
		try {
			const res = await axios.get(`http://localhost:5000/api/sessions`);
			const l = await axios.get(`http://localhost:5000/api/lessons`);
			this.result = res.data.sessions;
			this.lessons=l.data.lessons;
            //console.log(this.result);

		} catch (err) {
			alert(err)
		}
	}

};
const renderOption=(e)=>{
	const html=`<option value="${e._id}">${e.intitule}</option>`;
	document.getElementById('lecon').insertAdjacentHTML('beforeend',html);
	//document.getElementById('.filiere').insertAdjacentHTML('beforeend',html);
}
const renderSelectOptions = (branches) => {
	branches.forEach(element => {
		renderOption(element);
	});

}
const state = {};
const controlStudents = async () => {
	state.student = new Sessions();


	await state.student.getResults();
	renderSelectOptions(state.student.lessons);
	//console.log(state.student.result);
	renderOptions(state.student.lessons);
	renderResults(state.student.result);
	


}
controlStudents();

document.querySelector('.pagination').addEventListener('click', e => {
	const btn = e.target.closest('.page-item');
	const goto = parseInt(btn.dataset.goto);
	const pages = Math.ceil(state.student.result.length / 8);

	if (goto >= 1 && goto <= pages) {
		clearResults();
		renderResults(state.student.result, goto);
	}
});

//-------------------ADD TEACHER-----------------//

const postStudent = async () => {
    const Lecon = $("#lecon").val();
	const Salle = $("#salle").val();
	const Heure = $("#heure").val();
	const Date = $("#date").val();
	
	try {
		const gl = await axios.post(`http://localhost:5000/api/sessions`, {
            lesson: Lecon,
            salle: Salle,
			heure: Heure,
			date: Date,
			
		});
        renderStudent(gl.data.session);
        //console.log(gl.data.session)
	} catch (err) {
		alert(err)
	}
};

const clearInputs=()=>{
    $('#salle').val('');
	$('#heure').val('');
	$('#date').val('');
	
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
	
	postStudent();
	closeModal();
	
})

//------------------DELETE TEACHER-------------------//

const deleteSession = async (id) => {
	try {
		await axios.delete(`http://localhost:5000/api/sessions/${id}`);
	} catch (err) {
		alert(err)
	}
};

document.querySelector('tbody').addEventListener('click', (e) => {
	var id = e.target.parentNode.parentNode.parentNode.id;
	if (id) {

		deleteSession(id);
		document.getElementById(id).remove();
	}
});


//----------------UPDATE TEACHER------------------------//
const updateStudent = async (id) => {
    const Salle = $('input[name="salle"]').val();
	const Heure = $('input[name="heure"]').val();
	const Date = $('input[name="date"]').val();
	const Lecon = $('#lec').val();
	
	try {
		const gl = await axios.patch(`http://localhost:5000/api/sessions/${id}`, {
            salle: Salle,
            heure: Heure,
			date: Date,
			lesson: Lecon,
			
			
		});
		//UIupdate(id, gl.data.teacher);

	} catch (err) {
		alert(err)
	}
};

const UIupdate = (id) => {
	var $row = document.getElementById(id);
    //console.log($row);
    $(".salle", $row).text($('input[name="salle"]').val());
	$(".heure", $row).text($('input[name="heure"]').val());
	$(".date", $row).text($('input[name="date"]').val());
	//$(".filiere", $row).text($('#fil').val());  $("#filiere option[value=$('#fil').val()]").text()
	$(".lecon", $row).text($("#lec option[value="+$('#lec').val()+"]").text());
}
const render=(e)=>{
	const html=`<option value="${e._id}">${e.intitule}</option>`;
	//document.getElementById('filiere').insertAdjacentHTML('beforeend',html);
	document.getElementById('lec').insertAdjacentHTML('beforeend',html);
}
const renderOptions = (branches) => {
	branches.forEach(element => {
		render(element);
	});

}
document.querySelector('tbody').addEventListener('click', (e) => {

	var id = e.target.parentNode.parentNode.parentNode.parentNode.id;
	if (id) {
		state.Id=id;
		
	}
	
});

//console.log(state.student.result);
$("#editForm").submit(function (e) {
	e.preventDefault();
	updateStudent(state.Id);
	UIupdate(state.Id);
	closeModal();
});
