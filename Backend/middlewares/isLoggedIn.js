import jwt from 'jsonwebtoken'

export const isLoggedIn = async(req,res,next) => {
    try {
        const decode = jwt.verify(req.headers.authorization,process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        return res.status(200).send({
            success: false,
            message: 'Invalid Token'
        })
    }
}