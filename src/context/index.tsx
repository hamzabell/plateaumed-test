'use client';

import { createContext, useContext, useReducer } from "react";
import reducer from './reducer';
import { Teacher } from "@/models/Teacher";
import { Student } from "@/models/Student";

const AppContext = createContext({ students: [], teachers: []});


export const useAppContext = () =>  useContext(AppContext);

const INITIAL_STATE: { teachers: Teacher[], students: Student[] }  = {
    teachers: [],
    students: []
}



export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
    //@ts-ignore
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    return (
        // @ts-ignore
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    )
}


