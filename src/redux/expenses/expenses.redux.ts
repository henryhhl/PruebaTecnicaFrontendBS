
import { Expense } from '@/app/expenses/model/expense.class';
import SaveExpense from '@/app/expenses/service/expenses.service';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

export type InitialState = {
    value: Expense,
    loading: boolean,
    success: boolean,
    error: boolean,
    open: boolean,
    isOpen: boolean,
    eventType: string,
};

const initialState = {
    value: {
        description: "",
        amount: 0,
        expenseType: "",
        expenseDate: dayjs(),
        userId: 100,
    } as Expense,
    loading: false,
    success: false,
    error: false,
    open: false,
    isOpen: false,
    eventType: "",
} as InitialState;

export const ExpensesSlice = createSlice({
    name: 'expense',
    initialState: initialState,
    reducers: {
        onShowLoading: (state) => {
            state.loading = true;
        },
        onHideLoading: (state) => {
            state.loading = false;
        },
        onSetOpenModal: (state) => {
            state.open = !state.open;
        },
        onSetIsOpenModal: (state) => {
            state.isOpen = !state.isOpen;
        },
        onSetEventType: (state, action: PayloadAction<string>) => {
            state.eventType = action.payload;
        },
    },
});

export const { onShowLoading, onHideLoading, onSetOpenModal, onSetIsOpenModal, onSetEventType} = ExpensesSlice.actions;
export default ExpensesSlice.reducer;
