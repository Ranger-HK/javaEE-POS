function ItemDTO(id,name,qty,price){
    var itemId=id;
    var itemName=name;
    var itemQty=qty;
    var itemPrice=price;

    this.getitemId=function (){
        return itemId;
    }
    this.setitemId=function (id){
        itemId=id;
    }


    this.getitemName=function (){
        return itemName;
    }
    this.setitemName=function (name){
        itemName=name;
    }


    this.getitemQty=function (){
        return itemQty;
    }
    this.setitemQty=function (qty){
        itemQty=qty;
    }


    this.getitemPrice=function (){
        return itemPrice;
    }
    this.setitemPrice=function (price){
        itemPrice=price;
    }
}