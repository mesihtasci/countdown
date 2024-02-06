# Introduction
This React.js and TypeScript project features a countdown timer functionality. It consists of two pages within the web application: a standard countdown page and an accessible version. The countdown logic is implemented to provide users with the ability to start, pause, and reset the countdown timer. The accessible version ensures compliance with accessibility standards, incorporating features such as aria-label attributes to enhance usability for individuals relying on screen readers or other assistive technologies.
# Installation
```npm install```
# Start
```npm start```
# Deployment
The project is configured to automatically deploy to Vercel upon merging changes into the master branch. This deployment process ensures that the latest updates to the project are promptly reflected in the live environment.
# Logic
## Normal Version
The page initially displays a button labeled "Start Countdown". Upon clicking this button, a 10-second countdown timer is initiated. If the user moves the mouse out of the countdown circle and then back in, the countdown will pause and display "Paused". Resuming the countdown occurs when the mouse will be moved outside of the countdown area. Clicking on the countdown while it's paused will revert the display back to the "Start Countdown" button. When the countdown reaches 0 and the user moves the mouse into the countdown area, the "Start Countdown" button reappears.
## Accessible Version
