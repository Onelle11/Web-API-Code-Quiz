var startBtn = document.getElementById('startBtn');
var questionsBox = document.getElementById('questionsBox');
var qIndex = 0;
var complete = document.getElementById('complete');

var ticker;
var timeLeft = 60 * 5;
var penaltyAmount = 30;
var timer = document.getElementById('timer');

var quizQuestions = [
    {
        text: "Which of these champions wasn't released alongside the game?",
        answers: ['Soraka', 'Garen', 'Alistar', 'Nunu'],
        correctAnswer: 1,
    },
    {
        text: "At which game time does Baron Nashor spawn?",
        answers: ['15:00', '20:00', '18:00', '25:00'],
        correctAnswer: 1,
    },
    {
        text: "Which of these dragons is responsible for granting increased magic resistance to the team when slain?",
        answers: ['Mountain Drake', 'Hextech Drake', 'Infernal Drake', 'Ocean Drake'],
        correctAnswer: 2,
    },
    {
        text: "Which was the FIRST champion designed by Riot?",
        answers: ['Sion', 'Teemo', 'Master Yi', 'Singed'],
        correctAnswer: 3,
    }
]

function showQuestions(questionIndex) {
    questionsBox.innerHTML = "";

    var question = quizQuestions[questionIndex];

    var questionP = document.createElement('p');
    var questionText = document.createTextNode(question.text);
    questionP.appendChild(questionText);
    questionsBox.appendChild(questionP);

    //create an answer div
    var answerDiv = document.createElement('div');
    for (var i = 0; i < question.answers.length; i++){
        var answer = question.answers[i];
    
    //create an answerbtn
    var answerBtn = document.createElement('button');
    answerBtn.setAttribute('id', i);
    answerBtn.classList.add('answer-btn');

    answerBtn.addEventListener('click', function(event) {

        var isCorrect = isCorrectAnswerClick(

            parseInt(event.target.getAttribute('id')),
            question.correctAnswer
        );

        if (isCorrect) {

            qIndex++;
            showQuestions(qIndex);
        } else {
            timeLeft = timeLeft - penaltyAmount;
        }
    });

    var answerText = document.createTextNode(answer)
    answerBtn.append(answerText);
    answerDiv.appendChild(answerBtn);
    }
    questionsBox.appendChild(answerDiv);

    //what happens after the quiz
    if (questionIndex > quizQuestions.length - 1) {
        complete.style.display = "block";
        clearInterval(ticker);
        return;
    }
}

function startQuiz() {
    var quizIntro = document.getElementById('quizIntro');
    quizIntro.style.display = "none";

    showQuestions(qIndex);
    startTimer();
}

function isCorrectAnswerClick(answerIndex, correctAnswer) {
    
    if (answerIndex === correctAnswer) {
        alert('Good job!');
        return true;
    }
    alert('Try Again!');
    return false;
}

function toMMSS(time) {
    var sec_num = parseInt(time, 10); // don't forget the second param
    var minutes = Math.floor(sec_num / 60);
    var seconds = sec_num - minutes * 60;
  
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return minutes + ":" + seconds;
  }

function startTimer() {
    ticket = setInterval(function () {
        timer.innerHTML = toMMSS(Math.max(timeLeft, 0));
        timeLeft--;

        if (timeLeft <= -1) {
            clearInterval(ticker);
            questionsBox.innerHTML = "<h1> YOU RAN OUT OF TIME! </h1";
            return;
        }
    }, 1000);
}

startBtn.addEventListener('click', startQuiz);