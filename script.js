async function buscarPokemons(url) {
    document.getElementById('lista'). innerHTML = ''
    const result = await fetch(url)
    const resultJson = await result.json()
    for (let index = 0; index < resultJson.results.length; index++) {
        const element = resultJson.results[index];
        await buscarPokemonPorUrl(element.url)   
    }
    const nav = document.getElementById('nav')
    
    nav.innerHTML = ''
    
    const popUp = `<button class="btn" id="pop" onclick="abrirPopUp()">POP UP</button>`
    nav.innerHTML += popUp

    if(resultJson.previous != null) {
        const btnAnterior = `<button class="btn" id="anterior" onclick="buscarPokemons('${resultJson.previous}')">Anterior</button>`
        nav.innerHTML += btnAnterior
    }
    
    if(resultJson.next != null) {
        const btnProximo = `<button class="btn" id="proximo" onclick="buscarPokemons('${resultJson.next}')">Proximo</button>`
        nav.innerHTML += btnProximo
    }

}

function abrirPopUp(){
    const div = document.getElementById('popup')
    div.classList.remove('popup-off')
    div.classList.add('popup-on')
}
function fecharPopup() {
    const div = document.getElementById('popup')
    div.classList.remove('popup-on')
    div.classList.add('popup-off') 
}

async function buscarPokemonPorUrl(url){
    const result = await fetch(url)
    const item = await result.json()
    console.log(item);
    document.getElementById('lista').innerHTML += `
    

        <div class="card d-flex mx-3 my-3" style="width: 18rem;">
        <img src="${item.sprites.front_default}" alt="...">
        <div class="card-body ">
          <h5 class="card-title">${item.name.toUpperCase()}</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <button type="button" class="btn btn-success" data-toggle="modal" data-target="#exampleModalCenter">
        Informações
        </button>
        </div>
      </div>

      <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body d-flex flex-column-reverse bd-highlight">
      <div class="p-2 bd-highlight"> ${item.name.toUpperCase()}</div>
      <div class="p-2 bd-highlight">  Base xp:${item.base_experience}</div>
     
     
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
    `
}

