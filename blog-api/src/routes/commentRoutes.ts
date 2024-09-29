import { Router } from 'express';
import { DataSource } from 'typeorm';
import { Comment } from '../entities/Comment';

const router = Router();

export default (dataSource: DataSource) => {
  const commentRepository = dataSource.getRepository(Comment);

  router.post('/', async (req, res) => {
    try {
      const comment = commentRepository.create(req.body);
      await commentRepository.save(comment);
      res.status(201).json(comment);
    } catch (error) {
      res.status(500).json({ message: 'Error creating comment', error });
    }
  });

  return router;
};
