'use client';
import './FormHistory.component.css';
import React from 'react';
import { useRouter } from 'next/navigation';

import { type History } from '../model/history.class';
import SaveHistory from '../service/history.service';

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


export default function FormHistory (): React.JSX.Element {
    const router = useRouter();
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const today = dayjs()
    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<History>( {
        mode: 'onChange',
        defaultValues: {
            userId: 100,
            historyDate: today
        }
    } );
    const [isOpen, setIsOpen] = React.useState(false);
    const [eventType, setTypeEvent] = React.useState('');

    const toggleModal = (): void => {
        setOpen(state => !state);
    }

    const handleRedirect = (): void => {
        setOpen(state => !state);
        router.back();
    }

    const onSubmit: SubmitHandler<History> = data => {
        setLoading(true);
        SaveHistory(data).then(
            result => {
                toggleModal();
                setLoading(false);
                reset();
            },
            error => {
                setLoading(false);
                setTypeEvent('error');
                console.log('Error=>', error);
                setIsOpen(true);
            }
        );
    }
    const handleClose = (): void => {
        setIsOpen(false)
    }

    return (
        <div className="container">
          <h1>Registro de historico</h1>
          <h4>Ingresa la información que desea registrar</h4>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="form-content"
          >
            <TextFieldFormComponent 
                label='Descripcion del Historico'
                helperText={errors.description?.message}
                inputProps={ register('description', {
                    required: { value: true, message: 'El nombre es requerido' },
                    minLength: { value: 4, message: 'El minimo de caracteres es 4' }
                } ) }
            />

            <TextFieldFormComponent 
                label='Tipo'
                select
                inputProps={ register('historyType', {
                    required: { value: true, message: 'Selecione una opcion' },
                } ) }
                error={!(errors.historyType == null)}
                helperText={errors.historyType?.message}
                data={transactionDescriptionType}
            />

            <TextFieldFormComponent 
                label='Monto total en Bs.'
                type='number'
                helperText={errors.amount?.message}
                inputProps={ register('amount', {
                    required: { value: true, message: 'El monto es requerido' },
                    valueAsNumber: true,
                } ) }
            />

            <DatePickerComponent 
                label='Fecha'
                control={control}
                format='DD/MM/YYYY'
                name='historyDate'
                error required
                errors={errors}
                message='La fecha es requerida'
            />
    
            <button type="submit" className="btn-secondary">
              Continuar
            </button>
    
            <OverlayLoader isLoading={loading} />
            <ModalSuccess
              isOpen={open}
              onClose={toggleModal}
              onRedirect={handleRedirect}
              typeTransaction="Historico"
              type={TypeModal.sucess}
              text="Registro Exitoso"
            />
          </form>
          <SnackbarMessage
            open={isOpen}
            eventType={eventType}
            onClose={handleClose}
          />
        </div>
    );
}