const Post = require('../model/Post');

const getAllPosts = async (req, res) => {
    const posts = await Post.find();
    if (!posts) return res.status(204).json({ 'message': 'No Posts found.' });
    res.json(posts);
}

const createNewPost = async (req, res) => {
    if (!req?.body?.title || !req?.body?.summary || !req?.body?.content || !req?.body?.cover ) {
        return res.status(400).json({ 'message': 'Error, you have incomplete fields' });
    }

    try {
        const result = await Post.create({
            title: req.body.title,
            summary: req.body.summary,
            content: req.body.content,
            cover: req.body.cover,
        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

const updatePost = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }

    const post = await Post.findOne({ _id: req.body.id }).exec();
    if (!post) {
        return res.status(204).json({ "message": `No Post matches ID ${req.body.id}.` });
    }
    if (req.body?.title) post.title = req.body.title;
    if (req.body?.summary) post.summary = req.body.summary;
    if (req.body?.content) post.content = req.body.content;
    if (req.body?.cover) post.cover = req.body.cover;
    const result = await post.save();
    res.json(result);
}

const deletePost = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ 'message': 'Post ID required.' });

    const post = await Post.findOne({ _id: req.body.id }).exec();
    if (!post) {
        return res.status(204).json({ "message": `No Post matches ID ${req.body.id}.` });
    }
    const result = await Post.deleteOne(); //{ _id: req.body.id }
    res.json(result);
}

const getPost = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'Post ID required.' });

    const post = await Post.findOne({ _id: req.params.id }).exec();
    if (!post) {
        return res.status(204).json({ "message": `No Post matches ID ${req.params.id}.` });
    }
    res.json(post);
}

module.exports = {
    getAllPosts,
    createNewPost,
    updatePost,
    deletePost,
    getPost
}