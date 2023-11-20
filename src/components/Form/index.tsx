import {  useForm } from "react-hook-form";
import React from "react";
import { yupResolver } from '@hookform/resolvers/yup';

interface FORM_INPUT_PROPS {
    labelName: string;
    type: "text" | "date" | "number";
    placeholder: string;
    name: string;
    otherClasses?: string;
}

const FormContext = React.createContext({})



export default function Form({ children, submitFn,  schema }: { children: React.ReactNode, schema: any, submitFn: (...props: any[]) => void }) {
    const { register, handleSubmit, formState, reset } = useForm({
        resolver: yupResolver(schema)
    });

    const submitData = async (data: any) => {
        await submitFn(data);
        reset()
    }

    return (
        <FormContext.Provider value={{ register, handleSubmit, formState }}>
            <form className="grid grid-cols-2 w-full gap-x-8 gap-y-8" data-testid="form" onSubmit={handleSubmit(submitData)}>
                {children}
            </form>
        </FormContext.Provider>
    )
}

const FormInput = ({ labelName, type, placeholder, name, otherClasses }: FORM_INPUT_PROPS) => {

    // @ts-ignore
    const {  register, formState: { errors } } = React.useContext(FormContext);

    return (
        <div className={`app-input-layout ${otherClasses}`}>
            <label className="app-input-label">{labelName}</label>
            <input type={type} className="app-input" {...register(name)} placeholder={placeholder}  data-testid="form-input"/>
            {errors[name] && <span className="app-input-error">{errors[name]?.message}</span>}
        </div>
    )
}


const FormSelect = ({ labelName, name, placeholder, children }: { labelName: string, placeholder: string, name: string, children: React.ReactNode  }) => {
    // @ts-ignore
    const {  register, formState: { errors } } = React.useContext(FormContext);

    return (
        <div className="app-input-layout">
            <label className="app-input-label">{labelName}</label>
            <select className="app-input" {...register(name)} defaultValue="null" data-testid="form-select">
                <option value="null" disabled>{placeholder}</option>
                {children}
            </select>

            {errors[name] && <span className="app-input-error">{errors[name]?.message}</span>}
        </div>
    )
}


const FormButton = ({ title }: { title: string }) => {
    // @ts-ignore
    return (
        <button data-testid="form-button" className="btn btn-primary col-span-2" type="submit">{title}</button>
    )
}



Form.Input = FormInput;
Form.Select = FormSelect;
Form.Button = FormButton;