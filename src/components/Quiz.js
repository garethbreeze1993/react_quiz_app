import React from "react"

export default function Quiz(props) {

    const [questionObj, setQuestionObj] = React.useState({});
    const [correctAnswerObj, setCorrectAnswerObj] = React.useState({})

    // console.log(props.selectedAnswers)

    React.useEffect(() => {
        props.questions.forEach(question => {
            const questionText = question.question
            const correctAnswer = question.correct_answer
          setQuestionObj(prevObj => (
              {...prevObj,
              [questionText]: "",
              }))
            setCorrectAnswerObj(prevObj => (
              {...prevObj,
              [questionText]: correctAnswer,
              }))
        })

    }, [props.questions])

    const buttonTxt = props.completed ? "Play Again?": "Check Answers"

    function removeQuote(question) {
        // Buggy way of removing quotes and apostrophes from the JSON
        question = question.replaceAll("&quot;", '')
        question = question.replaceAll("&#039;", '')
        return question
    }

    function handleFormChange(event){
        const {name, value} = event.target
        setQuestionObj(prevQuestionObj => {
            return {
                ...prevQuestionObj,
                [name]: value
            }

        })
    }

    function getStyle(completed, checked, selectedAnswers, answer){
        if(!completed || !checked){
            return {}
        }

        return selectedAnswers[answer] === true ? {'backgroundColor': 'green'} : {'backgroundColor': 'red'}

    }

    const questionElements = props.questions.map((question, index) => {
        const questionTxtQuote = question.question
        const questionText = removeQuote(question.question)
        let answers;
        if(question.type === 'multiple'){
            answers = question.incorrect_answers
            answers.push(question.correct_answer)
        }else{
            answers = ["True", "False"]
        }
        const setAnswers = [...new Set(answers)]

        const answerElements = setAnswers.map((answer, index) =>
            <div key={index} className={"quiz--answer"}
                 style={getStyle(props.completed, questionObj[questionTxtQuote] === answer, props.selectedAnswers, answer)}>
                <input
                    type="radio"
                    id={answer}
                    name={questionTxtQuote}
                    value={answer}
                    checked={questionObj[questionTxtQuote] === answer}
                    onChange={handleFormChange}
                    disabled={props.completed}
                />
                {removeQuote(answer)}
            </div>)
        return <div key={index} className={"quiz--container"}>
            <h5 className={"quiz--question"}>{questionText}</h5>
            {answerElements}

        </div>
    })

    // console.log(questionObj)


    return (
        <form onSubmit={(event) => props.handleSubmit(event, questionObj, correctAnswerObj)}>
            {questionElements}
            {props.completed && <p>You scored {props.correctAnswers} out of {props.questions.length}</p>}
            { props.completed ?
            <button type={'button'} onClick={props.handleClick}
                    className={"intro--button"}>{buttonTxt}</button>
                :
            <button className={"intro--button"}>{buttonTxt}</button>}
        </form>
    )
}