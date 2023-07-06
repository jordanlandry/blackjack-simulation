import { useState } from "react";
import { startRound } from "../blackjack/blackjack";
import { Deck } from "../blackjack/deck";
import useSimulation from "../hooks/useSimulation";
import { ICard } from "../types";

import "./styles/blackjack.scss";
import Stats from "./Stats";

export const DECK_COUNT = 5;
export interface CasinoRules {
  surrender: boolean;
  double: boolean;
  surrenderMultiplier: number;
  blackjackMultiplier: number;
}

const DEFAULT_BALANCE = 1000;
export default function BlackJack() {
  const [playerHand, setPlayerHand] = useState<ICard[]>([]);
  const [dealerHand, setDealerHand] = useState<ICard[]>([]);
  const [deck, setDeck] = useState<Deck>(new Deck({ deckCount: DECK_COUNT }));
  const [bet, setBet] = useState<number>(1);
  const [initialBet, setInitialBet] = useState<number>(1);
  const [balance, setBalance] = useState<number>(DEFAULT_BALANCE);

  const [startingBalance, setStartingBalance] = useState<number>(DEFAULT_BALANCE);
  const [scaleFactor, setScaleFactor] = useState<number>(10);

  // Different to simulation count, as this is the total number of games played and can be through multiple simulations
  const [gamesPlayed, setGamesPlayed] = useState<number>(0);

  const [casinoRules, setCasinoRules] = useState<CasinoRules>({
    surrender: true,
    double: true,
    surrenderMultiplier: 0.65,
    blackjackMultiplier: 2.5,
  });

  const [simulationTimes, setSimulationTimes] = useState(10000);
  const [simulationCount, setSimulationCount] = useState(0);
  const [simulationStarted, setSimulationStarted] = useState(false);

  // Deals cards to player and dealer
  const handleStartRound = () => {
    handleResetHands();
    startRound({ deck, setPlayerHand, setDealerHand });
  };

  const startSimulation = () => {
    setSimulationCount(0);
    setSimulationStarted(true);
    // setStartingBalance(balance);
  };

  const stopSimulation = () => setSimulationStarted(false);

  // Reset the hands
  const handleResetHands = () => {
    setPlayerHand([]);
    setDealerHand([]);
  };

  const handleReset = () => {
    handleResetHands();
    setDeck(new Deck({ deckCount: DECK_COUNT }));
    setBet(initialBet);
    setBalance(DEFAULT_BALANCE);
    setSimulationCount(0);
    setGamesPlayed(0);
    stopSimulation();
  };

  // Simulation
  useSimulation({
    simulationStarted,
    setSimulationStarted,
    simulationCount,
    setSimulationCount,
    simulationTimes,
    playerHand,
    dealerHand,
    deck,
    bet,
    setDealerHand,
    setPlayerHand,
    setBalance,
    setBet,
    handleStartRound,
    casinoRules,
    initialBet,
    scaleFactor,
    setGamesPlayed,
  });

  return (
    <div className="blackjack-page">
      <h1>Blackjack Simulator</h1>
      <div className="rules-wrapper">
        <h2>Casino Rules</h2>
        <div className="input-wrapper">
          <label htmlFor="surrender">Surrender</label>
          <input
            type="checkbox"
            id="surrender"
            name="surrender"
            checked={casinoRules.surrender}
            onChange={(e) => setCasinoRules({ ...casinoRules, surrender: e.target.checked })}
          />
        </div>

        <div className="input-wrapper">
          <label htmlFor="double">Double</label>
          <input
            type="checkbox"
            id="double"
            name="double"
            checked={casinoRules.double}
            onChange={(e) => setCasinoRules({ ...casinoRules, double: e.target.checked })}
          />
        </div>

        <div className="input-wrapper">
          <label htmlFor="surrender-multiplier">Surrender Multiplier</label>
          <input
            type="number"
            min={0.5}
            max={1}
            step={0.05}
            id="surrender-multiplier"
            name="surrenderMultiplier"
            value={casinoRules.surrenderMultiplier}
            onChange={(e) => setCasinoRules({ ...casinoRules, surrenderMultiplier: parseFloat(e.target.value) })}
          />
        </div>

        <div className="input-wrapper">
          <label htmlFor="blackjack-multiplier">Blackjack Multiplier</label>
          <input
            type="number"
            min={2}
            max={3}
            step={0.05}
            id="blackjack-multiplier"
            name="blackjackMultiplier"
            value={casinoRules.blackjackMultiplier}
            onChange={(e) => setCasinoRules({ ...casinoRules, blackjackMultiplier: parseFloat(e.target.value) })}
          />
        </div>
      </div>
      <div className="input-wrapper">
        <label htmlFor="bet">Base bet</label>
        <input type="number" min={1} max={balance} id="bet" name="bet" value={initialBet} onChange={(e) => setInitialBet(parseInt(e.target.value))} />
      </div>
      <div className="input-wrapper">
        <label htmlFor="simulation-times">Simulation Times</label>
        <input
          type="number"
          min={1}
          max={100000}
          id="simulation-times"
          name="simulationTimes"
          value={simulationTimes}
          onChange={(e) => setSimulationTimes(parseInt(e.target.value))}
        />
      </div>

      <div className="input-wrapper">
        <label htmlFor="scale-factor">Scale Factor</label>
        <input
          type="number"
          min={1}
          max={100}
          id="scale-factor"
          name="scaleFactor"
          value={scaleFactor}
          onChange={(e) => setScaleFactor(parseInt(e.target.value))}
        />
      </div>
      {simulationStarted ? <button onClick={stopSimulation}>Stop Simulation</button> : <button onClick={startSimulation}>Start Simulation</button>}
      <button onClick={handleReset}>Reset</button>
      <Stats totalGames={simulationTimes} gamesPlayed={gamesPlayed} balance={balance} startingBalance={startingBalance} />
    </div>
  );
}
