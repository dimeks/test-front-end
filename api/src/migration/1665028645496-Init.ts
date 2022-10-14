import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableIndex,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

const user = {
    displayName: 'Augusto Oliveira',
    avatar: 'https://avatars.githubusercontent.com/u/17063429?v=4',
    email: 'teste@icasei.com.br',
    password: bcrypt.hashSync('mecontrata', 10),
}

export class Init1665028645496 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'avatar',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'displayName',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                        isNullable: false,
                    },
                ],
            }),
            true,
        );

        await queryRunner.createIndex(
            'users',
            new TableIndex({
                name: 'IDX_USER_EMAIL',
                columnNames: ['email'],
            }),
        );


        await queryRunner.query(
            `
                INSERT
                INTO "users" ("displayName", "avatar", "email", "password")
                VALUES('${user.displayName}', '${user.avatar}', '${user.email}', '${user.password}')
            `,
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex('users', 'IDX_USER_EMAIL');
        await queryRunner.dropTable('users', true);
    }

}
