import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/authApi";

export const getCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (__, thunkAPI) => {
    try {
      const { data } = await api.get("/categories");
      console.log("Data Fetch", data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addCategory = createAsyncThunk(
  "categories/addCategory",
  async (category, thunkAPI) => {
    console.log("Add category", category);
    try {
      const { data } = await api.post("/categories", category);
      console.log("Add category data:", data);
      return data;
    } catch (error) {
      console.log(error.response.data);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editCategory = createAsyncThunk(
  "categories/editCategory",
  async ({ categoryName, id }, thunkAPI) => {
    console.log("Edit category", categoryName, id);
    try {
      const { data } = await api.patch(`/categories/${id}`, {
        categoryName,
      });
      console.log("Edit category data", data);
      return data;
    } catch (error) {
      console.log("Edit error", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async ({ id, type }, thunkAPI) => {
    try {
      await api.delete(`/categories/${id}`);
      return { id, type };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
