function populateUFs() {

    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {

        for( const state of states ) {
            ufSelect.innerHTML = ufSelect.innerHTML + `<option value="${state.id}">${state.nome}</option>`
        }
    } )
}

populateUFs()


function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    
    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        for( const city of cities ) {
            citySelect.innerHTML = citySelect.innerHTML + `<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false
    } )
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

    // items de coleta
    // pegar todos os os items da grid
    const itemsToCollect = document.querySelectorAll(".items-grid li")

    for (const item of itemsToCollect) {
        item.addEventListener("click", handleSelectedItem)
    }

    const collectedItems = document.querySelector("input[name=items]")

    let selectedItems = []

    function handleSelectedItem(event) {
        const itemLi = event.target
        // toggle possui as funcionalidades de add e remove classe
        // se existir a classe selected no item, o toggle a remove, caso contrário ele a adiciona
        itemLi.classList.toggle("selected")
        const itemId = itemLi.dataset.id

        // verificar se há items selecionados
        // se sim, pegar os items selecionados
        const alreadySelected = selectedItems.findIndex( function(item) {
            // o sinal == no js compara valores
            const itemFound = item == itemID // isso será true ou false
            // se true, é executado o comando abaixo
            return itemFound
            // se false ele passa para o próximo item
        } )

        // verificar se o item já está na array selectedItems
        if(alreadySelected >= 0) {
            // se o item já estiver selecionado, tirar da seleção 
            const filteredItems = selectedItems.filter( item => {
                const itemIsDifferent = item != itemId
                return itemIsDifferent
            })

            selectedItems = filteredItems

        //se não estiver selecionado
        } else {
            // adicionar à seleção
            selectedItems.push(itemId)
        }

        //atualizar o campo escondido com os itens selecionados
        collectedItems.value = selectedItems  
    }
