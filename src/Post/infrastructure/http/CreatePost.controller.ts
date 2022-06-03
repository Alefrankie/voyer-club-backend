import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { CreatePost } from 'src/Post/application/CreatePost'
import { diskStorage } from 'multer'
import {
  editFileName,
  imageFileFilter
} from 'src/Shared/infrastructure/utils/file-upload.utils'

@Controller()
export class CreatePostController {
  constructor(private createPost: CreatePost) {}

  @Post('/posts/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName
      }),
      fileFilter: imageFileFilter
    })
  )
  async save(@Body() body: any, @UploadedFile() file) {
    if (file) {
      body.src = file.filename
    }

    await this.createPost.__invoke(body)
    return body
  }
}
