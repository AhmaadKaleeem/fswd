const coursesBySemester = {
    '1': ['Introduction to Computing', 'Calculus I', 'English Composition', 'Physics I'],
    '2': ['Object Oriented Programming', 'Calculus II', 'Linear Algebra', 'Physics II'],
    '3': ['Data Structures', 'Discrete Structures', 'Digital Logic Design', 'Communication Skills'],
    '4': ['Design & Analysis of Algorithms', 'Computer Architecture', 'Software Engineering', 'Database Systems'],
    '5': ['Operating Systems', 'Theory of Automata', 'Advanced AI', 'Computer Networks'],
    '6': ['Web Development', 'Compiler Construction', 'Machine Learning', 'Information Security'],
    '7': ['Final Year Project I', 'Data Science', 'Cloud Computing', 'Mobile App Development'],
    '8': ['Final Year Project II', 'Deep Learning', 'Blockchain Technologies', 'Professional Ethics']
};

function populateCourses() {
    const semester = document.getElementById('semester').value;
    const courseSelect = document.getElementById('courseId');
    courseSelect.innerHTML = ''; // clear current

    if (coursesBySemester[semester]) {
        coursesBySemester[semester].forEach(course => {
            const option = document.createElement('option');
            option.value = course;
            option.textContent = course;
            courseSelect.appendChild(option);
        });
    }
}

// Initial populate on load
document.addEventListener('DOMContentLoaded', populateCourses);

// Re-populate when semester changes
document.getElementById('semester').addEventListener('change', populateCourses);

document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const resultBox = document.getElementById('resultBox');
    const initialState = document.getElementById('initialState');
    
    const courseId = document.getElementById('courseId').value.trim();
    const cgpa = parseFloat(document.getElementById('cgpa').value);
    const prerequisite = document.getElementById('prerequisite').value;
    const feeStatus = document.getElementById('feeStatus').value;
    const availability = document.getElementById('availability').value;

    const MIN_CGPA = 2.5;

    initialState.style.setProperty('display', 'none', 'important');
    resultBox.style.setProperty('display', 'flex', 'important');
    resultBox.className = 'output-box flex-grow-1 fade-in';

    if (!courseId) {
        showError("Course name is required.");
        return;
    }
    if (isNaN(cgpa) || cgpa < 0 || cgpa > 4.0) {
        showError("GPA must be between 0.0 and 4.0.");
        return;
    }

    let isApproved = false;
    let reason = "";

    if (feeStatus === 'unpaid') {
        reason = "Registration failed: You have outstanding fee dues. Please clear them first.";
    } else if (prerequisite === 'incomplete') {
        reason = "Registration failed: You have not completed the required prerequisites for this course.";
    } else if (cgpa < MIN_CGPA) {
        reason = `Registration failed: Your GPA (${cgpa}) is lower than the required minimum of ${MIN_CGPA}.`;
    } else if (availability === 'full') {
        reason = "Registration failed: The class is already full and no seats are available.";
    } else {
        isApproved = true;
        reason = "You have successfully registered for the course.";
    }

    const finalStatus = isApproved ? "Registered" : "Denied";
    const finalClass = isApproved ? "status-success" : "status-error";
    const bgSoftClass = isApproved ? "bg-success-soft" : "bg-error-soft";
    
    resultBox.innerHTML = `
        <div class="mb-3">
            <span class="status-label">Course</span>
            <div class="font-mono fs-5 text-signal">${courseId}</div>
        </div>
        
        <div class="mt-auto p-3 ${bgSoftClass}">
            <span class="status-label">Status</span>
            <div class="status-result ${finalClass}">${finalStatus}</div>
            <div class="status-desc">${reason}</div>
        </div>
    `;

    function showError(message) {
        resultBox.innerHTML = `
            <div class="mt-auto p-3 bg-error-soft">
                <span class="status-label">Error</span>
                <div class="status-result status-error">Invalid Input</div>
                <div class="status-desc">${message}</div>
            </div>
        `;
    }
});
