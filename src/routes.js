import { Router } from 'express'

const router = Router()

router.get('/', (await import('./controllers/pages/auth/login.js')).default)

export default router
