import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CommentService } from 'src/comment/comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Comment } from 'src/entities/comment.entity';

@Module({
  controllers: [UserController],
  providers: [UserService, CommentService],
  imports: [TypeOrmModule.forFeature([User, Comment])],
})
export class UserModule {}
