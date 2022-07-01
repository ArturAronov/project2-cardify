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

    return res.status(201).json(deleteCollection)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiMyCollectionsDelete
