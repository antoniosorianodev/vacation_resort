"use strict"

window.onload = function () {

    let rentACarForm = document.querySelector("#rentACarForm");

    rentACarForm.addEventListener("submit", calcCarRentalFees);
}

function calcCarRentalFees(event) {
    event.preventDefault();

    // let's get the form from the event and assign to a variable
    let theForm = event.target
    let numDays = Number(theForm.numDays.value);

    let totalCarRentalPrice = 29.99 * numDays
    let optionsCost = 0;
    let surcharge = 0;

    if (theForm.tollTag.checked) {
        optionsCost += (3.95 * numDays);
    }
    if (theForm.gps.checked) {
        optionsCost += (2.95 * numDays);
    }
    if (theForm.rsa.checked) {
        optionsCost += (2.95 * numDays);
    }

    // handle the surcharge for under 25
    if (theForm.under25.value === "yes") {
        surcharge = totalCarRentalPrice * 0.3;
        console.log("I hate young people so you pay extra")
    }

    let totalDue = totalCarRentalPrice + optionsCost + surcharge;

    let message = `
        <div>Car Rental Cost: $${totalCarRentalPrice.toFixed(2)}</div>
        <div>Options Cost: $${optionsCost.toFixed(2)}</div>
        <div>Under 25 surcharge: $${surcharge.toFixed(2)}</div>
        <div class="mt-3">Total Due: $${totalDue.toFixed(2)}</div>
    `;

    document.querySelector("#results").innerHTML = message;
}