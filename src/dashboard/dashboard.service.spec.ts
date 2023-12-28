/**
 * ---------------------------------------------------------------------
 * ITSM-NG
 * Copyright (C) 2022 ITSM-NG and contributors.
 *
 * https://www.itsm-ng.org
 *
 * ---------------------------------------------------------------------
 *
 * LICENSE
 *
 * This file is part of ITSM-NG.
 *
 * ITSM-NG is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * ITSM-NG is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with ITSM-NG. If not, see <http://www.gnu.org/licenses/>.
 * ---------------------------------------------------------------------
 */

import { Test, TestingModule } from '@nestjs/testing';
import { DashboardService } from './dashboard.service';
import { AssetService } from '../asset/asset.service';

describe('DashboardService', () => {
  let service: DashboardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DashboardService,
        {
          provide: AssetService,
          useValue: {
            countByType: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DashboardService>(DashboardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw an error for unsupported statType', async () => {
    const query = { statType: 'Ticket', statSelection: '{}' };
    await expect(service.count(query)).rejects.toThrow(
      `Type ${query.statType} is not supported`,
    );
  });

  it('should call countByType for supported statType', async () => {
    const query = { statType: 'Other', statSelection: '{}' };
    const countByTypeSpy = jest.spyOn(service['assetService'], 'countByType');
    await service.count(query);
    expect(countByTypeSpy).toHaveBeenCalledWith(
      JSON.parse(query.statSelection),
    );
  });
});
