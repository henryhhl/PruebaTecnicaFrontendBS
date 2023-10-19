'use client';

import './FormExpense.component.css';
import React from 'react';
import { useRouter } from 'next/navigation';

import { useDispatch } from 'react-redux';
import {onShowLoading, onHideLoading, onSetOpenModal, onSetIsOpenModal} from '@/redux/expenses/expenses.redux';
import { AppDispatch, useAppSelector } from '@/redux/store';

import { type Expense } from '../model/expense.class';
import SaveExpense from '../service/expenses.service';

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import transactionDescriptionType from '@/app/common/constants/TransactionDescriptionType.constant';
import { ModalSuccess, OverlayLoader } from '@/app/components';
import { MenuItem, TextField } from '@mui/material';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';

import TypeModal from '@/app/common/enum/typeModal';
import SnackbarMessage from '@/app/components/Snackbar/SnackbarMessage.components';
import DatePickerComponent from '@/app/components/DatePicker/DatePicker.component';
import TextFieldFormComponent from '@/app/components/TextFieldForm/TextFieldForm.component';
import { onStoreExpense } from '@/redux/expenses/expenses_thunk';


export default function FormExpense (): React.JSX.Element {
    const distpatch = useDispatch<AppDispatch>();
    const expenseData = useAppSelector(state => state.ExpenseReducer);

    const router = useRouter();
    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<Expense>( {
        mode: 'onChange',
        defaultValues: expenseData.value,
    } );

    const toggleModal = (): void => {
        distpatch(onSetOpenModal());
    }

    const handleRedirect = (): void => {
        distpatch(onSetOpenModal());
        router.back();
    }

    const onSubmit: SubmitHandler<Expense> = async data => {
        distpatch(onStoreExpense(data));
        reset();
    }
    const handleClose = (): void => {
        distpatch(onSetIsOpenModal());
    }
    
    return (
        <div className="container">
          <h1>Registro de egreso</h1>
          <h4>Ingresa la información que desea registrar</h4>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="form-content"
          >
            <TextFieldFormComponent 
                label='Descripcion del Egreso'
                helperText={errors.description?.message}
                inputProps={ register('description', {
                    required: { value: true, message: 'El nombre es requerido' },
                    minLength: { value: 4, message: 'El minimo de caracteres es 4' }
                } ) }
            />

            <TextFieldFormComponent 
                label='Tipo de egreso'
                select
                inputProps={ register('expenseType', {
                    required: { value: true, message: 'Selecione una opcion' },
                } ) }
                error={!(errors.expenseType == null)}
                helperText={errors.expenseType?.message}
                data={transactionDescriptionType}
            />

            <TextFieldFormComponent 
                label='Monto egreso total en Bs.'
                type='number'
                helperText={errors.amount?.message}
                inputProps={ register('amount', {
                    required: { value: true, message: 'El monto es requerido' },
                    valueAsNumber: true,
                    min: {value: 1, message: 'El monto debe ser mayor 0'}
                } ) }
            />

            <DatePickerComponent 
                label='Fecha de Egreso'
                control={control}
                format='DD/MM/YYYY'
                name='expenseDate'
                error required
                errors={errors}
                message='La fecha es requerida'
            />
    
            <button type="submit" className="btn-secondary">
              Continuar
            </button>
    
            <OverlayLoader isLoading={expenseData.loading} />
            <ModalSuccess
              isOpen={expenseData.open}
              onClose={toggleModal}
              onRedirect={handleRedirect}
              typeTransaction="Egreso"
              type={TypeModal.sucess}
              text="Registro Exitoso"
            />
          </form>
          <SnackbarMessage
            open={expenseData.isOpen}
            eventType={expenseData.eventType}
            onClose={handleClose}
          />
        </div>
    );
}