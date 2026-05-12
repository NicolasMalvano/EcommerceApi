import {
  MiddlewareConsumer,
  Module,
  NestModule,
  OnApplicationBootstrap,
  RequestMethod,
} from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { loggerGlobalMiddleware } from './middlewares/logger.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmConfig } from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { CategoriesService } from './categories/categories.service';
import { ProductService } from './products/products.service';
import { FileUploadModule } from './file-upload/file-upload.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.development',
      load: [typeOrmConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.get('typeorm')!,
      
  }), UsersModule, ProductsModule, AuthModule, CategoriesModule, OrdersModule, FileUploadModule, 
    JwtModule.register({
    global: true,
    signOptions: {expiresIn: '60m'},
    secret: process.env.JWT_SECRET,
  })],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule, OnApplicationBootstrap {

  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly productsService: ProductService){}


  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(loggerGlobalMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }

  async onApplicationBootstrap() {
    await this.categoriesService.createCategory()
    console.log('Categorías Cargadas');
    await this.productsService.createProduct()
    console.log('Productos Cargados');
  }
}
