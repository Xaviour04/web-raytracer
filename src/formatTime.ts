export default function formatTime(milliseconds: number) {
    if (milliseconds === Infinity) return "∞ remaining"

    let seconds = Math.floor(milliseconds / 1_000);

    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;

    let hours = Math.floor(minutes / 60);
    minutes = minutes % 60;

    let days = Math.floor(hours / 24);
    hours = hours % 24;

    let result = "";
    if (days === 1) result += "1 day ";
    else if (days > 1) result += `${days} days `;

    if (hours === 1) result += "1 hour ";
    else if (days > 0 || hours > 1) result += `${hours} hours `;

    if (minutes === 1) result += "1 min ";
    else if (days > 0 || hours > 0 || minutes > 1) result += `${minutes} mins `;

    if (days > 0 || hours > 0 || minutes > 0)
        result += "and ";

    if (seconds === 1) result += "1 sec ";
    else result += `${seconds} secs `;

    result += "remaining";
    return result;
};