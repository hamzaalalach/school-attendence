//---------------GET TEACHERS----------------------//
clearResults = () => {
  document.querySelector('tbody').innerHTML = '';
  document.querySelector('.pagination').innerHTML = '';
};

const createPagination = page => {
  const html = `
                <li class="page-item prev"  data-goto=${page - 1}><a href="#">Previous</a></li>
                
                <li class="page-item active">
                  <a href="#" class="page-link">${page}</a>
                </li>
               
                <li class="page-item next" id="next" data-goto=${page + 1}>
                  <a href="#" class="page-link">Next</a>
				</li>`;
  document.querySelector('.pagination').insertAdjacentHTML('beforeend', html);
};

const renderStudent = e => {
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
    <td class="matricule">${e.matricule}</td>
	<td class="nom">${e.nom}</td>
	<td class="prenom">${e.prenom} </td>
    <td class="filiere">${$('#filiere option[value=' + e.branch + ']').text()}</td>
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
  document.querySelector('tbody').insertAdjacentHTML('beforeend', html);
  $('.edit').click(function() {
    var $row = $(this).closest('tr');
    $('input[name="matricule"]').val($('.matricule', $row).text());
    $('input[name="nom"]').val($('.nom', $row).text());
    $('input[name="prenom"]').val($('.prenom', $row).text());

    //$('input[name="filiere"]').val($(".filiere", $row).text());
  });
};
const renderResults = (teachers, page = 1, resPerPage = 8) => {
  let start, end;
  start = (page - 1) * resPerPage;
  end = page * resPerPage;
  teachers.slice(start, end).forEach(element => renderStudent(element));

  createPagination(page);
};

class Students {
  constructor() {}
  async getResults() {
    try {
      const res = await axios.get(`http://localhost:5000/students`);
      const b = await axios.get(`http://localhost:5000/branches`);
      this.result = res.data.students;
      this.branches = b.data.branches;
      //console.log(this.result);
    } catch (err) {
      alert(err);
    }
  }
}
const renderOption = e => {
  const html = `<option value="${e._id}">${e.label}</option>`;
  document.getElementById('filiere').insertAdjacentHTML('beforeend', html);
  //document.getElementById('.filiere').insertAdjacentHTML('beforeend',html);
};
const renderSelectOptions = branches => {
  branches.forEach(element => {
    renderOption(element);
  });
};
const state = {};
const controlStudents = async () => {
  state.student = new Students();

  await state.student.getResults();
  renderSelectOptions(state.student.branches);
  //console.log(state.student.result);
  renderOptions(state.student.branches);
  renderResults(state.student.result);
};
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
  const Matricule = $('#matricule').val();
  const Nom = $('#nom').val();
  const Prenom = $('#prenom').val();
  const Filiere = $('#filiere').val();

  try {
    const gl = await axios.post(`http://localhost:5000/students`, {
      matricule: Matricule,
      nom: Nom,
      prenom: Prenom,
      branch: Filiere
    });
    renderStudent(gl.data.student);
    console.log(gl.data.student);
  } catch (err) {
    alert(err);
  }
};

const clearInputs = () => {
  $('#matricule').val('');
  $('#nom').val('');
  $('#prenom').val('');
};
const closeModal = () => {
  $('.modal').removeClass('in');
  $('.modal').removeClass('show');
  $('.modal').attr('aria-hidden', 'true');
  $('.modal').css('display', 'none');
  $('.modal-backdrop').remove();
  $('body').removeClass('modal-open');
  $('body').attr('style', '');
};
$('#addd').click(function() {
  clearInputs();
});
$('#addForm').submit(function(event) {
  event.preventDefault();

  postStudent();
  closeModal();
});

//------------------DELETE TEACHER-------------------//

const deleteStudent = async id => {
  try {
    await axios.delete(`http://localhost:5000/students/${id}`);
  } catch (err) {
    alert(err);
  }
};

document.querySelector('tbody').addEventListener('click', e => {
  var id = e.target.parentNode.parentNode.parentNode.id;
  if (id) {
    deleteStudent(id);
    document.getElementById(id).remove();
  }
});

//----------------UPDATE TEACHER------------------------//
const updateStudent = async id => {
  const Matricule = $('input[name="matricule"]').val();
  const Nom = $('input[name="nom"]').val();
  const Prenom = $('input[name="prenom"]').val();
  const Filiere = $('#fil').val();

  try {
    const gl = await axios.patch(`http://localhost:5000/students/${id}`, {
      matricule: Matricule,
      nom: Nom,
      prenom: Prenom,
      branch: Filiere
    });
    //UIupdate(id, gl.data.teacher);
  } catch (err) {
    alert(err);
  }
};

const UIupdate = id => {
  var $row = document.getElementById(id);
  //console.log($row);
  $('.matricule', $row).text($('input[name="matricule"]').val());
  $('.nom', $row).text($('input[name="nom"]').val());
  $('.prenom', $row).text($('input[name="prenom"]').val());
  //$(".filiere", $row).text($('#fil').val());  $("#filiere option[value=$('#fil').val()]").text()
  $('.filiere', $row).text($('#fil option[value=' + $('#fil').val() + ']').text());
};
const render = e => {
  const html = `<option value="${e._id}">${e.label}</option>`;
  //document.getElementById('filiere').insertAdjacentHTML('beforeend',html);
  document.getElementById('fil').insertAdjacentHTML('beforeend', html);
};
const renderOptions = branches => {
  branches.forEach(element => {
    render(element);
  });
};
document.querySelector('tbody').addEventListener('click', e => {
  var id = e.target.parentNode.parentNode.parentNode.parentNode.id;
  if (id) {
    state.Id = id;
  }
});

console.log(state.student.result);
$('#editForm').submit(function(e) {
  e.preventDefault();
  updateStudent(state.Id);
  UIupdate(state.Id);
  closeModal();
});
