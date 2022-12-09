import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function AntdSubProduct({
  values,
  setValues,
  subOptions,
  subs,
}) {
  const handleChangeSelect = (event) => {
    const {
      target: { value },
    } = event;
    setValues(
      { ...values, subs: value }
      // On autofill we get a stringified value.
    );
  };
  return (
    <div>
      {subOptions.length > 0 && (
        <Select
          multiple
          value={subs}
          onChange={handleChangeSelect}
          input={<OutlinedInput label="Name" />}
        >
          {subOptions.length &&
            subOptions.map((s) => (
              <MenuItem key={s._id} value={s._id}>
                {s.name}
              </MenuItem>
            ))}
        </Select>
      )}
    </div>
  );
}
