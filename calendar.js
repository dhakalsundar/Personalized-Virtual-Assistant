

const calendarContainer = document.getElementById("calendar-container");
const calendarGrid = document.getElementById("calendar-grid");
const currentMonthEl = document.getElementById("current-month");
const prevMonthBtn = document.getElementById("prev-month");
const nextMonthBtn = document.getElementById("next-month");

const modal = document.getElementById("event-modal");
const closeModal = document.getElementById("close-modal");
const eventDateEl = document.getElementById("event-date");
const eventInput = document.getElementById("event-input");
const saveEventBtn = document.getElementById("save-event");

let events = {};
let currentDate = new Date();

function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  currentMonthEl.textContent = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  calendarGrid.innerHTML = "";

  for (let i = 0; i < firstDay; i++) {
    const emptyCell = document.createElement("div");
    calendarGrid.appendChild(emptyCell);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayCell = document.createElement("div");
    dayCell.classList.add("day");
    dayCell.textContent = day;

    const dateKey = `${year}-${month + 1}-${day}`;
    if (events[dateKey]) {
      const eventEl = document.createElement("div");
      eventEl.classList.add("event");
      eventEl.textContent = events[dateKey];
      dayCell.appendChild(eventEl);
    }

    dayCell.addEventListener("click", () => openModal(dateKey));
    calendarGrid.appendChild(dayCell);
  }
}

function openModal(date) {
  modal.style.display = "flex";
  eventDateEl.textContent = `Add Event for ${date}`;
  eventInput.value = events[date] || "";
  saveEventBtn.dataset.date = date;
}

function closeModalFunc() {
  modal.style.display = "none";
}

function saveEvent() {
  const date = saveEventBtn.dataset.date;
  const eventText = eventInput.value.trim();

  if (eventText) {
    events[date] = eventText;
  } else {
    delete events[date];
  }

  closeModalFunc();
  renderCalendar();
}

prevMonthBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

nextMonthBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

closeModal.addEventListener("click", closeModalFunc);
saveEventBtn.addEventListener("click", saveEvent);

window.addEventListener("click", (e) => {
  if (e.target === modal) closeModalFunc();
});

renderCalendar();

