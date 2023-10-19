import React from 'react';
import dayjs from 'dayjs';
import { TextFieldProps } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Control, Controller, FieldErrors, FieldPath, FieldValues, Path } from 'react-hook-form';

type DatePickerProps<T extends FieldValues> = Omit<TextFieldProps, "name"> & {
    control: Control<T, object>
    name: Path<T>
    label: string
    format: string
    required: boolean
    error: boolean
    message: string
    errors: FieldErrors<T>
};

const DatePickerComponent = <T extends FieldValues>(props : DatePickerProps<T>): JSX.Element => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
                name={props.name}
                control={props.control}
                rules={{ required: props.required, }}
                render={({ field: { onChange, value } }) => (
                    <DatePicker
                        label={props.label}
                        format={props.format}
                        value={dayjs(value)}
                        onChange={onChange}
                        className="input"
                        slotProps={{
                            textField: {
                                variant: 'standard'
                            },
                        }}
                    />
                )}
            />
            { props.error &&
                !(props.errors[props.name] == null) && props.errors[props.name]?.type === 'required' && (
                    <span className="error-msg">
                        {props.message}
                    </span>
                )
            }
        </LocalizationProvider>
    );
};

export default DatePickerComponent;
