import React from "react"

export default function Intro(props) {

    return (
        <main className={"intro--main"}>
            <h1 className={"intro--head"}>Quizzical</h1>
            <h4 className={"intro--description"}>A fun quiz app built with React</h4>
            <button onClick={props.handleClick} className={"intro--button"}>Start Quiz</button>
        </main>
    )
}