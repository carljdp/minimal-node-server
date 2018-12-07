'use-strict'

const assert = require('assert');
const terminalInterface = require('../terminalInterface');

describe('getAnswers', () => {
    it('Should return the correct answers', (done) => {

        // mock readline
        const createMockReadlineInterface = function(questionsCount) {

            if (questionsCount < 1) throw new Error("questionsCount should be > 0");

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
                    console.log(`Mock stdout: ${text}`)
                }
            }
        }

        // setup
        const arrayOfQuestionsMock =  ['Question 1','Question 3','Question 3'];
        const arrayOfExpectedAnswers = ['Mock answer 1', 'Mock answer 2', 'Mock answer 3']

        const readlineInterfaceMock = createMockReadlineInterface(arrayOfQuestionsMock.length)

        const startArrayOfAnswers = []
        const startAtIndex = 0

        // run
        const arrayOfActualAnswers = terminalInterface.getAnswersFromReadlineQuestions(readlineInterfaceMock, arrayOfQuestionsMock, startArrayOfAnswers, startAtIndex)

        // assert

        assert.deepEqual(arrayOfActualAnswers, arrayOfExpectedAnswers)

        done()
    }) 
}) 


