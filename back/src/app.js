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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;