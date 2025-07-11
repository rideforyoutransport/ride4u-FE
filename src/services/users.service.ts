import { apiService } from './api';
import type { ApiResponse, User, QueryParams } from '../types';

let data = {
  "from": 0,
  "to": 100,
}

class UserService {
  async getUsers(params?: QueryParams): Promise<ApiResponse<{ items: User[] }>> {
    return apiService.post('/user/all', data);
  }
}

export const usersService = new UserService();