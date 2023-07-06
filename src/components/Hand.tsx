import { getHandValue } from "../blackjack/blackjack";
import { ICard } from "../types";
import Card from "./Card";
import "./styles/deck.scss";

interface Props {
  hand: ICard[];
  hiddenCards?: Set<number>;
}

export default function Hand({ hand, hiddenCards }: Props) {
  const shownCards = hand.filter((_, index) => !hiddenCards?.has(index));

  const value = getHandValue(shownCards);

  return (
    <div className="deck">
      {hand.map((card, index) => {
        return <Card key={index} {...card} hidden={hiddenCards?.has(index)} />;
      })}
      <div className="value">Value: {value}</div>
    </div>
  );
}
