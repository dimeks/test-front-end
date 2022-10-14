import { getRepositoryToken } from '@nestjs/typeorm';

export function injectMockRepository<T>(Entity: any, entities: Array<T>, entity: T) {
    return {
        provide: getRepositoryToken(Entity),
        useValue: {
            findOneOrFail: jest.fn(),
            update: jest.fn(),
            findOne: jest.fn().mockResolvedValueOnce(entity),
            find: jest.fn().mockResolvedValueOnce(entities),
            save: jest.fn().mockResolvedValueOnce(entity),
            create: jest.fn().mockResolvedValueOnce(entity),
            delete: jest.fn(),
            createQueryBuilder: jest.fn(() => ({
                delete: jest.fn().mockReturnThis(),
                innerJoinAndSelect: jest.fn().mockReturnThis(),
                innerJoin: jest.fn().mockReturnThis(),
                leftJoinAndSelect: jest.fn().mockReturnThis(),
                leftJoin: jest.fn().mockReturnThis(),
                from: jest.fn().mockReturnThis(),
                addSelect: jest.fn().mockReturnThis(),
                where: jest.fn().mockReturnThis(),
                orWhere: jest.fn().mockReturnThis(),
                andWhere: jest.fn().mockReturnThis(),
                execute: jest.fn().mockReturnThis(),
                orderBy: jest.fn().mockReturnThis(),
                take: jest.fn().mockReturnThis(),
                skip: jest.fn().mockReturnThis(),
                getOne: jest.fn(),
                getMany: jest.fn(),
                getManyAndCount: jest.fn(),
            })),
        },
    }

} 