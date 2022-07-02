import yup from 'yup'
import bcrypt from 'bcrypt'
import _ from 'lodash'

import prisma from '../../_helpers/prisma.js'
import handleErrors from '../../_helpers/handle-errors.js'
import uploadFileAsync from '../../_helpers/upload-file.js'

// Validate the user input
const signupSchema = yup.object({

  // Validate that the string is an email, and that email does not already exist
  email: yup.string().email().required().test({

    // Fallback error message
    message: () => 'Email already exists',
    test: async (value) => {
      try {
        // Use Prisma to validate if the email is already in the database, return a boolean
        await prisma.user.findUnique({
          where: {
            email: value
          },
          rejectOnNotFound: true
        })

        return false
      } catch (err) {
        return true
      }
    }
  }),

  // Validate that name is entered
  name: yup.string().required().test({

    // Fallback error message if the name is not entered by the user
    message: () => 'Please enter your name',
    test: (value) => value

  }),

  // Validate that password is a string, at least 6 characters long, and required
  password: yup.string().min(6).required(),

  // Validate that password and passwordConfirmation are matching
  passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required(),
  avatar: yup.mixed()
})

const controllersApiAuthSignup = async (req, res) => {
  try {
    const verifiedData = await signupSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    })

    await uploadFileAsync(verifiedData, req)

    const newUser = await prisma.user.create({
      data: {
        name: verifiedData.name,
        email: verifiedData.email,
        avatar: verifiedData.avatar || 'https://lab-restful-api.s3.ap-northeast-2.amazonaws.com/profile.jpeg',
        passwordHash: await bcrypt.hash(verifiedData.password, 10),
        dateCreated: new Date()
      }
    })

    // Assign user id to the cookies session
    req.session.user = {
      id: newUser.id
    }

    await req.session.save()

    return res.status(201).json(_.omit(newUser, ['passwordHash']))
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiAuthSignup
