"use strict"

window.onload = function () {
    let form = document.querySelector("#bookYourStayForm");
    let submit = document.querySelector("#submitBookYourStay");

    form.addEventListener("submit", bookYourStay);
}

function bookYourStay(event) {
    event.preventDefault();

    let theForm = event.target;

    // startDate is in the format YYYY-MM-DD
    let startDate = theForm.checkInDate.value;
    let typeOfRoom;

    if (document.querySelector("#queen").checked) {
        typeOfRoom = "queen";
    } else if (document.querySelector("#king").checked) {
        typeOfRoom = "king";
    } else if (document.querySelector("#twoBedroom").checked) {
        typeOfRoom = "two";
    }

    let adults = Number(theForm.numberOfAdults.value);
    let children = Number(theForm.numberOfChildren.value);

    // occupancyLogic runs it's code, does alerts if needed, and will return a value
    // depending on the value I receive, I can tell bookYourStay to not run the rest of its code
    let handler = occupancyLogic(adults, children, typeOfRoom);

    if (handler === "quit") {
        return;
    }

    let numOfNights = Number(document.querySelector("#numberOfNights").value);

    let roomRate = getRoomRate(startDate, typeOfRoom);
    let discountedRoomRate = roomRate * (1 - (getDiscountRate()));
    let discountAmount = roomRate - discountedRoomRate;
    let subtotal = numOfNights * discountedRoomRate;

    // Tax rate of 12%
    let taxAmount = (subtotal) * 0.12;
    let total = subtotal + taxAmount;

    document.querySelector("#message").innerHTML = `
    <p>Orignal Room Cost: $${roomRate.toFixed(2)} </p>
    <p>Discount: -$${discountAmount.toFixed(2)}</p>
    <p>Discounted Room Cost: $${discountedRoomRate.toFixed(2)}</p>
    <p>Tax Amount: $${taxAmount.toFixed(2)}</p>
    <p>Total: $${total.toFixed(2)}</p>
    `
}

function getDiscountRate() {
    let discount;
    if (document.querySelector("#noDiscount").checked) {
        discount = 0;
    } else if (document.querySelector("#seniorDiscount").checked) {
        discount = 0.10;
    } else if (document.querySelector("#militaryDiscount").checked) {
        discount = 0.20;
    }
    return (discount);
}

function getRoomRate(date, roomType) {
    // logic could probably be cleaner, but this will do for now
    let costPerNight;

    // substring but better, of just the month section of the provided date, converted to type "number"
    let month = Number(date.slice((date.indexOf("-") + 1), date.lastIndexOf("-")));
    console.log(month);

    if (roomType === "queen") {
        if (month === 6 || month === 7 || month === 8) {
            costPerNight = 250;
        } else {
            costPerNight = 150;
        }
    } else if (roomType === "king") {
        if (month === 6 || month === 7 || month === 8) {
            costPerNight = 250;
        } else {
            costPerNight = 150;
        }
    } else if (roomType === "two") {
        if (month === 6 || month === 7 || month === 8) {
            costPerNight = 350;
        } else {
            costPerNight = 210;
        }
    }
    return (costPerNight);
}

function occupancyLogic(adults, kids, roomType) {
    let totalGuests = adults + kids;
    let message;
    if (roomType === "queen") {
        if (totalGuests > 5) {
            alert(`The room type "Queen" has a max occupancy limit of 5`);
            document.querySelector("#message").innerHTML = "<p>The room you selected will not hold your party</p>"
            message = "quit";
        }
    } else if (roomType === "king") {
        if (totalGuests > 2) {
            alert(`The room type "King" has a max occupancy limit of 2`);
            document.querySelector("#message").innerHTML = "<p>The room you selected will not hold your party</p>"
            message = "quit";
        }
    } else if (roomType === "two") {
        if (totalGuests > 6) {
            alert(`The room type "Two Bedroom Suite" has a max occupancy limit of 6`);
            document.querySelector("#message").innerHTML = "<p>The room you selected will not hold your party</p>"
            message = "quit";
        }
    }
    return (message);
}