const {Router} = require('express')
const router = Router()
const Post = require('../models/Post')
const Comment = require('../models/Comment')
const auth = require('../middleware/auth.middleware')

router.post('/create', auth, async (req, res) => {
    try {
        const {title, body} = req.body

        let post = new Post({
            title, body, owner: req.user.userId
        })

        await post.save()
        post = await Post.find({_id: post._id}).populate('owner')

        res.status(201).json(post)
    } catch (e) {
        res.status(500).json({message: 'Something went wrong...'})
    }
})

router.post('/remove', auth, async (req, res) => {
    try {
        const {id} = req.body

        const response = await Post.findByIdAndDelete(id)

        res.json({response})
    } catch (e) {
        res.status(500).json({message: 'Something went wrong...'})
    }
})

router.get('/', auth, async (req, res) => {
    try {
        let posts = await Post.find().populate('owner')
        res.json(posts)
    } catch (e) {
        res.status(500).json({message: 'Something went wrong...'})
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('owner')
        res.json(post)
    } catch (e) {
        res.status(500).json({message: 'Something went wrong...'})
    }
})

router.post('/:id/comments', auth, async (req, res) => {
    try {
        const {body} = req.body

        let comment = new Comment({
            body,
            owner: req.user.userId,
            postId: req.params.id
        })

        await comment.save()
        comment = await Comment.find({_id: comment._id}).populate('owner')

        res.status(201).json(comment)
    } catch (e) {
        res.status(500).json({message: 'Something went wrong...'})
    }
})

router.get('/:id/comments', auth, async (req, res) => {
    try {
        const comments = await Comment.find({postId: req.params.id}).populate('owner')
        res.json(comments)
    } catch (e) {
        res.status(500).json({message: 'Something went wrong...'})
    }
})

module.exports = router