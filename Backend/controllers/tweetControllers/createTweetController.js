import Tweet from "../../models/tweet.js";

export const createTweetController =async(req,res)=>{
    const { content, tags} = req.body;

    const creator = req.user.user._id;
    if(!content)    return res.status(404).send({
        success: false,
        message: 'Tweet cannot be empty'
    })
    
    await new Tweet({
        creator,
        content,
        tags
    }).save();

    return res.status(200).send({
        success: true,
        message: 'Tweet Created'
    })

}