$(document).ready(function() {
    $('#login_form').submit(function() {
        event.preventDefault();
        formData = $('#login_form').serialize();
        // console.log(formData);

        $.ajax({
            type: "POST",
            url: "http://localhost:8300/api/admin/login",
            data: formData,
            dataType: 'json',
            success: function(data) {
                if (data.status == 'success') {
                    window.location.replace("http://localhost:8300/admin");
                } else {
                    $('#login_alert').html(data.message);
                    $('#login_alert').show();
                }
            }
        });
    });
});