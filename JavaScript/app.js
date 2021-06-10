// declare variables
const FPS = 45;
var ball_size = 210; // Ball diameter plus border
var height, width;
var ball_x, ball_y;
var vx, vy;
var ball, box;
var logos = [
  "pythonLogo",
  "cppLogo",
  "javaLogo",
  "htmlLogo",
  "cssLogo",
  "javascriptLogo",
  "wordLogo",
  "excelLogo",
  "accessLogo",
  "powerPointLogo",
  "solderingLogo",
  "scubaLogo",
];
var logoCount = 0;
var onTop = true;

// Get boundaries and ball
ball = document.querySelector(".skillBubble");
box = document.querySelector(".skillBox");
height = box.clientHeight;
width = box.clientWidth;

// Set up interval (game loop)
setInterval(updatePosition, 1000 / FPS);

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

/////////////////////////////////////////////////
//               Update Position
// Pre-condition: Ball variables must be global
// Post-condition: The ball will move along its
//   current path.
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
  ball.style.left = ball_x - ball_size / 2 + "px";
  ball.style.top = ball_y - ball_size / 2 + "px";
}

/////////////////////////////////////////////////
//                  Next Logo
// Pre-condition: All the skill logos must be
//   defined in the logos array
// Post-condition: The next logo in the circular
//   queue will be displayed. The ball will
//   alternate going behind and in front of the
//   skill list container
const nextLogo = function () {
  // Change logo
  ball.classList.remove(logos[logoCount++]);
  if (logoCount == logos.length) {
    logoCount = 0;
  }
  ball.classList.add(logos[logoCount]);

  // Change level
  if (onTop) {
    ball.classList.replace("level3", "level1");
    onTop = false;
  } else {
    ball.classList.replace("level1", "level3");
    onTop = true;
  }
};

/////////////////////////////////////////////////
//                Toggle Projects
// Pre-condition: Hidden projects must be in DOM
// Post-condition: All the hidden projects will
//   become visible. If they are already visible,
//   then they will go back to being hidden.
const toggleProjects = function () {
  // Get hidden projects
  let elements = document.querySelectorAll(".extra");
  let projBtn = document.querySelector("#projectBtn");

  // See if we are expanding or collapsing
  if (projBtn.innerText == "View More Projects") {
    // Show more
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.replace("hidden", "show");
    }

    // Change button text
    projBtn.innerText = "Show Less Projects";
  } else {
    // Show less
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.replace("show", "hidden");
    }

    // Change button text
    projBtn.innerText = "View More Projects";
  }
};

/////////////////////////////////////////////////
//            Toggle Job Description
// Pre-condition: The card number of the job must
//   be passed on click
// Post-condition: The job description will slide
//   into view or slide out of view
const toggleJobDescription = function (jobNum) {
  // Get elements
  let jobButton = document.querySelector("#jobBtn" + jobNum.toString());
  let jobDescription = document.querySelector(
    "#jobDescription" + jobNum.toString()
  );
  // See if we are expanding or collapsing
  if (jobButton.innerText == "View Description") {
    // Show more
    if (!jobDescription.classList.replace("slide-down", "slide-up")) {
      jobDescription.classList.add("slide-up");
    }

    // Change button text and colors
    jobButton.innerText = "Show Less";
    jobButton.classList.add("expandedBtn");
    jobButton.classList.remove("collapsedBtn");
  } else {
    // Show less
    jobDescription.classList.replace("slide-up", "slide-down");

    // Change button text and colors
    jobButton.innerText = "View Description";
    jobButton.classList.remove("expandedBtn");
    jobButton.classList.add("collapsedBtn");
  }
};
