const button = document.getElementById("button1")
button.onclick = ()=>{
    window.location.href = "../screen-2/instructions.html";
}

// Questions with their answer options
const questions = [
    {
        question: "What is the currency of Japan?",
        answers:[
            {text:"1.Dollar", correct: false},
            {text:"2.Yen", correct: true},
            {text:"3.Rupee", correct: false},
            {text:"4.Dinero", correct: false},
         
        ]
     },
     {
        question: "Who is the co-founder of Microsoft Corporation?",
        answers:[
            {text:"1.Sundar Pichai", correct: false},
            {text:"2.Elon Musk", correct: false},
            {text:"3.Paul Allen", correct: true},
            {text:"4.Steve Jobs", correct: false},
         
        ]
     },
     {
        question: "which is hardest metal in world?",
        answers:[
            {text:"1.Steel", correct: false},
            {text:"2.Iron", correct: false},
            {text:"3.Copper", correct: false},
            {text:"4.Chromium", correct: true},
         
        ]
     },
     {
        question: "Who painted the Mona Lisa?",
        answers:[
            {text:"1.Leonardo da Vinci", correct: true},
            {text:"2.Pablo Picasso", correct: false},
            {text:"3.Salvador Dalí ", correct: false},
            {text:"4.Frida Kahlo", correct: false},
         
        ]
     },
     {
        question: "Which is longest river in the world?",
        answers:[
            {text:"1.Nile", correct: true},
            {text:"2.Yellow river", correct: false},
            {text:"3.Brahmanputra", correct: false},
            {text:"4.Amazon river", correct: false},
         
        ]
     }
];



const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const time1 = document.getElementById("time1");
const correctSound = new Audio('../assets/correct.mp3');
const incorrectSound = new Audio('../assets/incorrect.mp3');
const nextSound = new Audio('../assets/nextbutton.mp3');


// initializing question index and score

let currentQuestionIndex = 0;
let score = 0;

// creating a function to start the quiz

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

// creating a function to show the questions with correct answers on click the specific answer button

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

// creating reset button to reset the answer options when next question is shown

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

// creating the function to increment the score on clicking the correct option.
// also disabling the cursor after selecting one option.

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



    // Display the result and score in the modal
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

// Simulate a win
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

// timer

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

// Audio 


const backgroundSound = new Audio("../assets/bgm.mp3");
backgroundSound.play()

backgroundSound.loop = true;

