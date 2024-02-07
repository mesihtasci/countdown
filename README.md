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
Can be checked <a href="https://countdown-gray-nu.vercel.app">here</a> 

The page initially displays a button labeled "Start Countdown". Upon clicking this button, a 10-second countdown timer is initiated. If the user moves the mouse out of the countdown circle and then back in, the countdown will pause and display "Paused". Resuming the countdown occurs when the mouse will be moved outside of the countdown area. Clicking on the countdown while it's paused will revert the display back to the "Start Countdown" button. When the countdown reaches 0 and the user moves the mouse into the countdown area, the "Start Countdown" button reappears.
## Accessible Version
Can be checked <a href="https://countdown-gray-nu.vercel.app/accessible-countdown">here</a> 

In the accessible version, there are two buttons provided. One button toggles between play and pause states, while the other resets the countdown. Both buttons and the countdown utilize "aria-label" attributes for screen reader accessibility. Initially, the user must click the play button, which will start the countdown and then display a pause button upon clicking. Clicking the pause button changes the countdown value to "Paused", and clicking the play button resumes the countdown. Finally, clicking the reset button resets the countdown.
# Basic Storybook setup
The components Button and Countdown are also available in storybook and can be checkd <a href="https://countdown-storybook.vercel.app">here</a> 