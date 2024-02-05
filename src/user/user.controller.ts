import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/createUserDto';
import { UserService } from './user.service';
import { CommentService } from 'src/comment/comment.service';
import { JwtGuard } from 'src/auth/guard/jwt-guard.guard';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly commentService: CommentService,
  ) {}

  @UseGuards(JwtGuard)
  @Get('all')
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.userService.delete(id);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete()
  deleteUser() {
    return null;
  }

  @UseGuards(JwtGuard)
  @Get('/:id/comment')
  findUserComment(@Param('id') id: number) {
    return this.commentService.findUserComment(id);
  }
}
