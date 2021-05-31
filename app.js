// declare variables
const FPS = 45;
var ball_size = 210;  // Ball diameter plus border
var height, width;
var ball_x, ball_y;
var vx, vy;
var ball, box;
var logos = [
    "pythonLogo", "cppLogo", "javaLogo", "htmlLogo", "cssLogo", "javascriptLogo", "wordLogo", "excelLogo", "accessLogo", "powerPointLogo", "solderingLogo", "scubaLogo"
];
var logoCount = 0;
var onTop = true;

// Get boundaries and ball
ball = document.querySelector('.skillBubble');
box = document.querySelector('.skillBox');
height = box.clientHeight;
width = box.clientWidth;

// Set up interval (game loop)
setInterval(updatePosition, 1000 / FPS);
setInterval(console.log("X: " + ball_x + ", Y: " + ball_y), 1000);

// Ball starting position
ball_x = width / 2;
ball_y = height / 2;

// Random ball starting speed (between 75 and 125 pixels per second)
vx = Math.floor(Math.random() * 51 + 75) / FPS;
vy = Math.floor(Math.random() * 51 + 75) / FPS;

// Random ball direction
if (Math.floor(Math.random() * 2) == 0) {
    vx = -vx;
}
if (Math.floor(Math.random() * 2) == 0) {
    vy = -vy;
}

// Update function
function updatePosition() {
    // Check if view changed
    height = box.clientHeight;
    width = box.clientWidth;

    // Move the ball
    ball_x += vx;
    ball_y += vy;
    
    // Bounce the ball off each wall (each bounce change logo)
    if (ball_x - ball_size / 2 < 0 && vx < 0) {
        vx = -vx;
        nextLogo();
    }
    if (ball_x + ball_size / 2 > width && vx > 0) {
        vx = -vx;
        nextLogo();
    }
    if (ball_y - ball_size / 2 < 0 && vy < 0) {
        vy = -vy;
        nextLogo();
    }
    if (ball_y + ball_size / 2 > height && vy > 0) {
        vy = -vy;
        nextLogo();
    }
    
    // Update CSS
    ball.style.left = ball_x - ball_size/2 + "px";
    ball.style.top = ball_y - ball_size/2 + "px";
}

nextLogo = function() {
    // Change logo
    ball.classList.remove(logos[logoCount++]);
    if (logoCount == logos.length) {
        logoCount = 0;
    }
    ball.classList.add(logos[logoCount]);

    // Change level
    if (onTop) {
        ball.classList.remove("level3");
        ball.classList.add("level1");
        onTop = false;
    } else {
        ball.classList.remove("level1");
        ball.classList.add("level3");
        onTop = true;
    }
}

showProjects = function() {
    // Get hidden projects
    var elements = document.querySelectorAll("#extra");
    var projBtn = document.getElementById("projectBtn");

    // See if we are expanding or collapsing
    if (projBtn.innerHTML == "View More Projects") {
        // Show more
        for (var i = 0; i < elements.length; i++) {
            elements[i].classList.remove('hidden');
            elements[i].classList.add('show');
        }

        // Change button text
        projBtn.innerHTML = "Show Less Projects"
    } else {
        // Show less
        for (var i = 0; i < elements.length; i++) {
            elements[i].classList.remove('show');
            elements[i].classList.add('hidden');
        }

        // Change button text
        projBtn.innerHTML = "View More Projects"
    }
}

showJobDescription = function(jobNum) {
    // Get hidden projects
    var jobButton = document.getElementById("jobBtn" + jobNum.toString());
    var jobDescription = document.getElementById("jobDescription" + jobNum.toString());

    // See if we are expanding or collapsing
    if (jobButton.innerHTML == "View Description") {
        // Show more
        jobDescription.classList.add('slide-up');
        jobDescription.classList.remove('slide-down');

        // Change button text and colors
        jobButton.innerHTML = "Show Less";
        jobButton.classList.add('expandedBtn');
        jobButton.classList.remove('collapsedBtn');
    } else {
        // Show less
        jobDescription.classList.add('slide-down');
        jobDescription.classList.remove('slide-up');

        // Change button text and colors
        jobButton.innerHTML = "View Description";
        jobButton.classList.remove('expandedBtn');
        jobButton.classList.add('collapsedBtn');
    }
}