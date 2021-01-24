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
const renderBranche = e => {
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
	<td class="filiere">${e.label}</td>
    <td class="coordonnateur">${e.coordonnateur}</td>
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

    $('input[name="filiere"]').val($('.filiere', $row).text());
    $('input[name="coordonnateur"]').val($('.coordonnateur', $row).text());
  });
};
const renderResults = (branches, page = 1, resPerPage = 8) => {
  let start, end;
  start = (page - 1) * resPerPage;
  end = page * resPerPage;
  branches.slice(start, end).forEach(element => renderBranche(element));

  createPagination(page);
};

class Branches {
  constructor() {}
  async getResults() {
    try {
      const res = await axios.get(`http://localhost:5000/branches`);
      this.result = res.data.branches;
    } catch (err) {
      alert(err);
    }
  }
}
const state = {};
const controlBranches = async () => {
  state.search = new Branches();

  await state.search.getResults();

  renderResults(state.search.result);
};
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

const postBranche = async () => {
  const Nom = $('#filiere').val();
  const Prenom = $('#coordonnateur').val();
  try {
    const gl = await axios.post(`http://localhost:5000/branches`, {
      label: Nom,
      coordonnateur: Prenom
    });
    renderBranche(gl.data.branch);
  } catch (err) {
    alert(err);
  }
};
const clearInputs = () => {
  $('#filiere').val('');
  $('#coordonnateur').val('');
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
  postBranche();
  closeModal();
});

//------------------DELETE TEACHER-------------------//

const deleteTeacher = async id => {
  try {
    await axios.delete(`http://localhost:5000/branches/${id}`);
  } catch (err) {
    alert(err);
  }
};

document.querySelector('tbody').addEventListener('click', e => {
  var id = e.target.parentNode.parentNode.parentNode.id;
  if (id) {
    deleteTeacher(id);
    document.getElementById(id).remove();
  }
});

//----------------UPDATE TEACHER------------------------//
const updateFiliere = async id => {
  const Filiere = $('input[name="filiere"]').val();
  const Coordonateur = $('input[name="coordonnateur"]').val();

  try {
    const gl = await axios.patch(`http://localhost:5000/branches/${id}`, {
      label: Filiere,
      coordonnateur: Coordonateur
    });
  } catch (err) {
    alert(err);
  }
};

const UIupdate = id => {
  var $row = document.getElementById(id);
  console.log($row);
  $('.filiere', $row).text($('input[name="filiere"]').val());
  $('.coordonnateur', $row).text($('input[name="coordonnateur"]').val());
};
document.querySelector('tbody').addEventListener('click', e => {
  var id = e.target.parentNode.parentNode.parentNode.parentNode.id;
  if (id) {
    state.Id = id;
  }
});

$('#editForm').submit(function(event) {
  event.preventDefault();
  UIupdate(state.Id);

  updateFiliere(state.Id);
  closeModal();
});
