// ==========================================
// TASK 4: UNIVERSAL STUDENT DASHBOARD LOGIC
// ==========================================

// 1. ES6 Class Implementation (Task 4)
class Student {
    constructor(name, rollNumber, department, semester, cgpa, marks) {
        this.name = name;
        this.rollNumber = rollNumber;
        this.department = department;
        this.semester = semester;
        this.cgpa = cgpa;
        this.marks = marks; // Object: { assignment, midterm, finalExam }
    }

    // Task 3: Calculate total marks using a regular function
    calculateTotalMarks() {
        return this.marks.assignment + this.marks.midterm + this.marks.finalExam;
    }

    // Task 3: Calculate average using an arrow function
    calculateAverage = () => {
        return (this.calculateTotalMarks() / 3).toFixed(2);
    }

    // Task 3 & 4: Determine grade using a function
    calculateGrade() {
        const total = this.calculateTotalMarks();
        if (total >= 80) return 'A';
        if (total >= 70) return 'B';
        if (total >= 60) return 'C';
        if (total >= 50) return 'D';
        return 'F';
    }

    // Task 1: Academic status based on CGPA
    getDetailedStatus = () => {
        if (this.cgpa >= 3.00) return 'Excellent';
        if (this.cgpa >= 2.50) return 'Good';
        if (this.cgpa >= 2.00) return 'Satisfactory';
        return 'Academic Warning';
    }

    // Task 4: Academic Status using Arrow Function & Ternary Operator
    getAcademicStatus = () => {
        return this.cgpa >= 2.0 ? 'Eligible' : 'Academic Warning';
    }

    // Task 3: Pass/Fail using ternary operator
    isPassed = () => {
        return this.calculateTotalMarks() >= 50 ? 'Passed' : 'Failed';
    }
}

// Create Array of Objects (Task 1 & 4)
const students = [
    new Student('Ali', 'BSCS-001', 'Computer Science', 6, 3.45, { assignment: 18, midterm: 22, finalExam: 42 }), // 82 - A
    new Student('Sara', 'BSCS-023', 'Computer Science', 5, 2.80, { assignment: 15, midterm: 20, finalExam: 35 }), // 70 - B
    new Student('Ahmed', 'BSCS-002', 'Computer Science', 5, 1.90, { assignment: 10, midterm: 15, finalExam: 20 }), // 45 - F
    new Student('Fatima', 'BSAI-004', 'Artificial Intelligence', 4, 3.90, { assignment: 20, midterm: 25, finalExam: 48 }), // 93 - A
    new Student('Usman', 'BSDS-005', 'Data Structures', 3, 2.40, { assignment: 14, midterm: 18, finalExam: 30 }), // 62 - C
    new Student('Ayesha', 'BSCS-009', 'Computer Science', 6, 3.10, { assignment: 16, midterm: 21, finalExam: 40 }), // 77 - B
];


// ==========================================
// TASK 2: ONLINE COURSE REGISTRATION SYSTEM
// ==========================================
const availableCourses = [
    'Web Development',
    'Database Systems',
    'Artificial Intelligence',
    'Computer Networks'
];

// Array Methods required
availableCourses.push('Software Engineering'); // push()
availableCourses.push('Data Structures');      // push()
availableCourses.pop();                        // pop() - removes Data Structures

// includes()
const aiIsAvailable = availableCourses.includes('Artificial Intelligence');

// Arrow function for student status & ternary
const getStudentStatus = (numCourses) => (numCourses >= 4 ? 'Full-Time' : 'Part-Time');

// DOM Manipulation for Task 2
const renderCourses = () => {
    const listElement = document.getElementById('course-list');
    
    // Requirement: use for...of
    for (const course of availableCourses) {
        const li = document.createElement('li');
        li.textContent = course;
        listElement.appendChild(li);
    }

    document.getElementById('course-count').textContent = availableCourses.length;
    document.getElementById('ai-status').textContent = aiIsAvailable ? 'Yes' : 'No';
    document.getElementById('student-status').textContent = getStudentStatus(availableCourses.length);
};


// ==========================================
// TASK 1, 3, 4: STUDENT DASHBOARD RENDERING
// ==========================================

const renderStudentsAndStats = () => {
    const gridElement = document.getElementById('students-grid');
    
    students.forEach(student => {
        const { name, rollNumber, department, semester, cgpa, marks } = student;
        const totalMarks = student.calculateTotalMarks();
        const average = student.calculateAverage();
        const grade = student.calculateGrade();
        const eligibility = student.getAcademicStatus(); // Eligible / Warning
        const performanceStatus = student.getDetailedStatus(); // Excellent / Good
        const isPassed = student.isPassed();

        // Determine CSS classes dynamically
        const passPillClass = isPassed === 'Passed' ? 'status-passed' : 'status-failed';
        const academicPillClass = eligibility === 'Eligible' ? 'status-eligible' : 'status-warning';

        // Create Card HTML
        const cardHTML = `
            <div class="student-card">
                <div class="sc-header">
                    <div>
                        <div class="sc-name">${name}</div>
                        <div class="sc-roll">${rollNumber}</div>
                    </div>
                    <div class="sc-grade-badge grade-${grade}">${grade}</div>
                </div>
                
                <div class="sc-details">
                    <div class="sc-item">
                        <span class="label">Department</span>
                        <span class="val">${department}</span>
                    </div>
                    <div class="sc-item">
                        <span class="label">Semester / CGPA</span>
                        <span class="val">${semester} / ${cgpa.toFixed(2)}</span>
                    </div>
                    <div class="sc-item">
                        <span class="label">Marks (A/M/F)</span>
                        <span class="val" style="font-size: 0.85rem">${marks.assignment} / ${marks.midterm} / ${marks.finalExam}</span>
                    </div>
                    <div class="sc-item">
                        <span class="label">Total / Avg</span>
                        <span class="val">${totalMarks} / ${average}</span>
                    </div>
                </div>

                <div class="sc-footer">
                    <span class="status-pill">${performanceStatus}</span>
                    <span class="status-pill ${academicPillClass}">Eligibility: ${eligibility}</span>
                    <span class="status-pill ${passPillClass}">${isPassed}</span>
                </div>
            </div>
        `;
        
        gridElement.insertAdjacentHTML('beforeend', cardHTML);
    });

    // Requirement: Use a for loop to calculate total students who passed
    let explicitPassed = 0;
    for (let i = 0; i < students.length; i++) {
        if (students[i].isPassed() === 'Passed') {
            explicitPassed++;
        }
    }
    
    let explicitFailed = students.length - explicitPassed;

    // Update DOM Stats
    document.getElementById('total-students').textContent = students.length;
    document.getElementById('passed-students').textContent = explicitPassed;
    document.getElementById('failed-students').textContent = explicitFailed;
};

// ==========================================
// TASK 4: OBJECT PROPS WITH for...in
// ==========================================
const renderInspector = () => {
    const inspector = document.getElementById('inspector-output');
    const sampleStudent = students[0];
    
    let output = 'Inspecting Student Object:\n';
    output += '==========================\n';
    
    // Requirement: Use for...in
    for (const key in sampleStudent) {
        // Dump properties natively
        if (typeof sampleStudent[key] !== 'function') {
            let value = sampleStudent[key];
            if (typeof value === 'object') {
                value = JSON.stringify(value);
            }
            output += `> ${key}: ${value}\n`;
        }
    }
    inspector.textContent = output;
};


// Execute Initializers
document.addEventListener('DOMContentLoaded', () => {
    renderCourses();
    renderStudentsAndStats();
    renderInspector();
});
