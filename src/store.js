import axios from "axios";
import { create } from "zustand";

const token = localStorage.getItem('token'); 
export const useUsers = create((set) => ({
    user: [],
    getUser: async (url) => {
        const response = await axios.get(url, {
            headers: {
             Authorization: `Bearer ${token}` 
            }
        })
        set({ user: response.data.data })
    },
    deleteUser: () => set({ user: [] })
}));

export const useGrups = create((set) => ({
    grups: [],
    grup: '',
    getListGrup: async (url) => {
        const response = await axios.get(url)
        set({ grups: response.data.data })
    }
}));
