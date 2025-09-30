import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';
import 'dayjs/locale/de';

export default function FKDataRangePicker({ startDate, setStartDate, endDate, setEndDate }) {
  //console.log("FKDataRangePicker rendered startDate and endDate: ", startDate, endDate);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
      <div style={{ margin: '20px 0', display: 'flex', gap: '10px' }}>
        <DatePicker
          label="Start Date"
          
          value={startDate}
          onChange={(newValue) => {
            setStartDate(newValue);
            
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        <DatePicker
          label="End Date"
          
          value={endDate}
          onChange={(newValue) => {
            setEndDate(newValue);
            
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </div>
    </LocalizationProvider>
  );
  
}
