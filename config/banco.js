const Sequelize = require("sequelize")
const sequelize = new Sequelize("sistema_web", "root", "Dev@9192#", {
    host: "localhost",
    dialect: "mysql"
})

sequelize.authenticate().then(function () {
    console.log("Conectado ao Banco de Dados com sucesso");
}).catch(function (erro) {
    console.log("Erro na conexão com o Banco de Dados", erro)
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}