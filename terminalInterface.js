'use-strict'

// const readline = require('readline')

// const readlineInterface = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// })

// const questions = ['Color', 'Shape', 'Size']
// const startArray = []
// const startIndex = 0;

// // how do we wait for all befor continuing ??
// const allAnswers = getResponsesFromReadlineInterface(readlineInterface, questions, startArray, startIndex)

// console.log(allAnswers);

// // readline.on('close', () => {
// //     console.log(allAnswers)
// // })


function getAnswersFromReadlineQuestions(readlineInterface, arrayOfQuestionStrings, startArrayOfAnswers, startAtIndex) {

    if (startAtIndex < arrayOfQuestionStrings.length) {

        readlineInterface.question(arrayOfQuestionStrings[startAtIndex] + ' ', (answer) => { 
            startArrayOfAnswers = getAnswersFromReadlineQuestions(readlineInterface, arrayOfQuestionStrings, startArrayOfAnswers.concat([answer]), startAtIndex + 1)
        })

        return startArrayOfAnswers
    }
    else {  // last return

        readlineInterface.close();

        return startArrayOfAnswers
    }
};

exports.getAnswersFromReadlineQuestions = getAnswersFromReadlineQuestions;