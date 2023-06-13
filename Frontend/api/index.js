import axios from 'axios'

const API = axios.create({baseURL: "http://localhost:8000/api"});

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('userData')){
        let jwtToken= localStorage.getItem('userData')
        let data= JSON.parse(jwtToken)
        req.headers.Authorization = data.token;
    }
    return req;
})

export const createTweet = async({content,tags}) => API.post('/create-tweet',{content,tags});

export const getProfileTweets = async(id) => await API.get(`/profile/${id}`);

export const getMyProfileTweets = async() => await API.get('/profile');

export const deleteTweet = async(tweet) =>await API.delete(`/delete-tweet/${tweet._id}`)

export const edit_Tweet = async({_id,content,tags}) => await API.patch('/edit-tweet',{_id,content,tags})

export const getTweetDetails = async(id) => await API.get(`/get-tweet/${id}`)