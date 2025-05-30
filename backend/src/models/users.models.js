import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  clerkid:{
    type:String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  
  todos: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Todos",
      },
    ],
  },
});

export const User = mongoose.model("User", userSchema);
