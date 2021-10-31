import { IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  readonly title: string;
  readonly creator?: string;
  readonly description?: string;
  @IsNotEmpty()
  readonly name: string;
  @IsNotEmpty()
  readonly guid: string;
}
