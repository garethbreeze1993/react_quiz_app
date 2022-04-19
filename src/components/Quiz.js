import React from "react"

export default function Quiz(props) {

    const buttonTxt = props.completed ? "Play Again?": "Check Answers"

    function removeQuote(question) {
        // Buggy way of moving quotes and apsotrophes from the JSON
        question = question.replaceAll("&quot;", '')
        question = question.replaceAll("&#039;", '')
        return question
    }

    const questionElements = props.questions.map((question, index) => {
        const question_text = removeQuote(question.question)
        let answers;
        if(question.type === 'multiple'){
            answers = question.incorrect_answers
            answers.push(question.correct_answer)
        }else{
            answers = ["True", "False"]
        }
        const setAnswers = [...new Set(answers)]

        const answerElements = setAnswers.map((answer, index) => <p key={index}>{answer}</p>)
        return <div key={index}>
            <p>{question_text}</p>
            {answerElements}

        </div>
    })

    return (
        <main>
            {questionElements}
            <button onClick={() => props.handleClick(props.completed)}>{buttonTxt}</button>
        </main>
    )
}