import mongoose from 'mongoose'

const todoSchema= new mongoose.Schema({
    todo:{
        type:String,
        required:true
    },
    Completed:{
        type:Boolean,
       
    },
    isEditable:{
        type:Boolean,
        default:true,
        
    }
})

export const Todos=mongoose.model('Todos',todoSchema);
