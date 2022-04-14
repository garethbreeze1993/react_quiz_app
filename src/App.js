import React from "react"
import './App.css';
import Intro from "./components/Intro"
import Quiz from "./components/Quiz"

function App() {
    const [quiz, setQuiz] = React.useState(false);
    const [completed, setCompleted] = React.useState(false);


    function handleStartBtnClick(){
        setQuiz(true);
    }

    function handleQuizBtnClick(playAgain){

        if(playAgain){
            setQuiz(false)
            setCompleted(false)
        }
        else{
            setCompleted(true)
        }
    }

    return (
    <div className="App">
        {quiz ?
            <Quiz
                completed={completed}
                handleClick={handleQuizBtnClick}
            /> :
            <Intro
            handleClick={handleStartBtnClick}
        />
        }
    </div>
     );
}

export default App;
