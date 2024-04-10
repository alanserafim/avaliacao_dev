const express = require("express")
const app = express()
const PORT = 8081

const handlebars = require("express-handlebars").engine
app.engine("handlebars", handlebars({ defaultLayout: "main" }))
app.set("view engine", "handlebars")

const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const clientes = require("./models/cliente")

app.get("/", function (req, res) {
    res.render("cadastro")
})

app.post("/cadastrar", function (req, res) {
    clientes.create({
        nome: req.body.nome,
        endereco: req.body.endereco,
        bairro: req.body.bairro,
        cep: req.body.cep,
        cidade: req.body.cidade,
        estado: req.body.estado
    }).then(function () {
        console.log("Cliente cadastrado com sucesso!")
        clientes.findAll().then(function (listaClientes) {
            res.render("consulta", { lista: listaClientes })
        }).catch(function (erro) {
            console.log("Erro: nenhum cliente encontrado! " + erro)
        })
    }).catch(function (erro) {
        console.log("Erro: cliente não cadastrado!" + erro)
    })
})


app.get("/consulta", function (req, res) {
    clientes.findAll().then(function (listaClientes) {
        res.render("consulta", { lista: listaClientes })
    }).catch(function (erro) {
        console.log("Erro: nenhum cliente encontrado! " + erro)
    })
})


app.get("/editar/:id", function (req, res) {
    clientes.findAll({ where: { "id": req.params.id } }).then(function (cliente) {
        console.log(cliente)
        res.render("editar", { cliente: cliente })
    }).catch(function (erro) {
        console.log("Erro: cliente não encontrado!" + erro)
    })
})

app.post("/atualizar", function (req, res) {
    clientes.update({
        nome: req.body.nome,
        endereco: req.body.endereco,
        bairro: req.body.bairro,
        cep: req.body.cep,
        cidade: req.body.cidade,
        estado: req.body.estado
    }, { where: { "id": req.body.id } }).then(function () {
        console.log("Cliente atualizado com sucesso!")
        clientes.findAll().then(function (listaClientes) {
            res.render("consulta", { lista: listaClientes })
        }).catch(function (erro) {
            console.log("Erro: nenhum cliente encontrado! " + erro)
        })
    }).catch(function (erro) {
        console.log("Erro: cliente não atualizado!" + erro)
    })
})

app.get("/excluir/:id", function (req, res) {
    clientes.destroy({ where: { "id": req.params.id } }).then(function () {
        console.log("Cliente excluído com sucesso!")
        clientes.findAll().then(function (listaClientes) {
            res.render("consulta", { lista: listaClientes })
        }).catch(function (erro) {
            console.log("Erro: nenhum cliente encontrado! " + erro)
        })
    }).catch(function (erro) {
        console.log("Cliente não excluído!" + erro)
    })
})


app.listen(PORT, function () {
    console.log(`Servidor ativo na porta ${PORT}`)
    console.log(`http://localhost:${PORT}`)
})
