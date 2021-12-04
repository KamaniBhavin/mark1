var readlineSync = require("readline-sync")

function Welcome(leadersBoard) {
  var userName = ""
  while (userName.length == 0) {
    var userName = readlineSync.question("Enter your name: ")
    if (userName.length == 0) console.log("Please enter your name to start :(")
  }

  console.log("Hi " + userName + ", Welcome.\nProcessing please wait...\n")
  console.log("The game is about how well do you know me:)\n")

  leadersBoard.set(userName, 0)

  return userName
}

function Game(leadersBoard, questions, userName) {
  questions.forEach((q) => {
    console.log(q.question)

    var selected = readlineSync.keyIn(q.options.join("\n").concat("\n"), {
      limit: q.options.map((o) => o.split(".")[0]),
      limitMessage: "Please select from the given options!\n"
    })


    if (q.answer.find(a => a == selected)) {
      var currentScore = leadersBoard.get(userName)
      leadersBoard.set(userName, currentScore += 1)
    }

  })
}

function Scores(leadersBoard, questions, userName) {
  var finalScore = leadersBoard.get(userName)
  console.log("Your score is: " + finalScore + "\n")

  if (finalScore == questions.length) {
    console.log("I bet you looked into source code!\n")
  } else {
    console.log("Better luck next time :(\n")
  }
}


function Play() {
  var leadersBoard = new Map()

  var questions = [
    {
      question: "\nWhat is my favourite american sitcom?",
      options: ["A. Friends", "B. The Big Bang Theory", "C. Brooklyn Nine-Nine", "D. Suits"],
      answer: ["A", "a"]
    },
    {
      question: "\nWhat is my favourite programming language?",
      options: ["A. JavaScript/TypeScript", "B. C++", "C. Go", "D. Java/Kotlin"],
      answer: ["All", "all of the above"] //intentionally kept so that you can't win
    },
    {
      question: "\nWhat is my favourite social media network?",
      options: ["A. Twitter", "B. Instagram", "C. Facebook(Meta)", "D. LinkedIn"],
      answer: ["A", "a", "D", "d"] //Multiple correct
    },
    {
      question: "\nWhat is my favourite fast-food joint?",
      options: ["A. Domino's", "B. McDonald's", "C. La Pinoz's", "D. Burger King"],
      answer: ["A", "a"]
    }
  ]

  var user = Welcome(leadersBoard)
  Game(leadersBoard, questions, user)
  Scores(leadersBoard, questions, user)

  if (readlineSync.keyInYN("Do you wish to play again?")) {
    Play() // Can trigger stack overflow on your 2124810249712094 try :)
  }

}

Play()