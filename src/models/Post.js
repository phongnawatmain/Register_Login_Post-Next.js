// src/models/Post.js
import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    imageLink: { type: String },
    imageFile: { type: String }, // สำหรับการจัดการไฟล์
}, { timestamps: true });

export default mongoose.models.Post || mongoose.model('Post', PostSchema);
