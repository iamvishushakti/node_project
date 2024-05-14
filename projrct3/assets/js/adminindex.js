$(document).ready(function() {
    up_email = '';

    $.ajax({
        type: "GET",
        url: "http://localhost:8300/api/admin/user",
        dataType: 'json',
        success: function(data) {
            $('#userId').html(data.id);
            $('#userFullName').val(data.name);
        }
    });

    $.ajax({
        type: "GET",
        url: "http://localhost:8300/api/employees",
        dataType: 'json',
        success: function(data) {
            table_data = '';
            data.data.forEach(element => {
                table_data +=
                    `<tr>
                        <td>${element.firstName}</td>
                        <td>${element.lastName}</td>
                        <td>${element.email}</td>
                        <td>${element.gender}</td>
                        <td>${element.jobTitle}</td>
                        <td style='text-align:right; width:150px;'>
                            <button id='edit-${element.email}' class='edit btn btn-primary' ><i class="fas fa-user-edit"></i> Edit</button>
                            <button id='delete-${element.email}' class='delete btn btn-danger'><i class="fas fa-user-slash"></i> Delete</button
                        </td>
                    </tr>`;
            });
            $('#con-table tbody').html(table_data);
            $('#con-table').DataTable();
        }
    });

    $('#view_password').click(function() {
        $('#userPassword1').prop('type') == 'password' ? $('#userPassword1').prop('type', 'text') : $('#userPassword1').prop('type', 'password');
        //console.log($('#userPassword1').prop('type'));
    });

    $('#userupdateForm').submit(function() {
        event.preventDefault();
        if ($('#userPassword1').val() === $('#userPassword2').val()) {
            var formData = $('#userupdateForm').serialize();
            $.ajax({
                type: "POST",
                url: "http://localhost:8300/api/admin/user",
                data: formData,
                dataType: 'json',
                success: function(data) {
                    if (data.status == 'success') {
                        $('#userdetail').html('');
                        $('#userdetail').hide();
                        $('#userdetailsuccess').html('Update Successfully');
                        $('#userdetailsuccess').show();
                    }
                }
            });
        } else {
            $('#userdetailsuccess').html('');
            $('#userdetailsuccess').hide();
            $('#userdetail').html("Password and conform password are must be match..");
            $('#userdetail').show();
        }
    });

    $('#user-logout').click(function() {
        $.ajax({
            type: "GET",
            url: "http://localhost:8300/api/admin/logout",
            dataType: 'json',
            success: function(data) {
                if (data.status == 'success') {
                    window.location.href = "http://localhost:8300/admin/login/";
                }
            }
        });
    });

    $('#insert').click(function() {
        $('.form-control').val('');
        $('#insert-form').slideToggle("slow");
    });

    $('#close-form').click(function() {
        $('.form-control').val('');
        $('#insert-form').hide();
    });

    $('#insertrecord').click(function() {
        event.preventDefault();
        var formData = $('#insertForm').serialize();
        $.ajax({
            type: "POST",
            url: "http://localhost:8300/api/employee",
            data: formData,
            dataType: 'json',
            success: function(data) {
                if (data.status == 'Success') {
                    $('#status').attr('class', `alert alert-success`);
                    $('#status').html(`Inserted Successfully : #${data.id}`);
                    $('#status').show();

                    $('.form-control').val('');

                    $('#insert-form').slideToggle("slow");

                    $.ajax({
                        type: "GET",
                        url: "http://localhost:8300/api/employees",
                        dataType: 'json',
                        success: function(data) {
                            table_data = '';
                            data.data.forEach(element => {
                                table_data +=
                                    `<tr>
                                        <td>${element.firstName}</td>
                                        <td>${element.lastName}</td>
                                        <td>${element.email}</td>
                                        <td>${element.gender}</td>
                                        <td>${element.jobTitle}</td>
                                        <td style='text-align:right; width:150px;'>
                                            <button id='edit-${element.email}' class='edit btn btn-primary' ><i class="fas fa-user-edit"></i> Edit</button>
                                            <button id='delete-${element.email}' class='delete btn btn-danger'><i class="fas fa-user-slash"></i> Delete</button
                                        </td>
                                    </tr>`;
                            });
                            $('#con-table tbody').html(table_data);
                            $('#con-table').DataTable();
                        }
                    });

                } else if (data.status == 'Error') {
                    $('#status').attr('class', `alert alert-danger`);
                    $('#status').html(data.message);
                    $('#status').show();

                }
            }
        });
    });

    $('#updaterecord').click(function() {
        event.preventDefault();
        var formData = $('#updateForm').serialize();
        $.ajax({
            type: "PATCH",
            url: `http://localhost:8300/api/employee?email=${up_email}`,
            data: formData,
            dataType: 'json',
            success: function(data) {
                if (data.status == 'Success') {
                    $('#status').attr('class', `alert alert-success`);
                    $('#status').html(`Updated Successfully`);
                    $('#status').show();

                    $('.form-control').val('');

                    $.ajax({
                        type: "GET",
                        url: "http://localhost:8300/api/employees",
                        dataType: 'json',
                        success: function(data) {
                            table_data = '';
                            data.data.forEach(element => {
                                table_data +=
                                    `<tr>
                                        <td>${element.firstName}</td>
                                        <td>${element.lastName}</td>
                                        <td>${element.email}</td>
                                        <td>${element.gender}</td>
                                        <td>${element.jobTitle}</td>
                                        <td style='text-align:right; width:150px;'>
                                            <button id='edit-${element.email}' class='edit btn btn-primary' ><i class="fas fa-user-edit"></i> Edit</button>
                                            <button id='delete-${element.email}' class='delete btn btn-danger'><i class="fas fa-user-slash"></i> Delete</button
                                        </td>
                                    </tr>`;
                            });
                            $('#con-table tbody').html(table_data);
                            $('#con-table').DataTable();
                        }
                    });

                    $('#updateModal').modal('hide');

                } else if (data.status == 'Error') {
                    $('#status').attr('class', `alert alert-danger`);
                    $('#status').html(data.email);
                    $('#status').show();
                    $('#updateModal').modal('hide');
                }

                console.log(data);
            }
        });
    })

    $(document).on('click', '.edit', function() {
        up_email = $(this).attr('id').split('-')[1];
        $.ajax({
            type: "GET",
            url: `http://localhost:8300/api/employee?email=${up_email}`,
            dataType: 'json',
            success: function(data) {
                console.log(data);
                if (data.status == 'Success') {
                    $('#upfirstName').val(`${data.data[0].firstName}`);
                    $('#uplastName').val(`${data.data[0].lastName}`);
                    $('#upjobTitle').val(`${data.data[0].jobTitle}`);
                    if (data.data[0].gender == 'M') {
                        $('#up-gen-m').prop('checked', 'checked');
                    } else {
                        $('#up-gen-f').prop('checked', 'checked');
                    }
                }
            }
        });

        $('#updateModal').modal('show');
    });

    $(document).on('click', '.delete', function() {
        console.log($(this).attr('id') + ' delete');
        email = ($(this).attr('id')).split('-')[1];
        $('#selectedemaildelete').html(`<i> ${email} </i>`);
        $('#deleteModal').modal('show');
    });

    $('#deleterecord').click(function() {
        email = ($('#selectedemaildelete').text()).trim();
        $('#deleteModal').modal('hide');

        $.ajax({
            type: "DELETE",
            url: "http://localhost:8300/api/employee",
            data: {
                email: email
            },
            dataType: 'json',
            success: function(data) {
                if (data.status == 'Success') {
                    $('#status').attr('class', `alert alert-success`);
                    $('#status').html(data.message);

                    $.ajax({
                        type: "GET",
                        url: "http://localhost:8300/api/employees",
                        dataType: 'json',
                        success: function(data) {
                            table_data = '';
                            data.data.forEach(element => {
                                table_data +=
                                    `<tr>
                                        <td>${element.firstName}</td>
                                        <td>${element.lastName}</td>
                                        <td>${element.email}</td>
                                        <td>${element.gender}</td>
                                        <td>${element.jobTitle}</td>
                                        <td style='text-align:right; width:150px;'>
                                            <button id='edit-${element.email}' class='edit btn btn-primary' ><i class="fas fa-user-edit"></i> Edit</button>
                                            <button id='delete-${element.email}' class='delete btn btn-danger'><i class="fas fa-user-slash"></i> Delete</button
                                        </td>
                                    </tr>`;
                            });
                            $('#con-table tbody').html(table_data);
                            $('#con-table').DataTable();
                        }
                    });

                    $('#status').show();
                } else if (data.status == 'Error') {
                    $('#status').attr('class', `alert alert-danger`);
                    $('#status').html(data.message);

                    $('#status').show();
                }

            }
        });

    });
});

// function delete_data(email) {
//     console.log($(this).attr('id') + ' delete ' + email);
// }

// function edit_data(email) {
//     console.log($(this).attr('id') + ' edit ' + email)
// }