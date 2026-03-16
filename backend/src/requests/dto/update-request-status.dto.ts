import { IsEnum } from 'class-validator';

export enum RequestStatusDto {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export class UpdateRequestStatusDto {
  @IsEnum(RequestStatusDto)
  status: RequestStatusDto;
}