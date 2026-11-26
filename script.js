
var questions = [
  {
    question: "Which keyword declares a constant in JavaScript?",
    options: ["var", "let", "const", "static"],
    answer: 2
  },
  {
    question: "Which tag is used for the largest heading?",
    options: ["&lt;h6&gt;", "&lt;h1&gt;", "&lt;head&gt;", "&lt;heading&gt;"],
    answer: 1
  },
  {
    question: "Which CSS property changes text color?",
    options: ["font-color", "text-color", "color", "background"],
    answer: 2
  },
  {
    question: "Which HTML tag is used to link a JavaScript file?",
    options: ["&lt;js&gt;", "&lt;script&gt;", "&lt;link&gt;", "&lt;javascript&gt;"],
    answer: 1
  },
  {
    question: "Which method adds an element to the end of an array?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    answer: 0
  },
  {
    question: "What does CSS stand for?",
    options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
    answer: 1
  },
  {
    question: "Which symbol is used for an ID selector in CSS?",
    options: [".", "#", "*", "&amp;"],
    answer: 1
  },
  {
    question: "Which method selects an element by its ID in JavaScript?",
    options: ["document.getElementById()", "document.querySelectorAll()", "document.getElementsByClassName()", "document.createElement()"],
    answer: 0
  },
  {
    question: "What will typeof [] return in JavaScript?",
    options: ["array", "object", "list", "undefined"],
    answer: 1
  },
  {
    question: "Which Bootstrap class makes a container full width?",
    options: [".container", ".container-fluid", ".row", ".col"],
    answer: 1
  }
];

var quizState = { currentIndex: 0, score: 0 };
var answered = false;   

function startQuiz() {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("quiz-screen").style.display = "block";
  showQuestion();
}

function showQuestion() {
  var current = questions[quizState.currentIndex];
  var total = questions.length;
  answered = false;

  document.getElementById("question-text").innerHTML = current.question;
  document.getElementById("question-count").innerHTML = "Question " + (quizState.currentIndex + 1) + " of " + total;
  document.getElementById("score").innerHTML = "Score: " + quizState.score;
  document.getElementById("progress-bar").style.width = ((quizState.currentIndex + 1) / total * 100) + "%";
  document.getElementById("next-btn").style.visibility = "hidden";

  if (quizState.currentIndex == total - 1) {
    document.getElementById("next-btn").innerHTML = "Finish";
  } else {
    document.getElementById("next-btn").innerHTML = "Next";
  }

  var html = "";
  for (var i = 0; i < current.options.length; i++) {
    html += '<button id="opt' + i + '" class="btn btn-outline-secondary option-btn" onClick="checkAnswer(' + i + ');">' + current.options[i] + '</button>';
  }
  document.getElementById("options").innerHTML = html;
}

function checkAnswer(chosen) {
  if (answered == true) {
    return;  
  }
  answered = true;

  var correct = questions[quizState.currentIndex].answer;

  if (chosen == correct) {
    document.getElementById("opt" + chosen).className += " correct";
    quizState.score++;
    document.getElementById("score").innerHTML = "Score: " + quizState.score;
  } else {
    document.getElementById("opt" + chosen).className += " wrong";
    document.getElementById("opt" + correct).className += " correct";
  }

  document.getElementById("next-btn").style.visibility = "visible";
}


function nextQuestion() {
  quizState.currentIndex++;

  if (quizState.currentIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}


function showResult() {
  document.getElementById("quiz-screen").style.display = "none";
  document.getElementById("result-screen").style.display = "block";

  var total = questions.length;
  document.getElementById("final-score").innerHTML = "You scored " + quizState.score + " / " + total;

  var percent = quizState.score / total * 100;
  var message = "";
  if (percent == 100) {
    message = "Perfect score! 🎉";
  } else if (percent >= 70) {
    message = "Great job! 👏";
  } else if (percent >= 40) {
    message = "Not bad, keep practicing!";
  } else {
    message = "Try again, you can do better!";
  }
  document.getElementById("result-message").innerHTML = message;
}


function restartQuiz() {
  quizState.currentIndex = 0;
  quizState.score = 0;
  document.getElementById("result-screen").style.display = "none";
  document.getElementById("start-screen").style.display = "block";
  showQuestion();
}