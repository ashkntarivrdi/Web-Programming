document.addEventListener("DOMContentLoaded", function () {
    const inputs = document.querySelectorAll("input");
    const resultElement = document.getElementById("formulaResult");
    const profitElement = document.getElementById("profitResult");
    const avgPriceElement = document.getElementById("avgPriceResult");

    function updateFormula() {
        // Get input values and ensure they are non-negative
        let fee = parseFloat(document.getElementById("fee").value);
        let count = parseFloat(document.getElementById("count").value);
        let discount = parseFloat(document.getElementById("discount").value);
        let taxRate = parseFloat(document.getElementById("tax").value);
        let costInput = document.getElementById("cost").value.trim(); // Raw input
        let cost = parseFloat(costInput);

        // Validate inputs (no negatives)
        if (isNaN(fee) || isNaN(count) || isNaN(discount) || isNaN(taxRate) ||
            fee < 0 || count < 0 || discount < 0 || taxRate < 0 || taxRate > 100) {
            resultElement.textContent = "N/A";
            avgPriceElement.textContent = "N/A";
            profitElement.textContent = "N/A";
            return;
        }

        // Calculate total price with tax
        let subtotal = count * fee - discount;
        let taxAmount = (subtotal * taxRate) / 100;
        let totalPrice = subtotal + taxAmount;

        // Calculate average price per item
        let avgPrice = count > 0 ? totalPrice / count : 0;

        // Update outputs
        resultElement.textContent = totalPrice.toFixed(2);
        avgPriceElement.textContent = avgPrice.toFixed(2);

        // Show "N/A" for profit if cost is empty
        if (costInput === "" || isNaN(cost) || cost < 0) {
            profitElement.textContent = "N/A";
        } else {
            let totalCost = count * cost;
            let profit = totalPrice - totalCost;
            profitElement.textContent = profit.toFixed(2);
        }
    }

    // Input event listeners
    inputs.forEach(input => {
        input.addEventListener("input", function () {
            // Prevent negative numbers
            if (parseFloat(this.value) < 0) {
                this.value = "";
            }

            // Ensure tax does not exceed 100%
            if (this.id === "tax" && parseFloat(this.value) > 100) {
                this.value = "100";
            }

            updateFormula();
        });
    });

    updateFormula(); // Initial update to show "N/A"
});
