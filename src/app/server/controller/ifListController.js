const db = require('../model/index.js')
const AfList = db.aflist;
const Op = db.sequelize.Op;

exports.create = (req,res) => {
    if(!req.body.name) {
        res.state(400).send({
            message: 'name is empty!'
        })
        return;
    }

    const ifList = {
        name : req.body.name,
        interest : req.body.interest,
        retireDday : req.body.retireDday,
    }

    AfList
        .create(ifList)
        .then(data =>{
            res.send(data);
        })
        .catch(err=>{
            res.status(500).send({
                message: err.message || 'Create iflist failure.'
            })
        })
}

exports.findAll = (req,res) => {

    let keyword = req.params.searchWord    
    let condition = { where:{}};

    if(keyword){
        condition={
            where : {
                [Op.or]:[
                    {
                        name:{
                            [Op.like]: `%${keyword}%`
                        }
                    },
                    {
                        interest:{
                            [Op.like]: `%${keyword}%`
                        }
                    },
                    {
                        retireDday:{
                            [Op.like]: `%${keyword}%`
                        }
                    },
                ]
            }
        }
    };

    AfList
        .findAll(condition)
        .then(data =>{
            res.send(data)
        })
        .catch(err=>{
            res.status(500).send({
                message: err.message || 'RetrieveAll iflist failure.'
            })
        })
}

exports.findOne = (req,res) => {
    const id = req.params.id;

    AfList
        .findByPk(id)
        .then(data =>{
            res.send(data)
        })
        .catch(err=>{
            res.status(500).send({
                message: err.message || 'Retrieve iflist failure. (id' + id + ')'
            })
        })
};

exports.update = (req,res) => {
    const id = req.params.id;
    const condition = id ? { where: {id : id}} : null;

    AfList
        .update(
            req.body,
            condition
        )
        .then(resultCount =>{
            if(resultCount==1){
                res.send({
                    message: 'Iflist updated'
                });
            } else {
                res.send({
                    message: 'nothing to update ( id :' + id + ')'
                });
            }
        })
        .catch(err=>{
            res.status(500).send({
                message: err.message || 'update Iflist failure ( id :' + id + ')'
            });
        });
};


exports.delete = (req,res) => {
    const id = req.params.id;
    const condition = id ? { where: {id : id}} : null;

    AfList
        .destroy(condition)
        .then(resultCount =>{
            if(resultCount==1){
                res.send({
                    message: 'Iflist deleted'
                });
            } else {
                res.send({
                    message: 'nothing to delete ( id :' + id + ')'
                });
            }
        })
        .catch(err=>{
            res.status(500).send({
                message: err.message || 'Delete Iflist failure ( id :' + id + ')'
            });
        });
};