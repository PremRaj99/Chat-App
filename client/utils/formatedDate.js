export default function formatDate(inputDate) {
  const date = new Date(inputDate);
  const now = new Date();

  const isToday = date.toDateString() === now.toDateString();
  const isYesterday =
    new Date(now.setDate(now.getDate() - 1)).toDateString() ===
    date.toDateString();

  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };

  if (isToday) {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  } else if (isYesterday) {
    return "Yesterday";
  } else {
    return date.toLocaleDateString("en-GB", options).replace(/\//g, "-"); // Format as DD-MM-YYYY
  }
}

// const formattedDate = formatDate("2024-06-22T18:14:28.148Z");
// console.log(formattedDate); // Output will depend on the current date
