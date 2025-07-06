import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/authApi";

export const addCategories = createAsyncThunk(
    "categories/add",
    async (category, { rejectWithValue }) => {
        try {
            const { data } = await api.post("/categories", category);
            console.log("addCategories", data);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getCategories = createAsyncThunk(
    "categories/all",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await api.get("/categories");
            console.log("getCategories", data);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);