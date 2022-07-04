import prisma from '../../../_helpers/prisma.js'
import handleErrors from '../../../_helpers/handle-errors.js'

const controllersApiMyFlashcardsDelete = async (req, res) => {
  try {
    const flashcardId = await parseInt(req.params.flashcardId)

    const deleteCollection = await prisma.card.delete({
      where: {
        id: flashcardId
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

    return res.status(201).json(deleteCollection)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiMyFlashcardsDelete
