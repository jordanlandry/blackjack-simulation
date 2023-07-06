import { CardSuit, ICard } from "../types";
import "./styles/card.scss";

const SUIT_EMOJIS = {
  clubs: "♣️",
  diamonds: "♦️",
  hearts: "♥️",
  spades: "♠️",
} as { [key in CardSuit]: string };

interface CardProps extends ICard {
  hidden?: boolean;
}

export default function Card(props: CardProps) {
  const { value, suit } = props;
  const color = suit === "hearts" || suit === "diamonds" ? "red" : "black";

  if (props.hidden) return <CardBack />;
  // if (value === "J") return <JackCard {...props} />;
  // if (value === "Q") return <QueenCard {...props} />;
  // if (value === "K") return <KingCard {...props} />;

  // let val = value === "A" ? 1 : value;

  // const suitElements = Array.from({ length: val }, (_, i) => (
  //   <div className="suit" key={i}>
  //     {SUIT_EMOJIS[suit]}
  //   </div>
  // ));

  return (
    <div className="card" data-color={color}>
      <div>{value}</div>
      <div>{SUIT_EMOJIS[suit]}</div>
    </div>
  );
}

function CardBack() {
  return (
    <div className="card-back">
      <img src="card-back.png" />
    </div>
  );
}

// --------------- FACE CARDS ---------------
function JackCard(props: CardProps) {
  const { suit } = props;
  const color = suit === "hearts" || suit === "diamonds" ? "red" : "black";

  return (
    <div className="jack-card" data-color={color}>
      <div className="jack-card-top">
        <div className="jack-card-suit">{SUIT_EMOJIS[suit]}</div>
      </div>
      <div className="jack-card-bottom">
        <div className="jack-card-suit">{SUIT_EMOJIS[suit]}</div>
      </div>
    </div>
  );
}

function QueenCard(props: CardProps) {
  const { suit } = props;
  const color = suit === "hearts" || suit === "diamonds" ? "red" : "black";

  return (
    <div className="queen-card" data-color={color}>
      <div className="queen-card-top">
        <div className="queen-card-suit">{SUIT_EMOJIS[suit]}</div>
      </div>
      <div className="queen-card-bottom">
        <div className="queen-card-suit">{SUIT_EMOJIS[suit]}</div>
      </div>
    </div>
  );
}

function KingCard(props: CardProps) {
  const { suit } = props;
  const color = suit === "hearts" || suit === "diamonds" ? "red" : "black";

  return (
    <div className="king-card" data-color={color}>
      <div className="king-card-top">
        <div className="king-card-suit">{SUIT_EMOJIS[suit]}</div>
      </div>
      <div className="king-card-bottom">
        <div className="king-card-suit">{SUIT_EMOJIS[suit]}</div>
      </div>
    </div>
  );
}
