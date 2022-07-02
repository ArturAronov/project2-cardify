import yup from 'yup'
import moment from 'moment'
import prisma from '../../../_helpers/prisma.js'
import handleErrors from '../../../_helpers/handle-errors.js'

const editSchema = yup.object({
  title: yup.string(),
  description: yup.string()
})

const controllersApiMyCollectionsEdit = async (req, res) => {
  try {
    const paramId = await parseInt(req.params.id)

    const verifiedEditSchema = await editSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    })

    const currentSchema = await prisma.collection.findUnique({
      where: {
        id: paramId
      }
    })

    const editCollection = await prisma.collection.update({
      where: {
        id: paramId
      },
      data: {
        title: verifiedEditSchema.title || currentSchema.title,
        description: verifiedEditSchema.description || currentSchema.description,
        dateUpdated: new Date()
      }
    })

    return res.status(201).json(editCollection)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiMyCollectionsEdit
