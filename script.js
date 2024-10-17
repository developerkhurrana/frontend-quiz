const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const welcomeScreen = document.getElementById("welcome-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const questionText = document.getElementById("question-text");
const optionsContainer = document.querySelector(".options-container");
const scoreDisplay = document.getElementById("score");

let currentQuestion = 0;
let score = 0;

const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    correct: 2,
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    correct: 1,
  },
];

startBtn.addEventListener("click", () => {
  welcomeScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  loadQuestion();
});

function loadQuestion() {
  const question = quizData[currentQuestion];
  questionText.textContent = question.question;

  optionsContainer.innerHTML = "";
  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "options-btn";
    button.textContent = option;
    button.dataset.id = index;
    button.addEventListener("click", selectAnswer);
    optionsContainer.appendChild(button);
  });

  nextBtn.classList.add("hidden");
}

function selectAnswer(e) {
  const selected = e.target.dataset.id;

  if (selected == quizData[currentQuestion].correct) {
    score++;
  }

  const optionButtons = document.querySelectorAll(".options-btn");

  optionButtons.forEach((btn) => {
    if (btn.dataset.id != selected) {
      btn.disabled = true;
    }
  });

  nextBtn.classList.remove("hidden");
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    endQuiz();
  }
});

function endQuiz() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
  scoreDisplay.textContent = `${score} / ${quizData.length}`;
}

restartBtn.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  resultScreen.classList.add("hidden");
  welcomeScreen.classList.remove("hidden");
  loadQuestion();
});
