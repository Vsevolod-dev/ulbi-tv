const {Router} = require('express')
const router = Router()
const Post = require('../models/Post')
const auth = require('../middleware/auth.middleware')

router.post('/create', auth, async (req, res) => {
    try {
        const {title, body} = req.body

        const post = new Post({
            title, body, owner: req.user.userId
        })

        await post.save()

        res.status(201).json({post})
    } catch (e) {
        res.status(500).json({message: 'Something went wrong...'})
    }
})

router.post('/remove', auth, async (req, res) => {
    try {
        const {id} = req.body

        const response = await Post.findByIdAndDelete(id)
        console.log(response)

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

module.exports = router