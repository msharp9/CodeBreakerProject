let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');
let message = document.getElementById('message');
let results = document.getElementById('results');
let code = document.getElementById('code');
let guessing = document.getElementById('guessing-div');
let replay = document.getElementById('replay-div');

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
    if(!answer.value & !attempt.value) {
      setHiddenFields();
    }
    if(validateInput(input.value)) {
      attempt.value++;
    } else {
      return false;
    }
    if(getResults(input.value)) {
      setMessage("You Win! :)");
      showAnswer(true);
      showReplay();
    } else if (attempt.value >= 10) {
      setMessage("You Lose! :(");
      showAnswer(false);
      showReplay();
    } else {
      setMessage("Incorrect, try again.");
    }
}

//implement new functions here
function setHiddenFields() {
  var randNum = Math.floor(Math.random() * 10000);
  answer.value = randNum.toString();
  while(answer.value.length < 4) {
    answer.value = '0' + answer.value;
  }
  attempt.value = 0;
}

function setMessage(text) {
  message.innerHTML = text
}

function validateInput(input) {
  if(input.length == 4) {
    return true;
  } else {
    setMessage("Guesses must be exactly 4 characters long.");
    return false;
  }
}

function getResults(input) {
  var resultsHTML = '<div class="row"><span class="col-md-6">' + input + '</span><div class="col-md-6">';
  var numCorrect = 0;
  for(i=0; i<input.length; i++) {
    if(input[i] == answer.value[i]) {
      numCorrect++;
      resultsHTML += '<span class="glyphicon glyphicon-ok"></span>';
    } else if (answer.value.search(input[i]) != -1) {
      resultsHTML += '<span class="glyphicon glyphicon-transfer"></span>';
    } else {
      resultsHTML += '<span class="glyphicon glyphicon-remove"></span>';
    }
  }
  resultsHTML += '</div>';
  results.innerHTML += resultsHTML;
  if(numCorrect == 4) {
    return true;
  } else {
    return false;
  }
}

function showAnswer(input) {
  code.innerHTML = answer.value;
  if(input) {
    code.className += ' success';
  } else {
    code.className += ' failure';
  }
}

function showReplay() {
  guessing.style.display = 'none';
  replay.style.display = 'block';
}
