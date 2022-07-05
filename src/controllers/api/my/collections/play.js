import prisma from '../../../_helpers/prisma.js'
import handleErrors from '../../../_helpers/handle-errors.js'

const controllersApiMyCollectionsPlay = async (req, res) => {
  try {
    const {
      value
    } = req.body

    const flashcardId = await parseInt(req.params.id)

    const getCurrentValue = await prisma.card.findUnique({
      where: {
        id: flashcardId
      },
      select: {
        [value]: true
      }
    })

    const newValue = await getCurrentValue[value] + 1

    const updateCollection = await prisma.card.update({
      where: {
        id: flashcardId
      },
      data: {
        [value]: newValue
      }
    })

    return res.status(201).json(updateCollection)
  } catch (err) {
    handleErrors(res, err)
  }
}

export default controllersApiMyCollectionsPlay
