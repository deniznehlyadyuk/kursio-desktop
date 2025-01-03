import { TextInput, TextInputProps } from '@mantine/core';
import { ChangeEvent, ForwardedRef, forwardRef } from 'react';
import { IMask } from 'react-imask';

const mask = IMask.createMask({
  mask: 'HH:MM',
  blocks: {
    HH: {
      mask: IMask.MaskedRange,
      placeholderChar: 'HH',
      from: 0,
      to: 23,
      maxLength: 2,
    },
    MM: {
      mask: IMask.MaskedEnum,
      placeholderChar: 'HH',
      from: 0,
      to: 59,
      maxLength: 2,
      enum: ['0', '00', '1', '15', '3', '30', '4', '45'],
    },
  },
});

const TimeInput = forwardRef(
  (props: TextInputProps, ref: ForwardedRef<HTMLInputElement>) => {
    const { onChange, ...propsWithoutOnChange } = props;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      mask.resolve(event.target.value);
      onChange?.({ ...event, target: { ...event.target, value: mask.value } });
    };

    return (
      <TextInput
        {...propsWithoutOnChange}
        ref={ref}
        onChange={handleChange}
      />
    );
  }
);

export default TimeInput;
