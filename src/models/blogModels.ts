import mongoose, { Schema, Document } from 'mongoose';
import { Counter } from './counter';

export interface Blog extends Document {
    title: string;
    content: string;
    author: string;
    createdAt: string;
}

const BlogSchema = new Schema<Blog>({
    id: { type: Number, unique: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    createdAt: { type: String, required: true },
});

BlogSchema.pre('save', async function (next) {
    if (this.isNew) {
        const counter = await Counter.findOneAndUpdate(
            { id: 'blogId' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        this.id = counter.seq;
    }
    next();
});


export default mongoose.model<Blog>('Blog', BlogSchema);
