import { expect, it } from "vitest";
import { isSoft17 } from "../src/blackjack/blackjack";
import { ICard } from "../src/types";

/*
  A soft 17 is a hand that contains a soft ace, and totals 17.
  A soft ace is an ace that is being counted as 11, not 1.

  Examples:
  A, 6
  A, A, 5
  A, A, A, 4

  A hard 17 is a hand that contains no soft aces, and totals 17.

  Examples:
  10, 7
  A, A, A, 10, 4

  There are a lot of edge cases to consider, which is why the test functions exist.

  This function should return true if the hand is a soft 17, and false if it is a hard 17.
*/

it("should return false for hand value of 10, 7", () => {
  const hand: ICard[] = [
    { value: 10, suit: "clubs" },
    { value: 7, suit: "spades" },
  ];

  const expected = false;
  const actual = isSoft17(hand);

  expect(actual).toBe(expected);
});

it("should return true for hand value of A, 6", () => {
  const hand: ICard[] = [
    { value: "A", suit: "clubs" },
    { value: 6, suit: "spades" },
  ];

  const expected = true;
  const actual = isSoft17(hand);

  expect(actual).toBe(expected);
});

it("should return true for hand value of A, A, 5", () => {
  const hand: ICard[] = [
    { value: "A", suit: "clubs" },
    { value: "A", suit: "spades" },
    { value: 5, suit: "spades" },
  ];

  const expected = true;
  const actual = isSoft17(hand);

  expect(actual).toBe(expected);
});

it("should return true for hand value of A, A, A, 4", () => {
  const hand: ICard[] = [
    { value: "A", suit: "clubs" },
    { value: "A", suit: "spades" },
    { value: "A", suit: "spades" },
    { value: 4, suit: "spades" },
  ];

  const expected = true;
  const actual = isSoft17(hand);

  expect(actual).toBe(expected);
});

it("should return true for hand value of A, A, A, A, 3", () => {
  const hand: ICard[] = [
    { value: "A", suit: "clubs" },
    { value: "A", suit: "spades" },
    { value: "A", suit: "spades" },
    { value: "A", suit: "spades" },
    { value: 3, suit: "spades" },
  ];

  const expected = true;
  const actual = isSoft17(hand);

  expect(actual).toBe(expected);
});

it("should return false for hand value of A, A, A, 10, 4", () => {
  const hand: ICard[] = [
    { value: "A", suit: "clubs" },
    { value: "A", suit: "spades" },
    { value: "A", suit: "spades" },
    { value: 10, suit: "spades" },
    { value: 4, suit: "spades" },
  ];

  const expected = false;
  const actual = isSoft17(hand);

  expect(actual).toBe(expected);
});

it("should return false for hand value of 10, 7", () => {
  const hand: ICard[] = [
    { value: 10, suit: "clubs" },
    { value: 7, suit: "spades" },
  ];

  const expected = false;
  const actual = isSoft17(hand);

  expect(actual).toBe(expected);
});

it("should return false for hand value of 10, 6, A", () => {
  const hand: ICard[] = [
    { value: 10, suit: "clubs" },
    { value: 6, suit: "spades" },
    { value: "A", suit: "spades" },
  ];

  const expected = false;
  const actual = isSoft17(hand);

  expect(actual).toBe(expected);
});

it("should return true for hand value of A, A, A, A, A, A, A", () => {
  const hand: ICard[] = [
    { value: "A", suit: "clubs" },
    { value: "A", suit: "clubs" },
    { value: "A", suit: "clubs" },
    { value: "A", suit: "clubs" },
    { value: "A", suit: "clubs" },
    { value: "A", suit: "clubs" },
    { value: "A", suit: "clubs" },
  ];

  const expected = true;
  const actual = isSoft17(hand);

  expect(actual).toBe(expected);
});
