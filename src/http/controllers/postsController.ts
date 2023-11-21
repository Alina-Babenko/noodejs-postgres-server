import { validateOrReject } from "class-validator";
import { Request, Response } from "express";
import { AppDataSource } from "../../database/data-source";
import { Paginator } from "../../database/Paginator";
import { ResponseUtil } from "../../utils/Response";
import { Post } from "../../database/entities/Post";
import {CreatePostDTO, UpdatePostDTO} from "../dto/postDto";

export class PostsController {
  async get(req: Request, res: Response) {
	const builder = await AppDataSource.getRepository(Post)
	  .createQueryBuilder("post")
	  .leftJoinAndSelect("post.author", "author")
	  .orderBy("post.id", "DESC");
	const { records: posts, paginationInfo } = await Paginator.paginate(builder, req);
	const postData = posts.map((post: Post) => {
	  return post.toPayload();
	});

	return ResponseUtil.sendResponse(res, "Fetched posts successfully", postData, paginationInfo);
  }

  async getPost(req: Request, res: Response): Promise<Response> {
	const { id } = req.params;
	const post = await AppDataSource.getRepository(Post).findOneByOrFail({
	  id: Number(id),
	});

	return ResponseUtil.sendResponse<Partial<Post>>(res, "Fetch post successfully", post.toPayload());
  }

  async create(req: Request, res: Response): Promise<Response> {
	const postData = req.body;
	const dto = new CreatePostDTO();
	Object.assign(dto, postData);
	dto.price = parseInt(postData.price);
	dto.authorId = parseInt(postData.authorId);

	await validateOrReject(dto);

	const repo = AppDataSource.getRepository(Post);
	const post = repo.create(postData);
	await repo.save(post);

	return ResponseUtil.sendResponse(res, "Successfully created new post", post, null);
  }

  async update(req: Request, res: Response): Promise<Response> {
	const { id } = req.params;
	const postData = req.body;

	const dto = new UpdatePostDTO();
	Object.assign(dto, postData);
	dto.id = parseInt(id);

	await validateOrReject(dto);

	const repo = AppDataSource.getRepository(Post);

	const post = await repo.findOneByOrFail({
	  id: Number(id),
	});

	repo.merge(post, postData);
	await repo.save(post);
	return ResponseUtil.sendResponse(res, "Successfully updated the post", post.toPayload());
  }

  async delete(req: Request, res: Response): Promise<Response> {
	const { id } = req.params;
	const repo = AppDataSource.getRepository(Post);
	const post = await repo.findOneByOrFail({
	  id: Number(id),
	});
	await repo.remove(post);
	return ResponseUtil.sendResponse(res, "Successfully deleted the post", null);
  }
}
