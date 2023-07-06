import { CardSuit, CardValue, ICard } from "../types";
import { getHandValue } from "./blackjack";

const suits: CardSuit[] = ["clubs", "spades", "hearts", "diamonds"];
const values: CardValue[] = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];

type CardCountObject = { [key in CardValue]: number };

export class Deck {
  deckCount: number;
  cards: ICard[];

  standardCount: number = 0;

  // @ts-ignore - It will always be initialized in this.createDeck() but I guess TS doesn't know that
  allCardsCount: CardCountObject;

  constructor({ deckCount = 1, autoShuffle = true }: { deckCount?: number; autoShuffle?: boolean }) {
    if (deckCount < 1) {
      deckCount = 1;
      console.warn("Cannot have less than 1 deck. Defaulting to 1 deck.");
    }

    this.deckCount = deckCount;

    this.cards = this.createDeck();

    if (autoShuffle) this.shuffle();
  }

  createDeck() {
    const deck: ICard[] = [];
    for (let i = 0; i < this.deckCount; i++) {
      for (const suit of suits) {
        for (const value of values) {
          deck.push({ suit, value });
        }
      }
    }

    this.standardCount = 0;

    this.allCardsCount = {
      2: 4 * this.deckCount,
      3: 4 * this.deckCount,
      4: 4 * this.deckCount,
      5: 4 * this.deckCount,
      6: 4 * this.deckCount,
      7: 4 * this.deckCount,
      8: 4 * this.deckCount,
      9: 4 * this.deckCount,
      10: 16 * this.deckCount,
      J: 4 * this.deckCount,
      Q: 4 * this.deckCount,
      K: 4 * this.deckCount,
      A: 4 * this.deckCount,
    };

    return deck;
  }

  shuffle() {
    const cards = this.cards;
    let m = cards.length;
    let i: number;

    while (m) {
      i = Math.floor(Math.random() * m--);

      [cards[m], cards[i]] = [cards[i], cards[m]];
    }
  }

  updateCount(card: ICard) {
    const val = getHandValue([card]);

    // 2-6 = low card (+1), 7-9 = neutral (0), 10-A = high card (-1)
    if (val >= 2 && val <= 6) this.standardCount++;
    else if (val >= 10) this.standardCount--;

    // Update the count for the specific card
    this.allCardsCount[card.value] -= 1;
  }

  // Getters
  get trueCount() {
    return Math.round(this.standardCount / (this.cards.length / 52));
  }

  get aceProbability() {
    return this.allCardsCount.A / this.cards.length;
  }
}
