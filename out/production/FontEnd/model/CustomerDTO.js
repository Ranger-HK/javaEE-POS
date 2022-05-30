function CustomerDTO(id,name,address,telephoneNumber){
    var customerID=id;
    var customerName=name;
    var customerAddress=address;
    var customerTelephoneNumber=telephoneNumber;

    this.getCustomerID=function (){
        return customerID;
    }
    this.setCustomerID=function (id){
        customerID=id;
    }


    this.getCustomerName=function (){
        return customerName;
    }
    this.setCustomerName=function (name){
        customerName=name;
    }


    this.getCustomerAddress=function (){
        return customerAddress;
    }
    this.setCustomerAddress=function (address){
        customerAddress=address;
    }


    this.getCustomerTelephoneNumber=function (){
        return customerTelephoneNumber;
    }
    this.setCustomerTelephoneNumber=function (telephoneNumber){
        customerTelephoneNumber=telephoneNumber;
    }
}