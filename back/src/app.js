import express from 'express';
import alunoRoutes from './routes/alunoRoutes.js';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());
app.use('/api', alunoRoutes);

// Adicione esta rota raiz
app.get('/', (req, res) => {
  res.send('API Aluno is running');
});

app.put('/api/alunos/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const aluno = req.body;

    // Validate the data
    if (!aluno.nome || !aluno.idade || !aluno.matricula) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Update the database record
    const updatedAluno = await AlunoService.updateAluno(id, aluno);
    if (!updatedAluno) {
      return res.status(404).json({ error: 'Aluno not found' });
    }

    res.status(200).json({ message: 'Aluno updated successfully', aluno: updatedAluno });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;