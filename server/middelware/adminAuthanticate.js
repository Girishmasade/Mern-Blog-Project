import jwt from 'jsonwebtoken'

export const adminAuthanticate = async (req, res, next) => {
    try {
        
        const token = req.cookies.access_token
       
        if (!token) {
            return next(403, 'Unauthorized User')
        }

        const decodeToken = jwt.verify(token, process.env.JWT_SECRET)
       if (decodeToken.role === 'admin') {
        req.user = decodeToken
        next()
       } else {
        next(403, 'Unauthorized User')
       }
   
    } catch (error) {
        next(500, error.message)
    }
}