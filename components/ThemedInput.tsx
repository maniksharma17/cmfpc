import React from "react";

interface InputFieldProps {
  label: string;
  type?: string;
  name: string;
  placeholder?: string;
  textarea?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ label, type = "text", name, placeholder, textarea }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {textarea ? (
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          className="border-b bg-transparent border-stone-400 lg:mt-12 placeholder:text-stone-400 placeholder:text-light text-white rounded-lg px-3 py-2 text-md md:text-xl lg:text-2xl"
          rows={4}
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          className="border-b bg-transparent border-gray-400 placeholder:text-stone-400 placeholder:text-light text-white rounded-lg px-3 py-2 text-md md:text-xl lg:text-2xl"
        />
      )}
    </div>
  );
};

export default InputField;
