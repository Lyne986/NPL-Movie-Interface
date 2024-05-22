import Spinner from "@/components/ui/Spinner";

interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, loading, ...buttonProps }) => {
  return (
    <button
      {...buttonProps}
      className={`bg-darkpink hover:bg-beige text-white font-medium py-2 px-4 rounded`}
      disabled={loading}
    >
      {loading ? (
        <Spinner />
      ) : (
        <>{children}</>
      )}
    </button>
  );
}

Button.displayName = 'Button';

export default Button;
