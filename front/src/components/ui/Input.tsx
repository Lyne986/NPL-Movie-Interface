interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label: string;
}

const Input: React.FC<InputProps> = ({ label, ...inputProps }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-white">{label}</label>
      <input
        {...inputProps}
        className={`bg-white border-2 border-darkpink focus:border-blue-500 focus:ring-blue-500 p-3 text-xs rounded-lg`}
      />
    </div>
  );
}

Input.displayName = 'Input';

export default Input;
