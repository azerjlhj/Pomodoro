
// Global variables to track timer state and configuration
var availableMinutes = 25;
var timer;
var isRunning = false; 
var timeLeft = availableMinutes * 60; // 25 minutes in seconds

// Function to update the displayed time
// It formats the time as MM:SS
function updateTimeDisplay() {
    var minutes = Math.floor(timeLeft / 60);
    var seconds = timeLeft % 60;
    document.getElementById("time").textContent = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

// Function to reset the timer to the initial available minutes
function resetTimer() {
    clearInterval(timer);   // Clear the timer if it's running
    // Reset the timer to the initial available minutes
    isRunning = false;
    timeLeft = availableMinutes * 60;
    updateTimeDisplay();

    // Show the start button and hide the stop and reset buttons
    document.getElementById("start").style.display = "inline";
    document.getElementById("stop").style.display = "none";
    document.getElementById("reset").style.display = "none";
}

function startTimer() {

    // Hide the start button and show the stop & resume buttons
    document.getElementById("start").style.display = "none";
    document.getElementById("stop").style.display = "inline";
    document.getElementById("reset").style.display = "inline";

    isRunning = true;
    timer = setInterval(function() {
        timeLeft--;
        updateTimeDisplay();
        if (timeLeft <= 0) {
            clearInterval(timer);
            isRunning = false;
            document.getElementById("stop").style.display = "none";
            //make a sound when the timer hits 0
            var audio = new Audio('alarm.mp3'); // Make sure to have an alarm.mp3 file in the same directory
            audio.play();
            alert("Time's up!");
        }
    }, 1000);

}

function stopTimer() {
    //show the start button and hide the stop button
    document.getElementById("start").style.display = "inline";
    document.getElementById("stop").style.display = "none";
    // if the timer is running, clear it and set isRunning to false
    clearInterval(timer);
    isRunning = false;
}


// Event listeners for the buttons
document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("stop").addEventListener("click", stopTimer);
document.getElementById("reset").addEventListener("click", resetTimer);

// Event listeners for the Pomodoro button, Short Break button, and Long Break button
// These buttons change the available minutes and reset the timer accordingly
document.getElementById("pomodoro").addEventListener("click", function() {
    document.body.style.backgroundColor = "rgb(186,73,73)";
    document.body.style.transition = "background-color 0.75s ease";
    availableMinutes = 25;
    timeLeft = availableMinutes * 60;
    resetTimer();
    document.getElementById("pomodoro").disabled = true;
    document.getElementById("short-break").disabled = false;
    document.getElementById("long-break").disabled = false;
});
document.getElementById("short-break").addEventListener("click", function() {
    document.body.style.backgroundColor = "rgb(56, 133, 138)";
    // make a smooth transition to that color above!
    document.body.style.transition = "background-color 0.75s ease";
    // set the available minutes to 5 minutes for short break
    availableMinutes = 5;
    resetTimer()
    // enable the disabled button and then disable that button, which is the short break button
    document.getElementById("pomodoro").disabled = false;
    document.getElementById("short-break").disabled = true;
    document.getElementById("long-break").disabled = false;
});
document.getElementById("long-break").addEventListener("click", function() {
    document.body.style.backgroundColor = "rgb(57, 112, 151)";
    document.body.style.transition = "background-color 0.75s ease";
    availableMinutes = 15;
    resetTimer();
    // enable the disabled button and then disable that button, which is the long break button
    document.getElementById("pomodoro").disabled = false;
    document.getElementById("short-break").disabled = false;
    document.getElementById("long-break").disabled = true;
});

// Initial setup: set the available minutes to 25 and update the display
updateTimeDisplay();
