import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImgs = [
  {"src": "../images/messi1.png", "matched": false},
  {"src": "../images/messi2.png", "matched": false},
  {"src": "../images/messi3.png", "matched": false},
  {"src": "../images/messi4.png", "matched": false},
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)

  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)

  const [points, setPoints] = useState(0)

  const shuffleCards = () => {
    const shuffledCards = [...cardImgs, ...cardImgs]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({...card, id: Math.random() }))
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
    setPoints(0)
  }
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)  
  }

  useEffect(() => {
    if(choiceOne && choiceTwo){
      if(choiceOne.src === choiceTwo.src) {
        if(choiceOne.src === choiceTwo.src){
          setPoints(points+10)
        }
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === choiceOne.src){
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }

      },[choiceOne, choiceTwo])
      console.log(cards)

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
  }

  useEffect(() => {
    shuffleCards()
  },[])

  return (
    <div>
      <div>
        <h1>MEMOTEC</h1>
        <button onClick={shuffleCards}>New Game</button>
        <div>{points}</div>
      </div>
      <div className="App">
        {cards.map(card => (
          <SingleCard  key={card.id} card={card} handleChoice={handleChoice} flipped={card === choiceOne || card === choiceTwo || card.matched}/>
        ))}
      </div>
      <p>Turnos: {turns}</p>
    </div>
  );
}

export default App;
