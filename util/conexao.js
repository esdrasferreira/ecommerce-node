const mysql = require('mysql2')

const conexao = mysql.createConnection({
    host: '192.175.108.234',
    port: 3306,
    user: 'andregon_banco',
    password: 'Cg8I{YL#L6ic',
    database: 'andregon_ecommerce'

})

conexao.connect(error =>{
    if(error){
        return console.log(error);
    }
    console.log('Conectado ao banco de dados')
})

module.exports = conexao;