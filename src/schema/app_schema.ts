import { TreeViewConfiguration, SchemaFactory } from "fluid-framework";

// Schema is defined using a factory object that generates classes for objects as well
// as list and map nodes.

// Include a UUID to guarantee that this schema will be uniquely identifiable.
// As this schema uses a recursive type, the beta SchemaFactoryRecursive is used instead of just SchemaFactory.
const sf = new SchemaFactory("5f78d99a-fcf6-4940-a6b3-859cc69b5517");

const DECK_SIZE = 56;

export class Card extends sf.object("Card", {
	// TODO: can we make the suit an enum?
	// for now, 1 = spades, 2 = clover, 3 = diamond, 4 = heart
	suit: sf.number,
	value: sf.number,
	rank: sf.string,
}) {}

export class Hand extends sf.object("Hand", {
	bet: sf.number,
	cards: sf.array(Card),
}) {}

// TODO: add some kind of auth maybe
export class Player extends sf.object("Player", {
	username: sf.string,
	money: sf.number,
	hand: sf.optional(Hand),
	// TODO: store player stats?
}) {}

const card_ranks: [string, number][] = [
	["2", 2],
	["3", 3],
	["4", 4],
	["5", 5],
	["6", 6],
	["7", 7],
	["8", 8],
	["9", 9],
	["10", 10],
	["J", 10],
	["Q", 10],
	["K", 10],
	["A", 1],
];

// TODO: can we make the suit an enum?
// for now, 1 = spades, 2 = clover, 3 = diamond, 4 = heart
const suits = [1, 2, 3, 4];

export class Deck extends sf.object("Deck", {
	cards: sf.array(Card),
	numberOfDecks: sf.number,
	count: sf.number,
}) {
	private readonly threshold = Math.floor(this.numberOfDecks * DECK_SIZE * 0.75);

	public deal = () => {
		if (this.cards.length < this.threshold) {
			this.shuffle();
		}
		const randomIndex = Math.floor(Math.random() * this.cards.length);
		const card = this.cards[randomIndex];
		this.cards.removeAt(randomIndex);
		return card;
	}

	private shuffle = () => {
		// clear out cards
		this.cards.removeRange();

		for (let i = 0; i < this.numberOfDecks; i++) {
			for (const [rank, value] of card_ranks) {
				for (const suit of suits) {
					this.cards.insertAtEnd(new Card({
						rank,
						value,
						suit,
					}))
				}
			}
		}
	};
}

// max number of hands is 7
export class Table extends sf.object("Table", {
	// TODO: do we need some kind of identifier or is the container id sufficient?
	// name: sf.string,
	deck: Deck,
	players: sf.array(Player),
	dealer: Hand,
}) {
	// TODO: maybe take in starting money as a param
	public addPlayer = (username: string) => {
		this.players.insertAtEnd(new Player({
			username,
			money: 200,
		}));
	}
}

// Export the tree config appropriate for this schema.
// This is passed into the SharedTree when it is initialized.
export const appTreeConfiguration = new TreeViewConfiguration(
  // Schema for the root
  { schema: Table },
);
