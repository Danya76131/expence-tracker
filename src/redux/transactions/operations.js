import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { instance } from "../auth/operations";


export const createTransaction = createAsyncThunk(
    "transactions/createTransaction",
    async (data, { rejectWithValue }) => {
        try {
            // const response = await axios.post("/transactions", data);
            // return response.data;


            return {
                ...data,
                id: Date.now(),
            };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// export const addTransaction = createAsyncThunk(
//     "transactions/add",
//     async (transaction, { rejectWithValue }) => {
//         try {
//             console.log("addTransaction", transaction);
//             const { data } = await instance.post("/transactions", transaction);
//             console.log(data);
//             return data;
//         } catch (error) {
//             return rejectWithValue(error.message);
//         }
//     }
//   );
