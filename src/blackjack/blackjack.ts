import { CountMethod, ICard, SetState } from "../types";
import { Deck } from "./deck";

// ------------------ HELPER FUNCTIONS ------------------
export const isSoft17 = (hand: ICard[]) => {
  let totalValue = getHandValue(hand);
  if (totalValue !== 17) return false;

  let hardValue = getHandValue(hand, false);
  let softAceCount = hand.filter((card) => card.value === "A").length;

  if (softAceCount === 0) return false;
  if (hardValue === 17) return true;

  while (softAceCount > 0 && hardValue > 17) {
    hardValue -= 10;
    softAceCount -= 1;

    // If we have no soft aces left then we can't have a soft 17
    if (softAceCount === 0) return false;

    // If we have a soft ace and the value is 17 then we have a soft 17
    if (hardValue === 17) return true;
  }

  return false;
};

// Getting the value for a hand
export function getHandValue(hand: ICard[], convertAces = true) {
  let value = 0;

  // Add up the value of each card in the hand
  for (const card of hand) {
    if (typeof card.value === "number") value += card.value;
    else if (card.value === "A") value += 11;
    else value += 10;
  }

  if (!convertAces) return value;

  // This should subtract 10 for each ace until either the value is under 21 or there are no more aces to check
  let i = 0; // Number of cards checked
  while (value > 21) {
    if (hand[i].value === "A") value -= 10;
    if (i >= hand.length - 1) break; // Break if there are no more cards to check
    i++;
  }

  return value;
}

// Remove a card from the deck and add return that card
export function dealCard(deck: Deck) {
  const card = deck.cards.pop();

  // If there is no card, then the deck is empty and we need to create a new deck and shuffle it
  if (!card) {
    deck.cards = deck.createDeck();
    deck.shuffle();
    return dealCard(deck);
  }

  deck.updateCount(card);

  return card;
}

interface UpdateBetProps {
  initialBet: number;
  scaleFactor: number;
  deck: Deck;
  countMethod: CountMethod;
}

// Actually making the bet and lowering the value will be done in Blackjack.tsx
export function getNewBet({ initialBet, scaleFactor, deck, countMethod }: UpdateBetProps) {
  if (countMethod === "none") return initialBet;

  if (countMethod === "hi-lo") {
    let betAmount = initialBet;

    const trueCount = deck.trueCount;

    const minimumBet = initialBet / 2;
    const maximumBet = initialBet * scaleFactor;
    const spread = maximumBet - minimumBet;

    if (trueCount > 0) betAmount += Math.floor(trueCount * (spread / 10)); // Add 1/10 of the spread for each true count
    else if (trueCount < 0) betAmount -= Math.floor(Math.abs(trueCount) * (spread / 10));

    // Make sure the bet is between the minimum and maximum
    if (betAmount < minimumBet) betAmount = minimumBet;
    else if (betAmount > maximumBet) betAmount = maximumBet;

    return betAmount;
  }

  return initialBet;
}

// ------------------ GAME LOGIC ------------------
interface StartRoundProps {
  deck: Deck;
  setPlayerHand: SetState<ICard[]>;
  setDealerHand: SetState<ICard[]>;
}

// Get 4 cards from the deck and set the player and dealer hands
export function startRound({ deck, setPlayerHand, setDealerHand }: StartRoundProps) {
  const card1 = dealCard(deck);
  const card2 = dealCard(deck);
  const card3 = dealCard(deck);
  const card4 = dealCard(deck);

  // Set the player and dealer hands
  setPlayerHand([card1, card3]);
  setDealerHand([card2, card4]);
}

export function checkForBlackjack(hand: ICard[]) {
  return hand.length === 2 && getHandValue(hand) === 21;
}

// ------------------ PLAYER ACTIONS ------------------
interface HitProps {
  deck: Deck;
  setHand: SetState<ICard[]>;
}

export function hit({ deck, setHand }: HitProps) {
  const card = dealCard(deck);
  setHand((hand) => [...hand, card]);
}

interface StandProps {
  deck: Deck;
  dealerHand: ICard[];
  setDealerHand: SetState<ICard[]>;
}

export function stand(props: StandProps) {
  dealersTurn(props);
}

// ------------------ END OF GAME ------------------
// Deal until the dealer has 17 or more
export function dealersTurn({ deck, dealerHand, setDealerHand }: { deck: Deck; dealerHand: ICard[]; setDealerHand: SetState<ICard[]> }) {
  const handCopy = [...dealerHand]; // Copy the hand so we can modify it

  // Deal until the dealer has a hard 17 or more
  while (getHandValue(handCopy) < 17) {
    const card = dealCard(deck);
    handCopy.push(card);

    // Hit on a soft 17 (17 with an ace)
    if (isSoft17(handCopy)) {
      const card = dealCard(deck);
      handCopy.push(card);
    }
  }

  // Update state
  setDealerHand(handCopy);
}

type Winner = "player" | "dealer" | "tie" | "blackjack" | "surrender"; // Used to determine what to do with the bet and balance
export function getWinner(playerHand: ICard[], dealerHand: ICard[]): Winner {
  const playerHandValue = getHandValue(playerHand);
  const dealerHandValue = getHandValue(dealerHand);

  // Check for blackjacks
  if (checkForBlackjack(playerHand) && checkForBlackjack(dealerHand)) return "tie";
  if (checkForBlackjack(playerHand)) return "blackjack";
  if (checkForBlackjack(dealerHand)) return "dealer";

  // Check for busts
  if (playerHandValue > 21) return "dealer";
  if (dealerHandValue > 21) return "player";

  // Check for higher hand
  if (playerHandValue > dealerHandValue) return "player";
  if (playerHandValue < dealerHandValue) return "dealer";

  // If none of the above are true then it's a tie
  return "tie";
}
