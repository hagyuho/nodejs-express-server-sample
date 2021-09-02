module.exports = { 
    host: 'localhost', 
    username: 'root', 
    password: 'root', 
    db: 'nodeserver', 
    dialect: 'mysql', 
    pool: { 
        max: 5, 
        min: 0, 
        acquire: 30000, 
        idle: 10000 
    } 
};
