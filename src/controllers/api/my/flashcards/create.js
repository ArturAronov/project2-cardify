import yup from 'yup'
import prisma from '../../../_helpers/prisma.js'
import handleErrors from '../../../_helpers/handle-errors.js'

const flashcardSchema = yup.object({
  question: yup.string().required().test({
    message: () => 'Please enter the question',
    test: (value) => value
  }),
  answer: yup.string().required().test({
    message: () => 'Please enter the answer',
    test: (value) => value
  })
})

const controllersApiMyFlashcardsCreate = async (req, res) => {
  try {
    const paramId = await parseInt(req.params.id)

    const verifiedData = await flashcardSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    })

    const collection = await prisma.collection.findUnique({
      where: {
        id: paramId
      }
    })

    const newFlashcard = await prisma.card.create({
      data: {
        question: verifiedData.question,
        answer: verifiedData.answer,
        userId: collection.userId,
        collectionId: paramId,
        dateCreated: new Date()
      }
    })

    const flashcardCount = await prisma.card.findMany({
      where: {
        userId: req.session.user.id
      }
    })

    await prisma.user.update({
      where: {
        id: req.session.user.id
      },
      data: {
        totalFlashcards: flashcardCount.length
      }
    })

    return res.json(newFlashcard)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiMyFlashcardsCreate
