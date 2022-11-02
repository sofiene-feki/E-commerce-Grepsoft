import * as React from 'react';
import { Select } from 'antd';
//import 'antd/dist/antd.css';

const { Option } = Select;

export default function AntdSubProduct({
  values,
  setValues,
  subOptions,
  subs,
}) {
  console.log('hey im subs', subs);
  return (
    <div>
      <Select
        mode="multiple"
        value={subs}
        onChange={(value) => setValues({ ...values, subs: value })}
        style={{ width: '100%' }}
        placeholder="Please select"
      >
        {subOptions.length &&
          subOptions.map((s) => (
            <Option key={s._id} value={s._id}>
              {s.name}
            </Option>
          ))}
      </Select>
    </div>
  );
}
