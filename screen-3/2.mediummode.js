// Onclick function to go back to instructions page.
const button = document.getElementById("button1")
button.onclick = ()=>{
    window.location.href = "../screen-2/instructions.html";
}


// Questions with their answer options

const questions = [
    {
        question: "Who painted the 'Starry Night'?",
        answers:[
            {text:"1.Leonard da Vinci", correct: false},
            {text:"2.Vincent van Gogh", correct: true},
            {text:"3.Pablo Picasso", correct: false},
            {text:"4.Frida Kahlo", correct: false},
         
        ]
     },
     {
        question: "What is the term for a sudden and widespread disaster?",
        answers:[
            {text:"1.Pandemic", correct: false},
            {text:"2.Epidemic", correct: false},
            {text:"3.catastrophe", correct: true},
            {text:"4.triumph", correct: false},
         
        ]
     },
     {
        question: "What is the smallest unit of data in a computer?",
        answers:[
            {text:"1.chip", correct: false},
            {text:"2.memory", correct: false},
            {text:"3.Byte", correct: false},
            {text:"4.bit", correct: true},
         
        ]
     },
     {
        question: "What is the term for a word that is spelled the same backward as forward?",
        answers:[
            {text:"1.palindrome", correct: true},
            {text:"2.Lexicon", correct: false},
            {text:"3.Homophone", correct: false},
            {text:"4.Homograph", correct: false},
         
        ]
     },
     {
        question: "What is the unit of electrical resistance?",
        answers:[
            {text:"1.Ohm (Ω)", correct: true},
            {text:"2.Weber (Wb)", correct: false},
            {text:"3.Hertz (Hz)", correct: false},
            {text:"4.Farad (F)", correct: false},
         
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

