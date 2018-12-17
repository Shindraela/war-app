import React, { Component } from "react";

class Cards extends Component {
    constructor() {
        super();
        this.state = {
            cards: []
        };
    }

    componentDidMount() {
        this.shuffle();
        this.fetchData();
    }

    shuffle = () => {
        fetch("https://deckofcardsapi.com/api/deck/9td6jw4agj8o/shuffle/");
    };

    fetchData = () => {
        fetch("https://deckofcardsapi.com/api/deck/9td6jw4agj8o/draw/?count=52")
            .then(results => {
                return results.json();
            })
            .then(data => {
                // Split deck into two piles for player and bot
                let playerDeck = data.cards.slice(0, 26);
                let botDeck = data.cards.slice(26, 52);

                // Make string with player cards code for fetch API
                let playerCardsArray = [];
                playerDeck.map(card => {
                    playerCardsArray.push(card.code);
                });
                let playersCardsString = playerCardsArray.join(",");
                console.log("playersCardsString :", playersCardsString);

                // Same for bot cards
                let botCardsArray = [];
                botDeck.map(card => {
                    botCardsArray.push(card.code);
                });
                let botsCardsString = botCardsArray.join(",");
                console.log("botsCardsString :", botsCardsString);

                let cards = data.cards.map(card => {
                    return (
                        <div key={card.code}>
                            <img src={card.images.png} alt="card" />
                        </div>
                    );
                });
                this.setState({ cards: cards });
            });
    };

    render() {
        return <div>{this.state.cards}</div>;
    }
}

export default Cards;
