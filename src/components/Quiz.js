import React from "react"

export default function Quiz(props) {

    const [questionObj, setQuestionObj] = React.useState({});
    const [correctAnswerObj, setCorrectAnswerObj] = React.useState({})

    // console.log('selectd ans')
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

    function getBoolStyle(questionText, selectedAnswers, checked, answer){
        const correct = selectedAnswers[questionText]

        // console.log(questionText)
        // console.log(correct)
        // console.log()

        if (correct === undefined){
            return answer === correctAnswerObj[questionText] ? {'backgroundColor': 'green'} : {}
        }

        if (correct && checked){
            return {'backgroundColor': 'green'}
        } else if(!correct && checked){
            return {'backgroundColor': 'red'}
        } else if (!correct && !checked){
            return {'backgroundColor': 'green'}
        } else if(correct && !checked){
            return {}
        }

    }

    function getStyle(completed, checked, selectedAnswers, answer, type, questionText){
        if(!completed){
            return {}
        }
        else if (type !== 'multiple'){
            return getBoolStyle(questionText, selectedAnswers, checked, answer)
        }
        else if(selectedAnswers[answer] === true){
            return {'backgroundColor': 'green'}
        }else if(checked){
            return {'backgroundColor': 'red'}
        }else{
            return {}
        }
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
                 style={getStyle(props.completed, questionObj[questionTxtQuote] === answer,
                     props.selectedAnswers, answer, question.type, questionTxtQuote)}>
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