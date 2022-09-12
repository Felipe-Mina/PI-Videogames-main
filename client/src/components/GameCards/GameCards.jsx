import React from "react";
import './gameCards.css'
import Card from "../Card/Card";

export const GameCards = ({ currentGame }) => {
 
  return (
    <>
      <div>
          <div className="cards-container">
            {currentGame.map((e, i) => {
              return (
                <Card
                key={i}
                id={e.id}
                name={e.name}
                image={e.image}
                genres={e.genres}
                />
              )
            })}
          </div>
      </div>
    </>
  );
};
