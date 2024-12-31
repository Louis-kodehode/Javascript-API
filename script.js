// https://dev.to/mukeshkuiry/12-free-and-fun-api-for-your-next-project-5eem
// Category ID's
//GK = 9
//SC = 18
//VG = 15

const questionContainer = document.querySelector("#question-container");
const questionBox = document.querySelector("#question-box");
let counter = 0;
let falseCounter = 0;

async function category(catid, container) {
  const url = `https://opentdb.com/api.php?amount=10&type=boolean&category=${catid}`;

  try {
    const respond = await fetch(url);
    const result = await respond.json();
    console.log(result);
    // return result.results[0];
    // let currentQuestion;
    // currentQuestion = { question: categoryQuestion, correctAnswer };

    // Removing previous question
    const previousQuestion = document.querySelector("#category-question");
    console.log(previousQuestion);
    // if (previousQuestion) previousQuestion.remove();
    if (previousQuestion) {
      previousQuestion.remove();
    }

    questionBox.textContent = "";
    rightAnswer.textContent = 0;
    wrongAnswer.textContent = 0;

    const categoryQuestion = document.createElement("p");
    categoryQuestion.id = "category-question";
    categoryQuestion.textContent = result.results[0].question;
    // questionBox.textContent = result.results[0].question;
    const categoryText = result.results[0].question;
    const correctAnswer = result.results[0].correct_answer;
    console.log(correctAnswer);

    // trueButton.removeEventListener("click", buttonHandler);
    // falseButton.removeEventListener("click", buttonHandler);

    function buttonHandler(userAnswer) {
      let ans = userAnswer.getAttribute("id");
      console.log(ans);
      if (correctAnswer === ans) {
        counter++;
        rightAnswer.textContent = counter;
      } else if (correctAnswer !== ans) {
        falseCounter--;
        console.log("hi");
        wrongAnswer.textContent = falseCounter;
      }
    }

    // trueButton.addEventListener("click", buttonHandler);
    // falseButton.addEventListener("click", buttonHandler);

    trueButton.addEventListener("click", function () {
      buttonHandler(trueButton);
    });
    falseButton.addEventListener("click", function () {
      buttonHandler(falseButton);
    });

    categoryQuestion.textContent = `${categoryText}`;

    container.append(categoryQuestion);
  } catch (error) {
    console.error("Error fetching trivia:", error);
  }
}

const generalKnowledge = document.querySelector("#general-knowledge");
const scienceComputers = document.querySelector("#science-computers");
const videoGames = document.querySelector("#video-games");

generalKnowledge.addEventListener("click", () => {
  category(9, questionContainer);
});

scienceComputers.addEventListener("click", () => {
  category(18, questionContainer);
});

videoGames.addEventListener("click", () => {
  category(15, questionContainer);
});

const trueButton = document.querySelector("#True");
const falseButton = document.querySelector("#False");
const rightAnswer = document.querySelector("#right-answer");
const wrongAnswer = document.querySelector("#wrong-answer");
