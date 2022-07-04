import prisma from '../../../_helpers/prisma.js'
import handleErrors from '../../../_helpers/handle-errors.js'

const controllersApiMyFlashcardsDelete = async (req, res) => {
  try {
    const flashcardId = await parseInt(req.params.flashcardId)
    const collectionId = await parseInt(req.params.collectionId)

    const user = await prisma.collection.findUnique({
      where: {
        id: collectionId
      }
    })

    const deleteCollection = await prisma.card.delete({
      where: {
        id: flashcardId
      }
    })

    const flashcardCount = await prisma.card.findMany()

    await prisma.user.update({
      where: {
        id: user.userId
      },
      data: {
        totalFlashcards: flashcardCount.length
      }
    })

    return res.status(201).json(deleteCollection)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiMyFlashcardsDelete
