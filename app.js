const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');


const app = express();
const port = process.env.PORT || 3000;

// configurar conexão com MySQL

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'aluno',
    password: 'ifpecjbg',
    database: 'web3aula2'


});

connection.connect((err) => {
    if (err){
        console.error('Erro ao conectar ao MySQL: ' + err.message);

    } else{
        console.log('conetando ao MySQL');
    }
});

// Middleware para lidar com dados codifgicados no corpo da solicitação

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// Rota para lidar com o método POST para inserir um usuário

app.post('/api/usuarios', (req, res) => {
    const { email, senha } = req.body;


// Inserir os dados na tabela 'usuario' no banco de dados usando uma query

const sql = 'INSERT INTO usuario (email, senha) VALUES (?, ?)';
connection.query(sql, [ email, senha], (err,result)=>{
    if(err) {
        console.error('Error ao inserir registro: '+ err.message);
        res.status(500).json({error: 'Erro ao inserir registro'});


    } else{
        console.log('Registro inserido com sucesso!');
        res.status(201).json({message: 'Registro inserido com sucesso'});
    }






});

});



const db = mysql.createConnection({
    host: 'n',
    user: 'aluno',
    password: 'ifpecjbg',
    database: 'web3aula2'

});

db.connect(err => {
    if (err){
        console.error('Error ao conectar ao MySQL:' , err);
    }else{
        console.log('Conectando ao MySQL')
    }
});

// Rota para lidar com o metodo GET para buscaar todos os usuarios

app.get('/api/usuario', (req, res) => {
    // Consultar o banco de dados para buscar todos os usuários
    const sql = 'SELECT * FROM usuario';
    connection.query(sql,(err,result) => {
        if (err){
            console.error( 'Erro ao buscar registro:' + err.message);
            res.status(500).json({error: 'Erro ao buscar registro'});
        } else{
            res.status(200).json(result);
        }
    });

});

// Rota para lidar com o método PUT para atualizar um usuario

app.put('/api/usuario/:id', (req, res) => {
    const {id} = req.params;
    const {email, senha } = req.body;

    // Atualizar os dados na tabela 'usuario' no banco de dados usando uma query

    const sql = 'UPDATE usuario SET email = ? , senha =? WHERE id =?';
    connection.query(sql, [email,senha, id], (err, result)=> {
        if(err){
            console.error( 'Erro ao atualizar registro:' + err.message);
            res.status(500).json({error: 'Erro ao Atualizar registro'});
        } else{
            console.log('Registro atualizado com sucesso');
            res.status(200).json({message: "Registro atualizado!"});
        }
        
    });
});

app.delete('/api/usuario/:id', (req, res) => {
    const {id} = req.params;


// Excluir o registro na tabela 'usuario' no banco de dados pelo ID

const sql = 'DELETE FROM usuario WHERE id=?';
connection.query(sql, [id], (err, result) =>{
    if(err){
        console.error('Erro ao excluir registro: ' + err.message);
        res.status(500).json({ error: 'Erro ao exclur registro'});
    }else{
        if (result.affectedRows >0 ){
            console.log('Registro excluido com sucesso!');
            res.status(200).json({message: 'Registro  encontrado'})
        }else{
            console.log('Registro não encontrado.');
            res.status(404).json({message:'Registro não encontrado '});
        }
    }
});

});


// Iniicar o servidor

app.listen(port,() => {
    console.log('Servidor iniciado na porta ${port}');
});