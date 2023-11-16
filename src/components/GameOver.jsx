const GameOver = ({ retry, score }) => {
    return (
        <div className="flex flex-col text-center items-center">
            <h1 className="text-6xl my-8">Game Over!</h1>
            <h2 className="mb-8">A sua pontuação foi: <span className="text-amber-400 text-3xl ">{score}</span></h2>
            <button className="bg-blue-800 text-2xl font-bold text-white uppercase w-60 h-16" onClick={retry}>Resetar jogo</button>
        </div>
    )
}

export default GameOver