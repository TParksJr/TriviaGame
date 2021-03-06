$(document).ready(function () {

    //declare variables and set variables
    var timer = 11,
        correct = 0,
        incorrect = 0,
        unanswered = 0,
        currentQuestion = 0,
        myTimer;

    //declaring questions and answers as an array object
    var triviaQuestions = [{
        question: "In what year was Pixar founded?",
        answerList: ["1979", "1986", "1995", "2000"],
        answer: 1
    }, {
        question: "Which tech mogul provided funding and became a co-founder of Pixar?",
        answerList: ["Steve Jobs", "Bill Gates", "Peter Thiel", "Mark Zuckerberg"],
        answer: 0
    }, {
        question: "What was Pixar's first feature-length film that was released in 1995?",
        answerList: ["Toy Story", "A Bug's Life", "Monster's Inc", "Finding Nemo"],
        answer: 0
    }, {
        question: "Who was the first Pixar character added to the Disney Princess line-up?",
        answerList: ["Jessie", "Repunzel", "Merida", "Elsa"],
        answer: 2
    }, {
        question: "What's the name of Pixar's first short film, also known as their mascot?",
        answerList: ["Lampo", "Junior", "Pixie", "Luxo Jr."],
        answer: 3
    }, {
        question: "How many sequels does Pixar currently have released? (as of August 2016)",
        answerList: ["5", "3", "6", "7"],
        answer: 0
    }, {
        question: "Which film won Pixar's first Academy Award for Best Animated Feature?",
        answerList: ["Toy Story", "Finding Nemo", "Up", "Wall-E"],
        answer: 1
    }, {
        question: "Who directed Pixar's first three feature films?",
        answerList: ["Peter Docter", "Brad Bird", "John Lasseter", "Peter Sohn"],
        answer: 2
    }, {
        question: "Who voiced Sadness in 'Inside Out'?",
        answerList: ["Amy Poehler", "Phyllis Smith", "Mindy Kaling", "Phyllis Vance"],
        answer: 1
    }, {
        question: "Billy Crystal voices Mike Wazowski in 'Monster, Inc.' but what role did he originally turn down from Pixar?",
        answerList: ["Hopper", "Woody", "Marlin", "Buzz Lightyear"],
        answer: 3
    }, {
        question: "The voice of WALL-E, Ben Burtt, also voiced what other famous robot?",
        answerList: ["R2-D2", "Alpha 5", "C-3PO", "Astro Boy"],
        answer: 0
    }, {
        question: "Brad Bird directed which animated film prior to taking on 'The Incredibles'?",
        answerList: ["The Brave Little Toaster", "The Iron Giant", "Tarzan", "The Prince of Egypt"],
        answer: 1
    }, {
        question: "Pixar was originally a division of which studio?",
        answerList: ["Dreamworks", "Industrial Light & Magic", "Disney", "Lucasfilm"],
        answer: 3
    }, {
        question: "What is the name of the famour explorer from 'Up' that Carl looked up to as a boy?",
        answerList: ["Charles F. Muntz", "Chuck M. James", "Charlie Rose", "Carl Carlton"],
        answer: 0
    }, {
        question: "'A Bug's Life' was loosely based on what other film?",
        answerList: ["I Live in Fear", "Rashomon", "Seven Samurai", "Magneficent Seven"],
        answer: 2
    }];

    //function to start timer and tally results at zero seconds
    function startTimer() {
        if (timer > 1) {
            timer--;
            $("#timer").text("Time Remaining: " + timer + " seconds")
        } else if (currentQuestion < 14) {
            unanswered++;
            currentQuestion++;
            writeQuestion();
        } else {
            unanswered++;
            showResults();
        };
    };

    //function to write out the questions, possible answers, and finished button
    function writeQuestion() {
        timer = 11;

        $("#questions").html(triviaQuestions[currentQuestion].question + "<br><input type='radio' name='answers' class='answers' data-value='0'>" +
            triviaQuestions[currentQuestion].answerList[0] + "<input type='radio' name='answers' class='answers' data-value='1'>" + triviaQuestions[currentQuestion].answerList[1] +
            "<input type='radio' name='answers' class='answers' data-value='2'>" + triviaQuestions[currentQuestion].answerList[2] + "<input type='radio' name='answers' class='answers' data-value='3'>" +
            triviaQuestions[currentQuestion].answerList[3] + "<br><br>");

        //adding submit and skip buttons
        $("#questions").append("<button id='submit'>Submit</button>");
        $("#questions").append("<button id='skip'>Skip</button>");
    };

    //function to stop and reset timer, tally results, generate replay button and reset correct/incorrect
    function tallyResult() {
        var playerChoice = $(".answers:checked");
        if (triviaQuestions[currentQuestion].answer === $(playerChoice).attr("data-value")) {
            correct++;
        } else {
            incorrect++;
        };
    };

    function showResults() {
        clearInterval(myTimer);
        $("#timer").empty();
        $("#questions").html("Correct answers: " + correct + "<br>Incorrect answers: "
         + incorrect + "<br>Unanswered questions: " + unanswered + "<br><br><button id='replay'>Replay</button>");
    }

    //on click event for start button
    $("#start").on("click", function () {
        myTimer = setInterval(startTimer, 1000);
        $("#inner_container").html("<div id='questions'></div>");
        writeQuestion();
    });

    //on click events for finished and replay buttons using document to avoid event bubbling issue
    $(document).on("click", "#submit", function () {
        if (currentQuestion < 14) {
            currentQuestion++;
            tallyResult();
            writeQuestion();
        } else {
            showResults();
        }
    });

    //on click events for finished and replay buttons using document to avoid event bubbling issue
    $(document).on("click", "#skip", function () {
        unanswered++;
        currentQuestion++;
        writeQuestion();
    });

    //set on click event for replay button using document to avoid event bubbling issue
    $(document).on("click", "#replay", function () {
        $("#questions").empty();
        writeQuestion();
        startTimer();
    });
});