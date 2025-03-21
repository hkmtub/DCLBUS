const busTimes = [
    "07:43 AM", "07:48 AM", "08:18 AM", "08:48 AM", "09:23 AM", "09:38 AM",
    "10:13 AM", "10:28 AM", "10:48 AM", "11:53 AM", "12:08 PM", "12:28 PM",
    "12:43 PM", "01:18 PM", "01:48 PM", "02:23 PM", "03:13 PM", "03:28 PM",
    "03:48 PM", "04:53 PM", "05:38 PM", "06:13 PM", "07:03 PM", "07:18 PM",
    "07:53 PM", "08:43 PM", "08:58 PM", "10:13 PM", "10:38 PM", "11:28 PM",
    "12:23 AM"
];

function updateSchedule() {
    const tableBody = document.getElementById("schedule");
    tableBody.innerHTML = "";
    busTimes.forEach(time => {
        let row = document.createElement("tr");
        let cell = document.createElement("td");
        cell.textContent = time;
        row.appendChild(cell);
        tableBody.appendChild(row);
    });
}

function updateCountdown() {
    const now = new Date();
    let currentHour = now.getHours();
    let currentMinute = now.getMinutes();
    let currentSecond = now.getSeconds();

    let nextBusTime = busTimes.find(time => {
        let [hourMinute, period] = time.split(" ");
        let [hour, minute] = hourMinute.split(":").map(Number);

        if (period === "PM" && hour !== 12) hour += 12;
        if (period === "AM" && hour === 12) hour = 0;

        return hour > currentHour || (hour === currentHour && minute > currentMinute);
    });

    if (nextBusTime) {
        let [hourMinute, period] = nextBusTime.split(" ");
        let [busHour, busMinute] = hourMinute.split(":").map(Number);

        if (period === "PM" && busHour !== 12) busHour += 12;
        if (period === "AM" && busHour === 12) busHour = 0;

        let busTimeInSeconds = (busHour * 3600) + (busMinute * 60);
        let currentTimeInSeconds = (currentHour * 3600) + (currentMinute * 60) + currentSecond;

        let timeLeft = busTimeInSeconds - currentTimeInSeconds;
        let hoursLeft = Math.floor(timeLeft / 3600);
        let minutesLeft = Math.floor((timeLeft % 3600) / 60);
        let secondsLeft = timeLeft % 60;

        document.getElementById("countdown").textContent = 
            `Next bus in: ${hoursLeft}h ${minutesLeft}m ${secondsLeft}s`;
    } else {
        document.getElementById("countdown").textContent = "No more buses today.";
    }
}

document.getElementById("darkModeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

updateSchedule();
updateCountdown();
setInterval(updateCountdown, 1000);
