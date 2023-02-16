import { PartialType } from '@nestjs/swagger';
import { CreateCatParams } from './CreateCatParams.dto';

export class UpdateCatParams extends PartialType(CreateCatParams) {}
