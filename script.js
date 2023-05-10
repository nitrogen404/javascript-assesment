const seatingCharts = {
    movie1: [
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 0, 0],
      [1, 1, 1, 0, 0],
    ],
    movie2: [
      [1, 1, 1, 1, 1],
      [1, 1, 1, 0, 0],
      [1, 1, 1, 0, 0],
      [1, 1, 0, 0, 0],
      [1, 1, 0, 0, 0],
    ],
  };

const movies = [
    { title: "Aladin", time: "9:00 AM" },
    { title: "The Social Network", time: "12:00 PM" }
];

const movieSelect = document.getElementById("movie");
const seatingChartContainer = document.getElementById("seating-chart");
const bookNowButton = document.getElementById("book-now");
const bookedSeatsDisplay = document.getElementById("booked-seats");
const totalCostDisplay = document.getElementById("total-cost");
  
let selectedSeats = [];
  
function generateSeatingChart() {
    const selectedMovie = movieSelect.value;
    const seatingChart = seatingCharts[selectedMovie];
    const table = document.createElement("table");
    table.classList.add("seating-chart");

    for (let row = 0; row < seatingChart.length && row < 5; row++) {
        const tr = document.createElement("tr");
        for (let seat = 0; seat < seatingChart[row].length && seat < 5; seat++) {
            const td = document.createElement("td");
            if (seatingChart[row][seat] === 1) {
                td.classList.add("available");
                td.addEventListener("click", () => selectSeat(td, row, seat));
            } else {
                td.classList.add("booked");
            }
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    seatingChartContainer.innerHTML = "";
    seatingChartContainer.appendChild(table);
}
  
function selectSeat(td, row, seat) {
    if (td.classList.contains("available")) {
        td.classList.remove("available");
        td.classList.add("selected");
        selectedSeats.push([row, seat]);
    } else if (td.classList.contains("selected")) {
        td.classList.remove("selected");
        td.classList.add("available");
        selectedSeats = selectedSeats.filter(
        (s) => !(s[0] === row && s[1] === seat)
        );
    } else {
        alert("This seat has already been booked");
    }
}
  
function calculateTotalCost() {
    return selectedSeats.length * 10;
}
  
function updateBookingDetails() {
    bookedSeatsDisplay.innerHTML = `Seats Booked: ${selectedSeats.length}`;
    totalCostDisplay.innerHTML = `Total Cost: $${calculateTotalCost()}`;
}
  
bookNowButton.addEventListener("click", () => {
    alert(`Total Cost: $${calculateTotalCost()}`);
});
  
movieSelect.addEventListener("change", () => {
    selectedSeats = [];
    updateBookingDetails();
    generateSeatingChart();
});
  
generateSeatingChart();
updateBookingDetails();

// Set the time of the next show (in milliseconds)
const nextShowTime = Date.parse("2023-05-11T19:00:00Z");

// Function to update the countdown timer
function updateTimer() {
  const now = new Date().getTime();
  const difference = nextShowTime - now;

  // Calculate the remaining time in hours, minutes, and seconds
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  // Display the remaining time in the timer div
  const timerDiv = document.getElementById("timer");
  timerDiv.innerHTML = `Next show starts in: ${hours}h ${minutes}m ${seconds}s`;

  // Update the timer every second
  setTimeout(updateTimer, 1000);
}

// Call the updateTimer function to start the countdown
updateTimer();

function searchMovies() {
    const searchInput = document.getElementById("search").value.toLowerCase();
    const movieList = document.getElementById("movie-list");
    movieList.innerHTML = "";
    const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchInput)
    );
    filteredMovies.forEach((movie) => {
        const li = document.createElement("li");
        li.textContent = `${movie.title} (${movie.time})`;
        movieList.appendChild(li);
    });
}
  