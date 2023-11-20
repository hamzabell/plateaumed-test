import { Teacher } from "@/models/Teacher";
import { faker } from '@faker-js/faker';


export async function GET(request: Request) {

    const teachersList: Teacher[] = [];


    for (let i = 0; i < 20; i++){
       
        const newTeacher: Teacher = {
            name: faker.person.firstName(),
            surname: faker.person.lastName(),
            nationalID: parseInt(faker.string.numeric(11)),
            teacherNumber: parseInt(faker.string.numeric(11)),
            title: faker.helpers.arrayElement(['Dr', 'Prof', 'Mr', 'Mrs', 'Miss']),
            salary: parseInt(faker.finance.amount()),
            dob: `${faker.date.between({ from: new Date().setFullYear(1980), to: new Date().setFullYear(1990)}).toLocaleDateString()}`
        }
    


        teachersList.push(newTeacher);
    }

    return new Response(JSON.stringify({
        data: teachersList
    }))
}