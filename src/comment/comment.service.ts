import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentService {
  findUserComment(userId: number) {
    return `this is user commeny ${userId}`;
  }
}
