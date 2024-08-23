import AlunoService from '../services/alunoService.js';
import AlunoRepository from '../repositories/alunoRepository.js';

class DependencyInjector {
  constructor() {
    this.services = {
      alunoService: new AlunoService(new AlunoRepository()),
    };
  }

  get(serviceName) {
    return this.services[serviceName];
  }
}

export default new DependencyInjector();