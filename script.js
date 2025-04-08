// document.getElementById("registrationForm").addEventListener("submit", function(event) {
//     event.preventDefault();
//     let isValid = true;
    
//     const name = document.getElementById("fullName").value.trim();
//     const email = document.getElementById("email").value.trim(); 
//     const password = document.getElementById("password").value;
//     const confirmPassword = document.getElementById("confirmPassword").value;
//     const phone = document.getElementById("phone").value.trim();
//     const country = document.getElementById("country").value;
//     const terms = document.getElementById("terms").checked;
    
//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    
//     document.getElementById("nameError").innerText = name ? "" : "Full Name is required";
//     document.getElementById("emailError").innerText = email.includes("@") ? "" : "Invalid Email";
//     document.getElementById("passwordError").innerText = passwordRegex.test(password) ? "" : "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
//     document.getElementById("confirmPasswordError").innerText = password === confirmPassword ? "" : "Passwords do not match";
//     document.getElementById("phoneError").innerText = phone.match(/^\d{10}$/) ? "" : "Enter a valid 10-digit phone number";
//     document.getElementById("countryError").innerText = country ? "" : "Please select a country";
//     document.getElementById("termsError").innerText = terms ? "" : "You must agree to the terms";
    
//     isValid = name && email.includes("@") && passwordRegex.test(password) && password === confirmPassword && phone.match(/^\d{10}$/) && country && terms;
    
//     if (isValid) {
//         document.getElementById("successMessage").innerText = "Registration Successful!";
//         localStorage.setItem("userData", JSON.stringify({ name, email, phone, country }));
//     }

//     console.log(usersData)
//     let users = JSON.parse(localStorage.getItem("usersData")) || [];
//     let editIndex = null;

//     function saveToLocalStorage() {
//         localStorage.setItem("users", JSON.stringify(users));
//     }

//     function renderTable() {
//         tableBody.innerHTML = "";
//         users.forEach((user, index) => {
//             const row = document.createElement("tr");
//             row.innerHTML = `
//                 <td>${users.name}</td>
//                 <td>${users.email}</td>
//                 <td>${users.phone}</td>
//                 <td>${users.country}</td>
//                 <td>
//                     <button class="edit" onclick="editUser(${index})">Edit</button>
//                     <button class="delete" onclick="deleteUser(${index})">Delete</button>
//                 </td>
//             `;
//             tableBody.appendChild(row);
//         });
//     }

//     function addUser(name, email, age) {
//         users.push({ name, email, age });
//         saveToLocalStorage();
//         renderTable();
//     }

//     function editUser(index) {
//         const user = users[index];
//         nameInput.value = user.name;
//         emailInput.value = user.email;
//         ageInput.value = user.age;
//         editIndex = index;
//     }

//     function updateUser(index, name, email, age) {
//         users[index] = { name, email, age };
//         saveToLocalStorage();
//         renderTable();
//     }

//     function deleteUser(index) {
//         if (confirm("Are you sure you want to delete this user?")) {
//             users.splice(index, 1);
//             saveToLocalStorage();
//             renderTable();
//         }
//     }

//     // form.addEventListener("submit", (event) => {
//     //     event.preventDefault();

//     //     const name = nameInput.value.trim();
//     //     const email = emailInput.value.trim();
//     //     const age = ageInput.value.trim();

//     //     if (name === "" || email === "" || age === "") {
//     //         alert("All fields are required!");
//     //         return;
//     //     }

//     //     if (editIndex !== null) {
//     //         updateUser(editIndex, name, email, age);
//     //         editIndex = null;
//     //     } else {
//     //         addUser(name, email, age);
//     //     }

//     //     form.reset();
//     // });

//     renderTable();
//     window.editUser = editUser;
//     window.deleteUser = deleteUser;
// });

let editIndex = null;

document.getElementById("registrationForm").addEventListener("submit", function (event) {
    event.preventDefault();
    let isValid = true;

    const name = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const phone = document.getElementById("phone").value.trim();
    const country = document.getElementById("country").value;
    const terms = document.getElementById("terms").checked;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    document.getElementById("nameError").innerText = name ? "" : "Full Name is required";
    document.getElementById("emailError").innerText = email.includes("@") ? "" : "Invalid Email";
    document.getElementById("passwordError").innerText = passwordRegex.test(password) ? "" : "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
    document.getElementById("confirmPasswordError").innerText = password === confirmPassword ? "" : "Passwords do not match";
    document.getElementById("phoneError").innerText = phone.match(/^\d{10}$/) ? "" : "Enter a valid 10-digit phone number";
    document.getElementById("countryError").innerText = country ? "" : "Please select a country";
    document.getElementById("termsError").innerText = terms ? "" : "You must agree to the terms";

    isValid = name && email.includes("@") && passwordRegex.test(password) && password === confirmPassword && phone.match(/^\d{10}$/) && country && terms;

    

    if (isValid) {
        document.getElementById("successMessage").innerText = "Registration Successful!";
        let users = JSON.parse(localStorage.getItem("users")) || [];
        if (editIndex === null) {
            users.push({name, email, phone, country});
        } else {
            users[editIndex] = {name, email, phone, country};
            editIndex = null;
        }
        localStorage.setItem("users", JSON.stringify(users));
        renderTable();
    }
});

const tableBody = document.getElementById("dataTable").querySelector("tbody");
document.getElementById("registrationForm").reset();
document.getElementById("successMessage").innerText = "";



function renderTable() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    tableBody.innerHTML = "";
    
    users.forEach((user, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>${user.country}</td>
            <td>
                <button class="edit" onclick="editUser(${index})">Edit</button>
                <button class="delete" onclick="deleteUser(${index})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function editUser(index) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users[index];

    document.getElementById("fullName").value = user.name;
    document.getElementById("email").value = user.email;
    document.getElementById("phone").value = user.phone;
    document.getElementById("country").value = user.country;
    editIndex = index;
}

function deleteUser(index) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (confirm("Are you sure you want to delete this user?")) {
        users.splice(index, 1);
        localStorage.setItem("users", JSON.stringify(users));
        renderTable();
    }
}

renderTable();
window.editUser = editUser;
window.deleteUser = deleteUser;
