interface TextareaProps extends React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {}

const Textarea: React.FC<TextareaProps> = ({ ...textareaProps }) => {
  return (
    <textarea
      className="bg-[#051841] rounded-xl p-3 h-full text-xs md:text-sm"
      {...textareaProps}
    />
  );
};

Textarea.displayName = 'Textarea';

export default Textarea;
