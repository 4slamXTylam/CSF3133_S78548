//Error 1(grade.js, Line 5): Use name.trim() to remove leading
//Error 2(grade.js, Line 10): Missing Check empty mark first
//Error 3(grade.js, Line 15): Logical error, should be && instead of ||
//Error 4(grade.js, Line 29): Keep innderHTML for table, not innerText
//Error 5(grade.js, Line 31): Mispell style.colour, should be style.color tag
//Error 6(grade.js, Line 32): Change the return statement to false to prevent form submission and page reload
//Error 7(grade.js, Line 38): Start the index at 0 for the for loop, not 1
//Error 8(grade.js, Line 43): innerHtml must be innerHTML, not innerHtml

// Check the student's name and mark, calculate the grade and show the result.
function checkMark() {
  const name = document.forms["gradeForm"]["name"].value.trim();
  const markText = document.forms["gradeForm"]["mark"].value.trim();

  if (name === "") {
    alert("Name must be filled out.");
    return false;
  }

  // Part 2: do not allow an empty mark field.
  if (markText === "") {
    alert("Mark field cannot be empty.");
    return false;
  }

  // A mark must contain a valid number.
  if (markText === "" || isNaN(markText)) {
    alert("Please enter a valid numeric value.");
    return false;
  }

  const mark = Number(markText);
  if (mark < 0 || mark > 100) {
    alert("Mark must be between 0 and 100.");
    return false;
  }

  let grade;
  if (mark >= 80) {
    grade = "A";
  } else if (mark >= 65) {
    grade = "B";
  } else if (mark >= 50) {
    grade = "C";
  } else {
    grade = "F";
  }

  const result = document.getElementById("result");
  result.textContent = `${name} got grade ${grade}`;
  // Green for A/B, orange for C, and red for F.
  if (grade === "A" || grade === "B") {
    result.style.color = "green";
  } else if (grade === "C") {
    result.style.color = "orange";
  } else {
    result.style.color = "red";
  }

  document.getElementById("checkedAt").textContent =
    "Checked on: " + new Date().toLocaleString();
  return false; // Keep the result on this page; do not reload the form.
}

// Display the four grade ranges in a table.
function showTable() {
  const grades = ["A", "B", "C", "F"];
  const ranges = ["80-100", "65-79", "50-64", "0-49"];
  let tableHTML = "<table><thead><tr><th>Grade</th><th>Mark range</th></tr></thead><tbody>";

  for (let i = 0; i < grades.length; i++) {
    tableHTML += `<tr><td>${grades[i]}</td><td>${ranges[i]}</td></tr>`;
  }

  tableHTML += "</tbody></table>";
  document.getElementById("tableContainer").innerHTML = tableHTML;
}

// Generate a random whole-number mark from 0 through 100.
function randomMark() {
  document.getElementById("mark").value = Math.floor(Math.random() * 101);
}
