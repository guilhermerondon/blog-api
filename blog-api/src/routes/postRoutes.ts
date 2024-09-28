import { Router, Request, Response } from 'express';
import { Repository, DataSource } from 'typeorm';
import { Post } from '../entities/Post';
import { body, validationResult } from 'express-validator';

interface CreatePostRequest {
  title: string;
  content: string;
}

const router = Router();

export default (dataSource: DataSource) => {
  const postRepository: Repository<Post> = dataSource.getRepository(Post);

  router.get('/', async (req: Request, res: Response) => {
    try {
      const posts = await postRepository.find({ relations: ['comments'] });
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching posts', error });
    }
  });

  router.post('/', [
    body('title').isString().notEmpty(),
    body('content').isString().notEmpty(),
  ], async (req: Request<{}, {}, CreatePostRequest>, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const post = postRepository.create(req.body);
      await postRepository.save(post);
      res.status(201).json(post);
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ message: 'Error creating post' });
    }
  });

  router.put('/:id', [
    body('title').isString().notEmpty(),
    body('content').isString().notEmpty(),
  ], async (req: Request, res: Response) => {
    const { id } = req.params;
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    try {
      const post = await postRepository.findOneBy({ id: Number(id) });
      
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      // Atualiza os campos desejados
      post.title = req.body.title;
      post.content = req.body.content;
      await postRepository.save(post);
      res.json(post);
    } catch (error) {
      console.error('Error updating post:', error);
      res.status(500).json({ message: 'Error updating post' });
    }
  });
  

  router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const deleteResult = await postRepository.delete(id);
      if (deleteResult.affected === 0) {
         return res.status(404).json({ message: 'Post not found'});   
      }
      res.sendStatus(204);
    } catch (error) {
      console.error('Error deleting post: ', error);
      res.status(500).json({ message: 'Error deleting post'});
    }
  });

  return router;
};
