import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function ColorCheckboxes(props) {
 function onFilterValuechanged(event){
 props.onFilterValueSelected(event.target.value);
}
  return (
    <div>
      <Checkbox {...label} defaultChecked color="default" onChange={onFilterValuechanged} value="tous" />
      <Checkbox {...label} onChange={onFilterValuechanged} value="fruit" />
      <Checkbox {...label}  color="secondary" onChange={onFilterValuechanged} value="legume"/>
      <Checkbox {...label}  color="success" onChange={onFilterValuechanged} value="pisson" />
    </div>
  );
}
