export default function parseDate(date) {
  const d = new Date(date);

  return `${d.toDateString()}, ${d.toLocaleTimeString()}`;
}
