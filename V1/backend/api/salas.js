module.exports = app => {
// estou exportando todas funções para fora
    //retorna um funçaõ arrow , recebe como parametro app(instancia do express)
    // o app é passado para todas dependencias declaradas no then do consign
    const { existsOrError, notExistsOrError} = app.api.validation//operador destructin

    const save = async(req, res) => {
        //res.send('user save')
        const sala = { ...req.body }
        // é interseptado pelo bodyparser e clona para sala, espalhanado todos atributos
        //dentro do body, colocando dentro de outro objeto
        if(req.params.id) sala.id = req.params.id
        // se req.params.id, estiver setado, pois serve para inserir ou alterar uma sala existente

        try {          

            existsOrError(sala.nome, 'Nome da sala não informado')            
            existsOrError(sala.lotacao, 'Lotação da sala não informado')            
           
            const salaFromDB = await app.db('salas') // db é a forma de acessar o knex
                .where({ nome: sala.nome }).first() // para pegar só uma sala
            if(!sala.id) { // a negação aqui é usuada caso haja interesse em fazer um update do id
                notExistsOrError(salaFromDB, 'Sala já foi cadastrada')
            }
            
        } catch(msg) {
            return res.status(400).send(msg) // erro 400 do lado do servidor
        }


        if(sala.id) {
            app.db('salas')
                .update(sala)
                .where({ id: sala.id }) // só se for um update
                //.whereNull('deletedAt')
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('salas')
                .insert(sala)
                .then(_ => res.status(204).send()) // esta tudo certo
                .catch(e => res.status(500).send(e)) // significa que deu erro
        }
    } 

    const get = (req, res) => { 
        // pega todas partes do sistema
        app.db('salas')
            .select('id', 'nome', 'lotacao')
            //.whereNull('deletedAt')
            .then(salas => res.json(salas))// se houver algum padrão na empresa
            // com nomes do bd com (_) ou nomenclatura padrão da empresa, nesse ponto deve-se fazer a conversão
            // aqui foi mantido o mesmo nome para simplificar a aplicação por tratar-se de um teste.
            .catch(e => res.status(500).send(e))
    }

    const getById = (req, res) => {
        app.db('salas')
            .where({ id: req.params.id })
            .first()
            .then(sala => res.json(sala))// se houver algum padrão na empresa
            // com nomes do bd com (_) ou nomenclatura padrão da empresa, nesse ponto deve-se fazer a conversão
            // aqui foi mantido o mesmo nome para simplificar a aplicação por tratar-se de um teste.
            .catch(e => res.status(500).send(e))
    }

        
    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('salas')
                .where({ id: req.params.id }).del()
            
            try {
                existsOrError(rowsDeleted, 'Sala não foi encontrada.')
            } catch(msg) {
                return res.status(400).send(msg)    
            }

            res.status(204).send()
        } catch(msg) {
            res.status(500).send(msg)
        }
    }

    return { save, get, getById,remove} // retorna todas funções dentro de um objeto
}