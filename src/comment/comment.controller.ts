import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/createCommentDto';
import { JwtGuard } from 'src/auth/guard/jwt-guard.guard';
import { ILike } from 'src/share/Ilike';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  findAllComment() {
    return Logger.debug(ILike('HELLO'));
  }

  @UseGuards(JwtGuard)
  @Post(':id')
  createComment(
    @Param('id') id: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentService.createComment(id, createCommentDto);
  }
}
