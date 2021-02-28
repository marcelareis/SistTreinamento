
exports.up = function(knex, Promise) {

    return knex.schema.createTable('pessoas',table =>{
        table.increments('id').primary()
        table.string('nome').notNull()
        table.string('sobrenome').notNull()        
        table.integer('salaIdEt1').references('id').inTable('salas')
        table.integer('salaIdEt2').references('id').inTable('salas')
        table.integer('espacoIdEt1').references('id').inTable('espacos')
        table.integer('espacoIdEt2').references('id').inTable('espacos')

        })
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('pessoas')
  };
