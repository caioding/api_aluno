import AlunoService from '../services/alunoService.js';

class AlunoController {
  async getAll(_req, res) {
    try {
      const alunos = await AlunoService.getAllAlunos();
      res.json(alunos);
    } catch (error) {
      console.error(`Error getAll aluno: ${error.message}`); // Log the error
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
      console.error(`Error getById aluno: ${error.message}`); // Log the error
      res.status(500).json({ error: `Error fetching aluno by ID: ${error.message}` });
    }
  }

  async getByMatricula(req, res) { // Novo método
    try {
      const aluno = await AlunoService.getAlunoByMatricula(req.params.matricula);
      if (!aluno) {
        return res.status(404).json({ error: 'Aluno not found' });
      }
      res.json(aluno);
    } catch (error) {
      console.error(`Error getByMatricula aluno: ${error.message}`); // Log the error
      res.status(500).json({ error: `Error fetching aluno by matricula: ${error.message}` });
    }
  }

  async create(req, res) {
    try {
      const aluno = await AlunoService.createAluno(req.body);
      res.status(201).json(aluno);
    } catch (error) {
      console.error(`Error create aluno: ${error.message}`); // Log the error
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
      console.error(`Error updating aluno: ${error.message}`); // Log the error
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
      console.error(`Error delete aluno: ${error.message}`); // Log the error
      res.status(500).json({ error: error.message });
    }
  }
}

export default new AlunoController();