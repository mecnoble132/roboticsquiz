const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex], currentQuestionIndex);
}

function showQuestion(question, questionNumber) {
  questionElement.innerText = `${questionNumber + 1}. ${question.question}`;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'What is the primary purpose of Robotics in Artificial Intelligence?',
    answers: [
      { text: 'To create human-like emotions', correct: false },
      { text: 'To study, create, and apply intelligent robots', correct: true },
      { text: 'To replace human workers entirely', correct: false },
      { text: 'To develop only mechanical machines', correct: false }
    ]
  },
  {
    question: 'Which of the following is NOT a key feature of robots?',
    answers: [
      { text: 'Large memory and efficient processors', correct: false },
      { text: 'Ability to learn from mistakes', correct: false },
      { text: 'Inability to interact with surroundings', correct: true },
      { text: 'Use of multiple sensors', correct: false }
    ]
  },
  {
    question: 'Which of the following is NOT a component of a robot?',
    answers: [
      { text: 'Actuators', correct: false },
      { text: 'DNA-based circuits', correct: true },
      { text: 'Vision Sensors', correct: false },
      { text: 'Electric Motors', correct: false }
    ]
  },
  {
    question: 'What does Mechanical Engineering contribute to Robotics?',
    answers: [
      { text: "It designs the robot's form and function", correct: true },
      { text: 'It powers and controls the robot', correct: false },
      { text: 'It develops the software for robot behavior', correct: false },
      { text: 'It provides network connectivity', correct: false }
    ]
  }
]
