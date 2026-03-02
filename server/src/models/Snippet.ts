import mongoose, { Schema, Document } from "mongoose";

export interface ISnippet extends Document {
  title: string;
  code: string;
  language: string;
  user: mongoose.Types.ObjectId;
}

const snippetSchema = new Schema<ISnippet>(
  {
    title: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<ISnippet>("Snippet", snippetSchema);