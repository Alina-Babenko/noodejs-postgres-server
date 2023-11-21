import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Author } from "./Author";
import {DBTable} from "../../constants/db";

@Entity(DBTable.POSTS)
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @ManyToOne((type) => Author, (author) => author.posts, { eager: true })
  @JoinColumn({ name: "authorId" })
  author: Author;

  @Column({})
  authorId: number;

  @Column()
  price: number;

  @Column()
  category: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  toPayload(): Partial<Post> {
	return {
	  id: this.id,
	  title: this.title,
	  description: this.description,
	  author: this.author.toPayload(),
	  price: this.price / 100,
	  category: this.category,
	  createdAt: this.createdAt,
	  updatedAt: this.updatedAt,
	};
  }
}
