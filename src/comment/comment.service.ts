import { Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/entities/comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/createCommentDto';
import { JwtGuard } from 'src/auth/guard/jwt-guard.guard';
import { User } from 'src/entities/user.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}
  findUserComment(userId: number) {
    return `this is user commeny ${userId}`;
  }

  @UseGuards(JwtGuard)
  async findAllComment() {
    const commentOfUser = await this.commentRepo
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.user', 'user')
      .getMany();
    return commentOfUser;
  }

  async createComment(userId: number, createCommentDto: CreateCommentDto) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    const postBody = { ...createCommentDto, user };
    const comment = this.commentRepo.create(postBody);
    return await this.commentRepo.save(comment);
  }
}
