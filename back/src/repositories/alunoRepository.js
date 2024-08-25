import prisma from '../config/database.js';

class AlunoRepository {
  async findAll() {
    return await prisma.aluno.findMany();
  }

  async findById(id) {
    return await prisma.aluno.findUnique({
      where: { id: Number(id) },
    })
  }

  async findByMatricula(matricula) {
    try {
      const aluno = await prisma.aluno.findUnique({
        where: { matricula: matricula },
      });
      return aluno;
    } catch (error) {
      console.error(`Error fetching aluno by matricula: ${error.message}`); // Log the error
      throw new Error(`Error fetching aluno by matricula: ${error.message}`);
    }
  }

  async create(data) {
    return await prisma.aluno.create({
      data,
    });
  }

  async update(id, data) {
    try {
      const aluno = await prisma.aluno.update({
        where: { id: Number(id) },
        data,
      });
      return aluno;
    } catch (error) {
      console.error(`Error updating aluno in repository: ${error.message}`); // Log the error
      throw new Error(`Error updating aluno in repository: ${error.message}`);
    }
  }

  async delete(id) {
    return await prisma.aluno.delete({
      where: { id: Number(id) },
    });
  }
}

export default AlunoRepository;