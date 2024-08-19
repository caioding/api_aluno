import express from 'express';
import AlunoController from '../controllers/alunoController.js';

const router = express.Router();

router.get('/alunos', AlunoController.getAll);
router.get('/alunos/:id', AlunoController.getById);
router.post('/alunos', AlunoController.create);
router.put('/alunos/:id', AlunoController.update);
router.delete('/alunos/:id', AlunoController.delete);

export default router;