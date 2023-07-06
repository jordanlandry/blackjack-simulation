import formatToDollar from "../util/formatToDollar";
import "./styles/stats.scss";

type Props = {
  totalGames: number;
  gamesPlayed: number;
  balance: number;
  startingBalance: number;
};

export default function Stats({ totalGames, gamesPlayed, balance, startingBalance }: Props) {
  return (
    <table>
      <tbody>
        <tr>
          <td>Games Played</td>
          <td>{gamesPlayed}</td>
        </tr>
        <tr>
          <td>Percent complete</td>
          <td>{((gamesPlayed / totalGames) * 100).toFixed(2)}%</td>
        </tr>
        <tr>
          <td>Balance</td>
          <td>{formatToDollar(balance)}</td>
        </tr>
        <tr>
          <td>Profit</td>
          <td data-positive={balance - startingBalance >= 0}>{formatToDollar(balance - startingBalance)}</td>
        </tr>
      </tbody>
    </table>
  );
}
