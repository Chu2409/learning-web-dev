/*
var numberButtons = document.querySelectorAll(".drum").length;

for (let i = 0; i < numberButtons; i++) {
    document.querySelectorAll(".drum")[i].addEventListener("click", function () {
        this.style.color = "white";
        new Audio("sounds/tom-1.mp3").play();
    })
}
*/

document.querySelectorAll(".drum").forEach(e => {
    e.addEventListener("click", function () {
        makeSound(this.innerHTML);
        buttonAnimation(this.innerHTML);
    })
});


document.addEventListener("keydown", function (e) {
    makeSound(e.key);
    buttonAnimation(e.key);
})

function makeSound(key) {
    switch (key) {
        case "w":
            new Audio("sounds/tom-1.mp3").play();
            break;
        case "a":
            new Audio("sounds/tom-2.mp3").play();
            break;
        case "s":
            new Audio("sounds/tom-3.mp3").play();
            break;
        case "d":
            new Audio("sounds/tom-4.mp3").play();
            break;
        case "j":
            new Audio("sounds/snare.mp3").play();
            break;
        case "k":
            new Audio("sounds/crash.mp3").play();
            break;
        case "l":
            new Audio("sounds/kick-bass.mp3").play();
            break;
        default:
            break;
    }
}

function buttonAnimation(currentKey) {
    var activeButton = document.querySelector("." + currentKey);
    activeButton.classList.add("pressed");

    setTimeout(function () {
        activeButton.classList.remove("pressed");
    }, 100)
}