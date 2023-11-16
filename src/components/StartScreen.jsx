
const StartScreen = ({startGame}) => {
    return(
        <div className="flex flex-col text-center items-center">
            <h1 className="text-6xl my-8">Secret Word</h1>
            <p className="mb-8">Clique no botão abaixo para começar a jogar</p>
            <button className="bg-blue-800 text-2xl font-bold text-white uppercase w-60 h-16" onClick={startGame}>Começar o jogo</button>
        </div>
    )
}

export default StartScreen