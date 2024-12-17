let submit = document.querySelector("#submit");
let questionOne = document.querySelector("#question-one");
let questionTwo = document.querySelector("#question-two");
let questionThree = document.querySelector("#question-three");
const form = document.querySelector("#quiz");
let total = 0;
const dialog = document.querySelector("#dialog");
const closeButton = document.querySelector("#close-button");
const results = document.querySelector("#results");
const title = document.querySelector("#title");

form.onsubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    let object = Object.fromEntries(formData.entries());
    console.log(...formData);
    numOfCorrectAnswers(object);
    openDialog(total);
    highlightAnswers(object);
};

function numOfCorrectAnswers(object) {
    if (object["question-one"] === "b") {
        total++;
    }
    if (object["question-two"] === "a") {
        total++;
    }
    if (object["question-three"] === "d") {
        total++;
    }
}

function openDialog(total) {
    dialog.showModal();
    switch (total) {
        case 0:
            title.innerHTML = "Lactose Intolerant";
            results.innerHTML = "Boo! You got 0 correct. Try again next \"thyme\".";
            break;
        case 1:
            title.innerHTML = "Slice of Failure";
            results.innerHTML = "Boo! You got only 1 correct. Try again next \"thyme\".";
            break;
        case 2:
            title.innerHTML = "Slice of Success";
            results.innerHTML = "Nice job! You got 2/3 correct. You crusted it!!!";
            break;
        case 3:
            title.innerHTML = "Pizza Savant";
            results.innerHTML = "Supreme!! You got 3/3 correct! No matter how you slice it, you're amazing!";
            break;
        default:
            title.innerHTML = "Unknown Result";
            results.innerHTML = "Something went wrong. Please try again.";
            break;
    }
}

function highlightAnswers(object) {
    highlightAnswer("question-one", "b", object["question-one"]);
    highlightAnswer("question-two", "a", object["question-two"]);
    highlightAnswer("question-three", "d", object["question-three"]);
}

function highlightAnswer(questionId, correctAnswer, selectedAnswer) {
    const questionDiv = document.getElementById(questionId);
    const options = questionDiv.querySelectorAll(".options");

    options.forEach(option => {
        const input = option.querySelector("input[type='radio']");
        const label = option.querySelector("label");

        if (input.value === correctAnswer) {
            label.style.backgroundColor = "green";
        } else if (input.value === selectedAnswer) {
            label.style.backgroundColor = "red";
        }
    });
}

closeButton.addEventListener("click", () => {
    dialog.close();
    pageAfterSubmission();
});

function pageAfterSubmission() {
    // Removes submit button
    const elem = document.getElementById("submit");
    elem.parentNode.removeChild(elem);
    // Removes intro paragraph
    const elem2 = document.getElementById("intro");
    elem2.parentNode.removeChild(elem2);
    // Adds refresh button
    const refreshButton = document.createElement("button");
    refreshButton.id = "refresh";
    refreshButton.textContent = "Refresh";
    refreshButton.style.backgroundColor = "blue";
    refreshButton.style.color = "white";
    refreshButton.style.padding = "10px 20px";
    refreshButton.style.border = "none";
    refreshButton.style.borderRadius = "5px";
    refreshButton.style.fontSize = "18px";
    refreshButton.style.cursor = "pointer";
    refreshButton.style.transition = "background-color 0.2s ease, transform 0.2s ease";
    refreshButton.style.marginTop = "20px";
    refreshButton.style.display = "block";
    refreshButton.style.marginLeft = "auto";
    refreshButton.style.marginRight = "auto";
    refreshButton.addEventListener("click", () => {
        location.reload();
    });
    const questionThree = document.getElementById("question-three");
    questionThree.parentNode.insertBefore(refreshButton, questionThree.nextSibling);
    document.body.classList.add("keep-color");
}