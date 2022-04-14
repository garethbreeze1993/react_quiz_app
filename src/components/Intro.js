import React from "react"

export default function Intro(props) {

    return (
        <main>
            <h1>Quizzical</h1>
            <p>A fun quiz app built with react</p>
            <button onClick={props.handleClick}>Start Quiz</button>
        </main>
    )
}