import { useState, useRef, useEffect } from "react"
import Die from './components/die'
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function App() {
    const [dice, setDice] = useState(() => generateAllNewDice()) 
    /*  in REact to prevent the generateAllNewDice() to be called every time we change the state we do 
        useState(()=> function()) now it will only be run 1 time just when the page loads
    */
    const buttonRef = useRef(null)// useRef allow us to access DOMNodes it helps us save values between the render cycles 

    const gameWon = dice.every(die => die.isHeld) && //.every return a bool 
        dice.every(die => die.value === dice[0].value)
        // gameWon will be a bool value 
    useEffect(() => {
        if (gameWon) {
            buttonRef.current.focus()
        }
    }, [gameWon])

    function generateAllNewDice() {
        return new Array(10)
            .fill(0) // fill the 10 array with 0 value
            .map(() => ({ //map over it but return them as objects
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: nanoid() // use a 3rd party package to generate a unique i die for each die element 
            }))
    }
    
    function rollDice() {
        if (!gameWon) {
            setDice(oldDice => oldDice.map(die =>
                die.isHeld ?
                    die :
                    { ...die, value: Math.ceil(Math.random() * 6) }
            ))
        } else {
            setDice(generateAllNewDice()) //this will rest state and the values in dice and a new game will be come up
        }
        /*
            or remove the else and...
            create a function called newGame....
            function newGame(){
                setDice(generateAllNewDice)
            }
            
            then.... 
            on the onClick do this onClick={gameWon?newGame:newGame}
         */
    }

    function hold(id) {
        setDice(oldDice => oldDice.map(die =>
            die.id === id ?
                { ...die, isHeld: !die.isHeld } :
                die
        ))
        console.log(id)
    }

    const diceElements = dice.map(dieObj => (
        <Die
            key={dieObj.id}
            value={dieObj.value}
            isHeld={dieObj.isHeld}
            hold={ hold}
            id={dieObj.id}
        />
    ))

    return (
        <main>
            {gameWon && <Confetti />}
            <div aria-live="polite" className="sr-only">
                {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
            </div>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button ref={buttonRef} className="roll-dice" onClick={rollDice}>
                {gameWon ? "New Game" : "Roll"}
            </button>
        </main>
    )
}