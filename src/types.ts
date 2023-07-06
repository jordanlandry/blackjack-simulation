export type CardValue = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | "J" | "Q" | "K" | "A";
export type CardSuit = "clubs" | "spades" | "hearts" | "diamonds";

export interface ICard {
  value: CardValue;
  suit: CardSuit;
}

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export type Decision = "hit" | "stand" | "double" | "split" | "surrender";

export type CountMethod = "hi-lo" | "none"; // TODO: Add more counting methods
