// Item

$("#itemId").click(function (){
    loadAllItem();
    generateItemId();
});
// add

$("#btnItemAdd").click(function () {
    console.log($("#addItemForm").serialize());

    $.ajax({
        url :"http://localhost:8080/JavaEE/item",
        method: "POST",
        data: $("#addItemForm").serialize(),
        success: function (res) {
            if (res.status == 200) {
                // loadAllItemIds();
                loadAllItemIds();
                loadAllItem();
                clearFiled();
                generateItemId();

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

   /* let itemId = $("#txtItemID").val();
    let itemName = $("#txtItemName").val();
    let itemQty = $("#txtItemQty").val();
    let itemPrice = $("#txtItemPrice").val();

    var itemOB = new ItemDTO(itemId, itemName, itemQty, itemPrice);


    itemDB.push(itemOB);
    loadAllItem();
    clearFiled();
    generateItemId();
    loadAllItemIds();
*/


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
    $.ajax({
        url:"http://localhost:8080/JavaEE/item?option=GETALL",
        method:"GET",
        success:function (resp){
            if (resp.status==200){
                for (const item of resp.data){
                    let row = `<tr><td>${item.code}</td><td>${item.name}</td><td>${item.qtyOnHand}</td><td>${item.unitPrice}</td></tr>`
                    $("#tbltBodyItem").append(row);
                    setItem();
                    deleteItem();
                }
            }
            else{
                alert(resp.data)
            }
        }
    });
   /* for (var i of itemDB) {
        let row = `<tr><td>${i.getitemId()}</td><td>${i.getitemName()}</td><td>${i.getitemQty()}</td><td>${i.getitemPrice()}</td></tr>`
        $("#tbltBodyItem").append(row);
        setItem();
        deleteItem();

    }*/
}

// itemDelete
function deleteItem() {
    var clickRowId = $("#txtItemID").val();
    $.ajax({
        url:`http://localhost:8080/JavaEE/item?itemCode=${clickRowId}`,
        method:"DELETE",

        success:function (resp){
            if (resp.status == 200) {
                loadAllItem();
                clearFiled();
                generateItemId();
            }else if (resp.status==400){
                alert(resp.data);
            }
        }
    });


}

$("#btnItemDelete").click(function () {
   deleteItem();
});

// itemUpdate
$("#btnItemUpdate").click(function () {
    var itemObj = {
        code: $("#txtItemID").val(),
        name: $("#txtItemName").val(),
        qtyOnHand: parseInt($("#txtItemQty").val()),
        unitPrice: parseInt($("#txtItemPrice").val())
    }

    $.ajax({
        url: "http://localhost:8080/JavaEE/item", method: "PUT", data:
            JSON.stringify(itemObj), success: function (resp) {
            if (resp.status == 200) {
                loadAllItem();
                clearFiled();
            } else if (resp.status == 400) {
                alert(resp.data);
            }
        }
    });



   /* let itemId = $("#txtItemID").val();
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
    clearFiled()*/
});


// searchItem
$("#btnItemSearch").click(function () {
    if (!$("#txtSearchItem").val()) {
        loadAllItem();
        return;
    }
    $.ajax({
        url: "http://localhost:8080/JavaEE/item?option=SEARCH", method: "GET", data: {
            id: $("#txtSearchItem").val()
        }, success: function (resp) {
            if (resp.status == 200) {
                $("#tbltBodyItem").empty();
                for (const item of resp.data) {
                    let row = `<tr><td>${item.code}</td><td>${item.name}</td><td>${item.qtyOnHand}</td><td>${item.unitPrice}</td></tr>`;
                    $("#tbltBodyItem").append(row);

                }
            } else {
                alert(resp.data);
                loadAllItem();
                clearFiled();
            }
        }
    });

   /* var searchId = $("#txtSearchItem").val();
    var response = searchItem(searchId);
    if (response) {
        $("#txtItemID").val(response.getitemId());
        $("#txtItemName").val(response.getitemName());
        $("#txtItemQty").val(response.getitemQty());
        $("#txtItemPrice").val(response.getitemPrice());
    } else {
        clearFiled()
        alert("Invalid Item Name");
    }*/
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
    $("#txtItemID,#txtItemName,#txtItemQty,#txtItemPrice,txtSearchItem").val("");
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
    $.ajax({
        url: "http://localhost:8080/JavaEE/item?option=GENERATED_ID", method: "GET", success: function (resp) {
            if (resp.status == 200) {
                $("#txtItemID").val(resp.data.code);
            } else {
                alert(resp.data);
            }
        }
    });

   /* let index = itemDB.length - 1;
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
    }*/
}