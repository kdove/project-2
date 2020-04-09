console.log("HTML & JAVA PROPERLY LINKED!!");

function toggleClass(el, className) {
  if (el.hasClass(className)) {
    el.removeClass(className);
  } else {
    el.addClass(className);
  }
}

$(document).ready(() => {
  const page = window.location.pathname;
  switch (page) {
  case "/library":
    $(".library-nav").addClass("active");
    break;
  case "/library-new":
    $(".new-nav").addClass("active");
    break;
  default:
    $(".home-nav").addClass("active");
    break;
  }
});

function setUserDropdownListener() {
  const userAvatar = $(".user-avatar");
  userAvatar.on("click", function (e) {
    const dropdownEl = $(this).children(".dropdown");
    toggleClass(dropdownEl, "dropdown-active");
  });
}

$(document).ready(() => {
  setUserDropdownListener();
});

