import { Router } from 'express';
import { CommentsController } from '../../controllers';
import middlewares from '../../middlewares';

const router = new Router();

const { validate, Authenticate } = middlewares;
const { verifyToken } = Authenticate;

const {
  addComment, getCommentById, deleteCommentById, updateCommentById, getAllCommentsOnRequest
} = CommentsController;

router.post('/requests/:requestId/comments', verifyToken, validate('addComment'), addComment);
router.get('/comments/:commentId', verifyToken, getCommentById);
router.put('/comments/:commentId', verifyToken, validate('addComment'), updateCommentById);
router.delete('/comments/:commentId', verifyToken, deleteCommentById);
router.get('/requests/:requestId/comments', verifyToken, getAllCommentsOnRequest);


export default router;
