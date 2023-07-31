// DOM ELEMENTS
let logOutBtn = document.getElementById('logOut-btn');
let nameInput = document.getElementById('logOut-btn');
let lastNameInput = document.getElementById('logOut-btn');
let ageInput = document.getElementById('logOut-btn');


// LOGOUT FUNCTION
logOutBtn.addEventListener('click', () =>{
    window.location.href = 'index.html';
});

 //STUDENT CLASS
 class Students{
    constructor(firstName, lastName, age, classes) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.classes = classes;
        
    }
 }

 // STUDENT LIST ARRAY 
 class AlumnList {
    constructor() {
        this.list = [];
    }
    // This method allows you to push students into de alumn list
    add(alumn){
        this.list.push(alumn);
    }
    // search for any student = to the name given
    search(name,lastName){
        let auxList = this.list;
        let studentFound = null;
        for (let i = 0; i < auxList.length; i++) {
            if (name === auxList[i].firstName || lastName === auxList[i].lastName) {
                studentFound = auxList[i];
                break;
            }        
        }
        return studentFound;
    }
 }

 // Access DOM form
const studentList = new AlumnList();

function addStudents() {
    let studentName = document.getElementById("student-name").value;
    let studentLastName =document.getElementById("student-last-name").value;
    let studentAge =document.getElementById("student-age").value;
    let itemForm = document.getElementById('checkbox-form');
    let classes = document.querySelectorAll('input[type="checkbox"]') 
    let resultClasses = []
    classes.forEach(item => {
        if (item.checked) {
            let studentClasses = {
                class: item.value,
                selected: item.checked
            } 
            resultClasses.push(studentClasses)
        }    
    });
    
   
    const alumni = new Students(studentName, studentLastName, studentAge, resultClasses);
    studentList.add(alumni);

    cleanForm();
    refreshTable();
    refreshList();
};

let submitBtn = document.getElementById('add-btn');
let cleanBtn = document.getElementById('clean-btn');

submitBtn.addEventListener('click', addStudents);
cleanBtn.addEventListener('click', addStudents)

function cleanForm() {
    studentName = "";
    studentLastName = "";
    studentAge = "";
}

// Create table from students added
function refreshTable() {
    let tableBody = document.getElementById("table-body");
    tableBody.innerHTML = "";
    console.log(studentList);
    for (let i = 0; i < studentList.list.length; i++) {
        const scholar = studentList.list[i];

        let row = document.createElement('tr');

    // Basic student info
        let columnName = document.createElement('td');
        columnName.textContent = scholar.firstName;
        row.appendChild(columnName);

        let columnLastName = document.createElement('td');
        columnLastName.textContent = scholar.lastName;
        row.appendChild(columnLastName);

        let ageColumn = document.createElement('td');
        ageColumn.textContent = scholar.age;
        row.appendChild(ageColumn);

        let columnClasses = document.createElement("td");
        row.appendChild(columnClasses);

        let columnGrade = document.createElement("td");
        row.appendChild(columnGrade);


    // All classes the student is taking    
        scholar.classes.map((subject) =>{
            
            let subjectElement = document.createElement('p');
            subjectElement.textContent = subject.class;
            columnClasses.appendChild(subjectElement);
        })

    // All grades assigned for each class
        scholar.classes.map((grade)=>{
            let gradeElement = document.createElement('p');
            gradeElement.textContent = grade.grade;
            columnGrade.appendChild(gradeElement)
        })
       tableBody.append(row);
    }
}




var jhonStu = new Students("Jhon", "Montaño", 21, [{class: 'Inglés'},{class: 'Diseño v'},{class: 'Español'}]);
studentList.add(jhonStu);

refreshTable()

// Search student and Show on HTML

function searchStudent() {
    let input = document.getElementById('search-stu');
    let showStudent = document.getElementById('show-stu');

    let studentName = input.value;
    let studentFound = studentList.search(studentName);
    console.log(studentName);

    if (studentFound) {
        showStudent.textContent = studentFound.firstName + studentFound.lastName + ' Age: ' + studentFound.age + ' classes: ' + studentFound.classes;
    } else{
        showStudent.textContent = 'Student missing'
        input = ''
    }
}

let searchBtn = document.getElementById('seach-btn')
searchBtn.addEventListener('click', searchStudent);