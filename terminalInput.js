'use-strict'

const test = false;

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
const startIndex = 0;
const startArray = [];
const questions = ['Color', 'Shape', 'Size'];

// how do we wait for all befor continuing ??
const allAnswers = getAnswers(readline, questions, startArray, startIndex);

console.log(allAnswers);

// readline.on('close', () => {
//     console.log(allAnswers)
// })


function getAnswers(readline, questions, answers, startIndex) {
    if (startIndex < questions.length) {
        readline.question(questions[startIndex] + ' ', (answer) => { 
            answers = getAnswers(readline, questions, answers.concat([answer]), startIndex + 1)
        })
        return answers
    }
    else {
        // last return
        //readline.write(JSON.stringify(answers));
        //console.log(answers);
        
        //readline.close();

        return answers
    }
    //return answers
};

// TESTS ---------------------------------------------------

if (test) {

    const questionsMock =  ['Question 1','Question 3','Question 3'];

    const readlineMock = function(questionsCount) {
        const answersMock = [];
        for (let index = 0; index < questionsCount; index++) {
            answersMock[index] = `Mock answer ${index+1}`;
        }
        return {
            answersMock: answersMock,
            invocationCount: 0,
            question: function(questionText, receivedInput) {
                this.invocationCount++;
                receivedInput(this.answersMock[this.invocationCount-1])
            },
            close: function() {
            },
            write: function(text) {
                console.log(`\n~~Mock stdout:\n~~${text}`);
            }
        }
    }
    
    const testResults = getAnswers(readlineMock(questionsMock.length), questionsMock, startArray, startIndex);
    
    console.log(`Expect true: ${testResults[0] == 'Mock answer 1'}`);
    console.log(`Expect true: ${testResults[1] == 'Mock answer 2'}`);
    console.log(`Expect true: ${testResults[2] == 'Mock answer 3'}`);



}

