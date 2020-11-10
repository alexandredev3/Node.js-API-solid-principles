import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';

class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      password,
      bio
    } = request.body;

    const createUser = container.resolve(CreateUserService);
    
    const user = await createUser.execute({ name, email, password, bio });

    // Este método transforma o objeto de classe em uma nova instância do objeto de classe.
    /**
     * O classToClass vai ler o model de User, ele vai ver o decorator @Exclude(Que vai "excluir" o campo encrypted_password).
     * Então ele vai criar uma nova estancia do model User sem o encrypted_password.
     * E essa estancia vai ser retornada na resposta.
     */
    return response.status(200).json(classToClass(user));
  }
}

export default new UsersController();