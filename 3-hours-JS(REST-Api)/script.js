const CRUD_API_KEY = 'https://crudcrud.com/api/4a6de8a563a14989af87b476c78f4fa3/students';

const myForm = document.querySelector('#myForm');
const msg = document.querySelector('#msg');
const studentName = document.querySelector('#name');
const studentPhone = document.querySelector('#phone');
const studentAddress = document.querySelector('#address');
const studentCount = document.querySelector('#studentCount');
const btn = document.querySelector('#btn');


function addStudent(student) {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center my-2";
    li.appendChild(document.createTextNode(`${student.name} - ${student.phone} - ${student.address}`));


    var deleteBtn = document.createElement('button');
    deleteBtn.className = "btn btn-sm btn-danger mx-1";
    deleteBtn.appendChild(document.createTextNode('Delete'));
    li.appendChild(deleteBtn);

    document.querySelector('#studentList').appendChild(li);

    deleteBtn.addEventListener('click', (e) => {
        var studentCrudAPI = CRUD_API_KEY + `/${student._id}`;

        axios
            .delete(studentCrudAPI)
            .then()
            .catch((error) => {
                console.log(error);
            })

        li.remove();
    })
}


window.addEventListener("DOMContentLoaded", () => {
    axios
        .get(CRUD_API_KEY)
        .then((response) => {
            for (var i = 0; i < response.data.length; i++) {
                addStudent(response.data[i]);
            }
            studentCount.innerHTML = 'All Students : ' + response.data.length;
        })
        .catch((error) => {
            console.log(error);
        })
})

btn.addEventListener('click', (e) => {
    e.preventDefault();

    if (studentName.value === '' || studentPhone.value === '' || studentAddress.value === '') {
        msg.innerHTML = '*Please enter all fields';

    } else {

        let student = {
            name: studentName.value,
            phone: studentPhone.value,
            address: studentAddress.value
        };

        axios
            .post(CRUD_API_KEY, student)
            .then((response) => {
                addStudent(response.data)
                studentName.value = '';
                studentPhone.value = '';
                studentAddress.value = '';
                msg.innerHTML = "";
            })
            .catch((err) => {
                msg.innerHTML = "*something wrong with the API server";
            })
    }
});