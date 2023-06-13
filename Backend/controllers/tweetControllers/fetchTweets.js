import Tweet from "../../models/tweet.js";

export const fetchTweets = async(req,res) =>{
    try {
        const tweets = await Tweet.find({}).populate('creator')
        
        return res.status(200).send({
            success: true,
            message: 'Tweets fetched successfully',
            tweets
        })
    } catch (error) {
        return res.status(200).send({
            success: true,
            message: 'Error in fetching tweets'
        })
    }
}