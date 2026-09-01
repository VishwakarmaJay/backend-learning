import jwt from 'jsonwebtoken'

export const generateToken = (userId, res) =>{

    const payLoad= {id : userId}
    const token = jwt.sign(payLoad, process.env.jwt_secret, {
        expiresIn : process.env.jwt_expries_in  
    })

    res.cookie( "jwt", token ,{
        httpOnly : true,
        sameSite : "strict",
        maxAge : 1000 * 60 * 60 * 24 * 7
    })

    return token;

}