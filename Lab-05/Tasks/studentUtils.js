export const DEPARTMENT_NAME = "Computer Science";

export function calculateTotal(...marks) {
    return marks.reduce((sum, mark) => sum + mark, 0);
}

export const calculateAverage = (total, count) => {
    return (total / count).toFixed(2);
};

export function getGrade(marks) {
    if (marks >= 80) return "A";
    if (marks >= 70) return "B";
    if (marks >= 60) return "C";
    if (marks >= 50) return "D";
    return "F";
}

export const getStatus = (marks) => marks >= 50 ? "Pass" : "Fail";

export default function formatStudentResult(name, rollNumber, total) {
    return `${name} - ${rollNumber} - Total: ${total}`;
}
