import { Student } from "@/models/Student"
import { TableHeader } from "@/models/Table"
import { Teacher } from "@/models/Teacher"

export const teacherHeader: TableHeader[] = [
    {
        name: 'National ID',
        key: 'nationalID'
    },
    {
        name: 'Title',
        key: 'title'
    },
    {
        name: 'Name',
        key: 'name'
    },
    {
        name: 'Surname',
        key: 'surname'
    },
    {
        name: 'Date of Birth',
        key: 'dob'
    },
    {
        name: "Teacher Number",
        key: 'teacherNumber'
    },
    {
        name: 'Salary',
        key: 'salary'
    }
]

export const studentHeader: TableHeader[] = [
    {
        name: 'National ID',
        key: 'nationalID'
    },
    {
        name: 'Name',
        key: 'name'
    },
    {
        name: 'Surname',
        key: 'surname'
    },
    {
        name: 'Date of Birth',
        key: 'dob'
    },
    {
        name: "Student Number",
        key: 'studentNumber'
    }
]
