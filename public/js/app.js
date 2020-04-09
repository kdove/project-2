function changeStatus(UPC, description, status) {
  $.put("/api/upc", {
    Upc: UPC,
    Description: description,
    Active: status
  })
    .then(function () {
      console.log("Success!");
    })

    .catch(function (err) {
      console.log(err);
    });
}

$(document).on("blur", ".description-text", function (event) {
  event.preventDefault();
  console.log(event);
  var thisRow = $(this);

  var upcData = {
    upc: thisRow.$(".upc").val().trim(),
    description: thisRow.$(".text").val().trim(),
    status: thisRow.$(".status").val().trim()
  };

  changeStatus(upcData.upc, upcData.description, upcData.status);
});

$(document).on("click", ".barcode-button", function (event) {
  event.preventDefault();
  var thisRow = $(this);
  var upcData = {
    upc: thisRow.$(".upc").val().trim(),
    description: thisRow.$(".text").val().trim(),
    status: thisRow.$(".status").val().trim()
  };

  changeStatus(upcData.upc, upcData.description, upcData.status);

});
