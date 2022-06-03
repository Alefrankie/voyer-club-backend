import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import {
  editFileName,
  imageFileFilter
} from 'src/Shared/infrastructure/utils/file-upload.utils'
import { ChangePhotos } from 'src/User/application/Update/ChangePhotos'

@Controller()
export class ChangePhotosController {
  constructor(private changePhotos: ChangePhotos) {}

  @Post('/api/user/change-profile-photo')
  @UseInterceptors(
    FileInterceptor('profile-photo', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName
      }),
      fileFilter: imageFileFilter
    })
  )
  async profilePhoto(@Body() body: any, @UploadedFile() file) {
    const response = {
      originalname: file.originalname,
      filename: file.filename
    }
    body.profilePhoto = file.filename

    await this.changePhotos.__invoke(body.id, body)
    return response
  }

  @Post('/api/user/change-cover-photo')
  @UseInterceptors(
    FileInterceptor('profile-photo', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName
      }),
      fileFilter: imageFileFilter
    })
  )
  async coverPhoto(@Body() body: any, @UploadedFile() file) {
    const response = {
      originalname: file.originalname,
      filename: file.filename
    }
    body.coverPhoto = file.filename

    await this.changePhotos.__invoke(body.id, body)
    return response
  }
}
