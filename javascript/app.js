window.onload = startup;

var canvas_width = document.getElementById("drawingArea").width
var canvas_width = document.getElementById("drawingArea").height
var pos_init = canvas_width / 2

var ballX = pos_init;
var ballY = pos_init;
var mouseX = pos_init;
var mouseY = pos_init;

function startup() {
    document.getElementById("drawingArea").onmousemove = getMousePos;

    loop();
}

//`requestAnimationFrame` makes it a smoother animation
function loop() {
    moveBall();
    requestAnimationFrame(loop);
}

function getMousePos(evt) {
    var rect = document.getElementById("drawingArea").getBoundingClientRect();
    mouseX = evt.clientX - rect.left;
    mouseY = evt.clientY - rect.top;
}

function moveBall() {
    //get the distance between the mouse and the ball on both axes
    //walk only the an eight of the distance to create a smooth fadeout
    var dx = (mouseX - ballX) * .125;
    var dy = (mouseY - ballY) * .125;
    //calculate the distance this would move ...
    var distance = Math.sqrt(dx * dx + dy * dy);
    //... and cap it at 5px
    if (distance > 5) {
        dx *= 5 / distance;
        dy *= 5 / distance;
    }

    //now move
    ballX += dx;
    ballY += dy;

    var canvas = document.getElementById("drawingArea");
    var context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.arc(ballX, ballY, 10, 0, 2 * Math.PI);
    context.fillStyle = "gray";
    context.fill();
}