import { Module } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { GeminiController } from './gemini.controller';
import { ProjectModule } from './projet.module';

@Module({
  imports: [ProjectModule], // permet à GeminiService d'utiliser ProjectService
  providers: [GeminiService],
  controllers: [GeminiController],
})
export class GeminiModule {}
