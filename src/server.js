// Arquivo central com os scripts do site

const express = require("express")
const server = express()

// pegar o banco de dados
const db = require("./database/db")

// configurar pasta public
server.use(express.static("public"))

// habilitar o uso do req.body nesta aplicação
server.use(express.urlencoded({extended: true}))

// utilizando template engine
const nunjucks = require("nunjucks")
// configurar o nunjucks
nunjucks.configure("src/views", {

    // o local onde estão as pastas que serão usadas
    express: server,
    noCache: true   

})

// configurar caminhos da aplicação
// página inicial
// req = requisição / res = resposta
server.get("/", (req,res) => {
    // enviar para a porta aberta o arquivo de front-end que quero que o usuário visualize
    return res.render("index.html", { title: "Seu marketplace de coleta de resíduos"})
})

// direcionar a url para o arquivo create-point.html
server.get("/create-point", (req,res) => {

    // req.query: Query Strings da nossa url
    return res.render("create-point.html")
})

// cadastrando um novo ponto de coleta 
server.post("/savepoint", (req, res) => {

    // inserir dados no banco de dados
    const query = `
    INSERT INTO places (
        image,
        name,
        address,
        address2,
        state,
        city,
        items
    ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [
        // req.body: o corpo do nosso formulário
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        // avisar o usurário:
        // se houver erro no cadastro
        if(err) {
            console.log(err)
            return res.send("Erro no cadastro!")
        }
        // se não houver erro no cadastro
        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.html", { saved: true })
    }

    // o terceiro argumento é uma function call back 
    // que permite que a aplicação continue rodando enquanto espera a resposta
    // quando a resposta é retornada, a função é executada
    db.run(query, values, afterInsertData )
})

// direcionar a url /search para o arquivo search-results.html
server.get("/search", (req,res) => {

    const search = req.query.search

    // se o usuário não inserir o nome da cidade a ser pesquisada:
    if(search == "") {
        // pesquisa vazia
    
        return res.render("search-results.html", { total: 0})
    }

    // se o usuário inserir o nome da cidade a ser pesquisada:
    // pegar os dados do banco de dados

    // o LIKE permite digitações incompletas, ex: Rio filtrará Rio de Janeiro e Rio do Sul
    db.all(`SELECT * FROM places WHERE city LIKE '${search}%'`, function(err, rows){
        if(err) {
            return console.log(err)
        }

        const total = rows.length

        console.log("Aqui estão seus registros:")
        console.log(rows) 

        // mostrar a página search-results.html com os dados do banco de dados
        return res.render("search-results.html", { places: rows, total: total})
    })
})

// ligar o servidor
server.listen(3000)