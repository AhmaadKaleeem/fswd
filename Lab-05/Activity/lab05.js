import formatResult, {
    COURSE_CODE,
    calculateTotal,
    calculateAverage,
    getGrade
} from "./lab05-utils.js";

import formatHelperMessage, {
    getStatus,
    getDiscount
} from "./lab05-helpers.js";

/* =====================================================
LAB 05
HELPER FUNCTION
===================================================== */
function lab05Append(id, html) {
    document.getElementById(id).innerHTML += html + "<br>";
}

/* =====================================================
LAB 05
1. SPREAD OPERATOR
===================================================== */
const lab05Frontend = ["HTML", "CSS", "JavaScript"];
const lab05Backend = ["Node.js", "Express", "MongoDB"];
// Combine two arrays
const lab05FullStack = [...lab05Frontend, ...lab05Backend];
// Copy an array
const lab05FrontendCopy = [...lab05Frontend];
lab05FrontendCopy.push("Bootstrap");
// Copy and update an object
const lab05Student = { name: "Ali", semester: 6 };
const lab05UpdatedStudent = {
    ...lab05Student,
    semester: 7,
    cgpa: 3.45
};
// Spread into function arguments
const lab05MarksList = [45, 72, 38, 81];
const lab05HighestMark = Math.max(...lab05MarksList);
document.getElementById("spreadOutput").innerHTML =
    "Full Stack: " + lab05FullStack.join(", ") +
    "\n\nCopy after push: " + lab05FrontendCopy.join(", ") +
    "\nOriginal array: " + lab05Frontend.join(", ") +
    "\n\nOriginal object: " + lab05Student.name + ", Semester " + lab05Student.semester +
    "\nUpdated object: " + lab05UpdatedStudent.name + ", Semester " + lab05UpdatedStudent.semester + ", CGPA " + lab05UpdatedStudent.cgpa +
    "\n\nHighest Mark: " + lab05HighestMark;

/* =====================================================
LAB 05
2. REST PARAMETERS
===================================================== */
function lab05CalculateTotalTutorial(...marks) {
    let total = 0;
    for (const mark of marks) {
        total += mark;
    }
    return total;
}
function lab05Enroll(studentName, ...courses) {
    return studentName + " enrolled in " +
        courses.length + " course(s): " +
        courses.join(", ");
}
// Rest in array destructuring
const [lab05First, lab05Second, ...lab05Remaining] = lab05FullStack;
document.getElementById("restOutput").innerHTML =
    "Total (3 marks): " + lab05CalculateTotalTutorial(18, 22, 42) + "\n" +
    "Total (5 marks): " + lab05CalculateTotalTutorial(10, 20, 30, 40, 50) +
    "\n\n" + lab05Enroll("Sara", "Web Development", "Database Systems", "Artificial Intelligence") +
    "\n\nFirst: " + lab05First + "\nSecond: " + lab05Second + "\nRemaining: " + lab05Remaining.join(", ");

/* =====================================================
LAB 05
3. MORE ES6 FEATURES
===================================================== */
function lab05Greet(name = "Student", course = "CS-301L") {
    return `Welcome ${name} to ${course}`;
}
function lab05CreateStudent(name, semester, cgpa) {
    return { name, semester, cgpa };
}
const lab05NewStudent = lab05CreateStudent("Ahmed", 5, 3.2);
document.getElementById("es6Output").innerHTML =
    lab05Greet() + "\n" +
    lab05Greet("Ahmed") + "\n" +
    lab05Greet("Sara", "Database Systems") +
    "\n\nName: " + lab05NewStudent.name +
    "\nSemester: " + lab05NewStudent.semester +
    "\nCGPA: " + lab05NewStudent.cgpa;

/* =====================================================
LAB 05
4. JAVASCRIPT MODULES
===================================================== */
const lab05ModuleTotal = calculateTotal(18, 22, 42);
document.getElementById("moduleOutput").innerHTML =
    "Course Code: " + COURSE_CODE + "\n" +
    "Total: " + lab05ModuleTotal + "\n" +
    "Average: " + calculateAverage(18, 22, 42).toFixed(2) + "\n" +
    "Grade: " + getGrade(lab05ModuleTotal) +
    "\n\n" + formatResult("Sara", 91);

/* =====================================================
LAB 05
5. FUNCTION CALLBACKS
===================================================== */
function lab05CalculateResult(assignment, midterm, finalExam, callback) {
    const total = assignment + midterm + finalExam;
    callback(total);
}
lab05CalculateResult(18, 22, 42, function (total) {
    lab05Append("callbackOutput", "Total Marks: " + total);
});
lab05CalculateResult(18, 22, 42, (total) => {
    lab05Append("callbackOutput", "Grade: " + getGrade(total));
});
lab05Append("callbackOutput", "\nAsynchronous callback:");
lab05Append("callbackOutput", "1. Start");
setTimeout(function () {
    lab05Append("callbackOutput", "3. Callback executed after 2 seconds");
}, 2000);
lab05Append("callbackOutput", "2. End of code");

/* =====================================================
LAB 05
6. NESTED CALLBACKS
===================================================== */
function lab05Login(user, callback) {
    setTimeout(function () {
        lab05Append("nestedCallbackOutput", "Step 1: " + user + " logged in");
        callback(user);
    }, 1000);
}
function lab05LoadCourses(user, callback) {
    setTimeout(function () {
        const courses = ["Web Development", "Database Systems", "Artificial Intelligence"];
        lab05Append("nestedCallbackOutput", "Step 2: " + courses.length + " courses loaded for " + user);
        callback(courses);
    }, 1000);
}
function lab05RegisterCourses(courses, callback) {
    setTimeout(function () {
        lab05Append("nestedCallbackOutput", "Step 3: Registered in " + courses.length + " courses");
        callback(courses.length);
    }, 1000);
}
function lab05SendConfirmation(count, callback) {
    setTimeout(function () {
        lab05Append("nestedCallbackOutput", "Step 4: Confirmation sent for " + count + " courses");
        callback();
    }, 1000);
}

lab05Login("Ali", function (user) {
    lab05LoadCourses(user, function (courses) {
        lab05RegisterCourses(courses, function (count) {
            lab05SendConfirmation(count, function () {
                lab05Append("nestedCallbackOutput", "Registration complete!");
            });
        });
    });
});

/* =====================================================
LAB 05
7. PROMISES
===================================================== */
function lab05CheckEligibility(cgpa) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            if (cgpa >= 2.0) {
                resolve("Eligible for the next semester");
            } else {
                reject("Academic Warning: CGPA below 2.0");
            }
        }, 1000);
    });
}
function lab05ShowEligibility(name, cgpa) {
    lab05CheckEligibility(cgpa)
        .then((message) => {
            lab05Append("promiseOutput", `${name} (CGPA ${cgpa.toFixed(2)}): ${message}`);
        })
        .catch((error) => {
            lab05Append("promiseOutput", `${name} (CGPA ${cgpa.toFixed(2)}): ${error}`);
        })
        .finally(() => {
            lab05Append("promiseOutput", `${name}: check finished\n`);
        });
}
lab05Append("promiseOutput", "Checking eligibility...\n");
lab05ShowEligibility("Ali", 3.45);
lab05ShowEligibility("Ahmed", 1.8);

/* =====================================================
LAB 05
8. ASYNC / AWAIT
===================================================== */
function lab05LoginPromise(user) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            if (user) {
                resolve(user);
            } else {
                reject("Invalid user: login failed");
            }
        }, 1000);
    });
}
function lab05LoadCoursesPromise(user) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(["Web Development", "Database Systems", "Artificial Intelligence"]);
        }, 1000);
    });
}
function lab05RegisterPromise(courses) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(courses.length);
        }, 1000);
    });
}

async function lab05RegisterStudent(user) {
    try {
        lab05Append("asyncOutput", "Starting registration...");
        const loggedUser = await lab05LoginPromise(user);
        lab05Append("asyncOutput", "Step 1: " + loggedUser + " logged in");
        const courses = await lab05LoadCoursesPromise(loggedUser);
        lab05Append("asyncOutput", "Step 2: Courses loaded: " + courses.join(", "));
        const count = await lab05RegisterPromise(courses);
        lab05Append("asyncOutput", "Step 3: " + count + " courses registered");
    } catch (error) {
        lab05Append("asyncOutput", "Error: " + error);
    } finally {
        lab05Append("asyncOutput", "Registration process finished\n");
    }
}
async function lab05RunAsyncDemo() {
    await lab05RegisterStudent("Ali"); // succeeds
    await lab05RegisterStudent(""); // fails
}
lab05RunAsyncDemo();

/* =====================================================
LAB 05
9. STUDENT RESULT PORTAL (Lab Task)
===================================================== */
function lab05FetchStudents() {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            const students = [
                { name: "Ali", semester: 6, assignment: 18, midterm: 22, finalExam: 42 },
                { name: "Ahmed", semester: 5, assignment: 15, midterm: 20, finalExam: 32 },
                { name: "Sara", semester: 6, assignment: 20, midterm: 28, finalExam: 43 },
                { name: "Ayesha", semester: 4, assignment: 10, midterm: 12, finalExam: 26 }
            ];
            resolve(students);
        }, 1500);
    });
}

const lab05GetStatus = (marks) => marks >= 50 ? "Passed" : "Failed";

async function lab05LoadPortal() {
    const output = document.getElementById("studentPortalOutput");
    output.innerHTML = "Loading student data...";
    try {
        const students = await lab05FetchStudents();
        let html = "";
        students.forEach((student) => {
            const { name, semester, ...scores } = student;
            const total = calculateTotal(...Object.values(scores));
            const grade = getGrade(total);
            const status = lab05GetStatus(total);
            const statusClass = status.toLowerCase() === 'passed' ? 'passed' : 'failed';
            html += `
            <div class="student-card">
                <div class="sc-header">
                    <div class="sc-name">${name}</div>
                    <div class="sc-grade-badge grade-${grade}">${grade}</div>
                </div>
                <div class="sc-details">
                    <div class="sc-item">
                        <span class="label">Semester</span>
                        <span class="val">${semester}</span>
                    </div>
                    <div class="sc-item">
                        <span class="label">Total Marks</span>
                        <span class="val">${total}</span>
                    </div>
                    <div class="sc-item">
                        <span class="label">Status</span>
                        <span class="status-pill status-${statusClass}">${status}</span>
                    </div>
                </div>
            </div>`;
        });
        output.innerHTML = html;
    } catch (error) {
        output.innerHTML = "Error: " + error;
    }
}

document
    .getElementById("loadPortalBtn")
    .addEventListener("click", lab05LoadPortal);

/* =====================================================
LAB 05
ACTIVITIES
===================================================== */

// Activity 1 - Spread Operator
const coreCourses = ["CS101", "CS102", "CS103"];
const electiveCourses = ["CS201", "CS202", "CS203"];
const allCourses = [...coreCourses, ...electiveCourses];
const allCoursesCopy = [...allCourses];
allCoursesCopy.push("CS301");

document.getElementById("act1Output").innerHTML = 
    "Combined Courses: " + allCourses.join(", ") + "<br>" +
    "Copied Courses (+new): " + allCoursesCopy.join(", ");

// Activity 2 - Rest Parameters
function calculateAverageActivity(...marks) {
    if (marks.length === 0) return 0;
    const total = marks.reduce((sum, mark) => sum + mark, 0);
    return total / marks.length;
}

document.getElementById("act2Output").innerHTML = 
    "Average of 3 marks: " + calculateAverageActivity(85, 90, 88).toFixed(2) + "<br>" +
    "Average of 6 marks: " + calculateAverageActivity(80, 85, 90, 95, 88, 92).toFixed(2);

// Activity 3 - Module
document.getElementById("act3Output").innerHTML = 
    "Status for CGPA 3.5: " + getStatus(3.5) + "<br>" +
    "Discount for 60000: " + getDiscount(60000) + "<br>" +
    "Helper Message: " + formatHelperMessage("Ahmad", 3.2, 75000);

// Activity 4 - Callbacks
function processOrder(item, callback) {
    lab05Append("act4Output", "Waiting...");
    setTimeout(() => {
        callback(`Order for ${item} is ready`);
    }, 2000);
}

processOrder("Laptop", (message) => {
    lab05Append("act4Output", message);
});

// Activity 5 - Promises and Async/Await
function checkFee(amount) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (amount >= 50000) {
                resolve("Fee accepted");
            } else {
                reject("Insufficient fee");
            }
        }, 1000);
    });
}

// Using Promise .then/.catch/.finally
checkFee(60000)
    .then(res => lab05Append("act5Output", "Promise (60000): " + res))
    .catch(err => lab05Append("act5Output", "Promise (60000) Error: " + err))
    .finally(() => lab05Append("act5Output", "Promise (60000) Finished."));

checkFee(40000)
    .then(res => lab05Append("act5Output", "Promise (40000): " + res))
    .catch(err => lab05Append("act5Output", "Promise (40000) Error: " + err))
    .finally(() => lab05Append("act5Output", "Promise (40000) Finished."));

// Using Async/Await
async function testCheckFee() {
    try {
        const res1 = await checkFee(60000);
        lab05Append("act5Output", "Async/Await (60000): " + res1);
    } catch(err) {
        lab05Append("act5Output", "Async/Await (60000) Error: " + err);
    } finally {
        lab05Append("act5Output", "Async/Await (60000) Finished.");
    }
    
    try {
        const res2 = await checkFee(40000);
        lab05Append("act5Output", "Async/Await (40000): " + res2);
    } catch(err) {
        lab05Append("act5Output", "Async/Await (40000) Error: " + err);
    } finally {
        lab05Append("act5Output", "Async/Await (40000) Finished.");
    }
}
testCheckFee();
