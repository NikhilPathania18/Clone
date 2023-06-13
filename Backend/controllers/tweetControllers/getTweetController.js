import Tweet from "../../models/tweet.js";

export const getTweetDetails = async(req,res) => {
    const tweetId = req.params.id;
    const tweet = await Tweet.findById(tweetId)

    let obj

    if(tweet)   return res.status(200).send({
        content: tweet.content,
        tags: tweet.tags?tweet.tags:''
    })
    else    return res.status(200).send({
        message: 'No tweet found'
    })
}