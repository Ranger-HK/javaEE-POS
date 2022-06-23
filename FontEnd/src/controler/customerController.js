// Customer

// add customer

generateId();
loadAllCustomer();
$("#btnAdd").click(function () {

    $.ajax({
        url: `http://localhost:8080/JavaEE/customer`,
        method: "POST",
        data: $("#addCusForm").serialize(),
        success: function (res) {
            if (res.status == 200) {
                loadAllCustomer();
                clearField() //Clear Input Fields
                // loadAllCustomerIds();
                loadAllCustomerIds();
                generateId();
            } else {
                alert(res.data);
            }

        },
        error: function (ob, textStatus, error) {
            console.log(ob);
            console.log(textStatus);
            console.log(error);
        }
    });

/*
    let customerId = $("#txtCusID").val();
    let customerName = $("#txtCusName").val();
    let customerAddress = $("#txtCusAddress").val();
    let customerTP = $("#txtCusTP").val();


    var customerOB = new CustomerDTO(customerId, customerName, customerAddress, customerTP);

    customerDB.push(customerOB);
    loadAllCustomer();
    clearField();

    loadAllCustomerIds();
    deleteCustomer();*/
});

// textfiled click set
function setCustomer() {
    $("#tbltBody>tr").click(function () {
        let customerId = $(this).children(":eq(0)").text();
        let customerName = $(this).children(":eq(1)").text();
        let customerAddress = $(this).children(":eq(2)").text();
        let customerTP = $(this).children(":eq(3)").text();

        $("#txtCusID").val(customerId);
        $("#txtCusName").val(customerName);
        $("#txtCusAddress").val(customerAddress);
        $("#txtCusTP").val(customerTP);
    });
}


// table load
function loadAllCustomer() {
    $("#tbltBody").empty();
    $.ajax({
       url:"http://localhost:8080/JavaEE/customer?option=GETALL",
        method:"GET",
        success:function (resp){
           if (resp.status==200){
               for (const customer of resp.data){
                   let row = `<tr><td>${customer.id}</td><td>${customer.name}</td><td>${customer.address}</td><td>${customer.salary}</td></tr>`
                   $("#tbltBody").append(row);
                   setCustomer();
                   deleteCustomer();
               }
           }
          else{
              alert(resp.data)
            }
        }
    });
    /*for (var i of customerDB) {
        let row = `<tr><td>${i.getCustomerID()}</td><td>${i.getCustomerName()}</td><td>${i.getCustomerAddress()}</td><td>${i.getCustomerTelephoneNumber()}</td></tr>`
        $("#tbltBody").append(row);
        setCustomer();
        deleteCustomer();

    }*/
}

$("#btnDelete").click(function () {
    deleteCustomer();
});

// customerDelete
function deleteCustomer() {
    var clickRowId = $("#txtCusID").val();
    $.ajax({
        url:`http://localhost:8080/JavaEE/customer?customerId=${clickRowId}`,
        method:"DELETE",
        success:function (resp){
            if (resp.status == 200) {
                generateId();
                clearField();
                loadAllCustomer();
            }else if (resp.status==400){
                alert(resp.data);
            }
        }
    });
}
   /* $("#btnDelete").click(function () {
        let getClickData = $("#txtCusID").val();
        for (let i = 0; i < customerDB.length; i++) {
            if (customerDB[i].getCustomerID() == getClickData) {
                customerDB.splice(i, 1)
            }
        }
        loadAllCustomer();
        clearField();
    });*/



// customerUpdate
$("#btnUpdate").click(function () {
    var cusOb = {
        id: $("#txtCusID").val(),
        name: $("#txtCusName").val(),
        address: $("#txtCusAddress").val(),
        salary: $("#txtCusTP").val()
    }

    $.ajax({
        url: "http://localhost:8080/JavaEE/customer", method: "PUT",
        data: JSON.stringify(cusOb), success: function (resp) {
            if (resp.status == 200) {
                loadAllCustomer();
                clearField();
            } else if (resp.status == 400) {
                alert(resp.data);
            }
        }
    });
  /*  let customerId = $("#txtCusID").val();
    let customerName = $("#txtCusName").val();
    let customerAddress = $("#txtCusAddress").val();
    let customerTP = $("#txtCusTP").val();

    for (var i = 0; i < customerDB.length; i++) {
        if (customerDB[i].getCustomerID() == customerId) {
            customerDB[i].setCustomerName(customerName);
            customerDB[i].setCustomerAddress(customerAddress);
            customerDB[i].setCustomerTelephoneNumber(customerTP);
        }

    }
    loadAllCustomer();
    clearField();*/
});


// searchCustomer
$("#btnSearch").click(function () {
    if (!$("#txtSearch").val()) {
        loadAllCustomer();
        return;
    }
    $.ajax({
        url: "http://localhost:8080/JavaEE/customer?option=SEARCH", method: "GET", data: {
            id: $("#txtSearch").val()
        }, success: function (resp) {
            if (resp.status == 200) {
                $("#tbltBody").empty();
                for (const customer of resp.data) {
                    let row = `<tr><td>${customer.id}</td><td>${customer.name}</td><td>${customer.address}</td><td>${customer.salary}</td></tr>`;
                    $("#tbltBody").append(row);

                }
            } else {
                alert(resp.data);
                loadAllCustomer();
                clearField();
            }
        }
    });
   /* var searchId = $("#txtSearch").val();
    var response = searchCustomer(searchId);
    if (response) {
        $("#txtCusID").val(response.getCustomerID());
        $("#txtCusName").val(response.getCustomerName());
        $("#txtCusAddress").val(response.getCustomerAddress());
        $("#txtCusTP").val(response.getCustomerTelephoneNumber());
    } else {
        clearFiled();
        alert("Invalid Customer Name");
    }*/
});


function searchCustomer(id) {
    for (let i = 0; i < customerDB.length; i++) {
        if (customerDB[i].getCustomerID() == id) {
            return customerDB[i];
        }
    }
}


// ClearMethod
function clearField() {
    $("#txtCusID,#txtCusName,#txtCusAddress,#txtCusTP,txtSearch").val("");
}


$("#btnClear").click(function () {
    clearField();
    loadAllCustomer();

});

//text fields focusing
$("#txtCusID").keydown(function (event) {
    if (event.key == "Enter") {
        $("#txtCusName").focus();
    }
});

$("#txtCusName").keydown(function (event) {
    if (event.key == "Enter") {
        $("#txtCusAddress").focus();
    }
});

$("#txtCusAddress").keydown(function (event) {
    if (event.key == "Enter") {
        $("#txtCusTP").focus();
    }
});

function generateId() {
    $.ajax({
        url: "http://localhost:8080/JavaEE/customer?option=GENERATED_ID", method: "GET", success: function (resp) {
            if (resp.status == 200) {
                $("#txtCusID").val(resp.data.id);
            } else {
                alert(resp.data);
            }
        }
    });
  /*  let index = customerDB.length - 1;
    let id;
    let temp;
    if (index != -1) {
        id = customerDB[customerDB.length - 1].getCustomerID();
        temp = id.split("-")[1];
        temp++;
    }

    if (index == -1) {
        $("#txtCusID").val("C00-001");
    } else if (temp <= 9) {
        $("#txtCusID").val("C00-00" + temp);
    } else if (temp <= 99) {
        $("#txtCusID").val("C00-0" + temp);
    } else {
        $("#txtCusID").val("C00-" + temp);
    }*/
}














