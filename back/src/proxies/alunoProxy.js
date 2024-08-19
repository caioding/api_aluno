import AlunoService from '../services/alunoService.js';

class AlunoProxy {
  async getAllAlunos() {
    try {
      return await AlunoService.getAllAlunos();
    } catch (error) {
      throw new Error(`Error fetching all alunos: ${error.message}`);
    }
  }

  async getAlunoById(id) {
    try {
      return await AlunoService.getAlunoById(id);
    } catch (error) {
      throw new Error(`Error fetching aluno by ID: ${error.message}`);
    }
  }

  async createAluno(data) {
    try {
      return await AlunoService.createAluno(data);
    } catch (error) {
      throw new Error(`Error creating aluno: ${error.message}`);
    }
  }

  async updateAluno(id, data) {
    try {
      return await AlunoService.updateAluno(id, data);
    } catch (error) {
      throw new Error(`Error updating aluno: ${error.message}`);
    }
  }

  async deleteAluno(id) {
    try {
      return await AlunoService.deleteAluno(id);
    } catch (error) {
      throw new Error(`Error deleting aluno: ${error.message}`);
    }
  }
}

export default new AlunoProxy();