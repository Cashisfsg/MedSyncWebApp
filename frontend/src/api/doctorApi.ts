import { http } from "./config";
import { Doctor } from "./types";

const doctorsApiService = {
    all: async () => {
        const { data } = await http.get<Doctor[]>("/api/doctors");
        return data;
    },
    one: async (id: number) => {
        const { data } = await http.get<Doctor>(`/api/doctors/${id}`);
        return data;
    }
};

export default doctorsApiService;
