import { useState } from "react";
import { checkForBlackjack, hit, stand, startRound } from "../blackjack/blackjack";
import { Deck } from "../blackjack/deck";
import { ICard } from "../types";
import Hand from "./Hand";

export const DECK_COUNT = 5;
export default function BlackJack() {
  const [playerHand, setPlayerHand] = useState<ICard[]>([]);
  const [dealerHand, setDealerHand] = useState<ICard[]>([]);
  const [deck, setDeck] = useState<Deck>(new Deck({ deckCount: DECK_COUNT }));
  const [balance, setBalance] = useState<number>(1000);
  const [bet, setBet] = useState<number>(0);

  const [hiddenDealerCards, setHiddenDealerCards] = useState<Set<number>>(new Set([1])); // Hide the second card by default

  // Deals cards to player and dealer
  const handleStartRound = () => {
    handleResetHands();

    startRound({ deck, setPlayerHand, setDealerHand });

    // Check for blackjacks
    checkForBlackjack(playerHand);
    checkForBlackjack(dealerHand);
  };

  // Hit
  const handleHit = () => hit({ deck, setHand: setPlayerHand });

  // Stand
  const handleStand = () => {
    stand({ deck, dealerHand, setDealerHand });
    setHiddenDealerCards(new Set());
  };

  // Reset the hands
  const handleResetHands = () => {
    setPlayerHand([]);
    setDealerHand([]);
    setHiddenDealerCards(new Set([1]));
  };

  // Reset the hands and the deck
  const handleResetAll = () => {
    handleResetHands();
    setDeck(new Deck({ deckCount: DECK_COUNT }));
  };

  return (
    <div>
      <Hand hand={playerHand} />
      <Hand hand={dealerHand} hiddenCards={hiddenDealerCards} />
      <button onClick={handleStartRound}>Deal</button>
      <button onClick={handleHit}>Hit</button>
      <button onClick={handleStand}>Stand</button>
      <button onClick={handleResetAll}>Reset All</button>

      <div>Balance: {balance.toLocaleString("en-us")}</div>

      <label htmlFor="bet">Bet</label>
      <input type="number" min={1} max={balance} id="bet" name="bet" value={bet} onChange={(e) => setBet(parseInt(e.target.value))} />
    </div>
  );
}
