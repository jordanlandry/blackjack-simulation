import { expect, it } from "vitest";
import { ICard } from "../src/types";

import { getHandValue } from "../src/blackjack/blackjack";

// ------------------ ACE TESTS ------------------
// Aces need to be tested as they require special logic to determine their value
it("should return 12 for hand value of A, A", () => {
  const hand: ICard[] = [
    { value: "A", suit: "clubs" },
    { value: "A", suit: "spades" },
  ];

  const expected = 12;
  const actual = getHandValue(hand);

  expect(actual).toBe(expected);
});

it("should return 15 for hand value of 5 Aces", () => {
  const hand: ICard[] = [];
  for (let i = 0; i < 5; i++) {
    hand.push({ value: "A", suit: "clubs" });
  }

  const expected = 15;
  const actual = getHandValue(hand);

  expect(actual).toBe(expected);
});

it("should return 12 for hand value of 12 Aces", () => {
  const hand: ICard[] = [];
  for (let i = 0; i < 12; i++) {
    hand.push({ value: "A", suit: "clubs" });
  }

  const expected = 12;
  const actual = getHandValue(hand);

  expect(actual).toBe(expected);
});

it("should return 21 for hand value of 11 Aces", () => {
  const hand: ICard[] = [];
  for (let i = 0; i < 11; i++) {
    hand.push({ value: "A", suit: "clubs" });
  }

  const expected = 21;
  const actual = getHandValue(hand);

  expect(actual).toBe(expected);
});

// ------------------ FACE CARD TESTS ------------------
it("should return 20 for hand value of King and Jack", () => {
  const hand: ICard[] = [
    { value: "K", suit: "clubs" },
    { value: "J", suit: "spades" },
  ];

  const expected = 20;
  const actual = getHandValue(hand);

  expect(actual).toBe(expected);
});

it("should return 30 for hand value of King, Jack, and Queen", () => {
  const hand: ICard[] = [
    { value: "K", suit: "clubs" },
    { value: "J", suit: "spades" },
    { value: "Q", suit: "hearts" },
  ];

  const expected = 30;
  const actual = getHandValue(hand);

  expect(actual).toBe(expected);
});
