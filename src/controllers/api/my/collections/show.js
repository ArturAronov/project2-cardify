import prisma from '../../../_helpers/prisma.js'

const controllersApiMyCollectionsShow = async (req, res) => {
  try {
    const foundCollection = await prisma.collection.findMany({
      where: {
        userId: req.session.user.id
      },
      orderBy: {
        id: 'asc'
      },
      rejectOnNotFound: true
    })

    return res.status(201).json(foundCollection)
  } catch (error) {
    return res.send(error.message)
  }
}

export default controllersApiMyCollectionsShow
