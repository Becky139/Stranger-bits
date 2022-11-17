//////////////////////////////////
//Function and obj definitions
//////////////////////////////////

var quizArr = [{
        qnum: 1,
        qtext: "What 80's dungeon crawler, exploration game was this music from?",
        qchoices: ['Legend of Zelda', 'Pac Man', 'Super Mario', 'Tron', 'Pole Position', 'Donkey Kong', 'Punch Out'],
        qmusic: "audio/zelda.mp3",
        qfacts: "The Legend of Zelda is a high-fantasy action-adventure video game series created by Japanese game designers Shigeru Miyamoto and Takashi Tezuka.",
        qimage: "images/zelda.png",
        qcorrect: "Legend of Zelda"
    },
    {
        qnum: 2,
        qtext: "What classic arcade racer was this music from?",
        qchoices: ['Pac Man', 'Legend of Zelda', 'Punch Out', 'Super Mario', 'Donkey Kong', 'Tron', 'Pole Position'],
        qmusic: "audio/poleposition.mp3",
        qfacts: "Pole Position is regarded as one of the most influential video games of all time and arguably the most important racing game ever made.",
        qimage: "images/poleposition.jpg",
        qcorrect: "Pole Position"
    },
    {
        qnum: 3,
        qtext: "What 80s game ate up the arcade world?",
        qchoices: ['Tron', 'Legend of Zelda', 'Pole Position', 'Super Mario', 'Pac Man', 'Donkey Kong', 'Punch Out'],
        qmusic: "audio/pacman.mp3",
        qfacts: " Pac-Man is often credited with being a landmark in video game history, and is among the most famous arcade games of all time.",
        qimage: "images/pacman.png",
        qcorrect: "Pac Man"
    },
    {
        qnum: 4,
        qtext: "One of the most classic themes from 80's video games.  Name it!",
        qchoices: ['Legend of Zelda', 'Pac Man', 'Pole Position', 'Tron', 'Super Mario', 'Donkey Kong', 'Punch Out'],
        qfacts: "The Mario franchise is the best-selling video game franchise of all time. Over 210 million units of the overall Mario series of games have been sold",
        qimage: "images/supermario.jpg",
        qmusic: "audio/supermario.mp3",
        qcorrect: "Super Mario"
    },
    {
        qnum: 5,
        qtext: "Name the game associated with this music, it's a classic and even had a movie!",
        qchoices: ['Pac Man', 'Legend of Zelda', 'Pole Position', 'Super Mario', 'Tron', 'Donkey Kong', 'Punch Out'],
        qfacts: "Most of the 12 difficulty levels are named after programming languages. From lowest to highest: RPG, COBOL, BASIC, FORTRAN, SNOBOL, PL1, PASCAL, ALGOL, ASSEMBLY, OS, JCL, USER",
        qimage: "images/tron.png",
        qmusic: "audio/tron.mp3",
        qcorrect: "Tron"
    },
    {
        qnum: 6,
        qtext: "Save the princess, hurry!  What music is this from?",
        qchoices: ['Pac Man', 'Legend of Zelda', 'Tron', 'Super Mario', 'Pole Position', 'Donkey Kong', 'Punch Out'],
        qfacts: "A hallmark of the Donkey Kong series are barrels, which the Kongs use as weapons, vehicles, furniture, and lodging. The Donkey Kong character is highly recognizable and very popular; the franchise has sold over 40 million units worldwide.",
        qimage: "images/donkeykong.png",
        qmusic: "audio/donkeykong.mp3",
        qcorrect: "Donkey Kong"
    },
    {
        qnum: 7,
        qtext: "Don't get your ear bit off, what's this music from?",
        qchoices: ['Pole Position', 'Legend of Zelda', 'Pac Man', 'Super Mario', 'Tron', 'Donkey Kong', 'Punch Out'],
        qfacts: "Punch Out is a boxing arcade game by Nintendo, originally released late 1983.",
        qimage: "images/punchout.png",
        qmusic: "audio/punchout.mp3",
        qcorrect: "Punch Out"
    }
];

/////////Global variables
var currentQuestion = 0; //start out at array position 0
var questionNumbers = quizArr.length; //dynamically changes how long the quiz can be
var right = 0; //number of right answers
var wrong = 0; //number of wrong answers
/////////


////////Main Function
function readyPlayerOne() {
    $('.instructions').hide(); // hide the instructions
    $('.correct').hide(); // hide the 'correct' overlay
    $('.quiz_header').show(); // show the quiz header, question number, music, etc
    $('.quizrow').show(); // shows the quiz rows, answers, text, etc
    $('.submitrow').show(); // show the submit button
    $('.howtoplay').show(); // button for going back to instructions
    $('form#quizform').show(); //show the quiz form

    //question content at top for whichever question we are on
    $('p.questiontext').html(quizArr[currentQuestion].qtext);

    //display audio controls, generate link
    $('audio').replaceWith('<audio class="audio" src="' + quizArr[currentQuestion].qmusic + '"controls="controls"></audio>');

    var answer;
    var questionText;

    //get question text
    questionText = quizArr[currentQuestion].qtext;
    $('h2.questionnum').html('Question #' + (currentQuestion + 1) + " of " + questionNumbers); //set the question numbers
    $('form#quizform').empty();

    //for each question, starting at array pos 0, iterate, getting question answers, building and displaying in rows
    for (i = 0; i < questionNumbers; i++) {

        answer = quizArr[currentQuestion].qchoices[i]; //need help HERE - how to get array from qchoices

        var text1 = '<div class="quizrow">' +
            '<div class="checkbox">' +
            '<input type="radio" class="radio" name="chose" value="' +
            answer +
            '" id="' +
            answer +
            '"></input>' +
            '</div><label for="' +
            answer +
            '"><div class="answer">' +
            answer +
            '</label></div>';

        var submit = '<div class="submitrow">' +
            '<input class="submit" type="submit" value="-> Am I right?">' +
            '</div>';

        var howtoplay = '<div class="howtoplay">' +
            '<input class="submit" type="button" value=" How to play! <-">' +
            '</div>';

        $('#jquery a').click(window.testClickListener);
        $('form#quizform').append(text1); //adds the answers and radio buttons

    };

    $('form#quizform').append(submit); //adds the submit button at the bottom, only do it once
    $('form#quizform').append(howtoplay); //adds button to go back and view instructions

};

$(document).ready(function () {

    /*--- Hide correct modal box ---*/
    $('a.close_correct').click(function () {
        $('.correct').fadeOut(1000);
        isGameOver();
    });

    /*--- Hide incorrect modal box ---*/
    $('a.close_incorrect').click(function () {
        $('.incorrect').fadeOut(1000);
        isGameOver();
    });

    //refreshes the game state, resets global vars and calls player function
    $('.new').click(function () {
        currentQuestion = 0;
        questionNumbers = quizArr.length;
        right = 0;
        $('p.right').html("# Right: " + right);
        wrong = 0;
        $('p.wrong').html("# Wrong: " + wrong);

        readyPlayerOne();
    });

    //after instructions, click to play
    $('.play').click(function () {
        readyPlayerOne();
    });

    //show the game instructions on load only, hide other stuff
    $('.quiz_header').hide();
    $('.correct').hide();
    $('.incorrect').hide();
    $('.hiscore').hide();
    $('.quizrow').hide();
    $('.submitrow').hide();
    $('form#quizform').hide();

    //checks to see if all the questions have been answered, otherwise goes to next question
    function isGameOver() {
        if (currentQuestion < questionNumbers) {
            readyPlayerOne();
        } else {
            $('.nav').hide();
            $('.quiz_header').hide();
            $('.correct').hide();
            $('.incorrect').hide();
            $('.quizrow').hide();
            $('.submitrow').hide();
            $('form#quizform').hide();

            $('.hiscore').show();
            $('p.yourscore').html("Your Score: " + right);
        }
    }

    //on clicking submit button, checks the user's guess against array data answer
    $('form').submit(function (event) {
        event.preventDefault();
        var userGuess = $("input[class='radio']:checked").val();
        var correctAnswer = quizArr[currentQuestion].qcorrect;
        var facts = quizArr[currentQuestion].qfacts;
        var image = quizArr[currentQuestion].qimage;

        checkGuess(userGuess, correctAnswer);

        function checkGuess(userGuess, correctAnswer) {
            if (userGuess == correctAnswer) {
                $('.correct').fadeIn(1000);
                currentQuestion++;
                right++;
                $('p.right').html("# Right: " + right);
                $('h2.feedback').html("You're right!");
                $('ul.gameinfo').html("<li><img class=gameimage src=" + image + "></li>");
                $('ul.gameinfo').append("<li>Facts:" + facts + "</li>");
            } else if (typeof userGuess === 'undefined') {
                $('.incorrect').fadeIn(1000);
                currentQuestion++;
                wrong++;
                $('p.wrong').html("# Wrong: " + wrong);
                $('h2.feedback').html("Maybe you could make a choice next time?");
                $('p.correctanswerwas').html("The correct answer was: " + correctAnswer);
            } else {
                $('.incorrect').fadeIn(1000);
                currentQuestion++;
                wrong++;
                $('h2.feedback').html("You're wrong :-(");
                $('p.wrong').html("# Wrong: " + wrong);
                $('p.correctanswerwas').html("The correct answer was: " + correctAnswer);
            }
        };
    });
});