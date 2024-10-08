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
      console.error(`Error getAllAlunos aluno: ${error.message}`); // Log the error
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
      console.error(`Error getAlunoById aluno: ${error.message}`); // Log the error
      throw new Error(`Error getAlunoById aluno by ID: ${error.message}`);
    }
  }

  async getAlunoByMatricula(matricula) { // Novo método
    try {
      const aluno = await this.alunoRepository.findByMatricula(matricula);
      if (!aluno) {
        return null;
      }
      return AlunoFactory.createAlunoDTO(aluno);
    } catch (error) {
      console.error(`Error getAlunoByMatricula aluno: ${error.message}`); // Log the error
      throw new Error(`Error getAlunoByMatricula aluno by matricula: ${error.message}`);
    }
  }

  async createAluno(data) {
    try {
      if (data.idade) {
        data.idade = parseInt(data.idade, 10);
      }
      const existingAluno = await this.alunoRepository.findByMatricula(data.matricula);
      if (existingAluno) {
        throw new Error('Matrícula já existe');
      }
      const aluno = await this.alunoRepository.create(data);
      return AlunoFactory.createAlunoDTO(aluno);
    } catch (error) {
      console.error(`Error createAluno aluno: ${error.message}`); // Log the error
      throw new Error(`Error createAluno aluno: ${error.message}`);
    }
  }

  async updateAluno(id, data) {
    try {
      // Ensure idade is an integer
      if (data.idade) {
        data.idade = parseInt(data.idade, 10);
      }
      const aluno = await this.alunoRepository.update(id, data);
      if (!aluno) {
        return null;
      }
      return AlunoFactory.createAlunoDTO(aluno);
    } catch (error) {
      console.error(`Error updating aluno: ${error.message}`); // Log the error
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
      console.error(`Error deleteAluno aluno: ${error.message}`); // Log the error
      throw new Error(`Error deleteAluno aluno: ${error.message}`);
    }
  }
}

export default new AlunoService();