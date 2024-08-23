import AlunoDTO from '../dtos/alunoDto.js';

class AlunoFactory {
  static createAlunoDTO(aluno) {
    return new AlunoDTO(aluno);
  }
}

export default AlunoFactory;