class Option {
    constructor() {}
    async getResults() {
        try {
            const res = await axios.get(`http://localhost:5000/api/sessions`);
            const st = await axios.get(`http://localhost:5000/api/students`);
            const b = await axios.get(`http://localhost:5000/api/branches`);
            const c = await axios.get(`http://localhost:5000/api/lessons`);
            //const p= await axios.get(`http://localhost:5000/api/presences/${$('#session').val()}`);

            this.result = res.data.sessions;
            this.students = st.data.students;
            this.branches = b.data.branches;
            this.lessons = c.data.lessons;
            //this.presences = p.data.presences;

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
    state.search = new Option();


    await state.search.getResults();
    renderSelectOptions(state.search.branches);
    renderSelect(state.search.lessons);
    renderSessionOptions(state.search.result);
    //console.log(state.search.presences);


}
controlBranches();

//-----------------------------------------------------//


const postPresneces = (students, id) => {
    students.forEach((element) => {
        if (element.branch == id) {
            postPresence(element, false);
        }
    });

}

const postPresence = async (e, etat) => {
    const ssId = $('#session').val();


    try {
        const gl = await axios.post(`http://localhost:5000/api/presences`, {
            studentId: e._id,
            sessionId: ssId,
            present: etat,


        });
        //state.IDID=gl.data.presence._id;
        //renderStudent(gl.data.student);
        //return gl.data.presence;

    } catch (err) {
        //console.log(err)
    }
};
const closeModal=()=>{
	$('.modal').removeClass('in');
	$('.modal').removeClass('show');
	$('.modal').attr('aria-hidden','true');
	$('.modal').css('display','none');
	$('.modal-backdrop').remove();
	$('body').removeClass('modal-open');
	$('body').attr('style','');
}
$("#addForm").submit(async (event)=> {
    event.preventDefault();
    document.querySelector('.coordonner').innerHTML='';
    document.querySelector('thead').innerHTML='';
    document.querySelector('tbody').innerHTML='';
    //console.log($('#session').val());

    var id = $('#filiere').val();
    postPresneces(state.search.students, id);
    const b=await controlPresences();
    //renderStudents(b);
    console.log(b);
    closeModal();
    
    


});


class Presence {
    constructor(id) {
        this.id = id;
    }
    async getResults() {
        try {

            const p = await axios.get(`http://localhost:5000/api/presences/${this.id}`);

            this.presences = p.data.presences;

            console.log(this.presneces);

        } catch (err) {
            console.log(err)
        }
    }

};
const state1 = {};
const controlPresences = async () => {
    state1.search = new Presence($('#session').val());

    await state1.search.getResults();
   
    //renderStudents(state1.search.presences);
    return state1.search.presences;
    

}
const check=(e)=>{
    if(e.present){
        return 'checked'
    }else ''
}
const renderStudent = (m, n, e) => {
    const html2 = `<tr id="${e._id}">
	<td></td>
    <td class="matricule">${m}</td>
	<td class="nom">${n}</td>
	<td>
      <span class="custom-checkbox">
        <input
          type="checkbox"
          id="${e._id}"
          name="options[]"
          value="1"
          ${check(e)}
        />
        <label for="${e._id}"></label>
	  </span>
    </td>
  </tr>`;

    document.querySelector('tbody').insertAdjacentHTML("beforeend", html2);


};
const renderStudents = (presences) => {
    const txt = $("#session option:selected").text().split('|');
    const tx = $("#cours option:selected").text();
    const html1 = `<h4>Filiere: <strong>${$('#filiere option:selected').text()}</strong></h4>
    <h4>Cours: <strong>${tx}</strong></h4>
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
    presences.forEach(element => findStudent(state.search.students, element));
}
const findStudent = (students, e) => {

    students.forEach(element => {

        if (element._id == e.studentId && element.branch == $('#filiere').val()) {
            const a = element.nom + ' ' + element.prenom;
            //a=element.nom+' '+element.prenom;
            //a=element.matricule;
            renderStudent(element.matricule, a, e);

        }

    });




}

/*const renderStudent = (s,e) => {
	const html2 = `<tr id="${e._id}">
	<td></td>
    <td class="matricule">${findStudent(s,e.studentId)}</td>
	<td class="nom">${findStudent(s,e.studentId)}</td>
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
const renderStudents=(presences)=>{
    presences.forEach(element => renderStudent(state.search.students,element));
}
const findStudent=(students,id)=>{

    students.forEach(element => {
        
        if(element._id===id){
            return element;
            
        }
        
        
    });
    
    
   

}*/

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
document.querySelector('tbody').addEventListener('click', (e) => {

    var id = e.target.id;
    
	if (id) {
        if (e.target.checked) {
            patchPresence(id, true);
    
        } else {
            patchPresence(id, false);
        }
		
	}
	
});
