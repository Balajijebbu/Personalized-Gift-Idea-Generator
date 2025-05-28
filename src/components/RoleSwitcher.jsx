import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRole } from '../slices/userSlice';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const RoleSwitcher = () => {
  const dispatch = useDispatch();
  const role = useSelector(state => state.user.role);

  const handleChange = (event) => {
    dispatch(setRole(event.target.value));
  };

  return (
    <FormControl variant="outlined" size="small" style={{ minWidth: 120, marginBottom: 16 , marginLeft: 1250}}>
      <InputLabel id="role-select-label">Role</InputLabel>
      <Select
        labelId="role-select-label"
        value={role}
        onChange={handleChange}
        label="Role"
      >
        <MenuItem value="admin">Admin</MenuItem>
        <MenuItem value="customer">Customer</MenuItem>
      </Select>
    </FormControl>
  );
};

export default RoleSwitcher;
