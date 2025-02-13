import axiosClient from "../common/utils/api";

const farmApi = {
  async getAll() {
    return axiosClient.get(`/api/v1/farms`);
  },
  async get(id: string) {
    return axiosClient.get(`/api/v1/farms/${id}`);
  },
  async post(data: any, token: string) {
    return axiosClient.post(`/api/v1/farms`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  async update(id: string, data: any, token: string) {
    return axiosClient.patch(`/api/v1/farms/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  async delete(id: string, token: string) {
    return axiosClient.delete(`/api/v1/farms/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default farmApi;
