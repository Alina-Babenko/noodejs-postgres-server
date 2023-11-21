import { MigrationInterface, QueryRunner } from "typeorm"
import {AppDataSource} from "../data-source";
import {User} from "../entities/User";
import {Roles} from "../../constants/db";

export class SeedAdminUser1700056744182 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
	  const repo = AppDataSource.getRepository(User);
	  const userData = new User();
	  userData.email = "admin@postie.local";
	  userData.name = "Admin user";
	  userData.role = Roles.ADMIN;
	  userData.password = "password123";

	  const user = repo.create(userData);
	  await repo.save(user);
	  console.info("Done....");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
	  const repo = AppDataSource.getRepository(User);

	  const user = await repo.findOneBy({
		email: "admin@postie.local",
	  });
	  if (user) {
		await repo.remove(user);
	  }
    }

}
