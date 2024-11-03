import { Body, Controller, Delete, Get, Param, Post, Put, HttpException , HttpStatus } from '@nestjs/common';
import { UpdateUserDto } from './user.dto';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get(':id')
  async getProfile(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }
  @Put(':id')
  async updateProfile(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(id, updateUserDto);
  }
  @Post('signup')
  async signup(@Body()
  body: { name: string; password: string ; email : string  , passwordConfirm: string }): Promise<object> {
    try {
      if(body.passwordConfirm === body.password){
        return await this.usersService.signup(body.name, body.password , body.email);
      }
      else throw new HttpException(`passwordConfirm and password are not the same`, HttpStatus.BAD_REQUEST);
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.CONFLICT); 
    }
  

  }

  @Post('login')
  async login(@Body() body: { email: string  , password : string}): Promise<number | null> {
    try {
     return await this.usersService.login(body.email , body.password);
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST); 
    }
    


  }

}