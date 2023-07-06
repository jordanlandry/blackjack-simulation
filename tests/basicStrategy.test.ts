import { expect, it } from "vitest";
import getDecision from "../src/blackjack/basicStrategy";
import { ICard } from "../src/types";

it("should return hit when player has 9 and dealer has 2", () => {
  const hand = [
    { value: 7, suit: "clubs" },
    { value: 2, suit: "spades" },
  ] as ICard[];

  const dealerCard = { value: 2, suit: "spades" } as ICard;

  const expected = "hit";
  const actual = getDecision({ hand, dealerCard });

  expect(actual).toBe(expected);
});

it("should return double when player has 9 and dealer has 3", () => {
  const hand = [
    { value: 7, suit: "clubs" },
    { value: 2, suit: "spades" },
  ] as ICard[];

  const dealerCard = { value: 3, suit: "spades" } as ICard;

  const expected = "double";
  const actual = getDecision({ hand, dealerCard });

  expect(actual).toBe(expected);
});

it("should return split when player has 2 8s no matter what dealer has", () => {
  const hand = [
    { value: 8, suit: "clubs" },
    { value: 8, suit: "spades" },
  ] as ICard[];

  const dealerCards = [
    { value: 2, suit: "spades" },
    { value: 3, suit: "spades" },
    { value: 4, suit: "spades" },
    { value: 5, suit: "spades" },
    { value: 6, suit: "spades" },
    { value: 7, suit: "spades" },
    { value: 8, suit: "spades" },
    { value: 9, suit: "spades" },
    { value: 10, suit: "spades" },
    { value: "A", suit: "spades" },
  ] as ICard[];

  for (const dealerCard of dealerCards) {
    const expected = "split";
    const actual = getDecision({ hand, dealerCard });

    expect(actual).toBe(expected);
  }
});

it("should return surrender when player has 16 and dealer has 9", () => {
  const hand = [
    { value: 10, suit: "clubs" },
    { value: 6, suit: "spades" },
  ] as ICard[];

  const dealerCard = { value: 9, suit: "spades" } as ICard;

  const expected = "surrender";
  const actual = getDecision({ hand, dealerCard });

  expect(actual).toBe(expected);
});

it("should return double when player has a 6,A and dealer has 3", () => {
  const hand = [
    { value: 6, suit: "clubs" },
    { value: "A", suit: "spades" },
  ] as ICard[];

  const dealerCard = { value: 3, suit: "spades" } as ICard;

  const expected = "double";
  const actual = getDecision({ hand, dealerCard });

  expect(actual).toBe(expected);
});
