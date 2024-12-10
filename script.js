const quizQuestions = [
  {
    question: "What is the capital of Canada?",
    options: ["Ontario", "Ottawa", "Winnipeg", "Victoria"],
    answer: "Ottawa"
  },
  {
    question: "What is the biggest mountain range in Canada?",
    options: ["Rocky Mountains", "Purcell Mountains", "Mealy Mountains", "Monteregian Hills"],
    answer: "Rocky Mountains"
  },
  {
    question: "How many oceans surround Canada?",
    options: ["5", "2", "7", "3"],
    answer: "3"
  },
  {
    question: "When is Remembrance Day commemorated in Canada?",
    options: ["11 November", "10 December", "09 May", "30 July"],
    answer: "11 November"
  },
  {
    question: "What month is Black History Month in Canada?",
    options: ["June", "February", "March", "July"],
    answer: "February"
  },
];

let currentQuestionIndex = 0;  // To track the current question
let selectedAnswer = ''; // To store the selected answer

// Function to display the current question
function displayQuestion() {
  rules.innerHTML = "";
  const contentArea = document.getElementById("contentArea");
  contentArea.innerHTML = "";  // Clear previous content

  // Get the current question from the array
  const currentQuestion = quizQuestions[currentQuestionIndex];

  // Create the question div
  const questionDiv = document.createElement("div");
  questionDiv.classList.add("question");

  // Add the question text
  const questionText = document.createElement("h3");
  questionText.textContent = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;
  questionDiv.appendChild(questionText);

  // Add the options
  const optionsList = document.createElement("ul");
  currentQuestion.options.forEach(option => {
    const listItem = document.createElement("li");
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "radio";
    input.name = `question-${currentQuestionIndex}`;
    input.value = option;
    input.addEventListener("change", handleAnswerChange); // Track answer selection
    label.appendChild(input);
    label.appendChild(document.createTextNode(option));
    listItem.appendChild(label);
    optionsList.appendChild(listItem);
  });

  questionDiv.appendChild(optionsList);
  contentArea.appendChild(questionDiv);

  // Add feedback message area (hidden initially)
  const feedbackMessage = document.createElement("div");
  feedbackMessage.id = "feedbackMessage";
  feedbackMessage.style.display = "none";  // Hidden by default
  contentArea.appendChild(feedbackMessage);

  // Add a "Next" button after the question
  const nextButton = document.createElement("button");
  nextButton.classList.add("next-btn");
  nextButton.textContent = "Next";
  nextButton.disabled = true; // Disable until the correct answer is selected
  nextButton.addEventListener("click", nextQuestion); // Event listener for the next button
  contentArea.appendChild(nextButton);
}

// Handle the answer selection
function handleAnswerChange(event) {
  const selectedOption = event.target.value;
  selectedAnswer = selectedOption; // Store the selected answer

  // Show feedback message
  const feedbackMessage = document.getElementById("feedbackMessage");

  // Check if the selected answer is correct
  if (selectedAnswer === quizQuestions[currentQuestionIndex].answer) {
    feedbackMessage.style.display = "none"; // Hide feedback if answer is correct
    enableNextButton(); // Enable the "Next" button
  } else {
    feedbackMessage.style.display = "block"; // Show feedback message
    feedbackMessage.textContent = "Incorrect answer, please try again."; // Feedback message
  }
}

// Enable the "Next" button when the answer is correct
function enableNextButton() {
  const nextButton = document.querySelector(".next-btn"); // Make sure to select the correct button
  nextButton.disabled = false; // Enable the "Next" button
}

// Function to move to the next question
function nextQuestion() {
  currentQuestionIndex++;

  // Check if there are more questions
  if (currentQuestionIndex < quizQuestions.length) {
    displayQuestion();  // Display the next question
  } else {
    // Quiz is finished, show congratulations message
    displayCompletionMessage();
  }
}

// Function to display the completion message
function displayCompletionMessage() {
  const contentArea = document.getElementById("contentArea");
  contentArea.innerHTML = "";
  var element = document.getElementById("contentArea");
  element.classList.add("completed");
  const completedDiv = document.createElement("div");
  completedDiv.classList.add("done");
  completedDiv.textContent = "congratulations, you've completed the quiz!";  // Add the completion message
  contentArea.appendChild(completedDiv);
  contentArea.appendChild(element);  // Append the message to the content area
}

// Function to start the quiz
function startQuiz() {
  // Hide any rules or instructions
  const rules = document.getElementsByClassName("rules");
  if (rules.length > 0) {
    rules[0].style.display = "none";  // Hide the rules
  }

  // Display the first question
  displayQuestion();
}

// Event listener for the "Start Quiz" button
document.getElementById("startQuizBtn").addEventListener("click", startQuiz);
