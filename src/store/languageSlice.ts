import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LanguageState {
  current: string;
}

const initialState: LanguageState = {
  current: 'ru', 
};

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.current = action.payload;
    },
    toggleLanguage: (state) => {
      state.current = state.current === 'en' ? 'ru' : 'en';
    },
  },
});

export const { setLanguage, toggleLanguage } = languageSlice.actions;
export default languageSlice.reducer;