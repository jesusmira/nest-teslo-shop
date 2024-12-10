import { Controller, Get, } from '@nestjs/common';
import { SeedService } from './seed.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { Auth } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';

@ApiTags('Seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  // @Auth( ValidRoles.ADMIN)
  @ApiTags('Seed')
  @ApiResponse({ status: 200, description: 'Seed executed' })
  executeSeed() {
    return this.seedService.runSeed();
  }
 
}
