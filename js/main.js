function getInformation(emailParameter) {
  var result;
  $.ajax({
    url: "https://ltv-data-api.herokuapp.com/api/v1/records.json", 
    contentType: "application/json",
    dataType: "json",
    async: false,
    data: {
        email : emailParameter
    },
    success: function (data) {
      result = data;
    },
  });
  return result;
}

$(document).ready(function () {

  $("#search-input").validate({
    rules: {
        email: {
          required: true,
          email: true
        },
      },
      messages: {
        email: {
            required: "Please add a valid email address",
            email: "Please add a valid email address",
       },
    }      
  });

  $("#btn-search").on("click", function () {
    var email = $("#input-email").val();
    var result = getInformation(email);
    sessionStorage.setItem('data-email', JSON.stringify(result));
    console.log(result)
    $("#main").load('./../views/loading-spinner.html');
    setTimeout(() =>{
        $("#main").load('./../views/result.html');
    },2000) 
  });
});
