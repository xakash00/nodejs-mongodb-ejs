import { Request, Response, NextFunction } from 'express';
import BlogModel from '../models/blogModels';

export const getBlogList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const searchQuery = req.query.search as string || '';

        const query = searchQuery
            ? {
                $or: [
                    { title: { $regex: searchQuery, $options: 'i' } },
                    { content: { $regex: searchQuery, $options: 'i' } }
                ]
            }
            : {};

        const [blogs, total] = await Promise.all([
            BlogModel.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            BlogModel.countDocuments(query)
        ]);

        const totalPages = Math.ceil(total / limit);

        res.render('index', {
            blogs,
            currentPage: page,
            totalPages,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1,
            nextPage: page + 1,
            previousPage: page - 1,
            searchQuery
        });
    } catch (err) {
        next(err);
    }
};

export const addBlogForm = (req: Request, res: Response): void => {
    res.render('form', { blog: null });
};

export const createBlog = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { title, content, author } = req.body;
        const newBlog = new BlogModel({
            title,
            content,
            author,
            createdAt: new Date().toLocaleDateString(),
        });
        await newBlog.save();
        res.redirect('/');
    } catch (err) {
        next(err);
    }
};

export const deleteBlog = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const id = Number(req.params.id);
    try {
        const deletedBlog = await BlogModel.findOneAndDelete({ id });
        if (!deletedBlog) {
            res.status(404).send({ message: "Blog not found" });
            return;
        }
        res.redirect("/");
    } catch (err) {
        next(err);
    }
};

export const getBlogById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const id = Number(req.params.id);
    try {
        const blog = await BlogModel.findOne({ id });
        if (!blog) {
            res.status(404).send({ message: "Blog not found" });
            return;
        }
        res.render('show', { blog });
    } catch (err) {
        next(err);
    }
};

export const editBlogById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const id = Number(req.params.id);
    const { title, content, author } = req.body;
    try {
        const updatedBlog = await BlogModel.findOneAndUpdate(
            { id },
            {
                title,
                content,
                author,
                createdAt: new Date().toLocaleDateString(),
            },
            { new: true }
        );
        res.redirect("/");
        if (!updatedBlog) {
            res.status(404).send({ message: "Blog not found" });
            return;
        }

    } catch (err) {
        next(err);
    }
};
