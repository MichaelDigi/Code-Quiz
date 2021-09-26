let mainMenu = document.getElementsByClassName("homescreen");
let startBtn = document.getElementsByClassName("startbtn");
let timer = document.getElementsByClassName("timer");
let questionscreen = document.getElementsByClassName("questionsscreen");
let questionsli = document.getElementsByClassName("questionsli");
let answer = document.getElementsByClassName("answer");
let q1 = document.getElementsByClassName("button1");
let q2 = document.getElementsByClassName("button2");
let q3 = document.getElementsByClassName("button3");
let q4 = document.getElementsByClassName("button4");
let endscreen = document.getElementsByClassName("endscreen");
let enterinitals = document.getElementsByClassName("enterinitals");
let submitHS = document.getElementsByClassName("submitHS");
let finalscore = document.getElementsByClassName("header");
let highscore = document.getElementsByClassName("highscore");
let hs = document.getElementsByClassName("hs");
let hsnames = document.getElementsByClassName("hsnames");
let showscore = document.getElementsByClassName("showscore");
let choices = document.getElementsByClassName("choice");
var hsbutton = document.getElementsByClassName("hsbutton");
let fscore = document.getElementById("score");

var Questions = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    Answer1: "script",
    Answer2: "javascript",
    Answer3: "js",
    Answer4: "scripting",
    correctAnswer: "script",
  },
  {
    question: "Which of the following is a server-side Java Script object?",
    Answer1: "Function",
    Answer2: "FileUpload",
    Answer3: "File",
    Answer4: "Date",
    correctAnswer: "File",
  },
  {
    question:
      "Which of the following is correct to write “Hello World” on the web page?",
    Answer1: "System.out.println(“Hello World”)",
    Answer2: "document.write(“Hello World”)",
    Answer3: "print(“Hello World”)",
    Answer4: "response.write(“Hello World”)",
    correctAnswer: "print(“Hello World”)",
  },
  {
    question:
      "Which of the following is used to capture all click events in a window?",
    Answer1: "window.captureEvents(Event.CLICK);",
    Answer2: "window.routeEvents(Event.CLICK );",
    Answer3: "window.handleEvents (Event.CLICK);",
    Answer4: "window.raiseEvents(Event.CLICK );",
    correctAnswer: "window.captureEvents(Event.CLICK);",
  },
  {
    question:
      "Which built-in method adds one or more elements to the end of an array and returns the new length of the array?",
    Answer1: "last()",
    Answer2: "put()",
    Answer3: "push()",
    Answer4: "None of the above.",
    correctAnswer: "push()",
  },
  {
    question:
      "Which of the following function of String object returns a number indicating whether a reference string comes before or after or is the same as the given string in sort order?",
    Answer1: "localeCompare()",
    Answer2: "search()",
    Answer3: "substr()",
    Answer4: "concat()",
    correctAnswer: "localeCompare()",
  },
  {
    question:
      "Which of the following function of Array object returns true if at least one element in this array satisfies the provided testing function?",
    Answer1: "reverse()",
    Answer2: "shift()",
    Answer3: "slice()",
    Answer4: "some()",
    correctAnswer: "some()",
  },
  {
    question: "round(7.25)",
    Answer1: "Math.round(7.25)",
    Answer2: "rnd(7.25)",
    Answer3: "javascript",
    Answer4: "Math.rnd(7.25)",
    correctAnswer: "rnd(7.25)",
  },
  {
    question: "How do you find the number with the highest value of x and y?",
    Answer1: "Math.max(x, y)",
    Answer2: "Math.ceil(x, y)",
    Answer3: "top(x, y)",
    Answer4: "ceil(x, y)",
    correctAnswer: "Math.max(x, y)",
  },

  {
    question: "Which event occurs when the user clicks on an HTML element?",
    Answer1: "onchange",
    Answer2: "onmouseover",
    Answer3: "onclick",
    Answer4: "onmouseclick",
    correctAnswer: "onclick",
  },
];
console.log(Questions);

var questionsLength = Questions.length;
var currentQuestion = 0;
var timeLeft = 75;
var Points = 0;
var score = 0;
var savescore = JSON.parse(localStorage.getItem("score")) || [];

function start() {
  endscreen[0].style.display = "none";
  mainMenu[0].style.display = "none";

  showQuestion();

  TimerInt = setInterval(function () {
    timeLeft--;
    timer[0].textContent = "Time Left: " + timeLeft;

    if (timeLeft <= 0) {
      clearInterval(TimerInt);
      dsplyscore();
    }
  }, 1000);

  questionscreen[0].style.display = "block";
}

function showQuestion() {
  endscreen[0].style.display = "none";

  if (currentQuestion === questionsLength) {
    return showscore();
  }

  var displayedQuestion = Questions[currentQuestion];
  console.log(displayedQuestion);
  console.log(questionsli);
  questionsli[0].innerHTML = "<p>" + displayedQuestion.question + "</p>";
  q1[0].innerHTML = displayedQuestion.Answer1;
  q2[0].innerHTML = displayedQuestion.Answer2;
  q3[0].innerHTML = displayedQuestion.Answer3;
  q4[0].innerHTML = displayedQuestion.Answer4;

  for (let i = 0; i < choices.length; i++) {
    choices[i].addEventListener("click", checkAnswer);
  }
}

function checkAnswer(event) {
  let correct = Questions[currentQuestion].correctAnswer;
  // console.log(event.target.textContent)
  if (
    event.target.textContent === correct &&
    currentQuestion !== questionsLength
  ) {
    timeLeft = timeLeft + 5;
    Points++;
    alert("Correct Answer!");
    currentQuestion++;
    showQuestion();
  } else if (
    event.target.textContent !== correct &&
    currentQuestion !== questionsLength
  ) {
    alert("Wrong answer! 10 second penalty");
    timeLeft = timeLeft - 10;
    timer[0].textContent = "Time left: " + timeLeft;
    currentQuestion++;
    showQuestion();
  } else {
    showscore();
  }
}

submitHS[0].addEventListener("click", function () {
  if (enterinitals[0].value === "") {
    alert("Please enter initial");
    return false;
  } else {
    var player = enterinitals[0].value.trim();
    var HScurrent = {
      name: player,
      score: timeLeft,
    };

    endscreen[0].style.display = "none";
    highscore[0].style.display = "flex";
    hsbutton[0].style.display = "flex";

    savescore.push(HScurrent);
    console.log(savescore);
    localStorage.setItem("score", JSON.stringify(savescore));
    dsplyHsScreen();
  }
});

function dsplyscore() {
  clearInterval(TimerInt);

  questionscreen[0].style.display = "none";
  endscreen[0].style.display = "inline";
  // showscore[0].innerHTML
  fscore.innerHTML = "Your final score is " + timeLeft;
}

function dsplyHsScreen() {
  mainMenu[0].style.display = "none";
  endscreen[0].style.display = "none";
  highscore[0].style.display = "inline";
  hs[0].style.display = "block";

  showHS();
}

function showHS() {
  hsnames[0].innerHTML = "";
  showscore[0].innerHTML = "";
  for (i = 0; i < savescore.length; i++) {
    let playername = document.createElement("li");
    playername.textContent = savescore[i].name + "  " + savescore[i].score;
    hsnames[0].appendChild(playername);
  }
}

function clearScore() {
  window.localStorage.clear();
  showscore[0].textContent = "";
  hsnames[0].textContent = "";
  savescore = [];
}

function playAgain() {
  highscore[0].style.display = "none";
  endscreen[0].style.display = "none";
  mainMenu[0].style.display = "flex";
  score = 0;
  timeLeft = 60;
  currentQuestion = 0;
}

startBtn[0].addEventListener("click", start);
