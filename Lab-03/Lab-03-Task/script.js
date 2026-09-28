// ============================================================
// Hoisting Demonstration (Part J)
// ============================================================

// var is hoisted and initialized to undefined — no error, just undefined
console.log("hoistedVar before assignment:", hoistedVar); // undefined
var hoistedVar = "var hoisting works";

// let is hoisted but NOT initialized (Temporal Dead Zone) — throws ReferenceError
try {
    console.log(hoistedLet); // ReferenceError
} catch (e) {
    console.error("let hoisting error:", e.message);
}
let hoistedLet = "let hoisting demo";

// ============================================================
// Student Scenarios (Part M — 4 test cases)
// ============================================================
const scenarios = [
    {
        label: "Scenario 1 — High Performing",
        student: {
            name: "Ahmad Kaleem Bhatti",
            registrationNo: "242820",
            program: "BS Computer Science",
            semester: 5,
            cgpa: 3.9,
            attendance: 96,
            marks: { assignment: 88, midterm: 92, finalExam: 90 }
        }
    },
    {
        label: "Scenario 2 — Average Student",
        student: {
            name: "Ahmad Kaleem Bhatti",
            registrationNo: "242820",
            program: "BS Computer Science",
            semester: 5,
            cgpa: 2.8,
            attendance: 82,
            marks: { assignment: 65, midterm: 60, finalExam: 58 }
        }
    },
    {
        label: "Scenario 3 — Low Attendance",
        student: {
            name: "Ahmad Kaleem Bhatti",
            registrationNo: "242820",
            program: "BS Computer Science",
            semester: 5,
            cgpa: 3.7,
            attendance: 65,
            marks: { assignment: 85, midterm: 88, finalExam: 90 }
        }
    },
    {
        label: "Scenario 4 — Poor Academic Performance",
        student: {
            name: "Ahmad Kaleem Bhatti",
            registrationNo: "242820",
            program: "BS Computer Science",
            semester: 5,
            cgpa: 1.8,
            attendance: 68,
            marks: { assignment: 30, midterm: 35, finalExam: 25 }
        }
    }
];

// ============================================================
// Core Calculation & Logic Engine (Parts D–I, K)
// ============================================================
function evaluate(student) {
    const MAX_MARKS = 300; // 100 each for assignment, midterm, final

    // Academic Calculation (Part D) — Arithmetic Operators: +, *, /
    const totalObtainedMarks = student.marks.assignment + student.marks.midterm + student.marks.finalExam;
    const marksLost = MAX_MARKS - totalObtainedMarks; // subtraction (-)
    const percentage = (totalObtainedMarks / MAX_MARKS) * 100;
    const isEvenSemester = student.semester % 2 === 0; // modulus (%)

    // Grade Calculation (Part E) — Comparison Operators: >=, <
    let grade = "F";
    if (percentage >= 80) grade = "A";
    else if (percentage >= 70) grade = "B";
    else if (percentage >= 60) grade = "C";
    else if (percentage >= 50) grade = "D";

    // Pass / Fail (Part F) — Comparison: >=
    const passStatus = percentage >= 50 ? "Passed" : "Failed";
    const isFailing = passStatus === "Failed"; // strict equality: ===

    // Scholarship Eligibility (Parts G & H) — Logical: &&, ||, !
    // Gold: CGPA >= 3.8 AND attendance >= 90 AND percentage >= 85
    const isEligibleForGold = student.cgpa >= 3.8 && student.attendance >= 90 && percentage >= 85;
    // Silver: CGPA >= 3.5 AND attendance >= 80 AND percentage >= 75
    const isEligibleForSilver = student.cgpa >= 3.5 && student.attendance >= 80 && percentage >= 75;
    // ! (NOT): student does NOT have critically low attendance
    const hasGoodAttendance = !(student.attendance < 75);
    // || (OR): eligible for any scholarship
    const hasAnyScholarship = isEligibleForGold || isEligibleForSilver;

    let scholarshipStatus = "Not Eligible";
    if (isEligibleForGold && hasGoodAttendance) scholarshipStatus = "Gold Scholarship";
    else if (isEligibleForSilver && hasGoodAttendance) scholarshipStatus = "Silver Scholarship";

    // Academic Warning (Part I) — Logical: &&, ||
    const hasLowCgpa = student.cgpa <= 2.0;     // <=
    const hasLowAttendance = student.attendance < 75; // <
    const hasLowPercentage = percentage < 50;   // <

    let academicStatus = "Good Standing";
    if (hasLowPercentage && hasLowCgpa && hasLowAttendance) academicStatus = "Critical";
    else if (hasLowPercentage || hasLowCgpa || hasLowAttendance) academicStatus = "Academic Warning";

    return {
        totalObtainedMarks,
        MAX_MARKS,
        marksLost,
        percentage,
        isEvenSemester,
        grade,
        passStatus,
        isFailing,
        scholarshipStatus,
        academicStatus,
        hasGoodAttendance,
        hasAnyScholarship
    };
}

// ============================================================
// Dynamic Output — Render Report (Parts C, L)
// ============================================================
function renderReport(scenarioIndex) {
    const { student } = scenarios[scenarioIndex];
    const r = evaluate(student);

    const container = document.getElementById("academic-report-container");
    if (!container) return;

    const scholarshipColor = r.scholarshipStatus === "Not Eligible" ? "var(--text-muted)"
        : r.scholarshipStatus === "Gold Scholarship" ? "#f5c518" : "var(--allow)";
    const scholarshipBorder = r.scholarshipStatus === "Not Eligible" ? "var(--border)"
        : r.scholarshipStatus === "Gold Scholarship" ? "#f5c518" : "var(--allow)";
    const academicColor = r.academicStatus === "Good Standing" ? "var(--allow)"
        : r.academicStatus === "Critical" ? "#ff4444" : "var(--escalate)";

    container.innerHTML = `
        <!-- Scenario Switcher -->
        <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 2rem;">
            ${scenarios.map((s, i) => `
                <button
                    id="scenario-btn-${i}"
                    onclick="renderReport(${i})"
                    class="btn-project"
                    style="${i === scenarioIndex
                        ? "background-color: var(--escalate); color: var(--void);"
                        : "opacity: 0.6;"}"
                >
                    ${s.label}
                </button>
            `).join("")}
        </div>

        <!-- Report Card -->
        <div class="profile-wrapper" style="flex-direction: column; align-items: stretch; gap: 1.75rem;">

            <!-- Header -->
            <div style="text-align: center; border-bottom: 1px solid var(--border); padding-bottom: 1rem;">
                <p class="font-mono text-accent" style="letter-spacing: 0.15em; font-size: 0.85rem;">================================</p>
                <h3 class="font-mono" style="font-size: 1.4rem; font-weight: 700; letter-spacing: 0.08em; margin: 0.25rem 0;">STUDENT ACADEMIC REPORT</h3>
                <p class="font-mono text-accent" style="letter-spacing: 0.15em; font-size: 0.85rem;">================================</p>
            </div>

            <!-- Student Profile + Academic Marks (Part C) -->
            <div style="display: flex; flex-wrap: wrap; gap: 2rem;">

                <div style="flex: 1; min-width: 240px;">
                    <h4 class="font-mono text-dim" style="text-transform: uppercase; font-size: 0.78rem; letter-spacing: 0.08em; margin-bottom: 1rem; border-bottom: 1px solid var(--border-light); padding-bottom: 0.5rem;">Student Profile</h4>
                    <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">
                        <tr><td style="padding: 0.35rem 0; color: var(--text-muted); width: 140px;">Student Name</td><td style="color: var(--signal);">${student.name}</td></tr>
                        <tr><td style="padding: 0.35rem 0; color: var(--text-muted);">Registration No</td><td class="font-mono" style="color: var(--signal);">${student.registrationNo}</td></tr>
                        <tr><td style="padding: 0.35rem 0; color: var(--text-muted);">Program</td><td style="color: var(--signal);">${student.program}</td></tr>
                        <tr><td style="padding: 0.35rem 0; color: var(--text-muted);">Semester</td><td class="font-mono" style="color: var(--signal);">${student.semester} <span style="color: var(--text-dim); font-size: 0.8rem;">(${r.isEvenSemester ? "Even" : "Odd"})</span></td></tr>
                        <tr><td style="padding: 0.35rem 0; color: var(--text-muted);">CGPA</td><td class="font-mono" style="color: var(--signal);">${student.cgpa}</td></tr>
                        <tr><td style="padding: 0.35rem 0; color: var(--text-muted);">Attendance</td><td class="font-mono" style="color: ${r.hasGoodAttendance ? "var(--allow)" : "var(--escalate)"};">${student.attendance}%</td></tr>
                    </table>
                </div>

                <div style="flex: 1; min-width: 240px;">
                    <h4 class="font-mono text-dim" style="text-transform: uppercase; font-size: 0.78rem; letter-spacing: 0.08em; margin-bottom: 1rem; border-bottom: 1px solid var(--border-light); padding-bottom: 0.5rem;">Academic Marks</h4>
                    <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">
                        <tr><td style="padding: 0.35rem 0; color: var(--text-muted); width: 140px;">Assignment Marks</td><td class="font-mono" style="color: var(--signal);">${student.marks.assignment} / 100</td></tr>
                        <tr><td style="padding: 0.35rem 0; color: var(--text-muted);">Midterm Marks</td><td class="font-mono" style="color: var(--signal);">${student.marks.midterm} / 100</td></tr>
                        <tr><td style="padding: 0.35rem 0; color: var(--text-muted);">Final Exam Marks</td><td class="font-mono" style="color: var(--signal);">${student.marks.finalExam} / 100</td></tr>
                        <tr style="border-top: 1px solid var(--border);"><td style="padding: 0.5rem 0; color: var(--text-muted);">Total Marks</td><td class="font-mono" style="color: var(--signal); font-weight: 700;">${r.totalObtainedMarks} / ${r.MAX_MARKS}</td></tr>
                        <tr><td style="padding: 0.35rem 0; color: var(--text-muted);">Marks Lost</td><td class="font-mono" style="color: var(--escalate);">${r.marksLost}</td></tr>
                    </table>
                </div>

            </div>

            <!-- Results Dashboard -->
            <div class="dashboard-wrapper" style="padding: 1.25rem;">
                <div class="d-flex justify-content-between align-items-center flex-wrap gap-3">

                    <div class="dashboard-item" style="flex: 1; min-width: 130px; text-align: center;">
                        <div class="dashboard-label">Percentage</div>
                        <div class="dashboard-metric ${r.percentage >= 50 ? "text-green" : "text-accent"}">${r.percentage.toFixed(2)}%</div>
                        <div class="dashboard-subtext">Overall Score</div>
                    </div>

                    <div class="dashboard-item" style="flex: 1; min-width: 130px; text-align: center;">
                        <div class="dashboard-label">Grade</div>
                        <div class="dashboard-metric ${r.grade === "F" ? "text-accent" : "text-green"}">${r.grade}</div>
                        <div class="dashboard-subtext font-mono" style="color: ${r.isFailing ? "var(--escalate)" : "var(--allow)"};">${r.passStatus}</div>
                    </div>

                    <div class="dashboard-item" style="flex: 1; min-width: 130px; text-align: center; border-color: ${scholarshipBorder};">
                        <div class="dashboard-label">Scholarship</div>
                        <div class="dashboard-metric" style="font-size: 1.1rem; color: ${scholarshipColor};">${r.scholarshipStatus}</div>
                        <div class="dashboard-subtext">Eligibility</div>
                    </div>

                    <div class="dashboard-item" style="flex: 1; min-width: 130px; text-align: center; border-color: ${r.academicStatus === "Good Standing" ? "var(--allow)" : "var(--escalate)"};">
                        <div class="dashboard-label">Academic Status</div>
                        <div class="dashboard-metric" style="font-size: 1.1rem; color: ${academicColor};">${r.academicStatus}</div>
                        <div class="dashboard-subtext">Standing</div>
                    </div>

                </div>
            </div>

        </div>
    `;
}

// Render Scenario 1 by default
renderReport(0);
