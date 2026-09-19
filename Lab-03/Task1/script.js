document.getElementById('performanceForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const resultBox = document.getElementById('resultBox');
    const initialState = document.getElementById('initialState');
    
    const studentName = document.getElementById('studentName').value.trim();
    const studentId = document.getElementById('studentId').value.trim();
    const program = document.getElementById('program').value;
    const semester = document.getElementById('semester').value;
    const assignment = parseFloat(document.getElementById('assignmentMarks').value);
    const quiz = parseFloat(document.getElementById('quizMarks').value);
    const exam = parseFloat(document.getElementById('examMarks').value);
    const attendance = parseFloat(document.getElementById('attendance').value);

    initialState.style.setProperty('display', 'none', 'important');
    resultBox.style.setProperty('display', 'flex', 'important');
    resultBox.className = 'output-box flex-grow-1 fade-in';

    if (!studentName || !studentId) {
        showError("Student name and ID cannot be empty.");
        return;
    }
    if (isNaN(assignment) || assignment < 0 || assignment > 20) {
        showError("Assignment score must be between 0 and 20.");
        return;
    }
    if (isNaN(quiz) || quiz < 0 || quiz > 30) {
        showError("Quiz score must be between 0 and 30.");
        return;
    }
    if (isNaN(exam) || exam < 0 || exam > 50) {
        showError("Exam score must be between 0 and 50.");
        return;
    }
    if (isNaN(attendance) || attendance < 0 || attendance > 100) {
        showError("Attendance must be between 0 and 100.");
        return;
    }

    const totalMarks = assignment + quiz + exam;
    let grade = 'F';
    let gradeClass = 'status-error';

    if (totalMarks >= 85) { grade = 'A'; gradeClass = 'status-success'; }
    else if (totalMarks >= 70) { grade = 'B'; gradeClass = 'status-success'; }
    else if (totalMarks >= 50) { grade = 'C'; gradeClass = 'status-neutral'; }
    
    let isAttendanceSufficient = attendance >= 75;
    let isAcademicallySuccessful = totalMarks >= 50;
    
    let finalStatus = "";
    let finalClass = "";
    let finalDesc = "";

    if (!isAttendanceSufficient) {
        finalStatus = "Failed";
        finalClass = "status-error";
        finalDesc = `Student has insufficient attendance (${attendance}%). 75% is required to pass.`;
    } else if (!isAcademicallySuccessful) {
        finalStatus = "Failed";
        finalClass = "status-error";
        finalDesc = `Student did not meet the passing criteria of 50 total marks.`;
    } else {
        finalStatus = "Passed";
        finalClass = "status-success";
        finalDesc = `Student has successfully passed the course with adequate attendance.`;
    }

    const bgSoftClass = finalClass === 'status-success' ? 'bg-success-soft' : 'bg-error-soft';

    resultBox.innerHTML = `
        <div class="mb-3">
            <span class="status-label">Student Details</span>
            <div class="font-mono fs-5">${studentName} <span class="text-dim">(${studentId})</span></div>
            <div class="status-desc text-dim">${program} - Semester ${semester}</div>
        </div>
        
        <table class="table-custom mb-4">
            <tbody>
                <tr>
                    <td>Total Marks</td>
                    <td>${totalMarks} / 100</td>
                </tr>
                <tr>
                    <td>Final Grade</td>
                    <td class="${gradeClass} fs-5 font-mono">${grade}</td>
                </tr>
                <tr>
                    <td>Attendance</td>
                    <td>${attendance}%</td>
                </tr>
            </tbody>
        </table>

        <div class="mt-auto p-3 ${bgSoftClass}">
            <span class="status-label">Final Outcome</span>
            <div class="status-result ${finalClass}">${finalStatus}</div>
            <div class="status-desc">${finalDesc}</div>
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
