// jshint esversion: 10
// jshint -W097
// use strict;

// ONINPUT Event
let inputs = Array.from(document.querySelectorAll("input"));
const tips = document.querySelector(".bill__tip");
const tipCollection = Array.from(document.querySelectorAll(".tips"));
const custom = document.querySelector(".custom__input");
const warn = Array.from(document.querySelectorAll(".warn"));

let tipPercent;
let billValue;
let numPeople;

tips.addEventListener("click", function(event) {
    let item = event.target;
    if (!item.classList.contains("tips")) return;
    let tipsArray = [...item.parentElement.children].slice(1, -1);
    tipsArray.forEach(tip => {
        tip.classList.remove("selected");
        tip.classList.add("notselected");
    });
    custom.value = "";
    custom.classList.remove("warning");
    item.classList.remove("notselected");
    item.classList.add("selected");
    tipPercent = Number.parseFloat(item.textContent);
    calc();
});

const box1 = document.querySelector(".box1");
box1.addEventListener("input", event => {
    if (!event.target.hasAttribute("type")) return;
    let item = event.target;
    if (item.id == "input1") {
        billValue = Number(item.value);
        if (billValue == 0) {
            warn[0].classList.add("warn-selected");
        } else {
            warn[0].classList.remove("warn-selected");
        }
    } else if (item.id == "input2") {
        numPeople = Number.parseInt(item.value);
        if (numPeople == 0) {
            warn[1].classList.add("warn-selected");
        } else {
            warn[1].classList.remove("warn-selected");
        }
    } else {
        tipCollection.forEach(tip => {
            tip.classList.remove("selected");
            tip.classList.add("notselected");
        });
        tipPercent = Number(item.value);
    }
    if (item.value == 0) {
        item.classList.add("warning");
    } else {
        item.classList.remove("warning");
        calc();
    }
});

let tipCalc = document.querySelector(".tip__calc");
let totalCalc = document.querySelector(".total__calc");

let tip__total;
let amt__total;
let calc = function() {
    if (typeof tipPercent !== "number" || tipPercent === 0 || typeof numPeople !== "number" || numPeople === 0 || typeof billValue !== "number" || billValue === 0) return;
    tip__total = billValue / numPeople * tipPercent / 100;
    amt__total = tip__total + billValue / numPeople;
    tipCalc.textContent = `$${tip__total.toFixed(2)}`;
    totalCalc.textContent = `$${amt__total.toFixed(2)}`;
};

const reset = document.querySelector(".box2__reset");
const input1 = document.querySelector("#input1");
const input2 = document.querySelector("#input2");

reset.addEventListener("click", event => {
    tipCollection.forEach(tip => {
        tip.classList.remove("selected");
        tip.classList.add("notselected");
    });

    let tipInterval = setInterval(() => {
        tipCalc.textContent = "$" + (Number(tipCalc.textContent.slice(1)) - 0.015).toFixed(2);
        if (Number(tipCalc.textContent.slice(1)) <= 0.06) {
            tipCalc.textContent = "$0.00";
            clearInterval(tipInterval);
        }
    }, 1);
    let amtInterval = setInterval(() => {
        totalCalc.textContent = "$" + (Number(totalCalc.textContent.slice(1)) - 0.11).toFixed(2);
        if (Number(totalCalc.textContent.slice(1)) <= 0.11) {
            totalCalc.textContent = "$0.00";
            clearInterval(amtInterval);
        }
    }, 1);
    let i1Interval = setInterval(() => {
        input1.value = (Number(input1.value) - 0.5).toFixed(2);
        if (Number(input1.value) <= 0.51) {
            input1.value = "";
            clearInterval(i1Interval);
        }
    }, 1);
    let i2Interval = setInterval(() => {
        input2.value = (Number(input2.value) - 0.11).toFixed(2);
        if (Number(input2.value) <= 0.11) {
            input2.value = "";
            clearInterval(i2Interval);
        }
    }, 1);
    let customInterval = setInterval(() => {
        custom.value = (Number(custom.value) - 0.11).toFixed(2);
        if (Number(custom.value) <= 0.11) {
            custom.value = "";
            clearInterval(customInterval);
        }
    }, 1);
    billValue = 0;
    numPeople = 0;
    tipPercent = 0;
});
