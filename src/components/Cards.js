import React, { Component } from 'react';

class Cards extends Component {
    constructor() {
        super();
        this.state = {
            cards: []
        }
    };

    componentDidMount() {
        fetch("https://deckofcardsapi.com/api/deck/brcw3n0y2riq/draw/?count=2")
            .then(results => {
                return results.json()
            }).then(data => {
                // console.log("data :", data);
                let cards = data.cards.map((card) => {
                    return (
                        <div key={card.code}>
                            <img src={card.images.png} alt="card" />
                        </div>
                    )
                })
                this.setState({ cards: cards });
            })
    }

    render() {
        return (
            <div>
                {this.state.cards}
            </div>
        )
    }
}

export default Cards;