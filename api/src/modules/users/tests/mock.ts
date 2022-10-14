import { User } from '../entities/user.entity';
import { injectMockRepository } from '../../../utils/mocks/injectMockRepository';

export const userEntities = [
    new User({
        id: 1,
        avatar: 'http://localhost/api/assets/fake.png',
        displayName: 'User 1',
        email: 'user1@gmail.com',
        password: '123'
    }),
    new User({
        id: 2,
        avatar: 'http://localhost/api/assets/fake2.png',
        displayName: 'User 2',
        email: 'user2@gmail.com',
        password: '123'
    }),
];

export const userEntity = userEntities[0]

export const userRepository: any = injectMockRepository<any>(User, userEntities, userEntity)
