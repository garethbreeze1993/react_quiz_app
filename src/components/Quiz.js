import React from "react"

export default function Quiz(props) {

    const buttonTxt = props.completed ? "Play Again?": "Check Answers"

    return (
        <main>
            <p>How would you say goodbye in Spanish?</p>
            <button onClick={() => props.handleClick(props.completed)}>{buttonTxt}</button>
        </main>
    )
}