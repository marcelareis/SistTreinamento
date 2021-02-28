
exports.up = function(knex, Promise) {
  //createTable(<nome da tabela>,callback(table)- colunas da tabela) // 
  return knex.schema.createTable('salas',table =>{
    table.increments('id').primary()
    table.string('nome').notNull()
    table.integer('lotacao').notNull()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('salas')
  };
