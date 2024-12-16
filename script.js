const listContainer = document.getElementById("container-list");
const warning = document.getElementById("duplicate-warning");
let studentCount = 0;
let studentNames = []; // To keep track of student names for duplication check

function calculateResult() {
    const html = parseInt(document.getElementById("html").value);
    const css = parseInt(document.getElementById("css").value);
    const bootstrap = parseInt(document.getElementById("bootstrap").value);
    const javascript = parseInt(document.getElementById("javascript").value);
    const react = parseInt(document.getElementById("react").value);
    const name = document.getElementById("name").value.trim();

    // Check for duplicate name
    if (studentNames.includes(name)) {
        warning.innerText = "This student name already exists!";
        return;
    }

    // Validation for name
    if (!name || !/^[a-zA-Z ]+$/.test(name)) {
        alert("Please enter a valid name (letters only).");
        return;
    }

    // Validation for marks
    const marks = [html, css, bootstrap, javascript, react];
    if (marks.some(mark => isNaN(mark) || mark < 0 || mark > 100)) {
        alert("Please enter valid marks (0-100) for all subjects.");
        return;
    }

    const totalMarks = html + css + bootstrap + javascript + react;
    const percentage = (totalMarks / 500) * 100;
    let status = "Fail";

    const failedSubjects = marks.filter(mark => mark < 33).length;
    if (failedSubjects > 1) {
        status = "Fail";
    } else if (failedSubjects === 1) {
        status = "Pass with RE in one subject";
    } else if (percentage >= 33 && percentage < 50) {
        status = "Pass";
    } else if (percentage >= 50 && percentage < 60) {
        status = "3rd Division";
    } else if (percentage >= 60 && percentage < 70) {
        status = "2nd Division";
    } else if (percentage >= 70 && percentage <= 80) {
        status = "1st Division";
    } else if (percentage > 80) {
        status = "Merit List";
    }

    // Update result display
    document.getElementById("totalmarks").innerText = `Total Marks: ${totalMarks}`;
    document.getElementById("result").innerText = `Result: ${status}`;

    // Add result to the list with numbering
    studentCount++;
    const resultItem = document.createElement("li");
    resultItem.innerHTML = `${studentCount}. ${name} - Total Marks: ${totalMarks}, Result: ${status} 
    <button class="delete-btn" onclick="deleteResult(this)">Delete</button>`;
    listContainer.appendChild(resultItem);

    // Store student name for duplicate check 
    studentNames.push(name);

    // Clear input fields
    document.getElementById("html").value = "";
    document.getElementById("css").value = "";
    document.getElementById("bootstrap").value = "";
    document.getElementById("javascript").value = "";
    document.getElementById("react").value = "";
    document.getElementById("name").value = "";

    // Focus on the first field
    document.getElementById("html").focus();
}

function deleteResult(button) {
    const li = button.parentElement;
    const name = li.innerText.split(" -")[0];
    studentNames = studentNames.filter(studentName => studentName !== name); // Remove name from the list
    li.remove();
}

function copyResults() {
    let resultsText = "";
    const items = listContainer.getElementsByTagName("li");
    for (let item of items) {
        resultsText += item.innerText.split("Delete")[0] + "\n";
    }
    navigator.clipboard.writeText(resultsText)
        .then(() => {
            alert("Results copied to clipboard!");
        })
        .catch(() => {
            alert("Failed to copy results.");
        });
}
