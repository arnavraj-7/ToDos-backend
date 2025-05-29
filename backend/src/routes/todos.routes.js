import { Router as r } from "express";
import { Todos } from "../models/todos.models.js";
const router = r();
router.get("/AllToDo", async (req, res) => {
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
  const newTodo=await Todos.create(
    {
        todo:todo,Completed:Completed,isEditable:isEditable
    }
   )
   console.log(todo);
   res.status(201).json(newTodo);

    }
   catch(error){
    res.status(401).json({
        message:"Error in adding."+error,
    })

   }
})

router.put("/AllToDo/:id",async(req,res)=>{
 const {todo ,Completed,isEditable} =req.body
  try{
    const updatedTodo=await Todos.findByIdAndUpdate(req.params.id,
      {
        todo,Completed,isEditable
      },{new:true}
    );
  if(!updatedTodo){
    throw new Error("Todo not found!");
  }
  console.log(updatedTodo);
  res.json(updatedTodo);
  }catch(error){
    console.log(error);
  }
})

router.delete("/AllToDo/:id",async(req,res)=>{
       try{
        const deletedTodo=await Todos.findByIdAndDelete(req.params.id);
       if(!deletedTodo){
        res.json("Not found!");
        throw new Error("No todo found!");
       }
       res.json(deletedTodo);
       console.log(deletedTodo);
      }
      catch(error){
        console.log(error);
      }
})

export default router;