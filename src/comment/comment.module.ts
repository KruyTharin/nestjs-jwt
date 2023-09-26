import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/entities/comment.entity';
import { User } from 'src/entities/user.entity';

@Module({
  providers: [CommentService],
  controllers: [CommentController],
  imports: [TypeOrmModule.forFeature([Comment, User])],
})
export class CommentModule {}
