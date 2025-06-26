import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from './project/projet.module';

@Module({
  imports: [ProjectModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
