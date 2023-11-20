import { Student } from "@/models/Student";
import { Teacher } from "@/models/Teacher";

export default function reducer(state: { teachers: Teacher[], students: Student[] }, action: { type: string, payload?: any }) {
    switch(action.type) {
        case 'ADD_TEACHER':
            return { ...state, teachers: [...state.teachers, action.payload ]}
        case 'ADD_STUDENT':
            return { ...state, students: [...state.students, action.payload ]}
        case "INIT_TEACHERS_LIST": 
            return { ...state, teachers: [...action.payload] }
        case "INIT_STUDENT_LIST": 
            return { ...state, students: [...action.payload] }
    }

}