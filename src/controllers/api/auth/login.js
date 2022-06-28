import yup from 'yup'
import passport from 'passport'
import LocalStrategy from 'passport-local'
import bcrypt from 'bcrypt'
import _ from 'lodash'
import handleErrors from '../../_helpers/handle-errors.js'
import prisma from '../../_helpers/prisma.js'

// Is it still necessary to validate the input if the input will be validated with the database regardless?
const loginSchema = yup.object({
  // Validate that user enters email address
  email: yup.string().email().required(),

  // Validate that user enters the password
  password: yup.string().min(6).required()
})

const authenticate = (req, res, next) => {
  // What is happening here?
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false
  }, async (email, password, done) => {
    try {
      // Validate if the email exists in the database and return the user data
      const user = await prisma.user.findFirst({ where: { email } })

      // Should there be no such email, return the following error message
      if (!user) return done(null, false, { email: 'Email Not Found' })

      // Should the password hash not match with the database, return the following error message
      if (!await bcrypt.compare(password, user.passwordHash)) return done(null, false, { password: 'Incorrect Password' })

      // Should the email and password match, return the user without the password hash
      return done(null, _.omit(user, ['passwordHash']))
    } catch (err) {
      return done(err)
    }
  })).authenticate('local', async (err, user, info) => {
    // Should there be issus retrieving user data from database, return 500 Internal Server Error
    if (err) return res.status(500).end(err.toString())

    // Should there be issues with the validation, return 401 Unauthorized, and the error message
    if (!user) return res.status(401).json(info)

    // On user validation, store the credentials in the cookies
    req.session.user = { id: user.id }
    await req.session.save()

    return res.status(200).json(user)

    // What's happening here????
  })(req, res, next)
}

const controllersApiAuthLogin = async (req, res, next) => {
  try {
    const { body } = req
    await loginSchema.validate(body, { abortEarly: false, stripUnknown: true })
    return authenticate(req, res, next)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiAuthLogin
