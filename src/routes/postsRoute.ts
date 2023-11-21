import express from "express";
import { ErrorHandler } from "../http/middlewares/ErrorHandler";
import { PostsController } from "../http/controllers/postsController";
import { AdminMiddleware } from "../http/middlewares/AdminMiddleware";
import { AuthMiddleware } from "../http/middlewares/AuthMiddleware";

const postsController = new PostsController();

const router = express.Router();
router.get("/", ErrorHandler.catchErrors(postsController.get));
router.get("/:id", ErrorHandler.catchErrors(postsController.getPost));
router.post(
  "/",
  ErrorHandler.catchErrors(AuthMiddleware.authenticate),
  ErrorHandler.catchErrors(AdminMiddleware.check),
  ErrorHandler.catchErrors(postsController.create)
);
router.put(
  "/:id",
  ErrorHandler.catchErrors(AuthMiddleware.authenticate),
  ErrorHandler.catchErrors(AdminMiddleware.check),
  ErrorHandler.catchErrors(postsController.update)
);
router.delete(
  "/:id",
  ErrorHandler.catchErrors(AuthMiddleware.authenticate),
  ErrorHandler.catchErrors(AdminMiddleware.check),
  ErrorHandler.catchErrors(postsController.delete)
);

export default router;
