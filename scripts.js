

const title = document.getElementById("title");
let xhr;


const crearTabla=()=>{
    const table = document.createElement("TABLE");
    table.setAttribute("id","table")
    table.classList.add("tabla")
    const tHead = document.createElement("THEAD")
    const thName = document.createElement("TH") 
    thName.textContent = "Nombre"
    const thIMG = document.createElement("TH")
    thIMG.textContent = "Imagen"
    tHead.appendChild(thName)
    tHead.appendChild(thIMG)
    table.appendChild(tHead)
    fragment = document.createDocumentFragment()
    fragment.appendChild(table)
    title.after(fragment)
}

if(window.XMLHttpRequest){
    xhr = new XMLHttpRequest()
}
else{
    xhr = new ActiveXObject("Microsoft.XMLHTTP")
}

// xhr.open('GET',"https://mindicador.cl/api/dolar")
xhr.open('GET',"https://pokeapi.co/api/v2/pokemon?limit=1118&offset=0")

xhr.addEventListener( 'load', (data)=>{

    dataPokemons = JSON.parse(data.target.response)
    //almacena los datos de cada pokemon 
    //cada objeto del array tiene el par (name: | url:) donde url es la api de ese pokemon
    arrayPokemons = dataPokemons.results
    
    //pokemon contiene name y url
    crearTabla()
    for(pokemon of arrayPokemons){

        xhr = new XMLHttpRequest()
        xhr.open('GET',pokemon.url)

        xhr.addEventListener('load',(data)=>{
            //poke contiene todos los datos del pokemon
            poke = JSON.parse(data.target.response)
            table = document.getElementById("table")
            fragment = document.createDocumentFragment()
            row = document.createElement("TR")
            tdName = document.createElement("TD")
            tdImg = document.createElement("TD")

            img = document.createElement("IMG")
            img.setAttribute("src",poke.sprites.front_default)
            img.classList.add("tam")
            tdName.textContent = poke.name;
            tdImg.appendChild(img);

            row.appendChild(tdName)
            row.appendChild(tdImg)
            fragment.appendChild(row)
            table.appendChild(fragment)
            
        })
        xhr.send()
    }

})

xhr.send()



