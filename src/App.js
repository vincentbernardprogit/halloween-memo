import SingleCard from './components/SingleCard'
import {useState, useEffect} from 'react'
import './App.css'

const halloweenImages = [
	{"src": "assets/halloween_mask_1.png", matched: false},
	{"src": "assets/halloween_mask_2.png", matched: false},
	{"src": "assets/halloween_pumpkin_1.png", matched: false},
	{"src": "assets/halloween_pumpkin_2.png", matched: false},
	{"src": "assets/halloween_pumpkin_3.png", matched: false},
	{"src": "assets/halloween_pumpkin_4.png", matched: false},
	{"src": "assets/halloween_pumpkin_5.png", matched: false},
	{"src": "assets/halloween_pumpkin_6.png", matched: false},
	{"src": "assets/halloween_pumpkin_7.png", matched: false},
	{"src": "assets/halloween_pumpkin_8.png", matched: false}
]

function App() {
	const [cards, setCards] = useState([])
	const [turn, setTurn] = useState(0)
	const [firstChoice, setFirstChoice] = useState(null)
	const [secondChoice, setSecondChoice] = useState(null)
	const [disabled, setDisabled] = useState(false)

	const shuffleCardDeck = () => {
		const cardDeck = [...halloweenImages, ...halloweenImages]
			.sort(() => Math.random() - 0.5)
			.map((card) => ({...card, id: Math.random()}))
		setFirstChoice(null)
		setSecondChoice(null)
		setCards(cardDeck)
		setTurn(0)
	}

	const handleChoice = (card) => {firstChoice ? setSecondChoice(card) : setFirstChoice(card)}

	useEffect(() => {
		if(firstChoice && secondChoice){
			setDisabled(true)
			if(firstChoice.src === secondChoice.src){
				setCards(previousCards => {
					return previousCards.map(previousCard => {
						if(previousCard.src === firstChoice.src) return {...previousCard, matched: true}
						else return previousCard
					})
				})
				resetTurn()
			}
			else setTimeout(() => resetTurn(), 1000)
		}
	}, [firstChoice, secondChoice])

	const resetTurn = () => {
		setFirstChoice(null)
		setSecondChoice(null)
		setTurn(previousTurn => previousTurn + 1)
		setDisabled(false)
	}

	useEffect(() => {shuffleCardDeck()}, [])

	return (
		<div className="App">
			<h1>Halloween Memo</h1>
			<div className="container">
				<div className="card-grid">
					{cards.map(card => (
						<div className="card" key={card.id}>
							<SingleCard key={card.id} handleChoice={handleChoice} card={card} flipped={card === firstChoice || card === secondChoice || card.matched} disabled={disabled} />
						</div>
					))}
				</div>
				<div className="menu">
					<button onClick={shuffleCardDeck}>New Game</button>
					<p>Turns: {turn}</p>
				</div>
			</div>
		</div>
	)
}

export default App