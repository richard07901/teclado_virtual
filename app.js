const contenedor_teclado = document.querySelector("#contenedor_teclado")


const teclas = [
    [ //Primera fila
        ["1", "!"],
        ["2", "@"],
        ["3", "#"],
        ["4", "$"],
        ["5", "%"],
        ["6", "&"],
        ["7", "/"],
        ["8", "("],
        ["9", ")"],
        ["0", "="],
        ["'", "?"],
        ["¿", "¡"],
    ],
    [
        ["q", "Q"],
        ["w", "W"],
        ["e", "E"],
        ["r", "R"],
        ["t", "T"],
        ["y", "Y"],
        ["u", "U"],
        ["i", "I"],
        ["o", "O"],
        ["p", "P"],
        ["+", "¨"],
        ["+", "*"],
    ],
    [
        ["MAYUS", "MAYUS"],
        ["a", "A"],
        ["s", "S"],
        ["d", "D"],
        ["f", "F"],
        ["g", "G"],
        ["h", "H"],
        ["j", "J"],
        ["k", "K"],
        ["l", "L"],
        ["ñ", "Ñ"],
        ["{", "["],
        ["}", "]"],
    ],
    [
        ["SHIFT", "SHIFT"],
        ["<", ">"],
        ["z", "Z"],
        ["x", "X"],
        ["c", "C"],
        ["v", "V"],
        ["b", "B"],
        ["n", "N"],
        ["m", "M"],
        [",", ","],
        [".", "."],
        ["-", "-"],
    ],
    [
        ["SPACE", "SPACE"]
    ]//Ultima fila
]

let mayus = false;
let shift = false;
let current = null;

function renderTeclado() {

    const capas = teclas.map((capa) => {
        return capa.map((tecla) => {
            if( tecla[0] === "SPACE" ){
                return `<button class="tecla tecla_espacio"> </button>`
            }
            if( tecla[0] === "mayus" ){
                return `<button class="tecla tecla_mayus"></button>`
            }
            return `<button class="tecla tecla_normal">${
                shift
                    ? tecla[1]
                    : mayus &&
                        tecla[0].toLowerCase().charCodeAt(0) >= 97 &&
                        tecla[0].toLowerCase().charCodeAt(0) <= 122
                        ? tecla[1]
                    : tecla[0]
            }</button>`
        })
    })

    const htmlCapas = capas.map(capa=>{
        return capa.join("")
    })

    contenedor_teclado.innerHTML = ""

    htmlCapas.forEach(capa=>{
        contenedor_teclado.innerHTML += `<div class="capa">${capa}</div>`
    })

    document.querySelectorAll(".tecla").forEach((tecla) => {
        tecla.addEventListener("click", () => {
            // console.log(tecla)
            if (current) {
                if (tecla.textContent === "SHIFT") {
                    shift = !shift
                    renderTeclado()
                } else if(tecla.textContent === "MAYUS") {
                    mayus = !mayus
                    renderTeclado()
                } else if (tecla.textContent === "SPACE") {
                    current.value += " " 
                } else {
                    current.value += tecla.textContent
                    current.focus()
                    if(shift) {
                        shift = false
                        current.focus()
                        renderTeclado()
                    }
                }
            }
        })
    })
}

document.querySelectorAll(".input").forEach(input=>{
    input.addEventListener("focusin", (e)=>{
        current = e.target
        // console.log("Aqui")
        // console.log(current)
    })
})

renderTeclado()