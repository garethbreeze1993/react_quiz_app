import React from "react"

export default function Quiz(props) {

    const [questionObj, setQuestionObj] = React.useState({});
    const [correctAnswerObj, setCorrectAnswerObj] = React.useState({})
    const [answersListForQ, setAnswersListForQ] = React.useState({})

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

    // Look at cleanup when props.completed is changed i.e. the state vals at top

    function insertRandomArr (arr, index, newItem) {
        return [
              // part of the array before the specified index
              ...arr.slice(0, index),
              // inserted item
              newItem,
              // part of the array after the specified index
              ...arr.slice(index)]
    }

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

            const randomIndex = Math.floor(Math.random() * 4);

            if(randomIndex === 3){
                answers.push(question.correct_answer)
            } else if(randomIndex === 0){
                answers.unshift(question.correct_answer)
            }
            else{
                answers = insertRandomArr(answers, randomIndex, question.correct_answer)
            }

        }else{
            answers = ["True", "False"]
        }

        const setAnswers = [...new Set(answers)]

        let cached = true
        if(answersListForQ[questionTxtQuote] === undefined){
            setAnswersListForQ(prevState => (
            {...prevState,
                [questionTxtQuote]: setAnswers
            }))
            cached = false
        }

        const answerArray = cached ? answersListForQ[questionTxtQuote] : setAnswers

        const answerElements = answerArray.map((answer, index) =>
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