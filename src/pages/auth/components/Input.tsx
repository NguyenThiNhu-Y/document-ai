import React, { ChangeEvent } from 'react'

type InputProps = {
  className?: string
  value: string
  placeholder?: string
  disabled?: boolean
  id?: string
  name?: string
  label?: string
  type?: 'text' | 'password' | 'email'
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}
const Input: React.FC<InputProps> = ({
  className,
  value,
  placeholder,
  disabled = false,
  id,
  type = 'text',
  name,
  label,
  onChange,
}) => {
  if (id && label) {
    return (
      <div className={className}>
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          type={type}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          name={name}
          onChange={onChange}
          className='px-4 py-3 rounded-lg w-full border'
        />
      </div>
    )
  } else {
    return (
      <div className={className}>
        <input
          id={id}
          type={type}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          name={name}
          onChange={onChange}
          className='px-4 py-2 rounded-sm w-full border text-sm'
        />
      </div>
    )
  }
}

export default Input
