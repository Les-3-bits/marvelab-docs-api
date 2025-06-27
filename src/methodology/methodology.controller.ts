import { Controller, Get, Param } from '@nestjs/common';
import { MethodologyService } from './methodology.service';
import { Methodology } from '../interfaces/methodology.interface';
import { ApiOkResponse, ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Methodologies')
@Controller('methodologies')
export class MethodologyController {
  constructor(private readonly methodologyService: MethodologyService) {}

  @Get()
  @ApiOkResponse({ description: 'Liste des méthodologies' })
  findAll(): Methodology[] {
    return this.methodologyService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Détail d\'une méthodologie' })
  @ApiNotFoundResponse({ description: 'Méthodologie non trouvée' })
  findOne(@Param('id') id: string): Methodology | undefined {
    return this.methodologyService.findOne(Number(id));
  }
} 