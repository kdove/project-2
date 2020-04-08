$(document).ready(function () {
  $.get("/api/library").then(function (data) {
    $(".upc").text(data.UPC);
    $(".text").text(data.description);
    $(".status").text(data.status);
  });

  $.get("/api/add").then(function (data) {
    $(".upc").text(data.UPC);
    $(".text").text(data.description);
    $(".status").text(data.status);
  });

  var button = $("#data-id");
  var upcAdd = $(".upc");
  var descriptionAdd = $(".text");
  var statusAdd = $(".status");


  button.on("click", function (event) {
    event.preventDefault();
    var thisRow = $(this);
    var upcData = {
      upc: thisRow.$(".upc").val().trim(),
      description: thisRow.$(".text").val().trim(),
      status: thisRow.$(".status").val().trim()
    };

    changeStatusAdd(upcData.upc, upcData.description, upcData.status);
    // $("#"+upcData.upc).hide();

    changeStatusLibarary(upcData.upc, upcData.description, upcData.status);
    // upcAdd.val("");
    // descriptionAdd.val("");
    // statusAdd.val("");
  });

  function changeStatusAdd(UPC, description, status) {
    $.put("/api/add", {
      UPC: UPC,
      description: description,
      status: status
    })
      .then(function (res) {
        console.log("Success!");
      })

      .catch(function (err) {
        console.log(err);
      });
  }

  function changeStatusLibrary(UPC, description, status) {
    $.put("/api/library", {
      UPC: UPC,
      description: description,
      status: status
    })
      .then(function () {
        console.log("Success!");
      })
      .catch(function (err) {
        console.log(err);
      });
  }
});
