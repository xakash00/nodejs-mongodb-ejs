import express from 'express';
import {
    getBlogList,
    addBlogForm,
    createBlog,
    deleteBlog,
    getBlogById,
    editBlogById,
} from '../controllers/blogController';
import { isDBConnected } from '../config/db';

const router = express.Router();


router.use((req, res, next) => {
    if (!isDBConnected) {
        return res.status(503).render('fallback', { message: 'Database unavailable. Please try again later.' });
    }
    next();
});

router.get('/', getBlogList);
router.get('/create', addBlogForm);
router.post('/create', createBlog);
router.get('/edit/:id', getBlogById);
router.delete('/delete/:id', deleteBlog);
router.put('/edit/:id', editBlogById);

export default router;
