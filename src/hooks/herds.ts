import axiosClient from "../common/utils/api";

const herdApi = {
  async getAll() {
    return axiosClient.get(`/api/v1/herds`);
  },
  async get(id: string) {
    return axiosClient.get(`/api/v1/herds/${id}`);
  },
  async post(data: any, token: string) {
    return axiosClient.post(`/api/v1/herds`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  async update(id: string, data: any, token: string) {
    return axiosClient.patch(`/api/v1/herds/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  async delete(id: string, token: string) {
    return axiosClient.delete(`/api/v1/herds/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default herdApi;
