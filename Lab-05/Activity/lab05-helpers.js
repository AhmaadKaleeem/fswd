export function getStatus(cgpa) {
    return cgpa >= 2.0 ? "Good Standing" : "Probation";
}

export function getDiscount(feeAmount) {
    return feeAmount > 50000 ? feeAmount * 0.1 : 0;
}

export default function formatHelperMessage(name, cgpa, feeAmount) {
    return `${name}: Status is ${getStatus(cgpa)}, Discount is Rs. ${getDiscount(feeAmount)}`;
}
