
exports.up = function(knex, Promise) {

    return knex.schema.createTable('etapa1',table =>{
        table.increments('id').primary()
        table.string('nome').notNull()
        table.string('sobrenome').notNull()        
        table.integer('salaIdEt1').references('id').inTable('salas').notNull()        
        table.integer('espacoIdEt1').references('id').inTable('espacos').notNull() 
    })
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('etapa1')
};
