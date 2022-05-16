const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    body: {
        type: String,
        required: true
    },
    owner: {
        type: Types.ObjectId,
        ref: 'User'
    },
    postId: {
        type: Types.ObjectId,
        ref: 'Post'
    }
})

module.exports = model("Comment", schema)