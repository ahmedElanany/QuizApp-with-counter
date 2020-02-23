// select all elements
const start = document.getElementById("start"),
    quiz = document.getElementById("quiz"),
    question = document.getElementById("question"),
    qImg = document.getElementById("qImg"),
    choiceA = document.getElementById("A"),
    choiceB = document.getElementById("B"),
    choiceC = document.getElementById("C"),
    counter = document.getElementById("counter"),
    timeGauge = document.getElementById("timeGauge"),
    progress = document.getElementById("progress"),
    scoreDiv = document.getElementById("scoreContainer");
    

// create our questions

let questions = [
    {
        question: "What is the capital of Egypt ?",
        imgSrc: "img/cairo.jpg",
        choiceA : "Cairo",
        choiceB: "Gazza",
        choiceC: "Giza",
        correct: "A"
    },{
        question: "which city has eiffle tower ?",
        imgSrc: "img/paris.jpg",
        choiceA : "USA",
        choiceB: "France",
        choiceC: "Italy",
        correct: "B"
    },{
        question: "what is the capital of Turkey ?",
        imgSrc: "img/turkey.jpg",
        choiceA : "Istanbul",
        choiceB: "Izmir",
        choiceC: "Ankara",
        correct: "C"
    }
];

//create some variables
const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10,
    gaugewidth = 150,
    gaugeUnit = gaugewidth / questionTime;
let TIMER = 0;
let score = 0;

// render a question function
function renderQuestion(){
    let q = questions[runningQuestion];
    question.innerHTML = "<p>" + q.question + "</p>";
    qImg.innerHTML = "<img src=" + q.imgSrc + ">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click", stratQuiz);


// start quiz
function stratQuiz(){
    start.style.display = "none";
    scoreDiv.style.display = "none";
renderQuestion();
quiz.style.display = "block";
renderProgress();
renderCounter();
TIMER = setInterval(renderCounter, 1000);

}



//progress render
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class ='prog' id=" + qIndex + "></div>";
    }
}

//counter render  


function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++;
    }else {
        count = 0;
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            clearInterval(TIMER);
            scoreRender();
        }
        
    }
}
//check answer 
function checkAnswer(answer){
    if(answer == questions[runningQuestion].correct){
        score++;
        answerIsCorrect();

    }else{
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        clearInterval(TIMER);
        scoreRender();
        
    }
}
// answer is correct and wrong functions
function answerIsCorrect (){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}
function answerIsWrong (){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}
// score render function
function scoreRender(){
    scoreDiv.style.display = "flex";
    //calc the amount of question percent answered
    const scorePerCent = Math.round(100 * score/questions.length);

    //choose the images based on the score
    let img = (scorePerCent >= 80) ? "img/5.png":
            (scorePerCent >= 60) ? "img/4.png":
            (scorePerCent >= 40) ? "img/3.png":
            (scorePerCent >= 20) ? "img/2.png": "img/1.png";

    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>" + scorePerCent+ "%</p>";
    
}


