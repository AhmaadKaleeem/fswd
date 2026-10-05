import formatStudentResult, {
    DEPARTMENT_NAME,
    calculateTotal,
    calculateAverage as getAvg,
    getGrade,
    getStatus
} from './studentUtils.js';

// ==========================================================
// Task 1 — University Course Enrollment Manager
// ==========================================================
const coreCourses = ["Web Development", "Database Systems", "Data Structures"];
const electiveCourses = ["Artificial Intelligence", "Computer Networks", "Cloud Computing"];
const studentInfo = {
    name: "Ali",
    rollNumber: "BSCS-001",
    department: "Computer Science",
    semester: 6
};
const cgpas = [3.1, 2.9, 3.4, 3.75, 3.0];

const allCourses = [...coreCourses, ...electiveCourses];
const copyCourses = [...allCourses, "Software Engineering"];
const updatedStudent = { ...studentInfo, semester: 7, cgpa: 3.45 };

function enrollStudent(name, ...courses) {
    return `${name} enrolled in ${courses.length} course(s): ${courses.join(', ')}`;
}

const calculateAverageCGPA = (...cgpas) => {
    const total = cgpas.reduce((sum, val) => sum + val, 0);
    return (total / cgpas.length).toFixed(2);
};

const highestCGPA = Math.max(...cgpas);

function getStudentInfo(name, department = "Computer Science") {
    return `Department (default): ${department}`;
}

const task1Display = `
Core Courses: ${coreCourses.join(', ')}
Elective Courses: ${electiveCourses.join(', ')}
All Courses (${allCourses.length}): ${allCourses.join(', ')}
Copy after adding a course (${copyCourses.length}): ... , ${copyCourses[copyCourses.length - 1]}
Original still has ${allCourses.length} courses
Original Student: ${studentInfo.name}, Semester ${studentInfo.semester}
Updated Student: ${updatedStudent.name}, Semester ${updatedStudent.semester}, CGPA ${updatedStudent.cgpa}
${enrollStudent(studentInfo.name, "Web Development", "Database Systems", "Artificial Intelligence")}
Average CGPA: ${calculateAverageCGPA(...cgpas)}
Highest CGPA: ${highestCGPA}
${getStudentInfo(studentInfo.name)}
`;

document.getElementById('task1Output').textContent = task1Display.trim();

// ==========================================================
// Task 2 — Student Utility Module
// ==========================================================
document.getElementById('task2Department').textContent = `Department: ${DEPARTMENT_NAME}`;

const studentsData = [
    { name: "Sara", rollNumber: "BSCS-023", assignment: 20, midterm: 25, finalExam: 37 },
    { name: "Ahmed", rollNumber: "BSCS-002", assignment: 15, midterm: 22, finalExam: 30 },
    { name: "Ayesha", rollNumber: "BSCS-014", assignment: 10, midterm: 15, finalExam: 23 },
    { name: "Hassan", rollNumber: "BSCS-031", assignment: 18, midterm: 28, finalExam: 34 }
];

const task2Output = document.getElementById('task2Output');

studentsData.forEach(student => {
    const { name, rollNumber, assignment, midterm, finalExam } = student;
    const total = calculateTotal(assignment, midterm, finalExam);
    const avg = getAvg(total, 3);
    const grade = getGrade(total);
    const status = getStatus(total);

    const card = document.createElement('div');
    card.className = 'student-card';
    card.style.padding = '1rem';
    card.innerHTML = `
        <h4 style="margin-bottom:0.5rem">${formatStudentResult(name, rollNumber, total)}</h4>
        <p style="margin:0; color:var(--text-muted)">Average: ${avg}</p>
        <p style="margin:0; color:var(--text-muted)">Grade: <strong style="color:var(--primary-color)">${grade}</strong></p>
        <p style="margin:0; color:var(--text-muted)">Status: <strong style="color:${status === 'Pass' ? 'var(--success-color)' : 'var(--danger-color)'}">${status}</strong></p>
    `;
    task2Output.appendChild(card);
});

// ==========================================================
// Task 3 — Online Examination Workflow
// ==========================================================
function verifyStudent(roll, callback) {
    setTimeout(() => {
        if (!roll) {
            callback("Roll number is required", null);
        } else {
            callback(null, `Student ${roll} verified`);
        }
    }, 1000);
}

function loadExamPaper(callback) {
    setTimeout(() => {
        callback(null, "Exam paper loaded");
    }, 1500);
}

function submitAnswers(callback) {
    setTimeout(() => {
        callback(null, "Answers submitted");
    }, 2000);
}

function generateResult(callback) {
    setTimeout(() => {
        callback(null, "Result generated: 82 marks");
    }, 1000);
}

// Nested callbacks style (Callback Hell)
// This is called "callback hell" because the nested structure becomes deeply indented (like a pyramid),
// making the code hard to read, maintain, and prone to scoping errors.
function runWorkflow(roll, outputId) {
    const outputElem = document.getElementById(outputId);
    outputElem.textContent = "Exam workflow started...\n";
    let startTime = Date.now();

    const log = (msg) => {
        const timeElapsed = ((Date.now() - startTime) / 1000).toFixed(1);
        outputElem.textContent += `${msg} (after ${timeElapsed} seconds)\n`;
    };

    verifyStudent(roll, (error, data1) => {
        if (error) {
            outputElem.style.color = "var(--danger-color)";
            outputElem.textContent += `Error: ${error}\n`;
            return;
        }
        outputElem.style.color = "#4ade80"; // reset to green
        log(`Step 1: ${data1}`);
        loadExamPaper((error, data2) => {
            if (error) return;
            log(`Step 2: ${data2}`);
            submitAnswers((error, data3) => {
                if (error) return;
                log(`Step 3: ${data3}`);
                generateResult((error, data4) => {
                    if (error) return;
                    log(`Step 4: ${data4}`);
                    outputElem.textContent += "Exam completed successfully!\n";
                });
            });
        });
    });
}

document.getElementById('task3RunBtn').addEventListener('click', () => {
    const roll = document.getElementById('task3RollNumber').value.trim();
    runWorkflow(roll, "task3Output");
});


// ==========================================================
// Task 4 — University Result Portal
// ==========================================================
const dbStudents = [
    { name: "Ali", rollNumber: "BSCS-001", department: "Computer Science", semester: 6, assignment: 20, midterm: 25, finalExam: 37 },
    { name: "Ahmed", rollNumber: "BSCS-002", department: "Computer Science", semester: 6, assignment: 15, midterm: 22, finalExam: 30 },
    { name: "Sara", rollNumber: "BSCS-023", department: "Computer Science", semester: 6, assignment: 22, midterm: 28, finalExam: 38 },
    { name: "Ayesha", rollNumber: "BSCS-014", department: "Computer Science", semester: 6, assignment: 10, midterm: 15, finalExam: 23 },
    { name: "Hassan", rollNumber: "BSCS-031", department: "Computer Science", semester: 6, assignment: 18, midterm: 25, finalExam: 32 }
];

function findStudent(rollNumber) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const student = dbStudents.find(s => s.rollNumber === rollNumber);
            if (student) resolve(student);
            else reject("Student not found");
        }, 1000);
    });
}

function calculateResult(student) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const { assignment, midterm, finalExam } = student;
            const total = calculateTotal(assignment, midterm, finalExam);
            resolve({
                ...student,
                total,
                average: getAvg(total, 3),
                grade: getGrade(total),
                status: getStatus(total)
            });
        }, 1000);
    });
}

// Search using Promise chain (Part A Example)
function searchStudentPromise(rollNumber) {
    const outElem = document.getElementById('task4AOutput');
    outElem.textContent = "Searching...\n";
    
    findStudent(rollNumber)
        .then(student => calculateResult(student))
        .then(result => {
            outElem.textContent += `Result Found:\nStudent: ${result.name}, Grade: ${result.grade}, Status: ${result.status}\n`;
        })
        .catch(err => {
            outElem.textContent += `Error: ${err}\n`;
        })
        .finally(() => {
            outElem.textContent += "Search completed.\n";
        });
}
searchStudentPromise("BSCS-001");

// Part B & C: Async/Await UI display
async function showResult(rollNumber) {
    const statusElem = document.getElementById('task4SearchStatus');
    const outputElem = document.getElementById('task4Output');
    const statsElem = document.getElementById('task4Stats');

    statusElem.textContent = "Searching...";
    statusElem.style.color = "inherit";
    outputElem.innerHTML = '';
    statsElem.style.display = 'none';

    try {
        const student = await findStudent(rollNumber);
        const result = await calculateResult(student);
        
        statusElem.textContent = "Search completed";
        
        const card = document.createElement('div');
        card.className = 'student-card';
        card.style.padding = '1.25rem';
        card.style.gridColumn = '1 / -1';
        card.innerHTML = `
            <div style="font-family: monospace; line-height: 1.6;">
                <div>----------------------------------------------</div>
                <div><strong>Student:</strong> ${result.name}</div>
                <div><strong>Roll No:</strong> ${result.rollNumber}</div>
                <div><strong>Department:</strong> ${result.department}</div>
                <div><strong>Semester:</strong> ${result.semester}</div>
                <div><strong>Total:</strong> ${result.total}</div>
                <div><strong>Average:</strong> ${result.average}</div>
                <div><strong>Grade:</strong> ${result.grade}</div>
                <div><strong>Status:</strong> ${result.status}</div>
                <div>----------------------------------------------</div>
            </div>
        `;
        outputElem.appendChild(card);
    } catch (error) {
        statusElem.textContent = `Error: ${error}`;
        statusElem.style.color = "var(--danger-color)";
    } finally {
        setTimeout(() => {
            if(statusElem.textContent === "Search completed") {
                statusElem.textContent = "";
            }
        }, 3000);
    }
}

document.getElementById('searchBtn').addEventListener('click', () => {
    const roll = document.getElementById('searchRollNumber').value.trim();
    if (roll) showResult(roll);
});

// Part D: Load All Results
async function loadAllResults() {
    const statusElem = document.getElementById('task4SearchStatus');
    const outputElem = document.getElementById('task4Output');
    const statsElem = document.getElementById('task4Stats');
    
    statusElem.textContent = "Loading all results...";
    statusElem.style.color = "inherit";
    outputElem.innerHTML = '';
    
    try {
        const results = await Promise.all(
            dbStudents.map(student => calculateResult(student))
        );
        
        statusElem.textContent = "";
        
        let passed = 0;
        let failed = 0;

        results.forEach(res => {
            if (res.status === 'Pass') passed++;
            else failed++;

            const card = document.createElement('div');
            card.className = 'student-card';
            card.style.padding = '1rem';
            card.innerHTML = `
                <div style="font-family: monospace; font-size: 0.9rem;">
                    <strong>Student:</strong> ${res.name} | <strong>Roll No:</strong> ${res.rollNumber} | <strong>Grade:</strong> ${res.grade} | <strong>Status:</strong> ${res.status}
                </div>
            `;
            outputElem.appendChild(card);
        });

        statsElem.style.display = 'block';
        statsElem.innerHTML = `
            <h4 style="margin-bottom: 0.5rem;">Final Statistics</h4>
            <div style="font-family: monospace;">
                <div>Total Students: ${results.length}</div>
                <div>Passed Students: ${passed}</div>
                <div>Failed Students: ${failed}</div>
            </div>
        `;
    } catch (error) {
        statusElem.textContent = `Error: ${error}`;
        statusElem.style.color = "var(--danger-color)";
    }
}

document.getElementById('loadAllBtn').addEventListener('click', loadAllResults);
