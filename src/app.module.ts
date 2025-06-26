import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // ← charger .env
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from './project/projet.module';
import { GeminiModule } from './project/gemini.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ProjectModule,
    GeminiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
