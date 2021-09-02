module.exports = (sequelizeConfig, Sequelize) => 
{ // Set Model 
    const Aflist = sequelizeConfig.define( 
        'aflist', 
        { 
            name: { 
                type: Sequelize.STRING
            }, 
            interest: { 
                type: Sequelize.STRING 
            }, 
            retireDday: { 
                type: Sequelize.STRING 
            } 
        } 
    ); 
    
    return Aflist; 
};
