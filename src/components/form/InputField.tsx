import { FC } from "react";

interface InputFieldProps {
    lable: string,
    type: string,
    name: string,
    value: any,
    placeholder: string,
    handleChange: Function
}
const InputField: FC<InputFieldProps> = ({ lable, type, name, value, placeholder, handleChange }) => {
    return (
        <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                {lable}
            </label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id={name}
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={handleChange}
                required
            />
        </div>
    );
};

export default InputField;
