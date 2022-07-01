import prisma from '../../../_helpers/prisma.js'

const controllersApiMyFlashcardsShow = async (req, res) => {
  try {
    const paramsVal = parseInt(req.params.id)

    const foundFlashcard = await prisma.card.findMany({
      where: {
        collectionId: paramsVal
      },
      orderBy: {
        id: 'asc'
      },
      rejectOnNotFound: true
    })

    return res.status(201).json(foundFlashcard)
  } catch (error) {
    return res.send(error.message)
  }
}

export default controllersApiMyFlashcardsShow
