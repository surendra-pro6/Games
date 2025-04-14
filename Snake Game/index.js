
let inputDir = {x:0, y:0};
const foodsound = new Audio('food.mp3');
const gameoversound = new Audio('Out.mp3');
const musicsound = new Audio('background.mp3');
const movesound = new Audio('changedirection.mp3');
let speed = 5;
let lastpaintTime = 0;
let snakearr = [  
    {x:13, y:15} 
]
food = {x:1, y:15}
let score = 0;
let hiscoreval = 0;
// musicsound.play();

function call(){
    setInterval(increase,1000);
}
function increase() {
    speed +=0.05;
}

// This is for frequency of frame
function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime - lastpaintTime)/1000 < 1/speed)                           // frame change after every 0.5sec 
        return ;

    lastpaintTime = ctime;                                               // previous time of frame change equal to lastpainttime
    gameengine();
}


function iscollide(snake){
   // Uf you bump into yourself
   for(let i = 1; i < snakearr.length; i++){
    if(snake[i].x === snake[0].x && snake[i].y === snake[0].y)
        return true;
   }
   // If you collide in wall
   if(snake[0].x >=22 || snake[0].x <=0 || snake[0].y >=18 || snake[0].y <=0){
    return true;
   }
}




function gameengine(){
    // Step 1: Updating the snake arrey
    if(iscollide(snakearr)){
        gameoversound.play();
        musicsound.pause();
        inputDir = {x: 0, y:0};
        alert("Game Over. press any key to play again");
        snakearr = [{x:13, y:15}];
        musicsound.play();
        score = 0;
        speed = 5;
    }


    // Increament the score and regenerate the food
    if(snakearr[0].y === food.y && snakearr[0].x === food.x){
        score +=1;
        if(score > hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
            hiscorebox.innerHTML = "High Score: " + hiscoreval;
        }
        scorebox.innerHTML = 'score:' + score;
        foodsound.play();
        snakearr.unshift({x: snakearr[0].x + inputDir.x, y: snakearr[0].y + inputDir.y});                   // Size increment
        let a =2;
        let b =16;
        food = {x: Math.round(a + (b-a)*Math.random()),y:Math.round(a + (b-a)*Math.random())};                     // Food position
    }


    //Moving the snake in forword
    for(let i = snakearr.length-2; i>=0; i--){
        snakearr[i+1] = {...snakearr[i]};
    }
    snakearr[0].x +=inputDir.x;
    snakearr[0].y +=inputDir.y;



    // Step 2: Render the snake
    board.innerHTML = "";
    snakearr.forEach((e,index)=>{
        snakeelement = document.createElement('div');
        snakeelement.style.gridRowStart = e.y;
        snakeelement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeelement.classList.add('head');
        }else
            snakeelement.classList.add('snake');
        board.appendChild(snakeelement);
    })

    //Display the food
        foodelement = document.createElement('div');
        foodelement.style.gridRowStart = food.y;
        foodelement.style.gridColumnStart = food.x;
        foodelement.classList.add('food');
        board.appendChild(foodelement);


}



// Main logic start here
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscorebox.innerHTML = "High Score : " + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir = {x:0, y:1};                            // start the game
    movesound.play();
        switch(e.key){
        case "ArrowUp": 
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown": 
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft": 
            console.log("Arrowleft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight": 
            console.log("Arrowright");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});