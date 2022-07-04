import yup from 'yup'
import prisma from '../../../_helpers/prisma.js'
import handleErrors from '../../../_helpers/handle-errors.js'

const editSchema = yup.object({
  question: yup.string(),
  answer: yup.string()
})

const controllersApiMyFlashcardsEdit = async (req, res) => {
  try {
    // const collectionParam = await parseInt(req.params.collectionId)
    const flashcardId = await parseInt(req.params.flashcardId)

    const verifiedEditSchema = await editSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    })

    const currentSchema = await prisma.card.findUnique({
      where: {
        id: flashcardId
      }
    })

    const editCollection = await prisma.card.update({
      where: {
        id: flashcardId
      },
      data: {
        question: verifiedEditSchema.question || currentSchema.question,
        answer: verifiedEditSchema.answer || currentSchema.answer,
        dateUpdated: new Date()
      }
    })

    return res.status(201).json(editCollection)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiMyFlashcardsEdit
