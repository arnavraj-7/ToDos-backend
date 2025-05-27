import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
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
