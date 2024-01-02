import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketRepository } from './ticket.repository';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [TicketService, TicketRepository, PrismaService],
  exports: [TicketService],
})
export class TicketModule {}
