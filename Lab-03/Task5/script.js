document.getElementById('parkingForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const resultBox = document.getElementById('resultBox');
    const initialState = document.getElementById('initialState');
    
    const plate = document.getElementById('plate').value.trim();
    const vehicleType = document.getElementById('vehicleType').value;
    const ownerType = document.getElementById('ownerType').value;
    const hasId = document.getElementById('hasId').value;
    const permitStatus = document.getElementById('permitStatus').value;
    const specialAccess = document.getElementById('specialAccess').value;
    const parkingArea = document.getElementById('parkingArea').value;
    const spaces = parseInt(document.getElementById('spaces').value, 10);
    const parkingTime = parseInt(document.getElementById('parkingTime').value, 10);

    initialState.style.setProperty('display', 'none', 'important');
    resultBox.style.setProperty('display', 'flex', 'important');
    resultBox.className = 'output-box flex-grow-1 fade-in';

    if (!plate) {
        showError("Vehicle plate cannot be empty.");
        return;
    }
    if (isNaN(spaces)) {
        showError("Invalid spaces available input.");
        return;
    }
    if (isNaN(parkingTime) || parkingTime <= 0) {
        showError("Parking time must be at least 1 hour.");
        return;
    }

    let isApproved = false;
    let status = "";
    let reason = "";

    // Highest priority constraints
    if (ownerType !== 'visitor' && hasId === 'no') {
        status = "Authorization Required";
        reason = "Access Denied. University students and faculty must show a valid University ID.";
    } else if (parkingTime > 12 && ownerType === 'visitor') {
        status = "Access Restricted";
        reason = "Access Denied. Visitors cannot park for more than 12 hours.";
    } else if (spaces <= 0) {
        status = "Area Full";
        reason = "Sorry, the requested parking area is completely full.";
    } else if (permitStatus !== 'valid' && ownerType !== 'visitor') {
        status = "Authorization Required";
        reason = "Access Denied. Your parking permit is either expired or missing.";
    } else {
        // Special Access Override
        if (specialAccess === 'vip' || specialAccess === 'disabled') {
            isApproved = true;
            reason = `Access Granted. Priority clearance applied for ${specialAccess.toUpperCase()} status.`;
        } else {
            // Standard Sector Restrictions
            if (ownerType === 'faculty') {
                if (parkingArea === 'faculty_zone' || parkingArea === 'student_zone') {
                    isApproved = true;
                    reason = "Access Granted. Faculty can park in both Faculty and Student zones.";
                } else {
                    status = "Access Restricted";
                    reason = "Faculty members are not supposed to park in the Visitor zone.";
                }
            } else if (ownerType === 'student') {
                if (parkingArea === 'student_zone') {
                    isApproved = true;
                    reason = "Access Granted for Student zone.";
                } else {
                    status = "Access Restricted";
                    reason = "Students are only allowed to park in the Student zone.";
                }
            } else if (ownerType === 'visitor') {
                if (parkingArea === 'visitor_zone') {
                    isApproved = true;
                    reason = "Access Granted for Visitor zone.";
                } else {
                    status = "Access Restricted";
                    reason = "Visitors must park in the Visitor zone only.";
                }
            }
        }
    }

    if (isApproved) {
        status = "Gate Opened";
    }

    const finalClass = isApproved ? "status-success" : "status-error";
    const bgSoftClass = isApproved ? "bg-success-soft" : "bg-error-soft";
    
    resultBox.innerHTML = `
        <div class="mb-3">
            <span class="status-label">Vehicle Checked</span>
            <div class="font-mono fs-5 text-signal">${plate}</div>
            <div class="status-desc text-dim">Type: ${vehicleType.toUpperCase()} | Driver: ${ownerType.charAt(0).toUpperCase() + ownerType.slice(1)}</div>
        </div>
        
        <div class="mt-auto p-3 ${bgSoftClass}">
            <span class="status-label">Gate Response</span>
            <div class="status-result ${finalClass}">${status}</div>
            <div class="status-desc">${reason}</div>
        </div>
    `;

    function showError(message) {
        resultBox.innerHTML = `
            <div class="mt-auto p-3 bg-error-soft">
                <span class="status-label">Error</span>
                <div class="status-result status-error">Logic Fault</div>
                <div class="status-desc">${message}</div>
            </div>
        `;
    }
});
