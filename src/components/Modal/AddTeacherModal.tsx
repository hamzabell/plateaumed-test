import { useAppContext } from "@/context";
import Modal from ".";
import Form from "../Form";
import './styles.scss';
import * as yup from 'yup';

export default function AddTeacherModal({ toggle, open  }: { toggle: () => void, open?: boolean }) {
    const schema = yup.object(
        {
            nationalID: yup.string().required().label('National ID Number'),
            title: yup.string().nonNullable().required().label('Title').test('not-null', "${path} is a required field", async value => (await value) != "null"),
            name: yup.string().required().label('Name'),
            surname: yup.string().required().label('Surname'),

            // @ts-ignore
            dob: yup.mixed().test({
                name: 'validate-date',
                test: function (dob: Date | null) {
                    if (dob) {
                        const age = new Date().getFullYear() - new Date(dob).getFullYear();

                        if ( age < 21 ){
                            return this.createError({
                                message: "Teacher must be older than 21 years old!",
                                path: 'dob'
                            })
                        }

                        return true
                    } 

                    return this.createError({
                        message: "Date of Birth is Required!",
                        path: 'dob'
                    })
                }
            }),
            teacherNumber: yup.string().required().label('Teacher Number'),
            salary: yup.string().label('Salary')
        }
    ).required();

    // @ts-ignore
    const { dispatch } = useAppContext()


    const onSubmit  = (data: any) => {
        dispatch({ type: 'ADD_TEACHER', payload: data });
        toggle();
     }

    return (
        <Modal toggle={toggle} open={open}>

            <Form schema={schema} submitFn={onSubmit}>
                <Form.Input labelName="National ID Number" type="number" placeholder="National ID Number" name="nationalID" />

                <Form.Select labelName="Title" name="title" placeholder="Select your title" >
                    <option value="Mr">Mr</option>
                    <option value="Mrs">Mrs</option>
                    <option value="Miss">Miss</option>
                    <option value="Dr">Dr</option>
                    <option value="Prof">Prof</option>
                </Form.Select>

                <Form.Input labelName="Name" type="text" placeholder="Name" name="name"/>
                <Form.Input labelName="Surname" type="text" placeholder="Surname" name="surname"/>
                <Form.Input labelName="Date of Birth" type="date" placeholder="Date of Birth" name="dob"/>
                <Form.Input labelName="Teacher Number" type="text" placeholder="Teacher Number" name="teacherNumber"/>
                <Form.Input labelName="Salary" type="number" placeholder="Salary" name="salary" otherClasses="col-span-2"/>


                <Form.Button title="Add New Teacher"  />

            </Form>
        </Modal>
    )
}