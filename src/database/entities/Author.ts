import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Post } from "./Post";
import {DBTable} from "../../constants/db";

@Entity(DBTable.AUTHORS)
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  email: string;

  @OneToMany((type) => Post, (post) => post.author)
  posts: Post[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  toPayload(): Author {
	return {
	  id: this.id,
	  name: this.name,
	  email: this.email,
	  createdAt: this.createdAt,
	  updatedAt: this.updatedAt,
	} as Author;
  }
}
