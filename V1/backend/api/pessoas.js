module.exports = app => {
// estou exportando todas funções para fora
    //retorna um funçaõ arrow , recebe como parametro app(instancia do express)
    // o app é passado para todas dependencias declaradas no then do consign
    const { existsOrError} = app.api.validation//operador destructin

    const save = async(req, res) => {
        //res.send('user save')
        const pessoa = { ...req.body }
        // é interseptado pelo bodyparser e clona para pessoa, espalhanado todos atributos
        //dentro do body, colocando dentro de outro objeto
        if(req.params.id) pessoa.id = req.params.id
        // se req.params.id, estiver setado, pois serve para inserir ou alterar uma pessoa existente

        try {          

            existsOrError(pessoa.nome, 'Nome da pessoa não informado')            
            existsOrError(pessoa.sobrenome, 'Sobrenome da pessoa não informado')
            existsOrError(pessoa.salaIdEt1, 'Sala da 1 etapa não informada')
            existsOrError(pessoa.salaIdEt2, 'Sala da 2 etapa não informada')
            existsOrError(pessoa.espacoIdEt1, 'Espaço da 1 etapa não informada')
            existsOrError(pessoa.espacoIdEt2, 'Espaço da 2 etapa não informada')
            
        } catch(msg) {
            return res.status(400).send(msg) // erro 400 do lado do servidor
        }


        if(pessoa.id) {
            app.db('pessoas')
                .update(pessoa)
                .where({ id: pessoa.id }) // só se for um update
                //.whereNull('deletedAt')
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('pessoas')
                .insert(pessoa)
                .then(_ => res.status(204).send()) // esta tudo certo
                .catch(e => res.status(500).send(e)) // significa que deu erro
        }
    } 

    const get = (req, res)=>{                
        app.db({p:'pessoas', s1:'salas',s2:'salas',e1:'espacos',e2:'espacos'})
            .select ('p.id','p.nome','p.sobrenome','p.salaIdEt1','p.salaIdEt2',
            'p.espacoIdEt1','p.espacoIdEt2',
            {nomeSalaEt1:'s1.nome'},{salaIdEt1:'s1.id'},
            {nomeSalaEt2:'s2.nome'},{salaIdEt2:'s2.id'},
            {nomeEspacoEt1:'e1.nome'},{espacoIdEt1:'e1.id'},
            {nomeEspacoEt2:'e2.nome'},{espacoIdEt2:'e2.id'},                                            
            )            
            // vai igualar as duas tabelas//whereRaw usamos SQL dentro de uma string           
            .whereRaw('?? = ??',['s1.id','p.salaIdEt1'])
            .whereRaw('?? = ??',['s2.id','p.salaIdEt2'])
            .whereRaw('?? = ??',['e1.id','p.espacoIdEt1'])
            .whereRaw('?? = ??',['e2.id','p.espacoIdEt2'])            
            .then(pessoas => res.json(pessoas)) 
            .catch(err=>res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('pessoas')
            .where({ id: req.params.id })
            .first()
            .then(pessoa => res.json(pessoa))// se houver algum padrão na empresa
            // com nomes do bd com (_) ou nomenclatura padrão da empresa, nesse ponto deve-se fazer a conversão
            // aqui foi mantido o mesmo nome para simplificar a aplicação por tratar-se de um teste.
            .catch(e => res.status(500).send(e))
    }

        
    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('pessoas')
                .where({ id: req.params.id }).del()
            
            try {
                existsOrError(rowsDeleted, 'Pessoa não foi encontrada.')
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