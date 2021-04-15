import React, { useState, useEffect } from 'react';
import './find.css';
import axios from 'axios';

const FindMagicCard = () => {
  const [letter, setLetter] = useState('');//find letter for search bar
  const [cards, setCard] = useState([]);//all card in api
  const [infos, setInfos] = useState(false);//toggle info card window onClick
  const [cardName, setCardName] = useState('');//receiv card Name for window show
  console.log(infos)
  console.log(cardName)


  // fetch api data
  useEffect(() => {
    axios
      .get('https://api.magicthegathering.io/v1/cards')
      .then((response) => response.data)
      .then((data) => {
        setCard([...data.cards]);
      });
  }, []);

  // fetch information in api whis input value
  const fetchCard = (e) => {
    let value = e.target.value;
    setLetter(value);
  };

  // return the name of the selected card and toggle true false for open window
  const handleInfos = (card) => {
    setCardName(card.name);
    setInfos(!infos);
  };

  return (
    <div className='find'>
      <div className='searchBar'>
        <h1>Search your favorit Magic card</h1>
        <input type='text' onChange={fetchCard} />
      </div>
      <ul>
        {cards
          .filter((card) => {
            return card.name.toLowerCase().includes(letter.toLowerCase());
          })
          .map((card) => (
            <div cardComponent>
              <li>
                <h1>{card.name}</h1>
              </li>
              <li>
                <a href='#card'>
                  <img
                    src={card.imageUrl}
                    alt='img'
                    onClick={() => handleInfos(card)}
                  />
                </a>
              </li>
            </div>
          ))}
      </ul>
      {infos && (
        <div className='showInfos'>
          <div className='infos'>
            <div className='head'>
              <ul>
                {cards
                .filter((card)=>card.name.includes(cardName))
                .map((card)=>(
                  <div className="container">
                    <div className="cardShow">
                      <h1>{card.name}</h1>
                    <img
                    src={card.imageUrl}
                    alt='img'/>
                    </div>
                    <div className="cardInfos">
                    <li><span>Type:</span> {card.type}</li>
                    <li><span>Colors:</span> {card.colors}</li>
                    <li><span>ManaCost:</span> {card.manaCost}</li>
                    <li><span>Rarity:</span> {card.rarity}</li>
                    <li><span>Description:</span> {card.text}</li>
                    <li><span>Power:</span>{card.power},<span>Toughness:</span>{card.toughness}</li>
                    <button>EXIT</button>
                    </div>
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FindMagicCard;
