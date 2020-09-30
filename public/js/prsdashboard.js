//var Chart = require('chart.js');
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
            state.sess = [];
            var el = $(this);
            s.forEach(element => {
                if (element.lesson == el.val()) {
                    //document.getElementById('session').insertAdjacentHTML('beforeend', `<option value="${element._id}">${element.date.substr(0,10) +' | '+element.heure+' | '+element.salle}</option>`)
                    state.sess.push(element._id);
                }
            });


        });

    });

};


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

//----------------------------------------------------------------//




const fetchData = () => {
    const urls = state.sess;

    let promises = [];

    for (let url in urls) {
        let promise = fetch(`http://localhost:5000/api/presences/${urls[url]}`)
            .then(res => res.json())
            .then(data => data.presences);
        promises.push(promise);
    }

    return Promise.all(promises);

};

const renderStudent = (m, n, e) => {
    const html2 = `<tr id="${e.id}">
	<td></td>
    <td class="matricule">${m}</td>
	<td class="nom">${n}</td>
	<td style="text-align: center;">${e.i}</td>
  </tr>`;

    document.querySelector('tbody').insertAdjacentHTML("beforeend", html2);


};
const renderHead = () => {
    const txt = $("#cours option:selected").text();
    const html1 = `<h4>Filiere: <strong>${$('#filiere option:selected').text()}</strong></h4>
	<h4>Cours: <strong>${txt}</strong></h4>
	<h4>Nombre de séances: <strong>${state.sess.length}</strong></h4>

	<br>
	<br>`;
    const html = `
    <br>
	<br>
    <tr>
	<th> </th>
	<th >Matricule</th>
	<th >Nom et prénom</th>
	<th style="text-align: center;">Total Absences</th>
    </tr>`
    const ht = `
    <div class="col-md-12">
    <div class="chart_title">Absences par Cours</div>
    <div class="chart_container">
      <canvas id="myChart"></canvas>
    </div>
    </div>
    
    
    
	

  `;
    document.querySelector('.coordonner').insertAdjacentHTML("beforeend", html1);
    //document.querySelector('.charts').insertAdjacentHTML("beforeend", ht);
    document.querySelector('thead').insertAdjacentHTML("beforeend", html);
    //barChart();
}
const renderStudents = (presences) => {
    presences.forEach(element => findStudent(state.search.students, element));
}
const t = [];
const findStudent = (students, e) => {


    students.forEach(element => {

        if (element._id == e.id && element.branch == $('#filiere').val()) {
            const a = element.nom + ' ' + element.prenom;
            //a=element.nom+' '+element.prenom;
            //a=element.matricule;
            i = e.i;
            t.push({
                a,
                i
            })

            renderStudent(element.matricule, a, e);

        }

    });




}
/*
const renderStudent = (e) => {
    const html2 = `<tr id="${e.id}">
	<td></td>
    <td class="matricule">${e.id}</td>
	<td class="nom">''</td>
	<td>${e.i}</td>
  </tr>`;

    document.querySelector('tbody').insertAdjacentHTML("beforeend", html2);


};
const renderStudents=(e)=>{
    e.forEach(el=>renderStudent(el));
}*/
const closeModal = () => {
    $('.modal').removeClass('in');
    $('.modal').removeClass('show');
    $('.modal').attr('aria-hidden', 'true');
    $('.modal').css('display', 'none');
    $('.modal-backdrop').remove();
    $('body').removeClass('modal-open');
    $('body').attr('style', '');
}
const stt = {};
$("#addForm").submit(async (event) => {
    event.preventDefault();
    //console.log(state.sess);
    document.querySelector('.coordonner').innerHTML = '';
    document.querySelector('thead').innerHTML = '';
    document.querySelector('tbody').innerHTML = '';
    //document.getElementById('myChart').innerHTML = '';
    document.querySelector('.charts').innerHTML = '';
    document.querySelector('.title').style.display = 'block';

    stt.m = await fetchData();
    stt.t = await t;

    var merged = [].concat.apply([], stt.m);
    //var merge = [].concat.apply([], stt.t);

    //console.log(stt.t);
    var a = calc(merged);
    a = a.filter((thing, index, self) =>
        index === self.findIndex((t) => (
            t.id === thing.id && t.i === thing.i
        ))
    )
    console.log(a);
    renderHead();

    renderStudents(a);

    colcell(state.sess.length);
    //document.getElementById('myChart').innerHTML = '';
    //barChart(stt.t);
    closeModal();



});



const calc = (tab) => {
    let s = [];
    tab.forEach(el => {
        let i = 0;
        tab.forEach(e => {

            if (el.studentId == e.studentId && e.present == false) {
                i++;
            }
        })

        let id = el.studentId;

        s.push({
            id,
            i
        });
        //if(!s.includes(`${{id,i}}`)){




    })
    return s;
}



const colcell = (n) => {
    let arrayLignes = document.querySelector("tbody").rows;

    let longueur = arrayLignes.length;
    let i = 0;
    //let n = state.sess;
    while (i < longueur) {

        if (arrayLignes[i].cells[3].textContent == n) {
            arrayLignes[i].cells[3].style.backgroundColor = 'rgb(255, 32, 32)';
            arrayLignes[i].cells[3].style.color = "#fff";

        }
        if (arrayLignes[i].cells[3].textContent == '0') {
            arrayLignes[i].cells[3].style.backgroundColor = '#53FEA0';
        }
        if (arrayLignes[i].cells[3].textContent > '0' && arrayLignes[i].cells[3].textContent < n / 2) {
            arrayLignes[i].cells[3].style.backgroundColor = '#E9FF63'
        }
        if (arrayLignes[i].cells[3].textContent == n / 2) {
            arrayLignes[i].cells[3].style.backgroundColor = '#FFEEAA'
        }
        if (arrayLignes[i].cells[3].textContent > n / 2 && arrayLignes[i].cells[3].textContent < n) {
            arrayLignes[i].cells[3].style.backgroundColor = '#FF8463'
        }
        i++;

    };
}
const barChart = (Data) => {
    let myChart = document.getElementById('myChart').getContext('2d');
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 18;
    Chart.defaults.global.defaultFontColor = '#777';

    let data = {

        labels: objTotab(Data, 'value', 'a'),
        //labels: ['ZIANE', 'HAMZA', 'AYOUB'

        datasets: [

            {
                backgroundColor: "#FF0000",
                //borderColor: "rgba(41, 61, 90, 0.99)",
                //borderWidth: 2,
                //hoverBackgroundColor: "#6C63FF",
                //hoverBorderColor: "rgba(255,99,132,1)",
                fill: false,
                label: 'Absences par Cours',



                data: objTotab(Data, 'value', 'i'),


            }


        ]
    };

    let options = {

        cutoutPercentage: 65,
        maintainAspectRatio: false,
        legend: {
            display: true,
            position: 'top',
            align: 'center',
            labels: {
                fontColor: '#000',
                boxWidth: 30,
                fontSize: 15
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                    stepSize: 1,
                    min: 0
                }
            }],
            xAxes: [{
                ticks: {
                    display: false
                }
            }]
        }
        
            
        

    };
    let massPopChart = new Chart(myChart, {
        type: 'bar',
        options: options,
        data: data
    });

}
const objTotab = (data, type, ty) => {
    let k, x, i;
    x = [];
    if (type == 'key') {
        k = Object.keys(data);
    } else {
        k = tabTotab(Object.values(data), ty);

    }
    return k;
};

const tabTotab = (data, type) => {
    return data.map(function (current) {
        return current[type]
    });

}