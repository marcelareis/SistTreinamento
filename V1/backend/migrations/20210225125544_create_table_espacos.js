
exports.up = function(knex, Promise) {
    //createTable(<nome da tabela>,callback(table)- colunas da tabela) // 
    return knex.schema.createTable('espacos',table =>{
      table.increments('id').primary()
      table.string('nome').notNull()
      table.integer('lotacao').notNull()
      })
};
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('espacos')
  };
