const adicionar=document.querySelector("#agrega")
adicionar.addEventListener("click",function (capturar){
    capturar.preventDefault(); 
    var tx=document.getElementById("palabra").value;
    var tx=tx
if (tx.length===0 || /^\s+$/.test(tx)){
    alert("escribe una palabra")
}
else if(/[^A-Z ]/.test(tx)){
    alert("solo palabras mayúsculas y sin Tilde")
}else {
    alert("GUARDADO") 
    localStorage.setItem("hector",tx);
}

})
