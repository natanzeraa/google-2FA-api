import jwt from 'jsonwebtoken'

function validateAuthToken(req, res, next) {
  const authHeader = req.headers['authorization']
  if (!authHeader) return res.status(401).json({ status: 401, message: 'Token missing' })

  const token = authHeader.split(' ')[1]
  if (!token) return res.status(401).json({ status: 401, message: 'Token malformed' })

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ status: 401, message: 'Unauthorized' })
    req.customer = decoded
    next()
  })
}

export default validateAuthToken
