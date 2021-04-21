const $ = (elem) => {
    return document.querySelector(elem);
};

// CREATE AN ARRAY OF EMPLOYEES
let employees;

window.addEventListener('load', () => {
    // CHECK TO SEE IF STORAGE OBJECT EXISTS WHEN THE PAGE LOADS
    // IF DOES, RETURN STORAGE OBJECT INTO ARRAY INSTEAD OF POPULATED ARRAY
    if (localStorage.getItem('storedEmp')) {
        employees = JSON.parse(localStorage.getItem('storedEmp'));
    } else {
        employees = [
            [93208129, 'Abel Aardvaark', 2910, 'abel@abc.com', 'Administrative'],
            [39203813, 'Beatrice Brown', 4820, 'beatrice@abc.com', 'Marketing'],
            [38195582, 'Charlie Check', 3014, 'charlie@abc.com', 'Executive'],
            [83202148, 'Deidre Down', 4820, 'deidre@abc.com', 'Engineering'],
            [20482720, 'Enel Every', 5529, 'enel@abc.com', 'Quality Assurance']
            ];
        console.log(employees);
    }


    // GET DOM ELEMENTS

    let empTable = $('#employees');
    let form = $('#addForm');

    let empCount = employees.length;



    // ADD EMPLOYEE

    form.addEventListener('submit', (e) => {
        // PREVENT FORM SUBMISSION
        e.preventDefault();
        // GET THE VALUES FROM THE TEXT BOXES
        let id = Number($("#id").value); 
        let name = $("#name").value; 
        let extension = Number($("#extension").value); 
        let email = $("#email").value; 
        let department = $("#department").value; 

        // ADD THE NEW EMPLOYEE TO A NEW ARRAY OBJECT
        let newEmp = [id, name, extension, email, department];
        console.log(newEmp);

        // PUSH THE NEW ARRAY TO THE *EXISTING* EMPLOYEES ARRAY
        employees.push(newEmp);
        console.log(employees);

        // BUILD THE GRID
        buildGrid();

        // RESET THE FORM
        form.reset();

        // SET FOCUS BACK TO THE ID TEXT BOX
        $("#id").focus();
    });


    // DELETE EMPLOYEE
    empTable.addEventListener('click', (e) => {
        if (e.target.tagName.toLowerCase() === 'button') {  // Only triggers if the user clicks on button
            console.log(e.target.parentElement.childNodes[1]);
        // CONFIRM THE DELETE
            if(confirm(`Are you sure you want to delete ${e.target.parentElement.children[1].innerText}?`)) { //can also use e.target.parentElement.childNodes[1].innerText instead
                // console.log(e.target.parentElement.parentElement);
                // console.log(e.target.parentElement.parentElement.removeChild(e.target.parentElement));

            // GET THE SELECTED ROWINDEX FOR THE TR (PARENTNODE.PARENTNODE)
                let rowNum = e.target.parentElement.rowIndex;

            // [NOT NEEDED] CALL DELETEROW() METHOD TO DELETE SPECIFIC ROW IN THE TABLE

            // REMOVE EMPLOYEE FROM ARRAY
                employees.splice(rowNum - 1, 1);
                console.log(employees);
            // BUILD THE GRID
                buildGrid();
            }

        }


    });

    // BUILD THE EMPLOYEES GRID
    function buildGrid() {
        let bodyTag = $("tbody"); 

        // REMOVE THE EXISTING SET OF ROWS BY REMOVING THE ENTIRE TBODY SECTION
        bodyTag.innerHTML = '';

        // REBUILD THE TBODY FROM SCRATCH


        // LOOP THROUGH THE ARRAY OF EMPLOYEES
        for (let employee of employees) {
            let row = document.createElement("TR");
            for (let i = 0; i < employee.length; i++) {
                let txtNode = document.createTextNode(employee[i]);
                let cell = document.createElement("TD");
                row.appendChild(cell);
                cell.appendChild(txtNode);
                // row.appendChild(document.createElement("TD").appendChild(document.createTextNode(employee[i])));     // ?? Why does this approach not work? It doesn't seem to create a <td> element properly. However, it works when I first append the TD element to TR, THEN add a text node to the TD element. I wonder if it has to do with the unique structure of a table and how it needs to be structured first before elements are added, unlike independent elements.
            }
            let delCell = document.createElement("BUTTON");
            delCell.setAttribute("class", "btn btn-danger btn-sm");
            delCell.appendChild(document.createTextNode("X"));
            row.appendChild(delCell);
            bodyTag.appendChild(row);
        }


        // REBUILDING THE ROW STRUCTURE


        // BIND THE TBODY TO THE EMPLOYEE TABLE

        // UPDATE EMPLOYEE COUNT
        empCount = employees.length;
        $('#empCount').innerHTML = `(${empCount})`;

        // STORE THE ARRAY IN STORAGE
        localStorage.setItem('storedEmp', JSON.stringify(employees));

    };


    // BUILD THE EMPLOYEES TABLE WHEN THE PAGE LOADS

    buildGrid();



});