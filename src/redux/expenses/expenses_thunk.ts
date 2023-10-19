import { Expense } from '@/app/expenses/model/expense.class';
import { onShowLoading, onHideLoading, onSetOpenModal, onSetIsOpenModal, onSetEventType } from './expenses.redux';
import SaveExpense from '@/app/expenses/service/expenses.service';



export const onStoreExpense = ( expense: Expense ) => {
    return async( dispatch: any, getState: any ) => {
        dispatch( onShowLoading() );

        // TODO: realizar petición http
        SaveExpense(expense).then(
            result => {
                dispatch(onSetOpenModal());
                dispatch( onHideLoading() );
                // reset();
            },
            error => {
                dispatch( onHideLoading() );
                dispatch(onSetEventType('error'));
                dispatch(onSetIsOpenModal())
            }
        );
    }
}