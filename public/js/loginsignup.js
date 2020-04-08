console.log("HTML IS PROPERLY LINKED TO JAVA!");

var signUpButton = document.getElementById("signUp");
var logInButton = document.getElementById("logIn");
var container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
  container.classList.add("rpa");
});

logInButton.addEventListener("click", () => {
  container.classList.remove("rpa");
});

currentPage = window.location.pathname;
console.log(currentPage);

if (currentPage.includes("login")) {
  $(document).ready(function () {
    // Getting references to our form and inputs
    var loginForm = $("form.login");
    var emailInput = $("input#current-email-input");
    var passwordInput = $("input#current-password-input");

    // When the form is submitted, we validate there's an email and password entered
    loginForm.on("submit", function (event) {
      event.preventDefault();
      var userData = {
        email: emailInput.val().trim(),
        password: passwordInput.val().trim(),
      };

      if (!userData.email || !userData.password) {
        return;
      }

      // If we have an email and password we run the loginUser function and clear the form
      loginUser(userData.email, userData.password);
      emailInput.val("");
      passwordInput.val("");
    });

    // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
    function loginUser(email, password) {
      $.post("/api/login", {
        email: email,
        password: password
      })
        .then((res) => {
          $.get("/home", res);
          window.location.replace("/home");
        })
        .catch(function(err) {
          console.log(err);
        });
    }
    
  });
} else {
  $(document).ready(function () {
    // Getting references to our form and input
    var signUpForm = $("form.signup");
    var emailInput = $("input#email-input");
    var passwordInput = $("input#password-input");
    var companyInput = $("input#company-input");

    // When the signup button is clicked, we validate the email and password are not blank
    signUpForm.on("submit", function (event) {
      event.preventDefault();
      var userData = {
        email: emailInput.val().trim(),
        password: passwordInput.val().trim(),
        company: companyInput.val().trim(),
      };

      console.log(userData);

      if (!userData.email || !userData.password) {
        return;
      }

      // If we have an email and password, run the signUpUser function
      signUpUser(userData.email, userData.password, userData.company);
      emailInput.val("");
      passwordInput.val("");
      companyInput.val("");
    });

    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function signUpUser(email, password, company) {
      $.post("/api/signup", {
        email: email,
        password: password,
        company: company,
      })
        .then(function (data) {
          window.location.replace("/members");
          // If there's an error, handle it by throwing up a bootstrap alert
        })
        .catch(handleLoginErr);
    }

    function handleLoginErr(err) {
      $("#alert .msg").text(err.responseJSON);
      $("#alert").fadeIn(500);
    }
  });
}