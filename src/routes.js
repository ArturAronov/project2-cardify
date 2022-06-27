import { Router } from 'express'

const router = Router()

router.get('/', (await import('./controllers/pages/auth/login.js')).default)
router.get('/auth/signup', (await import('./controllers/pages/auth/signup.js')).default)
router.get('/my/profile', (await import('./controllers/pages/my/profile/show.js')).default)
router.get('/my/profile/edit', (await import('./controllers/pages/my/profile/edit.js')).default)
router.get('/my/collections', (await import('./controllers/pages/my/collections/show.js')).default)
router.get('/my/collections/new', (await import('./controllers/pages/my/collections/new.js')).default)
router.get('/my/collections/:id/edit', (await import('./controllers/pages/my/collections/edit.js')).default)
router.get('/my/collections/:id/flashcards', (await import('./controllers/pages/my/flashcards/show.js')).default)
router.get('/my/collections/:id/new', (await import('./controllers/pages/my/flashcards/new.js')).default)
router.get('/flashcards/:id/edit', (await import('./controllers/pages/my/flashcards/edit.js')).default)
router.get('/my/collection:id/play', (await import('./controllers/pages/my/collections/play.js')).default)
router.get('/my/play', (await import('./controllers/pages/my/play.js')).default)

export default router
