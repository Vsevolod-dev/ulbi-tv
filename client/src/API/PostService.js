import axios from "axios";
import {getCookie} from "../utils/helpers";

export default class PostService {
    static async getAll(limit = 10, page = 1) {
        // const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
        //     params: {
        //         _limit: limit,
        //         _page: page
        //     }
        // })
        const token = getCookie('token')
        const response = await axios.get('/api/post', {
            headers: {
                Authorization: 'Bearer ' + token //the token is a variable which holds the token
            }
        })
        return response
    }

    static async getPost(id) {
        const token = getCookie('token')
        const response = await axios.get('/api/post/' + id, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        return response
    }

    static async getPostComments(id) {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
        return response
    }

    static async createPost({body, title}) {
        const token = getCookie('token')
        const response = await axios.post('/api/post/create', {
            body, title
        }, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        return response
    }

    static async removePost(id) {
        const token = getCookie('token')
        const response = await axios.post('/api/post/remove', {
            id
        }, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        return response
    }
}