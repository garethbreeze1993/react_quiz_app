import React from "react"
import './App.css';
import Intro from "./components/Intro"
import Quiz from "./components/Quiz"

function App() {
    const [quiz, setQuiz] = React.useState(false);
    const [completed, setCompleted] = React.useState(false);
    const [questions, setQuestions] = React.useState([])
    const [correctAnswers, setCorrectAnswers] = React.useState(0);
    const [answerSelectedObj, setAnswerSelectObj] = React.useState({})


    const bool = 'https://opentdb.com/api.php?amount=5&type=boolean'
    const OPEN_DB_API_URL = "https://opentdb.com/api.php?amount=10&category=9"

    React.useEffect(() => {
        if(quiz){
            fetch(OPEN_DB_API_URL)
                .then(res => res.json())
                .then(data => setQuestions(data.results))

        }else{
            setQuestions([])
        }

    }, [quiz])


    function handleStartBtnClick(){
        setQuiz(true);
    }

    function handleQuizBtnClick(){
        setQuiz(false)
        setCompleted(false)
        setCorrectAnswers(0)
        setAnswerSelectObj({})
    }

    function handleSubmit(event, questionObj, correctAnswerObj){
        event.preventDefault();
        // console.log('submitted')
        // console.log(questionObj)
        // console.log(correctAnswerObj)
        for (const [key, value] of Object.entries(questionObj)) {
            if(value === "True" || value === "False"){
                const boolCorrectAnswer = value === correctAnswerObj[key]
                if(boolCorrectAnswer){
                    setCorrectAnswers(prevCorrectAnswers => prevCorrectAnswers + 1)
                }
                setAnswerSelectObj(prevAnswerObj =>
                    ({...prevAnswerObj,
                        [key]: boolCorrectAnswer}))
            }
            else if(value === correctAnswerObj[key]){
                setCorrectAnswers(prevCorrectAnswers => prevCorrectAnswers + 1)
                setAnswerSelectObj(prevAnswerObj =>
                    ({...prevAnswerObj,
                        [value]: true}))
            }else{
                const correctAnswer = correctAnswerObj[key]
                setAnswerSelectObj(prevAnswerObj =>
                    ({...prevAnswerObj,
                        [value]: false,
                        [correctAnswer]: true
                    }))
            }
        }
        setCompleted(true)
    }

    return (
    <div className="App">
        {quiz ?
            <Quiz
                completed={completed}
                handleClick={handleQuizBtnClick}
                questions={questions}
                handleSubmit={handleSubmit}
                correctAnswers={correctAnswers}
                selectedAnswers={answerSelectedObj}
            /> :
            <Intro
            handleClick={handleStartBtnClick}
        />
        }
    </div>
     );
}

export default App;
