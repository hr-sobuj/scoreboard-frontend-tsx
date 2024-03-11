import { ChangeEventHandler, FC } from "react";
import { cn } from "../../../utilities/cssMerge";

interface InputFieldProps {
    label: string,
    type: string,
    name: string,
    value: any,
    placeholder: string,
    handleChange: Function,
    className?: string,
    rest?: any,
}

const InputField: FC<InputFieldProps> = ({ label, type, name, value, placeholder, handleChange, className, ...rest }) => {
    const inputHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
        handleChange(e.target.value);
    }
    return (
        <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                {label}
            </label>
            <input
                className={cn("shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", className, rest)}
                id={name}
                type={type}
                placeholder={placeholder}
                name={name}
                defaultValue={value}
                onChange={(e) => inputHandler(e)}
                required
                autoFocus
            />
        </div>
    );
};

export default InputField;
