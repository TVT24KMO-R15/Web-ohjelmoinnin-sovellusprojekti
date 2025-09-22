import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';

export default function FKDataRangePicker({ startDate, setStartDate, endDate, setEndDate }) {
  console.log("CCC FKDataRangePicker rendered", startDate, endDate);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div style={{ margin: '20px 0', display: 'flex', gap: '10px' }}>
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={(newValue) => {
            setStartDate(newValue);
            console.log('CCC Selected Start Date:', newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={(newValue) => {
            setEndDate(newValue);
            console.log('CCC Selected End Date:', newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </div>
    </LocalizationProvider>
  );
  
}
