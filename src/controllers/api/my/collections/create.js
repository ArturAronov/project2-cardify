import prisma from '../../../_helpers/prisma.js'

const controllersApiMyCollectionsCreate = async (req, res) => {
  try {
    const newCollection = await prisma.collection.create({
      data: {
        title: req.body.title,
        userId: req.session.user.id
      }
    })

    // return res.send(newCollection)

    return res.json(newCollection)
  } catch (error) {
    return res.send(error.message)
  }
}

export default controllersApiMyCollectionsCreate
