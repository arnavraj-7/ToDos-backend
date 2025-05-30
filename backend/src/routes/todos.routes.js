import { Router} from "express";
import { Todos } from "../models/todos.models.js";
import { User } from "../models/users.models.js";
import dotenv from 'dotenv'
import { clerkMiddleware } from '@clerk/express';
const router = Router();

dotenv.config();
router.use(clerkMiddleware());

router.post("/create/:clerkid",async(req,res)=>{
  try{
    const auth = req.auth();
    if(!auth.userId){
      res.status(401).json({
        message: "User not authenticated.",
      })
      return;
    }
    const {clerkid}=req.params;
    const user=await User.findOne({ clerkid:clerkid });
    if(!user){
      await User.create({
        clerkid: clerkid,
        name: auth.firstName || "Anonymous",
        todos:[],
      })
      console.log("User created successfully.");
      return res.status(201).json({ message: "User created successfully." });
      }
      else{
        res.status(400).json({
          message: "User already exists.",
        });
        return;
      }
    }catch(error){
    console.error("Error creating user:", error);
    res.status(401).json({
      message: "Error.",
    });
  }
})


router.get("/AllToDo/:clerkid", async (req, res) => {
  try{
    const auth = req.auth();
    if(!auth.userId){
      res.status(401).json({
        message: "User not authenticated.",
      })
      return;
    }
    const clerkid = req.params.clerkid;
    const user = await User.findOne({ clerkid }).populate("todos");
     if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const todos = user.todos;
    res.json({
      Alltodos: todos,
    });
  }catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({
      message: "Error fetching todos.",
    });
  }
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

router.post("/AllToDo/:clerkid",async(req,res)=>{
    try{
    const auth = req.auth();
       if(!auth.userId){
      res.status(401).json({
        message: "User not authenticated.",
      })
      return;
    }
    const {clerkid}=req.params;
    const user =await User.findOne({clerkid}).populate("todos");
    if(!user){
      res.json({
        message: "User not found.",
      })
    }
        const {todo,Completed,isEditable}=req.body;
   if([todo].some((field)=>field.trim()==="")){
    throw new Error("Empty Field is not allowed.");
   }
  const newTodo=await Todos.create(
    {
        todo:todo,Completed:Completed,isEditable:isEditable
    }
   )
   user.todos.push(newTodo._id);
    await user.save();
   res.status(201).json(newTodo);
    }
   catch(error){
    res.status(401).json({
        message:"Error in adding."+error,
    })

   }
})

router.put("/AllToDo/:clerkid/:id",async(req,res)=>{
    const auth = req.auth();
  if(!auth.userId){
     res.status(401).json({
       message: "User not authenticated.",
     })
      return;
    }
    const {clerkid,id}=req.params;
    const user=await User.findOne({clerkid}).populate("todos");
    if(!user){
      res.json({
        message: "User not found.",
      })
    }
 const {todo ,Completed,isEditable} =req.body
  try{
    const updatedTodo=await Todos.findByIdAndUpdate(id,
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

router.delete("/AllToDo/:clerkid/:id",async(req,res)=>{
       try{
        const auth = req.auth();
         if(!auth.userId){
           res.status(401).json({
             message: "User not authenticated.",
           })
      return;
    }
      const {clerkid,id}=req.params;
    const user=await User.findOne({clerkid}).populate("todos");
    if(!user){
      res.json({
        message: "User not found.",
      })
      return;
    }
        const deletedTodo=await Todos.findByIdAndDelete(id);
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