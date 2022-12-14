// Declaring Variables
var score = 0;
var questionsIndex = 0;
var secondsRemaining = 76;
var holdInterval = 0;
var penalty = 10;

var currentTime = document.querySelector("#countdown-timer")
var timer = document.querySelector("#startQuiz")
var questionsDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#wrapper");
var ulCreate = document.createElement("ul");

// Questions Array

var questions = [
    {
        question: "______ tag is an extension to HTML that can enclose any number of JavaScript statements.",
        answers: ["<script>","<body>","<head>","<title>"],
        answer: "<script>"
    }, {
        question: 'Which of the following best describes JavaScript?',
        answers: ['a low-level programming language.','a scripting language precompiled in the browser.','a compiled scripting language.','an object-oriented scripting language.'],
        answer: 'an object-oriented scripting language.'
    }, {
        question: 'Using _______ statement is how you test for a specific condition.',
        answers: ['Select','If','Switch','For'],
        answer: 'If' 
    }, {
        question: 'Which built-in method calls a function for each element in the array?',
        answers: ['while()','loop()','forEach()','None of the above'],
        answer: 'forEach()'
    }, {
        question: 'For strict equality comparisons, we should use:',
        answers: ['=','==','===','===='],
        answer: '==='
    }, {
        question: 'The expression 8 > 8 evaluates to:',
        answers: ['True','False'],
        answer: 'False'
    },
];

//Starts timer on button click 
timer.addEventListener("click", function() {
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsRemaining--;
            currentTime.textContent = "Time: " + secondsRemaining;

            if (secondsRemaining <=0) {
                clearInterval(holdInterval);
                quizComplete();
                currentTime.textContent = "You have run out of Time"
            }
            }, 1000);
    }
    render(questionsIndex);
});

//Renders Questions to Page
    function render(questionsIndex) { 
        questionsDiv.innerHTML = "";
        ulCreate.innerHTML = "";

        for (var i = 0; i < questions.length; i++) {
            var userQuestion = questions[questionsIndex].question;
            var userAnswers = questions[questionsIndex].answers;
            questionsDiv.textContent = userQuestion;
        }
        userAnswers.forEach(function (newItem) {
            var listItem = document.createElement("li");
            listItem.textContent = newItem;
            questionsDiv.appendChild(ulCreate);
            ulCreate.appendChild(listItem);
            listItem.addEventListener("click", (compare));
        })
    }

//Compare Choices to Answers
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");

        if (element.textContent == questions[questionsIndex].answer) {
            score++;
            createDiv.textContent = "Correct";
        } else {
            secondsRemaining = secondsRemaining - penalty;
            createDiv.textContent = "Incorrect! The correct answer is: " + questions[questionsIndex].answer;
        }
    }

    questionsIndex++;

    if (questionsIndex >= questions.length) {
        quizComplete();
        createDiv.textContent = "End of Quiz" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionsIndex);
    }
    questionsDiv.appendChild(createDiv);
}

// Completed Quiz
function quizComplete() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";

    var createHeading = document.createElement("h1");
    createHeading.setAttribute("id","createHeading");
    createHeading,textContent = "COMPLETE";

    questionsDiv.appendChild(createHeading);

    var createPara = document.createElement("p");
    createPara.setAttribute("id", "createPara");

    questionsDiv.appendChild(createPara);

    if (secondsRemaining >=0) {
        var timeRemaining = secondsRemaining;
        var createPara2 = document.createElement("p");
        clearInterval(holdInterval);
        createPara.textContent = "Your final score is: " + timeRemaining;

        questionsDiv.appendChild(createPara2);
    }

    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter Your Initials: ";

    questionsDiv.appendChild(createLabel);

    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsDiv.appendChild(createInput);

    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    questionsDiv.appendChild(createSubmit);

    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {

            console.log("No value entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            // Navigate to final page
            window.location.replace("./HighScores.html");
        }
    });

}
