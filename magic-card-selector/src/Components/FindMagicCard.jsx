import React, { useState, useEffect } from 'react';
import "./find.css";
import axios from 'axios';

const FindMagicCard = () => {

  const [letter , setLetter]= useState("")
  console.log(letter)
  const [cards, setCard] = useState([]);
  console.log(cards);

  useEffect(() => {
    axios
    .get('https://api.magicthegathering.io/v1/cards')
    .then((response) => response.data)
    .then((data) => {
      setCard([...data.cards]);
    });
  }, []);

  const fetchCard=(e)=>{
    let value = e.target.value
    setLetter(value)
    
  }

  return (
    <div className='find'>
      <div className="searchBar">
      <h1>Search your favorit Magic card</h1>
      <input 
      type="text"
      onChange={fetchCard}
      />
      </div>
      <ul>
        {cards
        .filter((card)=>{
          return card.name.toLowerCase().includes(letter.toLowerCase())
        })
        .map((card) => (
          <div cardComponent>
            <li>
              <h1>{card.name}</h1>
            </li>
            <li>
              <a href="#card"><img src={card.imageUrl} alt="img"/></a>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default FindMagicCard;
