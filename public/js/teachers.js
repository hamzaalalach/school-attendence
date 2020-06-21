//---------------GET TEACHERS----------------------//

const renderTeachers = (teachers) => {
	teachers.forEach(element => {
		renderTeacher(element);
	});

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
const getTeachers = async () => {
	try {
		const gl = await axios.get(`http://localhost:5000/api/teachers`);
		renderTeachers(gl.data.teachers);
		//renderTeachers(gl.data.teachers);
	} catch (err) {
		alert(err)
	}
};
getTeachers();

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
$("#addForm").submit(function (event) {
	event.preventDefault();
	postTeacher();
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
		UIupdate(id, gl.data.teacher);

	} catch (err) {
		alert(err)
	}
};

const UIupdate = (id) => {
	var $row = document.getElementById(id);
	console.log($row);
	$(".nom", $row).text($('input[name="nom"]').val());
	$(".prenom", $row).text($('input[name="prenom"]').val());
	$(".email", $row).text($('input[name="email"]').val());
	$(".adresse", $row).text($('input[name="adresse"]').val());
	$(".telephone", $row).text($('input[name="telephone"]').val());
}
document.querySelector('tbody').addEventListener('click', (e) => {
	
	var id = e.target.parentNode.parentNode.parentNode.parentNode.id;
	if (id) {
		
		$("#editForm").submit(function () {
			
			UIupdate(id);
			
			updateTeacher(id);
			

		})
	}
});

