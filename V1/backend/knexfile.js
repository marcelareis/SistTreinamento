module.exports = {

    
  client: 'postgresql',
  connection: {
    database: 'treinamento',
    user:     'postgres',
    password: '123'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }


};