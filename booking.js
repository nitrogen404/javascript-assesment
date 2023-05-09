const movieSelect = document.getElementById('movie');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const bookBtn = document.getElementById('book');

populateUI();

let ticketPrice = +movieSelect.value;

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  // Copy selected seats into arr
  // Map through array
  // Return a new array indexes
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Get data from localStorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Movie select event
movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Seat click event
container.addEventListener('click', e => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');

    updateSelectedCount();
  }
});

// Initial count and total set
updateSelectedCount();

// Book button click event
bookBtn.addEventListener('click', () => {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  const selectedSeatsCount = selectedSeats.length;

  if (selectedSeatsCount > 0) {
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    const totalPrice = selectedSeatsCount * ticketPrice;

    alert(`You have booked ${selectedSeatsCount} seats. Your total cost is $${totalPrice}.`);

    // Clear local storage
    localStorage.removeItem('selectedSeats');
    localStorage.removeItem('selectedMovieIndex');
    localStorage.removeItem('selectedMoviePrice');

    // Reset UI
    count.innerText = 0;
    total.innerText = 0;
    movieSelect.selectedIndex = 0;
    seats.forEach(seat => {
      seat.classList.remove('selected');
    });
  } else {
    alert('Please select at least one seat to book.');
  }
});
