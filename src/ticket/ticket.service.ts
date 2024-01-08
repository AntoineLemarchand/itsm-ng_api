import { Inject, Injectable } from '@nestjs/common';
import { TicketRepository } from './ticket.repository';

@Injectable()
export class TicketService {
  constructor(
    @Inject(TicketRepository) private ticketRepository: TicketRepository,
  ) {}

  async count(condition: object) {
    try {
      const result = await this.ticketRepository.count(condition);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async bar(
    condition: object = {},
    compare: string = 'name',
    isForeign: boolean = false,
  ) {
    try {
      const includes = {};
      if (isForeign) includes[compare] = true;
      const result = await this.ticketRepository.get(condition, includes);

      const labels = new Set(
        result.map((ticket) =>
          ticket[compare] ? ticket[compare].name : 'null',
        ),
      );
      const series = [];
      for (const label of labels) {
        const count = result.filter(
          isForeign
            ? (ticket) =>
                (ticket[compare] ? ticket[compare].name : 'null') === label
            : (ticket) => ticket[compare] === label,
        ).length;
        series.push(count);
      }

      return [Array.from(labels), series];
    } catch (error) {
      throw new Error(error);
    }
  }
}
