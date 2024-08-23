import AlunoRepository from '../repositories/alunoRepository.js';
import AlunoFactory from '../factories/alunoFactory.js';

class AlunoService {
  constructor() {
    this.alunoRepository = new AlunoRepository();
  }

  async getAllAlunos() {
    try {
      const alunos = await this.alunoRepository.findAll();
      return alunos.map(aluno => AlunoFactory.createAlunoDTO(aluno));
    } catch (error) {
      throw new Error(`Error fetching all alunos: ${error.message}`);
    }
  }

  async getAlunoById(id) {
    try {
      const aluno = await this.alunoRepository.findById(id);
      if (!aluno) {
        return null;
      }
      return AlunoFactory.createAlunoDTO(aluno);
    } catch (error) {
      throw new Error(`Error fetching aluno by ID: ${error.message}`);
    }
  }

  async createAluno(data) {
    try {
      const aluno = await this.alunoRepository.create(data);
      return AlunoFactory.createAlunoDTO(aluno);
    } catch (error) {
      throw new Error(`Error creating aluno: ${error.message}`);
    }
  }

  async updateAluno(id, data) {
    try {
      const aluno = await this.alunoRepository.update(id, data);
      if (!aluno) {
        return null;
      }
      return AlunoFactory.createAlunoDTO(aluno);
    } catch (error) {
      throw new Error(`Error updating aluno: ${error.message}`);
    }
  }

  async deleteAluno(id) {
    try {
      const aluno = await this.alunoRepository.delete(id);
      if (!aluno) {
        return null;
      }
      return aluno;
    } catch (error) {
      throw new Error(`Error deleting aluno: ${error.message}`);
    }
  }
}

export default new AlunoService();