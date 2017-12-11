window.onload = function() {
  var fruitWords = ['banana', 'fig', 'watermelon', 'grape', 'coconut', 'cherry', 'lime', 'pineapple',
    'tomato', 'apple', 'orange', 'kiwi', 'strawberry', 'dragonfruit', 'blueberry', 'blackberry',
    'mango', 'plum', 'pear', 'papaya', 'avocado', 'passionfruit', 'current', 'boysenberry', 'quince', 'salmonberry',
    'yuzu', 'grapefruit', 'kumquat'
  ];
  var blanksAndSuccess = [];
  var blanks = 0;
  var currentWord = "";
  var currentLetters = [];
  var winCounter = 0;
  var lossCounter = 0;
  var numGuesses = 12;

  var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
    'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
  ];

  var guessedLetter = [];
  var correctLetter = [];
  var incorrectLetter = [];

  var buttons = function() {
    var myButtons = document.getElementById('alphabet-btns');
    var letters = document.createElement('ul');

    for (var i = 0; i < alphabet.length; i++) {
      let listItem = document.createElement('li');
      listItem = document.createElement('BUTTON');
      listItem.classList.add('btn-primary');
      listItem.innerHTML = alphabet[i];
      myButtons.appendChild(listItem);
      listItem.dataset.alphabet = alphabet[i];

      listItem.onclick = function() {
        let userGuess = listItem.dataset.alphabet;
        guessedLetter.push(userGuess);
        document.getElementById('guessed').innerHTML = "Letters Already Guessed: " + guessedLetter.join(" ");
        checkLetters(userGuess);
        round();
      }
    }
  }
  document.getElementById("gameStart").onclick = function() {buttons()};

  function startGame() {
    numGuesses = 12;
    blanksAndSuccess = [];
    guessedLetter = [];
    incorrectLetter = [];
    currentWord = fruitWords[Math.floor(Math.random() * fruitWords.length)];
    currentLetters = currentWord.split("");
    blanks = currentLetters.length;
    for (var i = 0; i < blanks; i++) {
      blanksAndSuccess.push("_")
    }
    console.log(currentWord);
    document.getElementById('currentWord').innerHTML = blanksAndSuccess.join(" ");
    document.getElementById('guessesRemaining').innerHTML = "Guesses left: " + numGuesses;
    document.getElementById('guessed').innerHTML = "Letters already guessed: "
  }

  function checkLetters(letter) {
    let letterInWord = false;
    for (var i = 0; i < blanks; i++) {
      if (currentWord[i] == letter) {
        letterInWord = true;
      }
    }
    if (letterInWord) {
      for (var i = 0; i < blanks; i++) {
        if (currentWord[i] == letter) {
          blanksAndSuccess[i] = letter
        }
      }
      console.log(blanksAndSuccess);

    } else {
      incorrectLetter.push(letter);
      numGuesses--;
      console.log("that was incorrect " + numGuesses + " are remaining");
    }
  }

  function round() {
    console.log("WinCount: " + winCounter + " | LossCount: " + lossCounter + " | NumGuesses: " + numGuesses);
    document.getElementById("guessesRemaining").innerHTML = "Guesses remaining: " + numGuesses;
    document.getElementById("currentWord").innerHTML = blanksAndSuccess.join(" ");
    document.getElementById("guessed").innerHTML = "Letters already guessed: " + incorrectLetter.join(" ");
    if (currentLetters.toString() == blanksAndSuccess.toString()) {
      winCounter++;
      document.getElementById("word").innerHTML = "The last word was " + currentWord;
      alert("You win! The word was " + currentWord);
      document.getElementById("winCounter").innerHTML = "You have won " + winCounter + " game(s)";
      startGame();
    }
    else if (numGuesses == 0) {
      lossCounter++;
      document.getElementById("word").innerHTML = "The last word was " + currentWord;
      alert("You lose. The word was " + currentWord);
      document.getElementById("lossCounter").innerHTML = "You have lost " + lossCounter + " game(s)";
      startGame();
    }
  }

  startGame();

};
