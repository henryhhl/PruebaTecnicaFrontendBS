import React from 'react';
import { SelectOption } from '@/app/common';
import { FieldValues } from 'react-hook-form';
import { InputBaseComponentProps, MenuItem, TextField } from '@mui/material';

type TextFieldFormProps<T extends FieldValues> = {
    label: string
    variant?: "standard" | "filled" | "outlined"
    fullWidth?: boolean
    select?: boolean
    helperText?: React.ReactNode
    inputProps?: InputBaseComponentProps | undefined 
    type?: React.InputHTMLAttributes<unknown>['type']
    data?: SelectOption[]
    error?: boolean
};

const TextFieldFormComponent = <T extends FieldValues> ( {
    label,
    variant = "standard",
    fullWidth = true,
    select = false,
    helperText,
    inputProps,
    type,
    data,
    error,
}: TextFieldFormProps<T>): JSX.Element => {
    return (
        <>
            <TextField
              label={label}
              select={select}
              type={type}
              variant={variant}
              className="input"
              fullWidth={fullWidth}
              helperText={helperText}
              inputProps={inputProps}
              error={error}
            >
                <MenuItem value="">--Seleccione--</MenuItem>
                { data?.map( option => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ) ) } 
            </TextField>
        </>
    );
};

export default TextFieldFormComponent;
