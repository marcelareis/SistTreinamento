
// sem o consign seria
// const sala = require('../api/sala)
// dentro do modulo exports post(sala.save)

module.exports = app => {
    
    app.route('/salas')
        .post(app.api.salas.save) //(app(express).pastaApi.pastaSala.metodoSave)
        .get(app.api.salas.get)

    app.route('/salas/:id')
        .put(app.api.salas.save) // não coloquei pois no enunciado não solicita alteração
        .get(app.api.salas.getById)
        .delete(app.api.salas.remove)

        app.route('/espacos')
        .post(app.api.espacos.save) //(app(express).pastaApi.pastaSala.metodoSave)
        .get(app.api.espacos.get)

    app.route('/espacos/:id')
        .put(app.api.espacos.save) // não coloquei pois no enunciado não solicita alteração
        .get(app.api.espacos.getById)
        .delete(app.api.espacos.remove)
    
    app.route('/pessoas')
        .post(app.api.pessoas.save) 
        .get(app.api.pessoas.get)
    
    app.route('/pessoas/:id')
        .put(app.api.pessoas.save) 
        .get(app.api.pessoas.getById)
        .delete(app.api.pessoas.remove)
    
}