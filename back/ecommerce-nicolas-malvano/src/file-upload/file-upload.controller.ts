import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseInterceptors, UsePipes, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, UseGuards, ParseUUIDPipe, HttpCode } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../guards/Auth.guard';
import { Role } from '../decorators/roles.decorators';
import { Roles } from '../roles.enum';
import { RolesGuard } from '../guards/Role.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Products } from '../products/entities/products.entity';

@ApiTags('File-Uploads')
@Controller('files')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

@ApiBearerAuth()
@Role(Roles.Admin)
@UseGuards(AuthGuard, RolesGuard)
@HttpCode(201)
@Post("uploadImage/:id")
@UseInterceptors(FileInterceptor('file'))
@ApiOperation({summary: 'Carga de imágen para un producto en específico por ID'})

@ApiParam({
      name:'id',
      type: String,
      description: 'ID del usuario formato UUID v4'
    })

@ApiConsumes('multipart/form-data')
@ApiBody({
    schema: {
        type: 'object',
        properties: {
            file: {
                type: 'string',
                format: 'binary'
            }
        }
    }
})

@ApiResponse({
    status: 201,
    description: 'La imágen fue cargada correctamente'
})
@ApiResponse({
    status: 400,
    description: 'No se pudo actualizar la imágen'
})
@ApiResponse({
    status: 404,
    description: 'No se encontró producto con el ID enviado'
})
@ApiResponse({
    status: 401,
    description: 'No autenticado'
})
  @ApiResponse({
    status: 403,
    description: 'No autorizado'
})

async uploadImage(
@Param('id', ParseUUIDPipe) productId: string, 
@UploadedFile(
    new ParseFilePipe({
        validators: [
            new MaxFileSizeValidator({
                maxSize: 200 * 1024, // 200 KB
                message: 'El archivo debe ser menor a 200 KB',
            }),
            new FileTypeValidator({
                fileType: /.(jpg|jpeg|png|webp|svg)/
            })
        ] 
    })
) file: Express.Multer.File): Promise<Products>{
    return this.fileUploadService.uploadFile(productId, file);
}

}
