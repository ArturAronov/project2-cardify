import yup from 'yup'
import prisma from '../../../_helpers/prisma.js'
import handleErrors from '../../../_helpers/handle-errors.js'

const collectionSchema = yup.object({
  // Validate that user entered the title
  title: yup.string().required().test({
    message: () => 'Please enter the Collection title',
    test: (value) => value
  }),
  description: yup.string()
})

const controllersApiMyCollectionsCreate = async (req, res) => {
  try {
    const verifiedData = await collectionSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    })

    const newCollection = await prisma.collection.create({
      data: {
        userId: req.session.user.id,
        title: verifiedData.title,
        description: verifiedData.description,
        dateCreated: new Date()
      }
    })

    const currentCollections = await prisma.collection.findMany({
      where: {
        userId: req.session.user.id
      }
    })

    await prisma.user.update({
      where: {
        id: req.session.user.id
      },
      data: {
        totalCollections: currentCollections.length
      }
    })
    return res.json(newCollection)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiMyCollectionsCreate
