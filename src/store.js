import axios from "axios";
import { create } from "zustand";

const token = localStorage.getItem('token'); 
export const useUsers = create((set) => ({
    getUser: async () => {
        const token = localStorage.getItem('token'); 
        const response = await axios.get('http://localhost:8000/api/v1/user', {
            headers: {
             Authorization: `Bearer ${token}` 
            }
        })
        return response.data.data
    },
    user: [],
    getCompanyCode: async () => {
        const token = localStorage.getItem('token'); 
        const response = await axios.get('http://localhost:8000/api/v1/user', {
            headers: {
             Authorization: `Bearer ${token}` 
            }
        })
        return response.data.data.company_code
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


export const useLessons = create((set) => ({
    lessons: [],
    lesson: '',
    getListLessons: async (url) => {
        const response = await axios.get(url)
        set({ lessons: response.data.data })
    }
}));

export const useTests = create((set) => ({
    tests: [],
    test: '',
    getListTest: async (url) => {
        const response = await axios.get(url)
        set({ tests: response.data.data })
    }
}));

export const useFeedback = create((set) => ({
    feedbacks: [],
    feedback: '',
    getListFeedback: async (url) => {
        const response = await axios.get(url)
        console.log(response);
        set({ feedbacks: response.data.data })
    }
}));

