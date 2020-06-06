const buttonSearch = document.querySelector("#page-home main a")
const modal = document.querySelector("#modal")
const close = document.querySelector("#modal .header a")

// quando clicar no botão "Pesquisar pontos de coleta" da home
// remover a classe hide de modal 
buttonSearch.addEventListener("click", () => {
    modal.classList.remove("hide")
})

// quando clicar no botão "fechar" no modal
// adicionar a classe hide para ocultar o modal
close.addEventListener("click", () => {
    modal.classList.add("hide")
})