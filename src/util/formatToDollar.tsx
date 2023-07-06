// Just an easier way to format a number to a dollar amount than to use toLocaleString() everywhere.
export default function formatToDollar(amount: number) {
  return amount.toLocaleString("en-us", {
    style: "currency",
    currency: "USD",
  });
}
