//function to get from the API the email
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
 //validation form
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

  //function to call the button for search
  $("#btn-search-1").on("click", function (e) {
    if($('#search-input').valid()){
      var email = $("#input-email").val();
      var result = getInformation(email);
      sessionStorage.setItem("data-email", JSON.stringify(result));
      e.preventDefault();
  
      $("#main").load("./../views/loading-spinner.html");
      setTimeout(() => {
        $("#main").load("./../views/result.html");
      }, 2000);
    }
    
  });
});
