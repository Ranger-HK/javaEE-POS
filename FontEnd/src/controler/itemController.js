// Item

// add
generateItemId();
$("#btnItemAdd").click(function () {

    let itemId = $("#txtItemID").val();
    let itemName = $("#txtItemName").val();
    let itemQty = $("#txtItemQty").val();
    let itemPrice = $("#txtItemPrice").val();

    var itemOB = new ItemDTO(itemId, itemName, itemQty, itemPrice);


    itemDB.push(itemOB);
    loadAllItem();
    clearFiled();
    generateItemId();
    loadAllItemIds();



});

// textfiled click set
function setItem() {
    $("#tbltBodyItem>tr").click(function () {
        let itemId = $(this).children(":eq(0)").text();
        let itemName = $(this).children(":eq(1)").text();
        let itemQty = $(this).children(":eq(2)").text();
        let itemPrice = $(this).children(":eq(3)").text();

        $("#txtItemID").val(itemId);
        $("#txtItemName").val(itemName);
        $("#txtItemQty").val(itemQty);
        $("#txtItemPrice").val(itemPrice);
    });
}

// table load
function loadAllItem() {
    $("#tbltBodyItem").empty();
    for (var i of itemDB) {
        let row = `<tr><td>${i.getitemId()}</td><td>${i.getitemName()}</td><td>${i.getitemQty()}</td><td>${i.getitemPrice()}</td></tr>`
        $("#tbltBodyItem").append(row);
        setItem();
        deleteItem();

    }
}

// itemDelete
function deleteItem() {
    $("#btnItemDelete").click(function () {
        let getClickData = $("#txtItemID").val();
        for (let i = 0; i < itemDB.length; i++) {
            if (itemDB[i].getitemId() == getClickData) {
                itemDB.splice(i, 1)
            }
        }
        loadAllItem();
        clearFiled()
    });
}


// itemUpdate
$("#btnItemUpdate").click(function () {
    let itemId = $("#txtItemID").val();
    let itemName = $("#txtItemName").val();
    let itemQty = $("#txtItemQty").val();
    let itemPrice = $("#txtItemPrice").val();

    for (var i = 0; i < itemDB.length; i++) {
        if (itemDB[i].getitemId() == itemId) {
            itemDB[i].setitemName(itemName);
            itemDB[i].setitemQty(itemQty);
            itemDB[i].setitemPrice(itemPrice);
        }

    }
    loadAllItem();
    clearFiled()
});


// searchItem
$("#btnItemSearch").click(function () {
    var searchId = $("#txtSearchItem").val();
    var response = searchItem(searchId);
    if (response) {
        $("#txtItemID").val(response.getitemId());
        $("#txtItemName").val(response.getitemName());
        $("#txtItemQty").val(response.getitemQty());
        $("#txtItemPrice").val(response.getitemPrice());
    } else {
        clearFiled()
        alert("Invalid Item Name");
    }
});

function searchItem(id) {
    for (let i = 0; i < itemDB.length; i++) {
        if (itemDB[i].getitemId() == id) {
            return itemDB[i];
        }
    }
}


// ClearMethod
function clearFiled() {
    $("#txtItemID,#txtItemName,#txtItemQty,#txtItemPrice").val("");
}


$("#btnItemClear").click(function () {
    clearFiled()
});

//text fields focusing
$("#txtItemID").keydown(function (event) {
    if (event.key == "Enter") {
        $("#txtItemName").focus();
    }
});

$("#txtItemName").keydown(function (event) {
    if (event.key == "Enter") {
        $("#txtItemQty").focus();
    }
});

$("#txtItemQty").keydown(function (event) {
    if (event.key == "Enter") {
        $("#txtItemPrice").focus();
    }
});

function generateItemId() {
    let index = itemDB.length - 1;
    let id;
    let temp;
    if (index != -1) {
        id = itemDB[itemDB.length - 1].getitemId();
        temp = id.split("-")[1];
        temp++;
    }

    if (index == -1) {
        $("#txtItemID").val("I00-001");
    } else if (temp <= 9) {
        $("#txtItemID").val("I00-00" + temp);
    } else if (temp <= 99) {
        $("#txtItemID").val("I00-0" + temp);
    } else {
        $("#txtItemID").val("I00-" + temp);
    }
}