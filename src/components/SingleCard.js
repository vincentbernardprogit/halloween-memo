import './SingleCard.css'

export default function SingleCard({card, handleChoice, flipped, disabled}) {
    const handleClick = () => {if(!disabled) handleChoice(card)}

    return (
        <div className="card">
            <div className={flipped ? "flipped" : ""}>
                <img className="front-card" src={card.src} />
                <img className="back-card" src="assets/halloween_castle_1.png" onClick={handleClick} />
            </div>
        </div>
    )
}