// Onclick function to go back to instructions page.
const button = document.getElementById("button1")
button.onclick = ()=>{
    window.location.href = "../screen-2/instructions.html";
}

// Questions with their answer options
const questions = [
    {
        question: "What is the name of the oldest lake in the world?",
        answers:[
            {text:"1.Lake Ohrid", correct: false},
            {text:"2.Lake Biwa", correct: false},
            {text:"3.Lake Malawi", correct: false},
            {text:"4.Lake Baikal", correct: true},
         
        ]
     },
     {
        question: "How many rings does the planet Saturn have?",
        answers:[
            {text:"1.twelve", correct: false},
            {text:"2.Seven", correct: true},
            {text:"3.Three", correct: false},
            {text:"4.Twenty one", correct: false},
         
        ]
     },
     {
        question: "Which of the following is capital of Madhya Pradesh?",
        answers:[
            {text:"1.Indore", correct: false},
            {text:"2.Ujjain", correct: false},
            {text:"3.Bhopal", correct: true},
            {text:"4.Dewas", correct: false},
         
        ]
     },
     {
        question: "How many times can you fold a paper in half?",
        answers:[
            {text:"1.Seven", correct: true},
            {text:"2.Ten", correct: false},
            {text:"3.Five", correct: false},
            {text:"4.Eight", correct: false},
         
        ]
     },
     {
        question: "How many members are there in the United Nations?",
        answers:[
            {text:"1.213", correct: false},
            {text:"2.193", correct: true},
            {text:"3.150", correct: false},
            {text:"4.200", correct: false},
         
        ]
     }
];

// declaring all the variables. 
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const time1 = document.getElementById("time1");
const correctSound = new Audio('../assets/correct.mp3');
const incorrectSound = new Audio('../assets/incorrect.mp3');
const nextSound = new Audio('../assets/nextbutton.mp3');

// initializing question index and score.
let currentQuestionIndex = 0;
let score = 0;

// creating a function to start the quiz.
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

// creating a function to show the questions with correct answers on click the specific answer button.
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answer.correct){
            button.dataset.correct = answer.correct;

        }
        button.addEventListener("click",selectAnswer);
    });
}

// creating reset button to reset the answer options when next question is shown.
function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

// creating the function to increment the score on clicking the correct option.
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect){
        selectedBtn.classList.add("correct");
        score++;
        correctSound.play();
    }
    else{
        selectedBtn.classList.add("incorrect");
        incorrectSound.play();
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

// declaring the variables required for css modal.
var modal = document.getElementById("scoreModal");
var openModalBtn = document.getElementById("openModalBtn");
var closeModalBtn = document.getElementById("closeModalBtn");

// Event listeners for opening and closing the modal
openModalBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);
window.addEventListener("click", outsideClick);

// Function to open the modal
function openModal() {
    modal.style.display = "block";
    timer.style.display = "none";
    localStorage.setItem('score', score);

     // Display the result with name, nickname and score in the modal
    var name = localStorage.getItem('name',name);
    var nickname = localStorage.getItem('nickname',nickname);
    var resultText = getResultText(score);
    document.getElementById("resultText").innerHTML = "Hello, "+ name +" ("+ nickname +"), " + resultText;
    document.getElementById("scoreText").innerHTML = "Your score: " + score;
}

// Function to close the modal
function closeModal() {
    modal.style.display = "none";
}

// Function to close the modal if clicked outside the modal content
function outsideClick(e) {
    if (e.target == modal) {
        closeModal();
    }
}

// Storing winning and losing phrases in variables. 

var winningPhrases = [
    "Congratulations! You nailed it!🥳",
    "Great job! You're a quiz master!😎",
    "You're on fire! Well done!🎉",
    "You're a quiz genius! 🥳",
    "Outstanding! You're making this quiz look easy.🎉"
    
];

var losingPhrases = [
    "Oops! Better luck next time.😔",
    "Don't worry, you'll get it next round.😢",
    "Nice try! Score well next time.😥"
];


// Function to get a random phrase from an array
function getRandomPhrase(array) {
    var randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

// Function to determine the result text based on the score
function getResultText(score) {
    if (score >= 3) {
        return (getRandomPhrase(winningPhrases));
    } else {
        return (getRandomPhrase(losingPhrases));
    }
}

     

// creating function to handle the next button when questions end
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        openModal();
    }
}

// onclick functioning for next button.
nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
        nextSound.play();
    }
    else{
        startQuiz()
        
    }
});
startQuiz();

// Creating a timer
const timer = document.getElementById("timer")
var timer1;
let time = 20;

function startTimer(){
    
    timer.innerHTML = time;
    timer1 = setInterval(()=>{
        time--
        if(time==0){
            openModal()
        }
        timer.innerHTML = time;
    },1000);
    var storedScore = localStorage.getItem('score');
 console.log('Stored Score:', storedScore);
}

function resetTimer(timer1){
    clearInterval(timer1)
    startTimer()
}

startTimer()

// Background Audio 
const backgroundSound = new Audio("../assets/bgm.mp3");
backgroundSound.volume = 0.05;
backgroundSound.play()

backgroundSound.loop = true;

