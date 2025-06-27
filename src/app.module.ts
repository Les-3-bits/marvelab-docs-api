import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // ← charger .env
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from './project/projet.module';
import { GeminiModule } from './project/gemini.module';
import { MethodologyModule } from './methodology/methodology.module';
import { ExperimentModule } from './experiment/experiment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ProjectModule,
    GeminiModule,
    MethodologyModule,
    ExperimentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
