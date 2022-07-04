import { Router } from 'express'
import authenticateUser from './_middlewares/authenticate-user.js'

const router = Router()

// API | AUTH
router.post('/api/auth/signup', (await import('./controllers/api/auth/signup.js')).default)
router.post('/api/auth/login', (await import('./controllers/api/auth/login.js')).default)
router.delete('/api/auth/logout', (await import('./controllers/api/auth/logout.js')).default)

// API | COLLECTIONS | AUTH REQUIRED
router.post('/api/my/collections', authenticateUser('json'), (await import('./controllers/api/my/collections/create.js')).default)
router.get('/api/my/collections', authenticateUser('json'), (await import('./controllers/api/my/collections/show.js')).default)
router.put('/api/my/collections/:id', authenticateUser('json'), (await import('./controllers/api/my/collections/edit.js')).default)
router.delete('/api/my/collections/:id', authenticateUser('json'), (await import('./controllers/api/my/collections/delete.js')).default)

// API | FLASHCARDS | AUTH REQUIRED
router.post('/api/collections/:id/flashcards', authenticateUser('json'), (await import('./controllers/api/my/flashcards/create.js')).default)
router.get('/api/collections/:id/flashcards', authenticateUser('json'), (await import('./controllers/api/my/flashcards/show.js')).default)
router.put('/api/collections/:collectionId/flashcards/:flashcardId', authenticateUser('json'), (await import('./controllers/api/my/flashcards/edit.js')).default)
// router.delete('/api/collections/:id/flashcards/:id', authenticateUser('json'), (await import('./controllers/api/my/flashcards/delete.js')).default)

// API | MY PROFILE | AUTH REQUIRED
router.get('/api/my/profile', authenticateUser('json'), (await import('./controllers/api/my/profile/show.js')).default)
router.put('/api/my/profile/edit', authenticateUser('json'), (await import('./controllers/api/my/profile/edit.js')).default)

// PAGES | INDEX
router.get('/', (await import('./controllers/pages/show.js')).default)
// PAGES | AUTH
router.get('/auth/login', (await import('./controllers/pages/auth/login.js')).default)
router.get('/auth/signup', (await import('./controllers/pages/auth/signup.js')).default)

// PAGES | PROFILE | AUTH REQUIRED
router.get('/my/profile', authenticateUser('html'), (await import('./controllers/pages/my/profile/show.js')).default)
router.get('/my/profile/edit', authenticateUser('html'), (await import('./controllers/pages/my/profile/edit.js')).default)

// PAGES | COLLECTIONS | AUTH REQUIRED
router.get('/my/collections', authenticateUser('html'), (await import('./controllers/pages/my/collections/show.js')).default)
router.get('/my/collections/new', authenticateUser('html'), (await import('./controllers/pages/my/collections/create.js')).default)
router.get('/my/collections/:id/edit', authenticateUser('html'), (await import('./controllers/pages/my/collections/edit.js')).default)

// PAGES | FLASHCARDS | AUTH REQUIRED
router.get('/my/collections/:id/flashcards', authenticateUser('html'), (await import('./controllers/pages/my/flashcards/show.js')).default)
router.get('/my/collections/:id/new', authenticateUser('html'), (await import('./controllers/pages/my/flashcards/create.js')).default)
router.get('/my/collections/:id/flashcards/:id', authenticateUser('html'), (await import('./controllers/pages/my/flashcards/edit.js')).default)

// PAGES | PLAY | AUTH REQUIRED
router.get('/my/collection/:id/play', authenticateUser('html'), (await import('./controllers/pages/my/collections/play.js')).default)
router.get('/my/play', authenticateUser('html'), (await import('./controllers/pages/my/play.js')).default)

// PAGES | PAGE NOT FOUND
router.use((await import('./controllers/pages/not-found.js')).default)

export default router
