$( document ).ready(function() {
    console.log("ready!");
    $("#loginform").submit(function(event){
        event.presentDefault();
        ajaxPost();
    });

    function ajaxPost(){
        var formData = {
            email: $("email").val(),
            password: $("password").val()
        }
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: window.location + "api/login",
            data: JSON.stringify(formData),
            dataType: 'json',
            success: function(customer) {
                if(customer.valid == true) {
                    $('#loginform').addClass("success");
                    $('#loginform').removeClass("failure");
                } else {
                    $('#loginform').removeClass("success");
                    $('#loginform').addClass("failure");
                }
                $('#postResultDiv').html("<p>" + "Post Successfull! <br>" + "Email Address: " + 
                                    customer.email + "<br>" + "Password: " + customer.password +
                                    "<br>" + "Valid User: " + customer.valid + "</p>")
            },
            error: function(e) {
                alert("Error!");
                console.log("ERROR: ", e);
            }
        });
        resetData();
    }

    function resetData() {
        $('#email').val("");
        $('#password').val("");
    }
})