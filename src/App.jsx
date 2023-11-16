import './App.css'
import StartScreen from './components/StartScreen'
import { useEffect, useState } from 'react'
import { wordList } from './data/words'
import Game from './components/Game'
import GameOver from './components/GameOver'


const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
]

const guessesQty = 3

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordList)

  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState([])

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(guessesQty)
  const [score, setScore] = useState(0)

  const pickWordAndCategory = () => {
    //pick a random category
    const categories = Object.keys(words)
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)]

    //pick a random word

    const word = words[category][Math.floor(Math.random() * words[category].length)]
    

    return { word, category }
  }

  const startGame = () => {
    // pick word and pick category
    const { word, category } = pickWordAndCategory()
    clearLetterStates()
    // create an array of letters

    let wordLetters = word.split("")

    wordLetters = wordLetters.map((l) => l.toLowerCase())

    
    

    // fill states
    setPickedWord(word)
    setPickedCategory(category)
    setLetters(wordLetters)
    setScore(0)

    setGameStage(stages[1].name)
  }

  const verifyLetter = (letter) => {

    const normalizedLetter = letter.toLowerCase()

    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return
    }
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters, normalizedLetter
      ])
    } else {
      setWrongLetters((actualWrongLetter) => [
        ...actualWrongLetter, normalizedLetter
      ])

      setGuesses((actualGuessedLetters) => actualGuessedLetters - 1)
    }
  }
  const clearLetterStates = () => {
    setGuessedLetters([])
    setWrongLetters([])
  }
  useEffect(() => {
    if (guesses <= 0) {
      clearLetterStates()
      setGameStage(stages[2].name)
    }
  }, [guesses])

  useEffect(() => {
    const uniqueLetter = [...new Set(letters)]

    if (guessedLetters.length === uniqueLetter.length) {
      setScore((actualScore) => actualScore += 100)
      startGame()
    }

    
  }, [guessedLetters])






  const retry = () => {
    setScore(0)
    setGuesses(guessesQty)
    setGameStage(stages[0].name)
  }


  return (
    <>
      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      {gameStage === 'game' && <Game
        verifyLetter={verifyLetter}
        pickedWord={pickedWord}
        pickedCategory={pickedCategory}
        letters={letters}
        guessedLetters={guessedLetters}
        wrongLetters={wrongLetters}
        guesses={guesses}
        score={score}
      />}
      {gameStage === 'end' && <GameOver retry={retry} score={score} />}
    </>
  )
}

export default App
