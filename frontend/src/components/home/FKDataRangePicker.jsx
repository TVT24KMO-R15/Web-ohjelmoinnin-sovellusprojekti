import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';
import dayjs from 'dayjs';

export default function FKDataRangePicker({ startDate, setStartDate, endDate, setEndDate }) {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div style={{ margin: '20px 0', display: 'flex', gap: '10px' }}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue) => {
              console.log('InCalendar Selected Start Date:', newValue); // Debugging
              setStartDate(newValue ? dayjs(newValue) : dayjs()); // Ensure valid dayjs object
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(newValue) => {
              console.log('InCalendar Selected End Date:', newValue); // Debugging
              setEndDate(newValue ? dayjs(newValue) : dayjs().add(1, 'week')); // Ensure valid dayjs object
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </div>
      </LocalizationProvider>
  );
}




