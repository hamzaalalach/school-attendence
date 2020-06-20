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
    </td>
    <td class="nom">${e.nom+' '+e.prenom } </td>
    <td class="email">ziane@gmail.com</td>
    <td class="adresse">hay rahma, dakhla</td>
    <td class="telephone">065656565</td>
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
	try {
		const gl = await axios.post(`http://localhost:5000/api/teachers`, {
			nom: Nom,
			prenom: Prenom
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

const updateTeacher = async () => {
	try {
		await axios.patch(`http://localhost:5000/api/teachers/5eee085a1d8a4f2324ab93eb`,{nom:'nom',prenom:'pren'});
	} catch (err) {
		alert(err)
	}
};

