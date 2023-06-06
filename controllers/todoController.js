const TodoModel = require("../models/todoModel");

module.exports.getAllTodos = async (req, res) => {
    try {

        const todos = await TodoModel.find();
        res.status(200).json({success:true,message:"fetched sucessfully",data: todos});

    } catch (err) {
        res.status(500).json({success:false,message:"unable fetch"});
    }
    
}


module.exports.getTodo = async (req, res) => {

    const {id} = req.params

    if(!id){
        return res.status(404).json({success:false,message:"invalid input"})
    }else{
        try {

            const todos = await TodoModel.findById({_id:id});
            res.status(200).json({success:true,message:"fetched sucessfully",data: todos});
    
        } catch (err) {
            res.status(500).json({success:false,message:"unable fetch"});
        }
    }
    
}

module.exports.saveTodo = (req, res) => {
    const { title, description } = req.body;

    if(!title || !description){
        return res.status(404).json({success:false,message:"invalid input"})
    }else{
        TodoModel
        .create({title,description })
        .then((todoData) =>{ 
            res.status(201).json({success:true,message:"created sucessfully",data: todoData});
        })
        .catch((err) => res.status(500).json({success:false,message:"unable to create"}));
    }

    
}

module.exports.deleteTodo = (req, res) => {
    const { id } = req.params;

    if(!id){
        return res.status(404).json({success:false,message:"invalid input"})
    }else{
        TodoModel
        .findByIdAndDelete({_id:id})
        .then(() => res.status(200).json({success:true,message:"deleted sucessfully"}))
        .catch((err) => res.status(500).json({success:false,message:"unable to deleted"}));
    }
    
}

module.exports.updateTodo = (req, res) => {
    const { id } = req.params
    const { title, description } = req.body;
    
    if(!id || !title || !description){
        return res.status(404).json({success:false,message:"invalid input"})
    }else{
        TodoModel
        .findByIdAndUpdate({_id:id}, { title, description })
        .then(() => res.status(200).json({success:true,message:"updated sucessfully"}))
        .catch((err) => res.status(500).json({success:false,message:"unable to updated"}));
    }

    
}