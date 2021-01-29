function getInformation(emailParameter) {
  var result;
  $.ajax({
    url: "https://ltv-data-api.herokuapp.com/api/v1/records.json",
    contentType: "application/json",
    dataType: "json",
    async: false,
    data: {
      email: emailParameter,
    },
    success: function (data) {
      result = data;
    },
  });
  return result;
}

$(document).ready(function () {
  var variable = sessionStorage.getItem("data-email");

  if (variable != "[]") {
    $("#has-results").show();
    $("#loader").hide();
    $("#none-results").hide();

    let json = JSON.parse(variable);
    $("#person").text(json.first_name + " " + json.last_name);
    $("#description").text(json.description);
    $("#email").text(json.email);
    $("#address").text(json.address);

    json.phone_numbers.forEach((element) => {
      $("#numbers").append("<li>" + element + "</li>");
    });
    json.relatives.forEach((element) => {
      $("#relatives").append("<li>" + element + "</li>");
    });
  } else {
    $("#has-results").hide();
    $("#loader").hide();
    $("#none-results").show();
  }

  $("#search-input").validate({
    rules: {
      email: {
        required: true,
        email: true,
      },
    },
    messages: {
      email: {
        required: "Please add a valid email address",
        email: "Please add a valid email address",
      },
    },
  });

  $("#btn-search").on("click", function () {
    var email = $("#input-email").val();
    var result = getInformation(email);
    sessionStorage.setItem("data-email", JSON.stringify(result));

    $("#has-results").hide();
    $("#none-results").hide();
    $("#loader").show();

    setTimeout(() => {
      $("#main").load("./../views/result.html");
    }, 2000);
    
  });
});
