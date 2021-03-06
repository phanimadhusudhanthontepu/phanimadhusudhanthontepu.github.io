//Global algorthm varibale
var algoArray = [
    {
        name: "Linear Regression from Scratch", 
        title:  "Linear Regression from Scratch Statistical Approach",
        date:"2018-09-16 20:47:28 +0530",
        categories: "Linear Regression ",
        description : "Linear Regression is the process of fitting a line to the dataset.",
        image : "/assets/images/linear-regression-from-scratch-statistical-approach-images/title_image.png",
        url: "linear/regression/2018/09/28/linear_regression_using_scikit_learn.html"},
    
    {
        name: "Linear Regression using tensorflow", 
        title:  "Linear Regression using tensorflow",
        date: "2018-09-23 20:47:28 +0530",
        categories: "Linear Regression" ,
        description : "Linear Regression is the process of fitting a line to the dataset.", 
        image : "/assets/images/linear-regression-using-tensorflow-images/title_image.png",
        url: "linear/regression/2018/09/23/linear_regression_using_tensorflow.html"},
    
    {
        name: "Machine learning", 
        url: "linear/regression/2018/09/28/linear_regression_using_scikit_learn.html"},
    {
        name: "classification" , 
        "url": "linear/regression/2018/09/28/linear_regression_using_scikit_learn.html"},
    {
        "name": "regression" , 
        "url": "linear/regression/2018/09/28/linear_regression_using_scikit_learn.html"},
    {
        name: "Gradient descent algorithm" , 
        "url": "linear/regression/2018/09/28/linear_regression_using_scikit_learn.html"},
    {
        name: "clustering" ,
        "url": "linear/regression/2018/09/28/linear_regression_using_scikit_learn.html"},
    {
        "name": "association" , 
        "url": "linear/regression/2018/09/28/linear_regression_using_scikit_learn.html"},
    {
        "name": "support vector machines" ,
        "url": "linear/regression/2018/09/28/linear_regression_using_scikit_learn.html"},
    {
        "name": "neural networks" , 
        "url": "linear/regression/2018/09/28/linear_regression_using_scikit_learn.html"},
    {
        "name": "deep learning" , 
        "url": "linear/regression/2018/09/28/linear_regression_using_scikit_learn.html"},
    {
        "name": "bayesian" , 
        "url": "linear/regression/2018/09/28/linear_regression_using_scikit_learn.html"},
    {
        "name": "Cross validation" , 
        "url": "linear/regression/2018/09/28/linear_regression_using_scikit_learn.html"},
    {
        "name": "Robotics" , 
        "url": "linear/regression/2018/09/28/linear_regression_using_scikit_learn.html"},
    {
        "name": "Computational neural networks" ,
        "url": "linear/regression/2018/09/28/linear_regression_using_scikit_learn.html"},
    {
        "name": "Natural language processing" , 
        "url": "linear/regression/2018/09/28/linear_regression_using_scikit_learn.html"},
    {
        "name": "database" , 
        "url": "linear/regression/2018/09/28/linear_regression_using_scikit_learn.html"},
    {
        "name": "computer vision" , 
        "url": "linear/regression/2018/09/28/linear_regression_using_scikit_learn.html"},
    {
        "name": "Supervised learning" , 
        "url": "linear/regression/2018/09/28/linear_regression_using_scikit_learn.html"},
    {
        "name": "unsupervised learning" , 
        "url": "linear/regression/2018/09/28/linear_regression_using_scikit_learn.html"},
    {
        "name": "Reinforcement learning'" , 
        "url": "linear/regression/2018/09/28/linear_regression_using_scikit_learn.html"},
    {
        "name": "Overfitting" , 
        "url": "linear/regression/2018/09/28/linear_regression_using_scikit_learn.html"}
]

var visibility = false;   // Varible for visibility initilizing

if(window.innerWidth>756) // Setting the value of Visibility
{
    var visibility = true;
}

var aboveElement = document.getElementById('navigation-bar') //Getting above Element
var aboveElementRect = aboveElement.getBoundingClientRect(); //Above Element Dimentions

var canvas = document.getElementById('canvas-1');
var canvasRect = canvas.getBoundingClientRect();

//Setting Dimentions of Canvas
canvas.width  = window.innerWidth - 15;
canvas.height = window.innerHeight - aboveElementRect.bottom;

document.getElementById('to-cover-nab-bar').setAttribute("style","height:"+aboveElementRect.bottom+"px");


//Varibles
var c = canvas.getContext('2d');

var maxRadius = 100; //Max Radius of Circle
var minRadius = 60;  //Min Radius of Circle

var circleInFocus = null;
var foundCircle = false;
var circleArray = [];

//Objects
var mouse = {
    x: undefined,
    y: undefined
}

//Arrays
var colorArray = [
    '#3686C2',
    '#16953C',
    '#ACF0F2',
    '#F3FFE2',
    '#EB7F00'
];


//Event Listeners
window.addEventListener('mousemove',
    function(event){
        mouse.x = event.x;
        mouse.y = event.y - 85;
})


window.addEventListener('resize',
    function(){
    
        if(window.innerWidth>756)
        {
            visibility = true;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        }
        else
        {
            visibility = false;
            canvas.height = 0;
            canvas.width = 0;
        }
        
    })


canvas.addEventListener('click',
    function(){
        if (circleInFocus!=null)
        {
            algoArray.forEach(element => {
                    if(element.name == circleInFocus.name)
                    {
                        window.location.href = element.url;
                    }
                });
        }
    })

//Utility Functions
function getDistance(x1,y1,x2,y2){
    let xDistance = x2-x1;
    let yDistance = y2-y1;  
    return Math.sqrt(Math.pow(xDistance,2)+ Math.pow(yDistance,2));
}

function rotate(dx,dy, angle) {
    const rotatedVelocities = {
        x: dx * Math.cos(angle) - dy * Math.sin(angle),
        y: dx * Math.sin(angle) + dy * Math.cos(angle)
    };
    return rotatedVelocities;
}

function resolveCollision(particle, otherParticle) {

    const xVelocityDiff = particle.dx - otherParticle.dx;
    const yVelocityDiff = particle.dy - otherParticle.dy;
    
    const xDist = otherParticle.x - particle.x;
    const yDist = otherParticle.y - particle.y;

    // Prevent accidental overlap of particles
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

        // Grab angle between the two colliding particles
        const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

        // Store mass in var for better readability in collision equation
        const m1 = Math.pow(particle.radius,2)*Math.PI /10;
        const m2 = Math.pow(otherParticle.radius,2)*Math.PI/10;

        // Velocity before equation
        const u1 = rotate(particle.dx,particle.dy, angle);
        const u2 = rotate(otherParticle.dx,otherParticle.dy, angle);

        // Velocity after 1d collision equation
        const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
        const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

        // Final velocity after rotating axis back to original location
        const vFinal1 = rotate(v1.x,v1.y, -angle);
        const vFinal2 = rotate(v2.x,v2.y, -angle);
        

        // Swap particle velocities for realistic bounce effect
        particle.dx = vFinal1.x;
        particle.dy = vFinal1.y;

        otherParticle.dx = vFinal2.x;
        otherParticle.dy = vFinal2.y;
        
    }
}

//Classes
function Circle(x,y,dx,dy,radius,name){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.name = name;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random()* colorArray.length)]

    this.draw = function(){
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0, Math.PI*2,false);
        c.fillStyle = this.color
        c.stroke();
        c.fill();
    }

    this.update = circleArray =>
    {
        
        this.draw();
        
        //Hitting the boudaries
        if(this.x + radius> canvas.width || this.x - radius < 0)
        {
            this.dx = -this.dx;
        }
        if(this.y + radius > canvas.height-85 || this.y-radius<0)
        {
            this.dy = -this.dy;
        }

        //Updating position with respective to velocities
        this.x+= this.dx;
        this.y+= this.dy;

        //Filling text
        var fontSize = (this.radius*20)/minRadius
    
        
        ctx = canvas.getContext("2d");
        ctx.font = fontSize +'px Calibri';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';

        var nameArray = this.name.split(" ")
        var yValueArray = [];
        if(nameArray%2==0)
        {
            //Even
        }
        else
        {
            //Odd
        }
        for (var i = 0;i<nameArray.length;i++)
        {
            yValueArray.push(i*fontSize)
        }
        if(this.name.startsWith("Natural"))
        {
            var totalFontHeight = Math.max(...yValueArray) + fontSize
            console.log(yValueArray,Math.max(...yValueArray),totalFontHeight)
            var shift = totalFontHeight/2;
            for (var i = 0;i<nameArray.length;i++)
            {
                yValueArray[i] = yValueArray[i] +40 // + (totalFontHeight)/2+fontsize/4;
            }
            //console.log(yValueArray)
        }
        

        for (var i = 0;i<nameArray.length;i++)
        {
            ctx.fillText(nameArray[i], this.x, this.y-this.radius + yValueArray[i]);
        }

        //Zooming the Circles
        if(Math.abs(mouse.x - this.x) < this.radius && Math.abs(mouse.y - this.y) < this.radius)
        {
            if(this.radius < maxRadius)
            {
                this.radius +=1;
            }
        }
        else if (this.radius > this.minRadius)
        {
            this.radius -=1;
        }
        
        //Collision detection
        for (let i =0 ;i <circleArray.length;i++)
        {
            if(this === circleArray[i]) continue;
            var distBetweenTwoCirclesCenters = getDistance(this.x,this.y,circleArray[i].x,circleArray[i].y);
            var sumOfTwoCirclesRadius = circleArray[i].radius + this.radius;
            if(distBetweenTwoCirclesCenters<sumOfTwoCirclesRadius)
            { 
                resolveCollision(this,circleArray[i])
            }
        }
             
    }

}


//Initialization function
function init() {

    circleArray = [];

    for (let i = 0 ;i < algoArray.length ;i++)
    {
        var radius = minRadius;
        var x = Math.random()*(canvas.width - radius*2) + radius;
        var y = Math.random()* (canvas.height - radius*2) + radius ;
        var dx = (Math.random() - 0.5)*2;
        var dy = (Math.random() - 0.5)*2;
        var name = algoArray[i].name

        if (i !== 0) //Not the first circle
        {
            for (let j = 0 ;j < circleArray.length;j++) 
            {
                if(getDistance(x,y,circleArray[j].x,circleArray[j].y)-radius*2 <0)
                {
                    
                    x = Math.random()*(canvas.width - radius*2) + radius;                        
                    y = Math.random()*(canvas.height - radius*2) + radius;
                    j = -1;
                }
            }
        }
    
        circleArray.push(new Circle(x,y,dx,dy,radius,name));

    }
}

//Animation Function for canvas
function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,canvas.width,canvas.height);

    //Updating circles
    for (var i=0; i <circleArray.length;i++)
    {
        circleArray[i].update(circleArray);
    }

    foundCircle = false;
    for (let i =0 ;i <circleArray.length;i++)
    {
        circle = circleArray[i]
        var distOfMouseFromCircleCenter = getDistance(mouse.x,mouse.y,circle.x,circle.y);
        if(distOfMouseFromCircleCenter<circle.radius)
        {
            
            foundCircle = true;
            circleInFocus = circle;
            break;
        } 
    }
    if (!foundCircle)
    {
        circleInFocus = null;
    }
    
}

if(visibility)
{
    init();
    animate();
}
else
{
    canvas.width = 0;
    canvas.height = 0;
}
