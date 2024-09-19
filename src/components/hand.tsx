import React, { useEffect, useState } from "react";
import { Card, Hand } from "../schema/app_schema.js";
import { Tree } from "fluid-framework";

export function HandComponent(props: {
    hand: Hand;
    dealer: boolean;
	// container: IFluidContainer;
}): JSX.Element {
    const [cards, setCards] = useState<Card[]>(
		props.hand.cards.map((card) => card),
	);

	useEffect(() => {
		const unsubscribe = Tree.on(props.hand.cards, "nodeChanged", () => {
			setCards(props.hand.cards.map((card) => card));
		});
		return unsubscribe;
	}, []);

	return (
		<div
			id="hand"
		>
			{
                cards.map((card, index) => {
                    return props.dealer && index == 1 ?
                        <div className="hidden-card" key={index} /> :
                        <CardComponent key={index} card={card} />
                })
            }
		</div>
	);
}

// TODO: use actual images instead
const suitMap = new Map([
    [1, "♠"],
    [2, "♣"],
    [3, "♦"],
    [4, "♥"],
])

export function CardComponent(props: {
    card: Card;
	// container: IFluidContainer;
}): JSX.Element {
	return (
		<div
			id="card"
		>
			<h1>
                {props.card.rank}
                {
                   suitMap.get(props.card.suit)
                }
            </h1>
		</div>
	);
}