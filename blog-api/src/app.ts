import 'reflect-metadata';
import { DataSource } from 'typeorm';
import express from 'express';
import cors from 'cors';
import postRoutes from './routes/postRoutes';
import commentRoutes from './routes/commentRoutes'; // Importa suas rotas de comentários
import { Post } from './entities/Post'; // Adicione esta linha
import { Comment } from './entities/Comment'; // Certifique-se de que isso também está correto


const app = express();
app.use(cors());
app.use(express.json());

const dataSource = new DataSource({
  type: 'mysql', // ou o tipo de banco de dados que você está usando
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'Gui16dve*02',
  database: 'blog-db',
  entities: [Post, Comment], // Adicione suas entidades aqui
  synchronize: true,
});

dataSource.initialize()
  .then(() => {
    console.log('Database connected');

    // Configura as rotas
    app.use('/posts', postRoutes(dataSource)); // Passa o dataSource para as rotas de posts
    app.use('/comments', commentRoutes(dataSource)); // Passa o dataSource para as rotas de comentários

    // Inicia o servidor
    app.listen(3000, () => {
      console.log('Server running on port 3000');
    });
  })
  .catch(error => {
    console.error('Database connection error:', error);
  });
