// importar a dependência do sqlite3
// verbose é uma função que possibilita o envio de mensagens no terminal sobre o código sql
const sqlite3 = require("sqlite3").verbose()

// criar o objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

// // exemplo de código utilizan o objeto de banco de dados para realizar operações
//db.serialize( () => {
    // com comandos SQL:

    // // 1. criar uma tabela 
    // db.run(`
    //     CREATE TABLE IF NOT EXISTS places (
    //         id INTEGER PRIMARY KEY AUTOINCREMENT,
    //         image TEXT,
    //         name TEXT,
    //         address TEXT,
    //         address2 TEXT,
    //         state TEXT,
    //         city TEXT,
    //         items TEXT
    //     );

    // `)

    // // 2. inserir dados na tabela
    // const query = `
    //     INSERT INTO places (
    //         image,
    //         name,
    //         address,
    //         address2,
    //         state,
    //         city,
    //         items
    //     ) VALUES (?,?,?,?,?,?,?);
    // `

    // const values = [
    //     "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1101&q=80",
    //     "Papersider",
    //     "Guilherme Gemballa, Jardim América",
    //     "Número 260",
    //     "Santa Catarina",
    //     "Rio do Sul",
    //     "Resíduos Eletrônicos e Lâmpadas"
    // ]

    // function afterInsertData(err) {
    //     if(err) {
    //         return console.log(err)
    //     }
    //     console.log("Cadastrado com sucesso")
    //     console.log(this)
    // }

    // // function call back permite que a aplicação continue rodando enquanto espera a resposta
    // // quando a resposta é retornada então é executada a função
    // db.run(query, values, afterInsertData )

//     // 3. consultar os dados da tabela

//     // o "*" serve para aplicar o SELECT a todos os campos da tabela
//     db.all(`SELECT * FROM places`, function(err, rows){
//         if(err) {
//             return console.log(err)
//         }
//         console.log("Aqui estão seus registros:")
//         console.log(rows) 
//     })

    //4. deletar os dados da tabela
//    db.run('DELETE FROM places WHERE id = ?', [3], function(err) {
//        if(err) {
//            return console.log(err)
//        }
//        console.log("Registro deletado com sucesso")
//    })

//})