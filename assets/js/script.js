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
        question: '______ tag is an extension to HTML that can enclose any number of JavaScript statements.',
        answers: ['<script>','<body>','<head>','<title>'],
        answer: '<script>'
    }, {
        question: 'Which of the following best describes JavaScript?',
        answers: ['a low-level programming language.','a scripting language precompiled in the browser.','a compiled scripting language.','an object-oriented scripting language.'],
        answer: 'an object-oriented scripting language.'
    }, {
        question: 'Using _______ statement is how you test for a specific condition.',
        answers: ['Select','If','Switch','For'],
        answer: 'If' 
    }, {
        question: 'HTML stands for',
        answers: ['HighText Machine Language','HyperText and links Markup Language','SwitcHyperText Markup Language','None of these'],
        answer: 'None of these'
    }, {
        question: 'Which of the following tag is used for inserting the largest heading in HTML?',
        answers: ['<h3>','<h1>','<h5>','<h6>'],
        correct_index: '<h1>'
    }, {
        question: 'How to create an ordered list (a list with the list items in numbers) in HTML?',
        answers: ['<ul>','<ol>','<li>','<i>'],
        correct_index: '<ol>'
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
    function render(questionIndex) { 
        questionsDiv.innerHTML = "";
        ulCreate.innerHTML = "";

        for (var i = 0; i < questions.length; i++) {
            var userQuestion = questions[questionIndex].question;
            var userAnswers = questions[questionIndex].answers;
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
        render(questionIndex);
    }
    questionsDiv.appendChild(createDiv);
}