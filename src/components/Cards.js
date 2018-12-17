import React, { Component } from "react";

class Cards extends Component {
    constructor() {
        super();
        this.state = {
            playerDeck: [],
            botDeck: []
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        fetch("https://deckofcardsapi.com/api/deck/new/draw/?count=52")
            .then(results => {
                return results.json();
            })
            .then(data => {
                const deck_id = data.deck_id;
                // console.log(deck_id);

                // Split deck into two piles for player and bot
                let playerDeck = data.cards.slice(0, 26);
                let botDeck = data.cards.slice(26, 52);

                // Make string with player cards code for fetch API
                let playerCardsArray = [];
                playerDeck.map(card => {
                    playerCardsArray.push(card.code);
                });
                let playersCardsString = playerCardsArray.join(",");
                // console.log("playersCardsString :", playersCardsString);

                // Same for bot cards
                let botCardsArray = [];
                botDeck.map(card => {
                    botCardsArray.push(card.code);
                });
                let botsCardsString = botCardsArray.join(",");
                // console.log("botsCardsString :", botsCardsString);

                // Create player pile
                let playerPileName = "playerPile";
                fetch("https://deckofcardsapi.com/api/deck/" + deck_id + "/pile/" + playerPileName + "/add/?cards=" + playersCardsString)
                    .then(results => {
                        return results.json();
                    })
                    .then(data => {
                        // console.log("data :", data);

                        // let playerCards = data.cards.map(card => {
                        //     return (
                        //         <div key={card.code}>
                        //             <img src={card.images.png} alt="card" />
                        //         </div>
                        //     );
                        // });
                        // this.setState({ cards: playerCards });
                    });

                // Create bot pile
                let botPileName = "botPile";
                fetch("https://deckofcardsapi.com/api/deck/" + deck_id + "/pile/" + botPileName + "/add/?cards=" + botsCardsString)
                    .then(results => {
                        return results.json();
                    })
                    .then(data => {
                        console.log("data :", data);

                        // let botCards = data.cards.map(card => {
                        //     return (
                        //         <div key={card.code}>
                        //             <img src={card.images.png} alt="card" />
                        //         </div>
                        //     );
                        // });
                        // this.setState({ cards: botCards });
                    });

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
        return (
            <div>
                {this.state.cards}
                <button onClick={this.fetchData}>Show 2 more card</button>
            </div>
        );
    }
}

export default Cards;
