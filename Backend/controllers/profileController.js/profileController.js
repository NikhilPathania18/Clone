import Tweet from "../../models/tweet.js";

export const profileController = async(req,res) => {

    const profileId = req.params.id;
    try {
        const tweets = await Tweet.find({creator:profileId}).populate('creator')

        return res.status(200).send({
            success: true,
            message: 'Tweets fetched successfully',
            tweets
        })

    } catch (error) {
        console.log(error.message.bgRed.white)
        res.status(200).send({
            success: false,
            message: 'Failed to fetch tweets'
        })
    }
    
}