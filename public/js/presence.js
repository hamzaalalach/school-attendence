const renderStudent = (e) => {
	postPresence(e._id,$('#session').val(),false);
	const html2 = `<tr id="${a._id}">
	<td></td>
    <td class="matricule">${e.matricule}</td>
	<td class="nom">${e.nom+' '+e.prenom}</td>
	<td>
      <span class="custom-checkbox">
        <input
          type="checkbox"
          id="${e._id}"
          name="options[]"
          value="1"
        />
        <label for="${e._id}"></label>
	  </span>
    </td>
  </tr>`;
  
	document.querySelector('tbody').insertAdjacentHTML("beforeend", html2);
	

};
/*const compare=(presences,id)=>{
	const ID;
	presences.forEach(element => {
		if (element.studentId == id) {
			ID=element._id;
		}
		else{
			ID='';
		}
		return ID;
	});

}*/
const renderStudentsByBranche = (students, id) => {
	const txt = $("#session option:selected").text().split('|');
	const html1 = `<h4>Filiere: <strong>${$('#filiere option:selected').text()}</strong></h4>
	<h4>Date: <strong>${txt[0]}</strong></h4>
	<h4>Heure: <strong>${txt[1]}</strong></h4>
	<h4>Salle: <strong>${txt[2]}</strong></h4>
	<br>
	<br>`;
	const html = `<tr>
	<th> </th>
	<th >Matricule</th>
	<th >Nom et prénom</th>
	<th ></th>
	
	
  </tr>`
	document.querySelector('.coordonner').insertAdjacentHTML("beforeend", html1);
	document.querySelector('thead').insertAdjacentHTML("beforeend", html);
	students.forEach(element => {
		if (element.branch == id) {
			renderStudent(element);
		}
	});

}
class Presence {
	constructor() {}
	async getResults() {
		try {
			const res = await axios.get(`http://localhost:5000/api/sessions`);
			const st = await axios.get(`http://localhost:5000/api/students`);
			const b = await axios.get(`http://localhost:5000/api/branches`);
			const c = await axios.get(`http://localhost:5000/api/lessons`);
			
			this.result = res.data.sessions;
			this.students = st.data.students;
			this.branches = b.data.branches;
			this.lessons = c.data.lessons;
			
			//console.log(this.presneces);

		} catch (err) {
			alert(err)
		}
	}

};

const renderBrancheOption = (e) => {
	const html = `<option value="${e._id}">${e.label}</option>`;
	document.getElementById('filiere').insertAdjacentHTML('beforeend', html);
	//document.getElementById('.filiere').insertAdjacentHTML('beforeend',html);
}
const renderCoursOption = (e) => {
	const html = `<option value="${e._id}">${e.intitule}</option>`;
	document.getElementById('cours').insertAdjacentHTML('beforeend', html);
	//document.getElementById('.filiere').insertAdjacentHTML('beforeend',html);
}
const renderSelectOptions = (teachers) => {
	teachers.forEach(element => {
		renderBrancheOption(element);
	});

}
const renderSelect = (teachers) => {
	teachers.forEach(element => {
		renderCoursOption(element);
	});

}
const renderSessionOptions = (s) => {
	$(document).ready(function () {

		$("#cours").change(function () {
			document.getElementById('session').innerHTML = '';
			document.getElementById('session').insertAdjacentHTML('beforeend', `<option value="" disabled selected>Date | Heure | Salle</option>`);
			var el = $(this);
			s.forEach(element => {
				if (element.lesson == el.val()) {
					document.getElementById('session').insertAdjacentHTML('beforeend', `<option value="${element._id}">${element.date.substr(0,10) +' | '+element.heure+' | '+element.salle}</option>`)
				}
			});


		});

	});

}


const state = {};
const controlBranches = async () => {
	state.search = new Presence();


	await state.search.getResults();
	renderSelectOptions(state.search.branches);
	renderSelect(state.search.lessons);
	renderSessionOptions(state.search.result);
	//console.log(state.search.presences);


}
controlBranches();
$("#addForm").submit(function (event) {

	event.preventDefault();
	
	var id = $('#filiere').val();
	var ID = $('#session').val();
	//console.log(ID);
	state.ID = ID;
	renderStudentsByBranche(state.search.students, id);
	


});

//--------------------POST------------------//

const postPresence = async (stId,ssId,etat) => {



	try {
		const gl = await axios.post(`http://localhost:5000/api/presences`, {
			studentId: stId,
			sessionId: ssId,
			present: etat,


		});
		state.IDID=gl.data.presence._id;
		//renderStudent(gl.data.student);
		//return gl.data.presence;
		
	} catch (err) {
		alert(err)
	}
};
//postPresence();
const patchPresence = async (id,etat) => {



	try {
		const gl = await axios.patch(`http://localhost:5000/api/presences/${id}`, {
			
			present: etat,


		});
		//renderStudent(gl.data.student);
		//return gl.data.presence;
		
	} catch (err) {
		alert(err)
	}
};
