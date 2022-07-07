alert("paises que van al Mundial")

let palabras= "QATAR";"ALEMANIA";"DINAMARCA";"BRASIL";"FRANCIA";"BELGICA","CROACIA","ESPAÑA","SERBIA","INGLATERRA","SUIZA","HOLANDA","ARGENTINA","IRAN","JAPON","ECUADOR","URUGUAY","MEXICO","GHANA","SENEGAL","POLONIA","PORTUGAL","TUNEZ","MARRUECOS","CAMERUN","PERU","WALES",]
var juego = null
var finalizado= false

var juego ={ 
    palabra: "",
    estado:7,
    adivinado: [""],
    errado: 0,
}
var $html ={
    hombre: document.getElementById("hombre"),
    adivinado: document.querySelector(".adivinado"),
    errado: document.querySelector(".errado")
}

function dibujar(juego){
    var $elem
    $elem = $html.hombre
    $elem.src=".\Escritorio\ahorcado\linhas-tracos.png" + juego.estado + ".png"

    var palabra= juego.palabra
    var adivinado=juego.adivinado
    $elem= $html.adivinado
    $elem.innerHTML=""

    for(var letra of palabra){
        var $span =document.createElement("span")
        var $txt =document.createTextNode("")
        if(adivinado.indexOf(letra)>= 0){
            $txt.nodeValue =letra
        }
     
        $span.setAttribute("class","adivinada")
        $span.appendChild($txt)
        $elem.appendChild($span)
    }
    var errado= juego.errado
    $elem=$html.errado
    $elem.innerHTML=""
    for(let letra of errado){
        let $span= document.createElement("span")
        let $txt= document.createTextNode(letra)
        $span.setAttribute("class","errada")
        $span.appendChild($txt)
        $elem.appendChild($span)
    }
}

function adivinar(juego,letra){
    var estado=juego.estado
    if(estado === 1 || estado === 8){
        return
    }
    var adivinado = juego.adivinado
    var errado =juego.errado
    if (adivinado.indexOf(letra)>=0 || errado.indexOf(letra)>=0){
        return
    }
    var palabra=juego.palabra
    if(palabra.indexOf(letra)>=0){
        ganado =true
        for(var lt of palabra){
            if(adivinado.indexOf(lt) < 0  && lt != letra){
                ganado=false
                juego.previo=juego.estado
                break
            }
        }
        if (ganado){
            juego.estado =8
        }
        adivinado.push(letra)
    }else{
        juego.estado--
        errado.push(letra)
    }
}
window.onkeypress =function adivinarLetra(e){
    var letra = e.key
    letra=letra.toUpperCase()
    if(/[*a-zñ]/.test(letra)){
        return
    }
    adivinar(juego,letra)
    var estado =juego.estado
    if(estado===8 && !finalizado){
        setTimeout(alertaGanado,250)
        finalizado=true
    }else if(estado===1 && !finalizado){
        let palabra=juego.palabra
        let fn= alertaPerdido.bind(undefined,palabra)
        setTimeout(fn,250)
        finalizado=true
    }
    dibujar(juego)
 }

window.nuevoJuego=function nuevoJuego(){
    var palabra = palabraAleatoria()
    juego = {}
    juego.palabra = palabra
    juego.estado = 7
    juego.adivinado = []
    juego.errado = []
    finalizado=false
    dibujar(juego)
    console.log(palabra)
 }

function palabraAleatoria(){
    var index= ~~(Math.random()*palabras.length)
    return palabras[index]
}
function alertaGanado(estado){
    alert("Felicidades,ganaste!")
}
function alertaPerdido(palabra){
    alert("Lo siento, perdiste.. la palabra era... "  + palabra)
}
nuevoJuego()