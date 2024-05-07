"use strict"

window.onload = function () {
    let form = document.querySelector("#overnightStayForm");
    let submit = document.querySelector("#submitOvernightStay");

    form.addEventListener("submit", overnightStay);
}

function overnightStay(event) {
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

    let fullName = theForm.fullName.value;
    let adults = Number(theForm.numberOfAdults.value);
    let children = Number(theForm.numberOfChildren.value);

    // getGuestCount runs it's code, does alerts if needed, and will return a value
    // depending on the value I receive, I can tell overnightStay to not run the rest of its code
    let handler = getGuestCount(adults, children, typeOfRoom);

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
    <p></p>
    <p>Confirmation Number: ${getConfirmationNumber(fullName, startDate, numOfNights, adults, children)}</p>
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

function getGuestCount(adults, kids, roomType) {
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

function getConfirmationNumber(name, date, nights, adults, kids) {
    // the strucure we want is "${first 3 letters of name}-MMYYYY-${numberOfNights}:${numOfAdults}:${NumOfKids}"
    let confirmationNumber;

    // this gives the first 3 letters of name, in uppercase, and a hyphen: "AAA-"
    let trimmedName = ((name.slice(0, 3).toUpperCase()) + "-");

    // this gives us the number month, as a string: "MM"
    let month = date.slice(date.indexOf("-") + 1, date.lastIndexOf("-"));

    // this gives us the number year, as a string: "YYYY"
    let year = date.slice(0, date.indexOf("-"));

    // this concatinates the month, the year, and a hyphen: "MMYYYY-"
    let monthAndYear = month + year + "-";

    // this concatinates the nights given with a colon: "someNumber:"
    let nightsColon = nights + ":";

    // this concatinates the number of adults, a colon, and the number of children: "someNumber:someOtherNumber"
    let guests = (adults + ":" + kids)

    // this puts it all together
    confirmationNumber = trimmedName + monthAndYear + nightsColon + guests;

    return (confirmationNumber);
}