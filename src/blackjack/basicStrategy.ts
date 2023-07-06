// https://www.techopedia.com/wp-content/uploads/2023/04/TECHOPEDIA-DEALERS-CARD-TABLE.png
// The mathematical perfect strategy for blackjack is known as basic strateg y.

import { Decision, ICard } from "../types";
import { getHandValue } from "./blackjack";

// This gives you the best change of winning in the long run
const basicStrategy = {
  3: { 2: "hit", 3: "hit", 4: "hit", 5: "hit", 6: "hit", 7: "hit", 8: "hit", 9: "hit", 10: "hit", A: "hit" },
  4: { 2: "hit", 3: "hit", 4: "hit", 5: "hit", 6: "hit", 7: "hit", 8: "hit", 9: "hit", 10: "hit", A: "hit" },
  5: { 2: "hit", 3: "hit", 4: "hit", 5: "hit", 6: "hit", 7: "hit", 8: "hit", 9: "hit", 10: "hit", A: "hit" },
  6: { 2: "hit", 3: "hit", 4: "hit", 5: "hit", 6: "hit", 7: "hit", 8: "hit", 9: "hit", 10: "hit", A: "hit" },
  7: { 2: "hit", 3: "hit", 4: "hit", 5: "hit", 6: "hit", 7: "hit", 8: "hit", 9: "hit", 10: "hit", A: "hit" },
  8: { 2: "hit", 3: "hit", 4: "hit", 5: "hit", 6: "hit", 7: "hit", 8: "hit", 9: "hit", 10: "hit", A: "hit" },
  9: { 2: "hit", 3: "double", 4: "double", 5: "double", 6: "double", 7: "hit", 8: "hit", 9: "hit", 10: "hit", A: "hit" },
  10: { 2: "double", 3: "double", 4: "double", 5: "double", 6: "double", 7: "double", 8: "double", 9: "double", 10: "hit", A: "hit" },
  11: { 2: "double", 3: "double", 4: "double", 5: "double", 6: "double", 7: "double", 8: "double", 9: "double", 10: "double", A: "double" },
  12: { 2: "hit", 3: "hit", 4: "stand", 5: "stand", 6: "stand", 7: "hit", 8: "hit", 9: "hit", 10: "hit", A: "hit" },
  13: { 2: "stand", 3: "stand", 4: "stand", 5: "stand", 6: "stand", 7: "hit", 8: "hit", 9: "hit", 10: "hit", A: "hit" },
  14: { 2: "stand", 3: "stand", 4: "stand", 5: "stand", 6: "stand", 7: "hit", 8: "hit", 9: "hit", 10: "hit", A: "hit" },
  15: { 2: "stand", 3: "stand", 4: "stand", 5: "stand", 6: "stand", 7: "hit", 8: "hit", 9: "hit", 10: "surrender", A: "hit" },
  16: { 2: "stand", 3: "stand", 4: "stand", 5: "stand", 6: "stand", 7: "hit", 8: "hit", 9: "surrender", 10: "surrender", A: "surrender" },
  17: { 2: "stand", 3: "stand", 4: "stand", 5: "stand", 6: "stand", 7: "stand", 8: "stand", 9: "stand", 10: "stand", A: "stand" },
  18: { 2: "stand", 3: "stand", 4: "stand", 5: "stand", 6: "stand", 7: "stand", 8: "stand", 9: "stand", 10: "stand", A: "stand" },
  19: { 2: "stand", 3: "stand", 4: "stand", 5: "stand", 6: "stand", 7: "stand", 8: "stand", 9: "stand", 10: "stand", A: "stand" },
  20: { 2: "stand", 3: "stand", 4: "stand", 5: "stand", 6: "stand", 7: "stand", 8: "stand", 9: "stand", 10: "stand", A: "stand" },
  A2: { 2: "hit", 3: "hit", 4: "hit", 5: "double", 6: "double", 7: "hit", 8: "hit", 9: "hit", 10: "hit", A: "hit" },
  A3: { 2: "hit", 3: "hit", 4: "hit", 5: "double", 6: "double", 7: "hit", 8: "hit", 9: "hit", 10: "hit", A: "hit" },
  A4: { 2: "hit", 3: "hit", 4: "double", 5: "double", 6: "double", 7: "hit", 8: "hit", 9: "hit", 10: "hit", A: "hit" },
  A5: { 2: "hit", 3: "hit", 4: "double", 5: "double", 6: "double", 7: "hit", 8: "hit", 9: "hit", 10: "hit", A: "hit" },
  A6: { 2: "hit", 3: "double", 4: "double", 5: "double", 6: "double", 7: "hit", 8: "hit", 9: "hit", 10: "hit", A: "hit" },
  A7: { 2: "stand", 3: "double", 4: "double", 5: "double", 6: "double", 7: "stand", 8: "stand", 9: "hit", 10: "hit", A: "hit" },
  A8: { 2: "stand", 3: "stand", 4: "stand", 5: "stand", 6: "stand", 7: "stand", 8: "stand", 9: "stand", 10: "stand", A: "stand" },
  A9: { 2: "stand", 3: "stand", 4: "stand", 5: "stand", 6: "stand", 7: "stand", 8: "stand", 9: "stand", 10: "stand", A: "stand" },
  A10: { 2: "stand", 3: "stand", 4: "stand", 5: "stand", 6: "stand", 7: "stand", 8: "stand", 9: "stand", 10: "stand", A: "stand" },
  22: { 2: "split", 3: "split", 4: "split", 5: "split", 6: "split", 7: "split", 8: "hit", 9: "hit", 10: "hit", A: "hit" },
  33: { 2: "split", 3: "split", 4: "split", 5: "split", 6: "split", 7: "split", 8: "hit", 9: "hit", 10: "hit", A: "hit" },
  44: { 2: "hit", 3: "hit", 4: "hit", 5: "split", 6: "split", 7: "hit", 8: "hit", 9: "hit", 10: "hit", A: "hit" },
  55: { 2: "double", 3: "double", 4: "double", 5: "double", 6: "double", 7: "double", 8: "double", 9: "double", 10: "hit", A: "hit" },
  66: { 2: "split", 3: "split", 4: "split", 5: "split", 6: "split", 7: "hit", 8: "hit", 9: "hit", 10: "hit", A: "hit" },
  77: { 2: "split", 3: "split", 4: "split", 5: "split", 6: "split", 7: "split", 8: "hit", 9: "hit", 10: "hit", A: "hit" },
  88: { 2: "split", 3: "split", 4: "split", 5: "split", 6: "split", 7: "split", 8: "split", 9: "split", 10: "split", A: "split" },
  99: { 2: "split", 3: "split", 4: "split", 5: "split", 6: "split", 7: "stand", 8: "split", 9: "split", 10: "stand", A: "stand" },
  1010: { 2: "stand", 3: "stand", 4: "stand", 5: "stand", 6: "stand", 7: "stand", 8: "stand", 9: "stand", 10: "stand", A: "stand" },
  AA: { 2: "split", 3: "split", 4: "split", 5: "split", 6: "split", 7: "split", 8: "split", 9: "split", 10: "split", A: "split" },
} as { [key: string]: { [key: string]: Decision } };

// Takes the hand and returns a key for the basic strategy lookup
function getKey(hand: ICard[]) {
  // Get the ace keys first
  const aces = hand.filter((card) => card.value === "A");
  if (aces.length === 2 && hand.length === 2) return "AA"; // Two aces
  else if (aces.length === 1) {
    const handWithoutAce = hand.filter((card) => card.value !== "A");
    const value = getHandValue(handWithoutAce);

    let key = `A${value}`;

    if (basicStrategy[key]) return key;
  }

  // Get the pair keys
  if (hand.length === 2 && hand[0].value === hand[1].value) {
    return `${hand[0].value}${hand[1].value}`;
  }

  // Get the hard keys
  const value = getHandValue(hand);
  return `${value}`;
}

// Takes the hand and returns the decision
interface DecisionProps {
  hand: ICard[];
  dealerCard: ICard;
}

export default function getDecision({ hand, dealerCard }: DecisionProps): Decision {
  const key = getKey(hand);

  // Get dealer key
  let dealerKey = dealerCard.value;
  if (dealerKey === "J" || dealerKey === "Q" || dealerKey === "K") dealerKey = 10;

  // If it doesn't exist, it means you've busted or got blackjack
  if (basicStrategy[key] === undefined) return "stand";

  return basicStrategy[key][dealerKey];
}
