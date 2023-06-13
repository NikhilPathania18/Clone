import Tweet from "../../models/tweet.js"
export const myProfileController = async(req,res) => {
    const id = req.user.user._id
    const tweets = await Tweet.find({creator: id}).populate('creator')

    return res.status(200).send({
        success: true,
        message: 'Tweets fetched succesfully',
        tweets
    })
}