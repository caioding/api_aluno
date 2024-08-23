import prisma from '../config/database.js';

class AlunoRepository {
  async findAll() {
    return await prisma.aluno.findMany();
  }

  async findById(id) {
    return await prisma.aluno.findUnique({
      where: { id: Number(id) },
    });
  }

  async create(data) {
    return await prisma.aluno.create({
      data,
    });
  }

  async update(id, data) {
    return await prisma.aluno.update({
      where: { id: Number(id) },
      data,
    });
  }

  async delete(id) {
    return await prisma.aluno.delete({
      where: { id: Number(id) },
    });
  }
}

export default AlunoRepository;