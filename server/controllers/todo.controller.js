const Todo = require("../models/Todo.js")

exports.createTodo = async(req, res) => {
    try {
        await Todo.create(req.body)
        res.status(201).json({message: "todo create success", success: true})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message, success: false})
    }
}

exports.readTodo = async(req, res) => {
    try {
        const result = await Todo.find()
        // result - array
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message, success: false})
    }
}

exports.updateTodo = async(req, res) => {
    try {
        const {todoID} = req.params
        console.log(req.body);
        console.log(todoID);
        
        await Todo.findByIdAndUpdate(todoID, req.body)
        res.status(200).json({message: "todo update success", success: true})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message, success: false})
    }
}

exports.deleteTodo = async(req, res) => {
    try {
        const {todoID} = req.params
        const result = await Todo.findByIdAndDelete(todoID)
        res.status(200).json({message: "todo delete success", success: true})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message, success: false})
    }
}