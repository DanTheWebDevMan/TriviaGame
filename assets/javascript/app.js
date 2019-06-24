(function() {
    const myQuestions = [
    {
        question: "Which MCU movie featured Spider-Man’s first appearance?",
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
        question: "What is the name of Thor’s hammer?",
        answers: {
            a: 'Balder',
            b: 'Vanir',
            c: 'Mjolnir'    
        },
            correctAnswer: 'c'
    }
];

function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label>
             <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
           </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="slide">
           <div class="question"> ${currentQuestion.question} </div>
           <div class="answers"> ${answers.join("")} </div>
         </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;
    
    if (currentSlide === 0) {
      previousButton.style.display = "none";
    } else {
      previousButton.style.display = "inline-block";
    }
    
    if (currentSlide === slides.length - 1) {
      nextButton.style.display = "none";
      submitButton.style.display = "inline-block";
    } else {
      nextButton.style.display = "inline-block";
      submitButton.style.display = "none";
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");

  // display quiz right away
  buildQuiz();

  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  showSlide(0);

  // on submit, show results
  submitButton.addEventListener("click", showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();