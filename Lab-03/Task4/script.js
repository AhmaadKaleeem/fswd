document.getElementById('scholarshipForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const resultBox = document.getElementById('resultBox');
    const initialState = document.getElementById('initialState');
    
    const studentName = document.getElementById('studentName').value.trim();
    const program = document.getElementById('program').value;
    const semester = document.getElementById('semester').value;
    const cgpa = parseFloat(document.getElementById('cgpa').value);
    const credits = parseInt(document.getElementById('credits').value, 10);
    const attendance = parseFloat(document.getElementById('attendance').value);
    const income = parseFloat(document.getElementById('income').value);
    const previousScholarship = document.getElementById('previousScholarship').value;
    const category = document.getElementById('scholarshipCategory').value;

    initialState.style.setProperty('display', 'none', 'important');
    resultBox.style.setProperty('display', 'flex', 'important');
    resultBox.className = 'output-box flex-grow-1 fade-in';

    if (!studentName) {
        showError("Student name cannot be empty.");
        return;
    }
    if (isNaN(cgpa) || cgpa < 0 || cgpa > 4.0) {
        showError("GPA must be between 0.0 and 4.0.");
        return;
    }
    if (isNaN(credits) || credits < 0) {
        showError("Credit hours cannot be negative.");
        return;
    }
    if (isNaN(attendance) || attendance < 0 || attendance > 100) {
        showError("Attendance must be between 0 and 100.");
        return;
    }
    if (isNaN(income) || income < 0) {
        showError("Income cannot be negative.");
        return;
    }

    let status = "";
    let statusClass = "";
    let bgSoftClass = "";
    let explanation = [];

    // Prior check for revoked status
    if (previousScholarship === 'revoked') {
        status = "Not Eligible";
        statusClass = "status-error";
        bgSoftClass = "bg-error-soft";
        explanation.push("You are disqualified due to a previously revoked scholarship.");
    } else {
        if (category === 'merit') {
            let meetsGpa = cgpa >= 3.5;
            let meetsCredits = credits >= 30;
            let meetsAttendance = attendance >= 80;

            if (meetsGpa && meetsCredits && meetsAttendance) {
                status = "Eligible";
                statusClass = "status-success";
                bgSoftClass = "bg-success-soft";
                explanation.push("Required GPA of 3.5 or above is met.");
                explanation.push("Required 30+ credit hours is met.");
                explanation.push("Required 80%+ attendance is met.");
                if (previousScholarship === 'active') explanation.push("Existing scholarship will be renewed.");
            } else if (cgpa >= 3.3 && meetsCredits && meetsAttendance) {
                status = "Pending Review";
                statusClass = "status-neutral";
                bgSoftClass = "bg-neutral-soft";
                explanation.push("GPA is slightly below 3.5. Application will be reviewed by the committee manually.");
            } else {
                status = "Not Eligible";
                statusClass = "status-error";
                bgSoftClass = "bg-error-soft";
                if (!meetsGpa) explanation.push("Your GPA is lower than the 3.5 requirement.");
                if (!meetsCredits) explanation.push("You need to complete at least 30 credit hours.");
                if (!meetsAttendance) explanation.push("Your attendance is below the 80% requirement.");
            }
        } else if (category === 'need') {
            let meetsIncome = income <= 50000;
            let meetsGpa = cgpa >= 2.5;
            let meetsAttendance = attendance >= 75;

            if (meetsIncome && meetsGpa && meetsAttendance) {
                status = "Eligible";
                statusClass = "status-success";
                bgSoftClass = "bg-success-soft";
                explanation.push("Family income is within the $50,000 limit.");
                explanation.push("GPA meets the 2.5 minimum requirement.");
                explanation.push("Attendance meets the 75% minimum requirement.");
                if (previousScholarship === 'active') explanation.push("Existing aid will be renewed.");
            } else if (income > 50000 && income <= 60000 && meetsGpa && meetsAttendance) {
                status = "Pending Review";
                statusClass = "status-neutral";
                bgSoftClass = "bg-neutral-soft";
                explanation.push("Income slightly exceeds the $50,000 limit. A manual override review is required.");
            } else {
                status = "Not Eligible";
                statusClass = "status-error";
                bgSoftClass = "bg-error-soft";
                if (!meetsIncome) explanation.push("Family income exceeds the limit for need-based aid.");
                if (!meetsGpa) explanation.push("Your GPA is lower than the 2.5 minimum requirement.");
                if (!meetsAttendance) explanation.push("Your attendance is below the 75% minimum requirement.");
            }
        }
    }

    const explanationHtml = explanation.map(ex => `<div class="mb-1 text-dim">&bull; ${ex}</div>`).join('');
    
    resultBox.innerHTML = `
        <div class="mb-3">
            <span class="status-label">Student</span>
            <div class="font-mono fs-5 text-signal">${studentName}</div>
            <div class="status-desc text-dim">${program} (Semester ${semester})</div>
            <div class="status-desc text-dim">Applying for: ${category === 'merit' ? 'Merit Scholarship' : 'Need-Based Aid'}</div>
        </div>
        
        <div class="mt-auto p-3 ${bgSoftClass}">
            <span class="status-label">Final Decision</span>
            <div class="status-result ${statusClass}">${status}</div>
            <div class="mt-3">
                <span class="status-label">Reasons</span>
                ${explanationHtml}
            </div>
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
