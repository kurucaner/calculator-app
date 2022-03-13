let display = document.querySelector(".screen__display");
let displayValue = display.querySelector(".screen__display__value");
const elms = document.querySelectorAll("*");
const themeBar = document
    .querySelector(".header__change-theme__options")
    .getElementsByClassName("div");

changeTheme = (theme) => {
    display.style.transition = "border-color 0.5s ease-out";
    for (let i = 0; i < elms.length; ++i) {
        elms[i].setAttribute("data-theme", theme);
    }
};

setInterval(() => {
    if (displayValue.clientWidth >= display.clientWidth - 30) {
        display.style.borderLeft = "3rem solid var(--screen_bg)";
        display.style.borderRight = "3rem solid var(--screen_bg)";
    } else if (displayValue.clientWidth < display.clientWidth + 20) {
        display.style.transition = "none";
        display.style.borderLeft = "none";
        display.style.borderRight = "none";
    }
}, 0);

var res = document.querySelector(".screen__display__value").innerHTML;
const btns = document.getElementById("buttons").getElementsByTagName("button");

function scrollToEnd() {
    document.querySelector(".screen__display").scrollRight = 1000;
}

let boxShadowCSS = [];

function addComma(str) {
    return Number(str).toLocaleString();
}
function fix(str) {
    str = str.replaceAll(",", "");
    str = str.replaceAll("x", "*");
    return str;
}

for (let i = 0; i < btns.length; ++i) {
    boxShadowCSS.push(btns[i].style.boxShadow);
}
for (let i = 0; i < btns.length; ++i) {
    btns[i].addEventListener("mousedown", () => {
        btns[i].style.boxShadow = "none";
    });
    btns[i].addEventListener("touchstart", () => {
        btns[i].style.boxShadow = "none";
    });
    btns[i].addEventListener("mouseup", () => {
        btns[i].style.boxShadow = boxShadowCSS[i];
    });
    btns[i].addEventListener("touchend", () => {
        btns[i].style.boxShadow = boxShadowCSS[i];
    });
}

function print() {
    scrollToEnd();
    document.querySelector(".screen__display__value").innerHTML = res;
}
function isFull() {
    return res.length > 50;
}

function checkFalse() {
    return (
        document.querySelector(".screen__display__value").innerHTML ==
            "SyntaxError" ||
        document.querySelector(".screen__display__value").innerHTML ==
            "MathError"
    );
}

function clicked(e) {
    res = res.replaceAll(",", "");
    if (isFull()) return;
    if (checkFalse()) {
        res = "0";
        print();
    }
    let x = e.getAttribute("data-value");

    if (res == "0" && x >= "0" && x <= "9") {
        res = x;
        print();
    } else {
        res += x;
        print();
    }
}

function del() {
    res = fix(res);
    if (checkFalse()) {
        res = "0";
        print();
    }
    if (res.length > 1) {
        res = res.substring(0, res.length - 1);
        print();
    } else {
        res = "0";
        print();
    }
}

function reset() {
    res = "0";
    print();
}

function equal() {
    try {
        eval(fix(res));
    } catch (e) {
        if (e instanceof SyntaxError) res = "SyntaxError";
        print();
        return;
    }
    res = addComma(eval(fix(res)));
    if (
        res == "Infinity" ||
        res == "NaN" ||
        res == "undefined" ||
        res == "null" ||
        res == "∞"
    )
        res = "MathError";
    print();
}
