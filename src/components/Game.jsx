import { useState, useRef } from "react"

const Game = ({ verifyLetter, pickedWord, pickedCategory, letters, guessedLetters, wrongLetters, guesses, score }) => {

    const [letter, setLetter] = useState("")
    const letterInputRef = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault()

        verifyLetter(letter)

        setLetter("")
        letterInputRef.current.focus()
    }
    return (
        <div className=" pt-4 w-full h-full flex flex-col text-center items-center">
            <p>
                <span className="font-bold">Pontuação: {score}</span>
            </p>
            <h1 className="text-4xl">Adivinhe a palavra:</h1>
            <h3>Dica sobre a palavra: <span className="text-amber-400 font-bold">{pickedCategory}</span></h3>
            <p>Você ainda tem {guesses} tentativa(s).</p>
            <div className="flex m-6 p-6 border-8 border-amber-400">
                {/* <span className="text-7xl border-2 border-black w-24 - h-24 uppercase bg-white text-black font-bold" >A</span> */}
                {letters.map((letter, i) => (
                    guessedLetters.includes(letter) ? (
                        <span key={i} className="text-7xl border-2 border-black w-24 - h-24 uppercase bg-white text-black font-bold" >{letter}</span>
                    ) : (
                        <span key={i} className="text-7xl border-2 border-black w-24 - h-24 uppercase bg-white text-black font-bold" ></span>
                    )
                ))}
            </div>
            <div>
                <p className=" mb-5">Tente adivinhar uma letra da palavra:</p>
                <form onSubmit={handleSubmit} className="flex items-center justify-center">
                    <input className="h-12 w-12 text-4xl text-center mr-4"
                        type="text"
                        name="letter"
                        maxLength="1"
                        required 
                        onChange={(e) => setLetter(e.target.value)}
                        value={letter}
                        ref={letterInputRef}
                    />
                    <button className="bg-blue-800 text-lg font-bold text-white uppercase w-32 h-14">Jogar</button>
                </form>
            </div>
            <div>
                <p className="mt-4">Letras já utilzada</p>
                {wrongLetters.map((letter, i) => (
                    <span key={i}>{letter}, </span> 
                ))}
                
            </div>
        </div >
    )
}

export default Game