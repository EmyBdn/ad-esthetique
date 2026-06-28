import {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

type BaseProps = {
  label: string;
  name: string;
  className?: string;
};

type InputProps = BaseProps &
  InputHTMLAttributes<HTMLInputElement> & {
    textarea?: false;
    select?: false;
    children?: never;
  };

type TextareaProps = BaseProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    textarea: true;
    select?: false;
    children?: never;
  };

type SelectProps = BaseProps &
  SelectHTMLAttributes<HTMLSelectElement> & {
    select: true;
    textarea?: false;
    children: React.ReactNode;
  };

type Props = InputProps | TextareaProps | SelectProps;

const fieldClass =
  "w-full rounded-xl border border-[#394B39]/10 bg-white px-4 py-3 text-sm text-[#1A2F1A] outline-none transition placeholder:text-[#1A2F1A]/35 focus:border-[#394B39]/40 focus:ring-2 focus:ring-[#B7D8A8]/40";

export function FormField(props: Props) {
  const { label, name, className = "" } = props;

  return (
    <div className={className}>
      <label className="mb-2 block text-sm font-medium text-[#394B39]">
        {label}
      </label>

      {props.textarea ? (
        <textarea
          {...props}
          name={name}
          className={`${fieldClass} min-h-28 resize-none`}
        />
      ) : props.select ? (
        <select {...props} name={name} className={fieldClass}>
          {props.children}
        </select>
      ) : (
        <input {...props} name={name} className={fieldClass} />
      )}
    </div>
  );
}
