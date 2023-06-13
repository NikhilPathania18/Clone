import Tweet from "../../models/tweet.js";

export const deleteTweetController = async(req,res) => {
    const id = req.params.id;
    try {
        await Tweet.findByIdAndRemove(id)

        return res.status(200).send({
            success: true,
            message: 'Tweet deleted successfully'
        })
    } catch (error) {
        return res.status(200).send({
            success: false,
            message: 'Could not delete the tweet'
        })
    }
}