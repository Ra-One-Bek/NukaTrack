import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RequestsService } from './requests.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestStatusDto } from './dto/update-request-status.dto';

@UseGuards(JwtAuthGuard)
@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Post()
  create(@Req() req: any, @Body() createRequestDto: CreateRequestDto) {
    return this.requestsService.create(req.user.id, createRequestDto);
  }

  @Get('my')
  findMy(@Req() req: any) {
    return this.requestsService.findMyRequests(req.user.id);
  }

  @Get('incoming')
  findIncoming(@Req() req: any) {
    return this.requestsService.findIncomingRequests(req.user.id);
  }

  @Patch(':id/status')
  updateStatus(
    @Req() req: any,
    @Param('id') id: string,
    @Body() updateRequestStatusDto: UpdateRequestStatusDto,
  ) {
    return this.requestsService.updateStatus(req.user.id, id, updateRequestStatusDto);
  }
}