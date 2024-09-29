import 'reflect-metadata';
import { DataSource } from 'typeorm';
import express from 'express';
import cors from 'cors';
import postRoutes from './routes/postRoutes';
import commentRoutes from './routes/commentRoutes'; // Importa minhas rotas de comentários
import { Post } from './entities/Post';
import { Comment } from './entities/Comment';


const app = express();
app.use(cors());
app.use(express.json());

const dataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'Gui16dve*02',
  database: 'blog-db',
  entities: [Post, Comment],
  synchronize: true,
});

dataSource.initialize()
  .then(() => {
    console.log('Database connected');

    // rotas
    app.use('/posts', postRoutes(dataSource));
    app.use('/comments', commentRoutes(dataSource)); // Passa o dataSource para as rotas de comentários

    // Iniciando o servidor
    app.listen(3000, () => {
      console.log('Server running on port 3000');
    });
  })
  .catch(error => {
    console.error('Database connection error:', error);
  });
