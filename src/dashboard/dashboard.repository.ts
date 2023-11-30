import { DashboardService } from './dashboard.service';

class DashboardRepository {
  private dashboardService: DashboardService;

  constructor() {
    this.dashboardService = new DashboardService();
  }

  // Add your repository methods here
}

export { DashboardRepository };