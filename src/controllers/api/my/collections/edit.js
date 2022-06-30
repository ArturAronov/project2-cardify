import yup from 'yup'
import prisma from '../../../_helpers/prisma.js'
import handleErrors from '../../../_helpers/handle-errors.js'

const controllersApiMyCollectionsEdit = async (req, res) => {
  try {
    const paramId = await parseInt(req.params.id)
    const data = await prisma.collection.findUnique({
      where: {
        id: paramId
      }
    })

    return res.json(data)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiMyCollectionsEdit
