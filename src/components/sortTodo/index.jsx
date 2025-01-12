// @ts-check
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import React from 'react';

export const SortTodo = ({checked, change}) => {
  return (
    <>
      <FormControlLabel
        control={
          <Switch
            defaultChecked
            checked={checked}
            onChange={(e) => change(e.target.checked)}
            inputProps={{'aria-label': 'controlled'}}
          />
        }
        label='Move done things to end?'
        labelPlacement='start'
        sx={{
          '.MuiFormControlLabel-label': {fontSize: '12px', fontWeight: ''}, // 調整文字大小
          gap: 1, // 調整 Switch 和 Label 之間的間距
        }}
      />
    </>
  );
};
