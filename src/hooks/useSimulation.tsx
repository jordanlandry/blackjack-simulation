import { useEffect, useState } from "react";
import getDecision from "../blackjack/basicStrategy";
import { dealersTurn, getHandValue, getNewBet, getWinner, hit, stand } from "../blackjack/blackjack";
import { Deck } from "../blackjack/deck";
import { ICard, SetState } from "../types";
import { CasinoRules } from "../components/Blackjack";

interface Props {
  simulationStarted: boolean;
  setSimulationStarted: SetState<boolean>;
  simulationCount: number;
  setSimulationCount: SetState<number>;

  simulationTimes: number;
  playerHand: ICard[];
  dealerHand: ICard[];
  deck: Deck;
  bet: number;

  setDealerHand: SetState<ICard[]>;
  setPlayerHand: SetState<ICard[]>;
  setBalance: SetState<number>;
  setBet: SetState<number>;

  handleStartRound: () => void;

  casinoRules: CasinoRules;
  initialBet: number;
  scaleFactor: number;
  setGamesPlayed: SetState<number>;
}

export default function useSimulation(props: Props) {
  const {
    simulationStarted,
    setSimulationStarted,
    simulationCount,
    setSimulationCount,
    simulationTimes,
    playerHand,
    dealerHand,
    deck,
    setDealerHand,
    setPlayerHand,
    setBalance,
    setBet,
    bet,
    handleStartRound,
    casinoRules,
    initialBet,
    scaleFactor,
    setGamesPlayed,
  } = props;

  const [roundOver, setRoundOver] = useState(false);

  const simulationDelay = 0;

  // Player decision functions
  const handleStand = () => {
    stand({ deck, dealerHand, setDealerHand });
    setRoundOver(true);
  };

  const handleHit = () => hit({ deck, setHand: setPlayerHand });

  const handleDouble = () => {
    if (!casinoRules.double) handleHit();
    else {
      setBalance((prevBalance) => prevBalance - bet);
      setBet((prevBet) => prevBet * 2);

      handleHit();
      handleStand();
    }
  };

  const handleSurrender = () => {
    if (!casinoRules.surrender) handleStand();
    else {
      setBalance((prevBalance) => prevBalance + bet * casinoRules.surrenderMultiplier);
      setRoundOver(true);
    }
  };

  // Start simulation
  useEffect(() => {
    let interval: NodeJS.Timer;

    const startSimulation = () => {
      const newBet = getNewBet({ initialBet, scaleFactor, deck, countMethod: "hi-lo" });
      setBet(newBet);

      setBalance((prevBalance) => prevBalance - newBet);

      handleStartRound();
      setSimulationCount((prevCount) => prevCount + 1);
      setGamesPlayed((prev) => prev + 1);
    };

    const stopSimulation = () => {
      setSimulationStarted(false);
      clearInterval(interval);
    };

    if (simulationStarted) {
      interval = setInterval(() => {
        if (simulationCount < simulationTimes) startSimulation();
        else stopSimulation();
      }, simulationDelay);
    }

    return () => clearInterval(interval);
  }, [simulationStarted, simulationTimes, simulationCount]);

  // Player's turn
  useEffect(() => {
    if (playerHand.length === 0) return;

    const value = getHandValue(playerHand);

    // User busted
    if (value > 21) {
      setRoundOver(true);
      dealersTurn({ deck, dealerHand, setDealerHand });

      return;
    }

    const decision = getDecision({ hand: playerHand, dealerCard: dealerHand[0] });

    // ---- Player actions (hit, stand, double, surrender) ----
    if (decision === "hit") handleHit();
    else if (decision === "stand") handleStand();
    else if (decision === "surrender") handleSurrender();
    else if (decision === "double") handleDouble();
  }, [playerHand]);

  // Round over
  useEffect(() => {
    if (!roundOver) return;

    setRoundOver(false);
    setPlayerHand([]);
    setDealerHand([]);

    // Check winner
    const winState = getWinner(playerHand, dealerHand);

    // Update balance based on win state
    if (winState === "player") setBalance((prevBalance) => prevBalance + bet * 2);
    else if (winState === "tie") setBalance((prevBalance) => prevBalance + bet);
    else if (winState === "blackjack") setBalance((prevBalance) => prevBalance + bet * casinoRules.blackjackMultiplier);
  }, [roundOver, bet]);
}
