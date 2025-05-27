import { Router as r } from "express";
import { Todos } from "../models/todos.models.js";
const router = r();
router.get("/AllDoTo", async (req, res) => {
  const todos = await Todos.find();
  res.json({
    Alltodos: todos,
  });
});

// router.get("/Done",async (req, res) => {
//       const Done = await Todos.find({Completed:true});
//   res.json({
//     Done: Done,
//   });
// });
// router.get("/NotDone", async(req, res) => {
//        const NotDone = await Todos.find({Completed:false});
//   res.json({
//     NotDone: NotDone,
//   });
// });

router.post("/AllToDo",async(req,res)=>{
    try{
        const {todo,Completed,isEditable}=req.body;
   if([todo].some((field)=>field.trim()==="")){
    throw new Error("Empty Field is not allowed.");
   }
  await Todos.create(
    {
        todo:todo,Completed:Completed,isEditable:isEditable
    }
   )
   console.log(todo);
   res.status(201).json({
    message:"Successfully added."
   })

    }
   catch(error){
    res.status(401).json({
        message:"Error in adding."+error,
    })

   }
})
