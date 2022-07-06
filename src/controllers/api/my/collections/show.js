import prisma from '../../../_helpers/prisma.js'

const controllersApiMyCollectionsShow = async (req, res) => {
  try {
    const getCollection = await prisma.collection.findMany({
      where: {
        userId: req.session.user.id
      },
      include: {
        _count: {
          select: {
            Card: true
          }
        }
      },
      orderBy: {
        id: 'asc'
      },
      rejectOnNotFound: true
    })

    return res.status(201).json(getCollection)
  } catch (error) {
    return res.send(error.message)
  }
}

export default controllersApiMyCollectionsShow
