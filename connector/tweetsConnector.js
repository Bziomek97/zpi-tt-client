import axios from "axios";

const analyzedTweetsPost = async (hashtags) => {
    const response = await axios.post('http://localhost:8003/analyze/', {
            "hashtags": hashtags,
            "max_results": 100
        }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return response.data
}

export default analyzedTweetsPost;