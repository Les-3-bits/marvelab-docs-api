import { Module } from '@nestjs/common';
import { MethodologyService } from './methodology.service';
import { MethodologyController } from './methodology.controller';

@Module({
  controllers: [MethodologyController],
  providers: [MethodologyService],
})
export class MethodologyModule {} 