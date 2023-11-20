import { Student } from "@/models/Student";
import { faker } from '@faker-js/faker';


export async function GET(request: Request) {

    const studentsList: Student[] = [];


    for (let i = 0; i < 20; i++){
       
        const newStudent: Student = {
            name: faker.person.firstName(),
            surname: faker.person.lastName(),
            nationalID: parseInt(faker.string.numeric(11)),
            studentNumber: parseInt(faker.string.numeric(11)),
            dob: `${faker.date.between({ from: new Date().setFullYear(2003), to: new Date().setFullYear(2018)}).toLocaleDateString()}`
        }


        studentsList.push(newStudent);
    }

    return new Response(JSON.stringify({
        data: studentsList
    }))
}