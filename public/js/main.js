console.log("HTML & JAVA PROPERLY LINKED!!");

const todaysDate = moment().format("MMMM D, YYYY");

const currentTime = moment().format("h:mm a");

const currentHour = moment().format("h A");

const currentWeekday = moment().format("dddd");

const updateTime = setInterval(timeNow, 60000);

var date = new Date().toLocaleDateString("en-US");

const sidenavEl = $(".sidenav");

const gridEl = $(".grid");

const SIDENAV_ACTIVE_CLASS = "sidenav-active";

const GRID_NO_SCROLL_CLASS = "grid-noscroll";

function toggleClass(el, className) {
  if (el.hasClass(className)) {
    el.removeClass(className);
  } else {
    el.addClass(className);
  }
}

function setUserDropdownListener() {
  const userAvatar = $(".user-avatar");
  userAvatar.on("click", function (e) {
    const dropdownEl = $(this).children(".dropdown")
    toggleClass(dropdownEl, "dropdown-active")
  });
}

function addResizeListeners() {
  $(window).resize(function(e) {
    const width = window.innerWidth;
    console.log("width: ", width);

    if (width > 750) {
      sidenavEl.removeClass(SIDENAV_ACTIVE_CLASS);
      gridEl.removeClass(GRID_NO_SCROLL_CLASS);
    }
  });
}


function setMenuClickListener() {
  $(".header-menu").on("click", function(e) {
    console.log("clicked header hamburger menu");
    toggleClass(sidenavEl, SIDENAV_ACTIVE_CLASS);
    toggleClass(gridEl, GRID_NO_SCROLL_CLASS);
  });
}

function setSidenavCloseListener() {
  $(".logo-close").on("click", function(e) {
    toggleClass(sidenavEl, SIDENAV_ACTIVE_CLASS);
    toggleClass(gridEl, GRID_NO_SCROLL_CLASS);
  });
}

$(document).ready(() => {
  setUserDropdownListener();
  setMenuClickListener();
  setSidenavCloseListener();
  addResizeListeners();
});

timeNow();
function timeNow() {
  const time = new Date();
  // console.log('time:', time)

  const hours = time.getHours();
  // console.log("hours:", hours);

  const minutes = time.getMinutes();
  // console.log("minutes:", minutes);

  const ampm = moment().format("A");

  document.getElementById("time").innerText =
    hours + ":" + minutes + " " + ampm;
}

$(".date").text(todaysDate);
$(".weekday").text(currentWeekday);
$(".time").text(currentTime);

function formatAMPM(hour) {
  console.log("format AMPM is working!!");

  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;

  hour = hour ? hour : 12;
  //HOURS EQUALS HOURS

  return hour + " " + ampm;
};

formatAMPM();