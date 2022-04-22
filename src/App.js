import React from "react"
import './App.css';
import Intro from "./components/Intro"
import Quiz from "./components/Quiz"

function App() {
    const [quiz, setQuiz] = React.useState(false);
    const [completed, setCompleted] = React.useState(false);
    const [questions, setQuestions] = React.useState([])


    React.useEffect(() => {
        if(quiz){
            fetch("https://opentdb.com/api.php?amount=10&category=9")
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
    }

    function handleSubmit(event, questionObj, correctAnswerObj){
        event.preventDefault();
        // console.log('submitted')
        // console.log(questionObj)
        // console.log(correctAnswerObj)
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
            /> :
            <Intro
            handleClick={handleStartBtnClick}
        />
        }
    </div>
     );
}

export default App;
