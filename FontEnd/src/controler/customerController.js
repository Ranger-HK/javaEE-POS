// Customer

// add customer
generateId();

$("#btnAdd").click(function () {

    let customerId = $("#txtCusID").val();
    let customerName = $("#txtCusName").val();
    let customerAddress = $("#txtCusAddress").val();
    let customerTP = $("#txtCusTP").val();


    var customerOB = new CustomerDTO(customerId, customerName, customerAddress, customerTP);

    customerDB.push(customerOB);
    loadAllCustomer();
    clearField();
    generateId();
    loadAllCustomerIds();





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
    for (var i of customerDB) {
        let row = `<tr><td>${i.getCustomerID()}</td><td>${i.getCustomerName()}</td><td>${i.getCustomerAddress()}</td><td>${i.getCustomerTelephoneNumber()}</td></tr>`
        $("#tbltBody").append(row);
        setCustomer();
        deleteCustomer();

    }
}

// customerDelete
function deleteCustomer() {
    $("#btnDelete").click(function () {
        let getClickData = $("#txtCusID").val();
        for (let i = 0; i < customerDB.length; i++) {
            if (customerDB[i].getCustomerID() == getClickData) {
                customerDB.splice(i, 1)
            }
        }
        loadAllCustomer();
        clearField();
    });
}


// customerUpdate
$("#btnUpdate").click(function () {
    let customerId = $("#txtCusID").val();
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
    clearField();
});


// searchCustomer
$("#btnSearch").click(function () {
    var searchId = $("#txtSearch").val();
    var response = searchCustomer(searchId);
    if (response) {
        $("#txtCusID").val(response.getCustomerID());
        $("#txtCusName").val(response.getCustomerName());
        $("#txtCusAddress").val(response.getCustomerAddress());
        $("#txtCusTP").val(response.getCustomerTelephoneNumber());
    } else {
        clearFiled();
        alert("Invalid Customer Name");
    }
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
    $("#txtCusID,#txtCusName,#txtCusAddress,#txtCusTP").val("");
}


$("#btnClear").click(function () {
    clearField();
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
    let index = customerDB.length - 1;
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
    }
}














