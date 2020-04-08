console.log("HTML & JAVA PROPERLY LINKED!!");

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

$(document).ready(() => {
  setUserDropdownListener();
});

