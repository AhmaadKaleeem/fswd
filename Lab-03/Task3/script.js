document.getElementById('productName').addEventListener('change', function(e) {
    const selectedOption = this.options[this.selectedIndex];
    const price = selectedOption.getAttribute('data-price');
    document.getElementById('unitPrice').value = price;
});

document.getElementById('shoppingForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const resultBox = document.getElementById('resultBox');
    const initialState = document.getElementById('initialState');
    
    const productElement = document.getElementById('productName');
    const productName = productElement.options[productElement.selectedIndex].text.split(' - ')[0];
    const unitPrice = parseFloat(document.getElementById('unitPrice').value);
    const quantity = parseInt(document.getElementById('quantity').value, 10);
    const customerType = document.getElementById('customerType').value;

    initialState.style.setProperty('display', 'none', 'important');
    resultBox.style.setProperty('display', 'flex', 'important');
    resultBox.className = 'output-box flex-grow-1 fade-in';

    if (isNaN(unitPrice) || unitPrice < 0) {
        showError("Price must be a positive number.");
        return;
    }
    if (isNaN(quantity) || quantity <= 0) {
        showError("Quantity must be at least 1.");
        return;
    }

    const subtotal = unitPrice * quantity;
    let discountRate = 0;
    
    if (customerType === 'premium') {
        discountRate = 0.15;
    } else if (customerType === 'student') {
        discountRate = 0.10;
    } else if (customerType === 'regular' && subtotal >= 1000) {
        discountRate = 0.05;
    }
    
    const discountAmount = subtotal * discountRate;
    const discountedTotal = subtotal - discountAmount;

    let deliveryCharge = 50;
    let deliveryMessage = "$50.00";
    if (customerType === 'premium' || discountedTotal > 800) {
        deliveryCharge = 0;
        deliveryMessage = "Free Delivery";
    }

    const finalPayable = discountedTotal + deliveryCharge;

    resultBox.innerHTML = `
        <div class="mb-3">
            <span class="status-label">Item</span>
            <div class="font-mono fs-5 text-signal">${productName}</div>
            <div class="status-desc text-dim">Quantity: ${quantity} @ $${unitPrice.toFixed(2)} each</div>
        </div>
        
        <table class="table-custom mb-4">
            <tbody>
                <tr>
                    <td>Subtotal</td>
                    <td class="text-end">$${subtotal.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Discount (${(discountRate * 100).toFixed(0)}%)</td>
                    <td class="text-end text-success">-$${discountAmount.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Delivery Charge</td>
                    <td class="text-end text-dim">${deliveryMessage}</td>
                </tr>
                <tr style="border-top: 1px solid var(--border-light)">
                    <td class="text-signal pt-3">Final Total</td>
                    <td class="text-end text-signal fs-4 font-mono pt-3">$${finalPayable.toFixed(2)}</td>
                </tr>
            </tbody>
        </table>

        <div class="mt-auto p-3 bg-success-soft">
            <span class="status-label">Payment Ready</span>
            <div class="status-result status-success">Success</div>
            <div class="status-desc">Discounts applied based on your buyer type.</div>
        </div>
    `;

    function showError(message) {
        resultBox.innerHTML = `
            <div class="mt-auto p-3 bg-error-soft">
                <span class="status-label">Error</span>
                <div class="status-result status-error">Calculation Failed</div>
                <div class="status-desc">${message}</div>
            </div>
        `;
    }
});
