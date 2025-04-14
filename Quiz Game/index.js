const container = document.querySelector('.container');
const nextbtn = document.querySelector('.nextbtn');
const questionbox =document.querySelector('.question');
const choicesbox =document.querySelector('.choices');
const scorecard =document.querySelector('.scorecard');
const alert = document.querySelector('.alert');
const startbtn = document.querySelector('.Startbtn');
const timer = document.querySelector('.timer');


// Make an arrey of object that stores quiz details
const quiz =[
    {
        question: "Q. Which of the following is not a CSS box model property?",
        choices: ["margin", "padding", "border-radius", "border-collapse"],
        answer: "border-collapse"
    },
    {
        question: "Q. Which of the following is not a valid way to declare a function in JavaScript?",
        choices: ["function myFunction() {}", " let myFunction = function() {};", "myFunction: function() {}", "const myFunction = () => {};"],
        answer: "myFunction: function() {}"
    },
    {
        question: "Q. Which of the following is not a JavaScript data type?",
        choices: ["string", "boolean", "object", "float"],
        answer: "float"
    },
    {
        question: "Q. What is the purpose of the this keyword in JavaScript?",
        choices: ["It refers to the current function.", "It refers to the current object.", "It refers to the parent object.", " It is used for comments."],
        answer: "It refers to the current object."
    }
     
];

let currentquestionindex =0;
let score =0;
let quizover=0;
let timeleft = 15;
let timerid = null;

// To show question
const showquestion = () => {
    const questiondetails = quiz[currentquestionindex];
    questionbox.textContent = questiondetails.question;

    choicesbox.textContent = "";

    //All choices come in choice box
    for(let i=0; i< questiondetails.choices.length; i++){

        const currentchoice = questiondetails.choices[i];
        const choicediv = document.createElement('div');
        choicediv.textContent = currentchoice;
        choicediv.classList.add('choice');
        choicesbox.appendChild(choicediv);

        

        choicediv.addEventListener('click', () => {
            if (choicediv.classList.contains('selected')) {
                choicediv.classList.remove('selected');
            }
            else {
                choicediv.classList.add('selected');
            }
        });
    }
    if(currentquestionindex < quiz.length)
        strattimer();
    // console.log(questiondetails);
}

//Function to check answer
const checkanswer = () => {
    const selectedchoise = document.querySelector('.choice.selected');
    if(selectedchoise.textContent === quiz[currentquestionindex].answer){
        // alert("Correct Answer!");
        displayalert("Correct Answer!")
        score++;
    } 
    else{
        // alert("Wrong Answer!");
        displayalert(`Wrong Answer! "${quiz[currentquestionindex].answer}" is the correct Answer`);
    }
    // console.log(selectedchoise);

    timeleft = 15;
    currentquestionindex++;
    if(currentquestionindex < quiz.length){
        showquestion();
    }
    else{
        stoptimer();
        showscore();
        // quizover = true;
    }

}

//Function to show score
const showscore = () =>{
    questionbox.textContent = "";
    choicesbox.textContent = "";
    scorecard.textContent = `You Scored ${score} out of ${quiz.length}`;
    displayalert("You have completed your quiz");
    nextbtn.textContent="Play Again";
    quizover = true;
    timer.style.display = "none";



    // nextbtn.addEventListener('click',()=>{
    //     currentquestionindex = 0;
    //     showquestion();
    //     nextbtn.textContent = "Next";
    //     scorecard.textContent = "";
    // });
}

//Function to show alert  (Costmaisr)
const displayalert = (msg) =>{
    alert.style.display = "block";
    alert.textContent = msg;
    setTimeout(()=>{
        alert.style.display = "";
    },2000);
}

// Function to start timer
const strattimer = ()=>{
    clearInterval(timerid);            //check for any existing timer
    timer.textContent = timeleft;

    const countdown = ()=>{
        timeleft--;
        timer.textContent = timeleft;
        if(timeleft === 0){
            const confirmUser = confirm("Time Up!!! Do you want to play the quiz again");
            if(confirmUser){
                timeleft = 15;
                startquiz();
            }
            else{
                startbtn.style.display = "block";
                container.style.display = "none";
                timer.style.display = "none";
                return ;
            }
        }
    }
    timerid = setInterval(countdown,1000);
}

//Function to stop timer
const stoptimer = ()=>{
    clearInterval(timerid);
}


//Function to shuffle question (In unordered)
const shufflequestion = ()=>{
    for(let i=quiz.length-1; i>0; i--){
        const j =Math.floor(Math.random() * (i+1));
        [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
    }
    currentquestionindex = 0;
    showquestion();
}

const startquiz = () =>{
    timeleft = 15;
    timer.style.display = "flex";
    shufflequestion();
}

// Adding eventlistiner to start buttom
startbtn.addEventListener('click', ()=>{
    startbtn.style.display = "none";
    container.style.display = "block";
    showquestion();
    timer.style.display = "flex";
});

nextbtn.addEventListener('click',()=>{ 
    const selectedchoise = document.querySelector('.choice.selected');
    if(!selectedchoise && nextbtn.textContent === "Next"){
        // alert("select your answer");
        displayalert("select your answer");
        return ;
    }
    if(quizover){
        currentquestionindex = 0;
        nextbtn.textContent = "Next";
        scorecard.textContent = "";
        quizover = false;
        score = 0;
        startquiz();
    }
    else
        checkanswer();
    
});