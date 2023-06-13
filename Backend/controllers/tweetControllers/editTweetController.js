 import Tweet from "../../models/tweet.js";

export const editTweetController = async(req,res) => {
    const tweet = req.body
    const _id = tweet._id
    const existingTweet = await Tweet.findById(_id)

    if(!existingTweet)  return res.status(404).send({
        success: false,
        message: 'Tweet Not Found'
    })
 
    existingTweet.content = tweet.content;
    existingTweet.tags = tweet.tags;

    await existingTweet.save();

    return res.status(200).send({
        success: true,
        message: 'Tweet Updated Successfully'
    })
}