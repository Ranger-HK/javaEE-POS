// Hide Item & Order
document.getElementById("itemPage").style.setProperty("display","none","important");
document.getElementById("orderPage").style.setProperty("display","none","important");

// ClickEvents
document.getElementById("customerId").addEventListener("click",function (){
    document.getElementById("customerPage").style.setProperty("display","block","important");
    document.getElementById("itemPage").style.setProperty("display","none","important");
    document.getElementById("orderPage").style.setProperty("display","none","important");
});

document.getElementById("itemId").addEventListener("click",function (){
    document.getElementById("itemPage").style.setProperty("display","block","important");
    document.getElementById("customerPage").style.setProperty("display","none","important");
    document.getElementById("orderPage").style.setProperty("display","none","important");
});

document.getElementById("orderId").addEventListener("click",function (){
    document.getElementById("orderPage").style.setProperty("display","block","important");
    document.getElementById("itemPage").style.setProperty("display","none","important");
    document.getElementById("customerPage").style.setProperty("display","none","important");
});
