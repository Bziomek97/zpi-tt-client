import axios from "axios";

const analyzedTweetsPost = async (hashtags) => {
    const response = await axios.post('http://localhost:8081/analyze/', {
            "hashtags": hashtags,
            "max_results": 100
        }, {
        headers: {
            'Content-Type': 'application/json',
            'Autorization': 'x'
        }
    })

    return response.data
}

export default analyzedTweetsPost;