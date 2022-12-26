// letters
const letters = "abcdefghijklmnopqrstuvwxyz";
// get array from letters
let lettersArray  = Array.from(letters);
// select letters container 
let lettersContainer = document.querySelector(".letters");

// generate letters 
lettersArray.forEach(letter => {
	// create span 
	let span = document.createElement("span");
	// create letter text node 
	let theLetter = document.createTextNode(letter);
	// append the letter to span 
	span.appendChild(theLetter);
	// add class on span 
	span.className = "letter-box";
	// append span to letters conatiner 
	lettersContainer.appendChild(span);
});

// object of words + cat
const words = {
	programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
	movies: ["Prestige", "Inception", "Parasite", "Interstellar", "Whiplash", "Memento", "Coco", "Up"],
	people: ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma Ghandi"],
	countries:["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"]
}

// GET random proerty 
let allKeys = Object.keys(words);
// random number depend on keys length 
let randomPropNumber = Math.floor(Math.random() * allKeys.length);
// category 
let randomPropName = allKeys[randomPropNumber];
// category words
let randomPropValue = words[randomPropName];
// random number depend on words  
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length)
// chosen word
let randomValueValue = randomPropValue[randomPropNumber];
// set category info 
document.querySelector(".game-info .category span").innerHTML =  randomPropName;
// select letter guess element 
let letterGuessContainer = document.querySelector(".letters-guess");
// convert chosen word to array 
let lettersAndSpace = Array.from(randomValueValue);
// create spans depends on words 
lettersAndSpace.forEach(letter => {
	//create empty span 
	let emptySpan = document.createElement("span");
	// if letter is space 
	if  (letter === ' ') {
		// add class to the span 
		emptySpan.className = "with-space"
	}
	// append span to the letters guess container 
	letterGuessContainer.appendChild(emptySpan);
});
// select guess spans
let guessSpans = document.querySelectorAll(".letters-guess span")

// set wrong attempts
let wrongAttempts = 0;
// select draw element 
let theDraw = document.querySelector(".hangman-draw")

// handle clicking on letters 
document.addEventListener("click", (e) => {
	if (e.target.className === 'letter-box') {
		// set the chose status
		let theStatus = false;
		e.target.classList.add("clicked");
		// get clicked letter 
		let theClickeLetter = e.target.innerHTML.toLowerCase();
		// THE chosen word 	
			let theChosenWord = Array.from(randomValueValue.toLowerCase())
		// console.log(lettersAndSpace)
		theChosenWord.forEach((wordLetter,WordIndex) => {
			// if the chiked letter === to one of the chosen word letter  
			if (theClickeLetter == wordLetter) {
				// set status to correct
				theStatus = true;
				// console.log(`Found At Index Number ${index}`)
				// loop on all guess spans 
				guessSpans.forEach((span,spanIndex) => {


					if (WordIndex === spanIndex) {

						span.innerHTML =  theClickeLetter;
					}
				}) 
			}
		});
		// outside loop 
		// console.log(theStatus)
		//  if letter is wrong 
		if (theStatus !== true) {
			// increas the wrong attempts 
			wrongAttempts++;
			// add class wrong on draw element 
			theDraw.classList.add(`Wrong-${wrongAttempts}`)

			// play fail sound 
			document.getElementById("negative").play();
			if (wrongAttempts === 8) {
				endGame();
				lettersContainer.classList.add("finished")
			}
		} else {
			// play success sound 
			document.getElementById("success").play();
		}
	}
});

// endgame function 
function endGame() {
	// Create popup div 
	let div = document.createElement("div");
	// create text 
	let divText = document.createTextNode(`Game Over, The Word Is ${randomValueValue}`);
	// append text to div 
	div.appendChild(divText);
	// add class on div 
	div.className = "popup";
	// append to body
	document.body.appendChild(div);
}
