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
        this.shuffle();
        this.fetchData();
        this.fromPile();
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
                const deck_id = data.deck_id;
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
                const playerPileName = "playerPile";
                fetch(
                    "https://deckofcardsapi.com/api/deck/" +
                        deck_id +
                        "/pile/" +
                        playerPileName +
                        "/add/?cards=" +
                        playersCardsString
                ).then(results => {
                    return results.json();
                });

                // Create bot pile
                const botPileName = "botPile";
                fetch(
                    "https://deckofcardsapi.com/api/deck/" +
                        deck_id +
                        "/pile/" +
                        botPileName +
                        "/add/?cards=" +
                        botsCardsString
                ).then(results => {
                    return results.json();
                });

                // // Listing player cards in piles
                // var playerObj = {
                //     link: "https://deckofcardsapi.com/api/deck/" + deck_id + "/pile/" + playerPileName + "/list",
                //     object: {
                //         method: 'GET',
                //         headers: {
                //             'Content-Type': 'application/json',
                //             'Access-Control-Allow-Origin': '*',
                //             'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
                //             'Access-Control-Allow-Credentials': 'true',
                //             'Access-Control-Allow-Methods': '*'
                //         }
                //     }
                // }

                fetch(
                    "https://deckofcardsapi.com/api/deck/9td6jw4agj8o/pile/playerPile/list/"
                )
                    .then(results => {
                        return results.json();
                    })
                    .then(data => {
                        console.log("playerPile list data :", data);
                    });

                // // Listing bot cards in piles
                // var botObj = {
                //     link: "https://deckofcardsapi.com/api/deck/" + deck_id + "/pile/" + botPileName + "/list",
                //     object: {
                //         method: 'GET',
                //         headers: {
                //             'Content-Type': 'application/json',
                //             'Access-Control-Allow-Origin': '*',
                //             'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
                //             'Access-Control-Allow-Credentials': 'true',
                //             'Access-Control-Allow-Methods': '*'
                //         }
                //     }
                // }

                fetch(
                    "https://deckofcardsapi.com/api/deck/9td6jw4agj8o/pile/botPile/list/"
                )
                    .then(results => {
                        return results.json();
                    })
                    .then(data => {
                        console.log("botPile list data :", data);
                    });
            });
    };

    fromPile = () => {
        fetch(
            "https://deckofcardsapi.com/api/deck/9td6jw4agj8o/pile/botPile/draw/?count=1"
        )
            .then(results => {
                return results.json();
            })
            .then(data => {
                console.log(data);
                let botCards = data.cards.map(card => {
                    return (
                        <div key={card.code}>
                            <img src={card.images.png} alt="card" />
                        </div>
                    );
                });
                this.setState({ cards: botCards });
            });
    };

    render() {
        return (
            <div>
                {this.state.cards}
                <button onClick={this.fromPile}>Prochain tour</button>
            </div>
        );
    }
}

const App = () => {
    return (
        <div>
            <Cards />
        </div>
    );
};

export default App;
