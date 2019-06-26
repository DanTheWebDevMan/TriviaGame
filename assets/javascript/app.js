/* Pseudocode Brainstorming
page loads and brought to start page *still need*
game starts when "start" button is clicked *still need*
brought to next page and timer begins from 60 seconds
click "submit" button to finish OR if the timer runs out
brought to next page showing you # of correct and incorrect answers */


//define global variables/ 
var correct;
var incorrect;

//code for timer//

function startTimer(duration, display) {
    var timer = duration, seconds;
    setInterval(function () {
       
        seconds = parseInt(timer % 30, 10);

        seconds = seconds < 60 ? "" + seconds : seconds;

        display.textContent =  "Time left: 00:" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

window.onload = function () {
    var sixtySeconds = 60 * 1,
        display = document.querySelector('#timer');
    startTimer(sixtySeconds, display);
};
   



//alert box pops up after 60 seconds saying time's up//

  /*function timesUp() {
    alert( "Here's your score :" + html(resultsContainer));
  }
  window.onload
  setTimeout(timesUp, 30000); */

//still need code to stop game and bring to results page//


var myQuestions = [
    {
        question: "Which MCU movie featured Spider-Man's first appearance?",
        answers: {
            a: 'Spiderman: Homecoming',
            b: 'Iron Man 35',
            c: 'Captain America: Civil War'
        },
        correctAnswer: 'c'
    },
    {
        question: "What does Stark Industries manufacture in Iron Man 1?",
        answers: {
            a: 'Weapons',
            b: 'Pharmaceuticals',
            c: 'Chemicals'
        },
        correctAnswer: 'a'
    },
    {
        question: "Which of these characters did NOT appear in Phase One of the MCU?",
        answers: {
            a: 'Thor',
            b: 'Black Panther',
            c: 'Captain America'
        },
        correctAnswer: 'b'
    },
    {
        question: "Who played the Hulk before Mark Ruffalo?",
        answers: {
            a: 'Liam Hemsworth',
            b: 'Edward Norton',
            c: 'Gary Olman'
        },
            correctAnswer: 'b'
    },
    {
        question: "Which war did Captain America fight in?",
        answers: {
            a: 'World War I',
            b: 'Vietnam War',
            c: 'World War II'    
        },
            correctAnswer: 'c'
    },
    {
        question: "What is the name of Thor's hammer?",
        answers: {
            a: 'Balder',
            b: 'Vanir',
            c: 'Mjolnir'    
        },
            correctAnswer: 'c'
    },
    {
        question: "Which movie takes place during Christmas time?",
        answers: {
            a: 'Thor: The Dark World',
            b: ' Guardians of the Galaxy',
            c: 'Iron Man 3'    
        },
            correctAnswer: 'c'
    },
    {
        question: "What Nazi organization infiltrated SHIELD?",
        answers: {
            a: 'Hydra',
            b: 'Empusa',
            c: 'Chimera'    
        },
            correctAnswer: 'a'
    },
    {
        question: "What legislation requires superhumans to be governed by law?",
        answers: {
            a: 'Aokovia Accord',
            b: 'Crimea Accord',
            c: 'Latveria Accord'    
        },
            correctAnswer: 'a'
    }
]; 

var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');

generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);

function generateQuiz(questions, quizContainer, resultsContainer, submitButton){

    function showQuestions(questions, quizContainer){
        // we'll need a place to store the output and the answer choices
        var output = [];
        var answers;

        // for each question...
        for(var i=0; i<questions.length; i++){
            
            // first reset the list of answers
            answers = [];
            // for each available answer...
            for(letter in questions[i].answers){
                // ...add an html radio button
                answers.push(
                    '<label>'
                        + '<input type="radio" name="question'+i+'" value="'+letter+'">'
                        + letter + ': '
                        + questions[i].answers[letter]
                    + '</label>'
                );
            }

            // add this question and its answers to the output
            output.push(
                '<div class="question">' + questions[i].question + '</div>'
                + '<div class="answers">' + answers.join('') + '</div>'
            );
        }
        // finally combine our output list into one string of html and put it on the page
        quizContainer.innerHTML = output.join('');
    }


    function showResults(questions, quizContainer, resultsContainer){  
        // gather answer containers from our quiz
        var answerContainers = quizContainer.querySelectorAll('.answers');        
        // keep track of user's answers
        var userAnswer = '';
        var numCorrect = 0;        
        // for each question...
        for(var i=0; i<questions.length; i++){

           // find selected answer
            userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;
            
            // if answer is correct
            if(userAnswer===questions[i].correctAnswer){
                // add to the number of correct answers
                numCorrect++;
                
                // color the answers green
                answerContainers[i].style.color = 'lightgreen';
            }
            // if answer is wrong or blank
            else{
                // color the answers red
                answerContainers[i].style.color = 'red';
            }
        }

        // show number of correct answers out of total
        resultsContainer.innerHTML = ' You scored ' + numCorrect + ' out of ' + questions.length;
    }

    // show questions right away
    showQuestions(questions, quizContainer);
    
    // on submit, show results
    submitButton.onclick = function(){
        showResults(questions, quizContainer, resultsContainer);
        alert( "Times up! See Score Below");
    }
    
}

generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);

function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
    alert(showScores);
};

/* Left to do: 
create a start page to click on to reveal answers while starting timer
redirect page to score when timer is done (did an alert instead)
OR have paged redirected once user clicks submit */
