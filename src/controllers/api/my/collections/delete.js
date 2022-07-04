import prisma from '../../../_helpers/prisma.js'
import handleErrors from '../../../_helpers/handle-errors.js'

const controllersApiMyCollectionsDelete = async (req, res) => {
  try {
    const paramId = await parseInt(req.params.id)

    const deleteCollection = await prisma.collection.delete({
      where: {
        id: paramId
      }
    })

    const flashcardCount = await prisma.card.count({
      where: {
        userId: req.session.user.id
      }
    })

    const collectionCount = await prisma.collection.count({
      where: {
        userId: req.session.user.id
      }
    })

    await prisma.user.update({
      where: {
        id: req.session.user.id
      },
      data: {
        totalFlashcards: flashcardCount,
        totalCollections: collectionCount
      }
    })

    return res.status(201).json(deleteCollection)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiMyCollectionsDelete
