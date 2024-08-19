import AlunoService from '../services/alunoService.js';

class AlunoController {
  async getAll(_req, res) {
    try {
      const alunos = await AlunoService.getAllAlunos();
      res.json(alunos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const aluno = await AlunoService.getAlunoById(req.params.id);
      if (!aluno) {
        return res.status(404).json({ error: 'Aluno not found' });
      }
      res.json(aluno);
    } catch (error) {
      res.status(500).json({ error: `Error fetching aluno by ID: ${error.message}` });
    }
  }

  async create(req, res) {
    try {
      const aluno = await AlunoService.createAluno(req.body);
      res.status(201).json(aluno);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const aluno = await AlunoService.updateAluno(req.params.id, req.body);
      if (!aluno) {
        return res.status(404).json({ error: 'Aluno not found' });
      }
      res.json(aluno);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const aluno = await AlunoService.deleteAluno(req.params.id);
      if (!aluno) {
        return res.status(404).json({ error: 'Aluno not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new AlunoController();