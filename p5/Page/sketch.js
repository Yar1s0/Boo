
var cx, cy;
var ghostWidth = 150;
var angle = 10;
var bounce = 0;
var x=[], y=[], c=[], d=[], dd=[];
var stars = 100;


function setup() {
    createCanvas(500,500);
    stars = (500 + 500) / 3;
    for (var i=0; i<stars; i++) {
        starInit(i);
    }
    //adds the blur and the shadow to all the
    drawingContext.shadowBlur = 60;
    drawingContext.shadowColor = "rgb(213, 219, 219)";
    //Putt the drawing in the center of the canvas
    cx = width/2;
    cy = height/2;
}

function draw() {
    background(0);
    //I created the function after the draw() functions close , and place the sae functions in the order that i want them to happen in my program
    for (var i=0; i<stars; i++) {
        starDraw(i);
    }
        translate(cx, cy + bounce);
        drawGhost();
        bounceGhost();
        hoveredGhost();
    }

    function drawGhost(){
        //creating the ghost
        noStroke();
        fill(251, 254, 249);
        //head created using an ellipse
        ellipse(0, -49, ghostWidth);
        //legs created using ellipses as well; but this time since I'm doing 3 identical circles in line , i might as well use a loop for it
        let offset = -ghostWidth/3;
        for(var i =0; i<3; i++){
            ellipse(offset, 89, ghostWidth/3);
            offset+=ghostWidth/3;
        }
        //arms
        ellipse(-75, -20, 60, 20);
        ellipse(75, -20, 60, 20);
        //body created using a rectangle
        rect(-75, -45, ghostWidth, 140);
        //eyes
        fill(30,31,32);
        ellipse(-15, -54, 19,23);
        ellipse(15, -54, 19,23);
        //mouth--> FORMULA OBTAINED BY :https://www.geeksforgeeks.org/p5-js-arc-function/
        arc(1,-9,50,60,0,PI);
        //mouse follower
         stroke(4);
        fill(255,255,127,240); //light yellow
        ellipse(mouseX-150,mouseY-110,13,13);
    }
    //function to make the ghost bounce
    function bounceGhost(){
        angle += 0.15;
        bounce = sin(angle)*8;
    }
   //function for the text "boo"
    function boo(){
        textSize(50);
        fill(251, 254, 249);
        textFont("Ravie");
        text('BOO!!!', -70 , -150);
    }
    //Hover with conditional to show the word "boo"
    function hoveredGhost(){
        if(mouseX>160 && mouseX<330 && mouseY>120 && mouseY<360){
            boo();
        }
    }
    //function to place randomly the stars in the canvas, set the color....
    function starInit(i) {
        x[i] = random(1, 600);
        y[i] = random(1, 600);
       var r=190, b=190, t=random(200,255);
       if (random(0,1) > 0.5) {
           r=t;
       } else{ b=t; }
       c[i] = color(r,r,b,240);
       d[i] = dd[i] = random(1,4);
     }
     //to draw th stars
    function starDraw(i) {
      dd[i] = dd[i] + random(-1,1);
      if (dd[i]<0) { dd[i]=d[i]; }
      if (dd[i]>d[i]+2) { dd[i]=d[i]; }
      strokeWeight(dd[i]);
      stroke(c[i]);
      point(x[i],y[i]);
    }
