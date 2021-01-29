function getInformation(emailParameter) {
  let api_endpoint = "https://ltv-data-api.herokuapp.com/api/v1/records.json";
  console.log(api_endpoint);

  $.ajax({
    url: api_endpoint + "?email=" + emailParameter,
    contentType: "application/json",
    dataType: "json",
    async: true,
    success: function (result) {
      if (result != []) {
        console.log(result.leng);
      }
    },
  });
}

const isFormatEmail = (email) => {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email)
};


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

  $("#btn-search").on("click", function (event) {
    var email = $("#input-email").val();
    var form = $("#search-input")[0];

    
  });
    
});
