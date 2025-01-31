import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  error: null,
  loading: null,
  signUp: false,
  signIn: false,
};

// Регистрация пользователя
export const authSignUp = createAsyncThunk(
  "auth/signUp",
  async ({ login, password, fName, lName }, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password, fName, lName }),
      });
      const json = await res.json();
      if (json.error) {
        return thunkAPI.rejectWithValue(json.error);
      }
      return json;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

// Вход пользователя
export const authSignIn = createAsyncThunk(
  "auth/signIn",
  async ({ login, password }, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      });
      const token = await res.json();

      if (token.error) {
        return thunkAPI.rejectWithValue(token.error);
      }
      localStorage.setItem("token", token.token);
      return token;
    } catch (error) {
      throw error;
    }
  }
);

const appSlices = createSlice({
  name: "app",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Регистрация
      .addCase(authSignUp.pending, (state) => {
        state.signUp = true;
        state.error = null;
      })
      .addCase(authSignUp.fulfilled, (state, action) => {
        // state.signInUp = false;
        // state.error = null;
        console.log(action);
      })
      .addCase(authSignUp.rejected, (state, action) => {
        state.signUp = false;
        state.error = action.payload as string;
      })

      //Вход
      .addCase(authSignIn.pending, (state, action) => {
        console.log(action);
      })
      .addCase(authSignIn.fulfilled, (state, action) => {
        console.log(action);
      })
      .addCase(authSignIn.rejected, (state, action) => {
        console.log(action);
      });
  },
});

export default appSlices.reducer;
