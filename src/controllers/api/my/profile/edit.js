import moment from 'moment'
import yup from 'yup'
import bcrypt from 'bcrypt'
import _ from 'lodash'

import prisma from '../../../_helpers/prisma.js'
import handleErrors from '../../../_helpers/handle-errors.js'
import uploadFileAsync from '../../../_helpers/upload-file.js'

const editSchema = yup.object({
  name: yup.string(),
  email: yup.string().email().test({

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
  password: yup.string().test(
    'empty-or-6-characters-check',
    'password must be at least 6 characters',
    (password) => !password || password.length >= 6
  ),
  passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
  avatar: yup.mixed()
})

const controllersApiMyProfileEdit = async (req, res) => {
  try {
    // Validate new data entered by user
    const verifiedEditData = await editSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    })

    await uploadFileAsync(verifiedEditData, req)

    // Retrieve existing user data from the database
    const dbData = await prisma.user.findUnique({
      where: {
        // Retrieve user id from the session id cookie
        id: req.session.user.id
      }
    })

    // Update existing user with new values
    const editUser = await prisma.user.update({
      // Retrieve user id from the session id cookie
      where: {
        id: req.session.user.id
      },
      data: {
        // if the verified user input is empty, return default database value
        name: verifiedEditData.name || dbData.name,
        email: verifiedEditData.email || dbData.email,
        avatar: verifiedEditData.avatar || dbData.avatar,
        passwordHash: verifiedEditData.password ? await bcrypt.hash(verifiedEditData.password, 10) : dbData.passwordHash,
        dateUpdated: new Date()
      }
    })

    // Re-assign user cookie to the id from the updated schema
    req.session.user = {
      id: editUser.id
    }

    // Save the session
    await req.session.save()

    // Set status to 201 and omit the password hash
    return res.status(201).json(_.omit(editUser, ['passwordHash']))
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiMyProfileEdit
