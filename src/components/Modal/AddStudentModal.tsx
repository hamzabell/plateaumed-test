import Modal from ".";
import Form from "../Form";
import * as yup from 'yup';
import './styles.scss';
import { useAppContext } from "@/context";

export default function AddStudentModal({ toggle, open  }: { toggle: () => void,  open?: boolean }) {
    const schema = yup.object(
        {
            nationalID: yup.string().required().label('National ID Number'),
            name: yup.string().required().label('Name'),
            surname: yup.string().required().label('Surname'),
            // @ts-ignore
            dob: yup.mixed().test({
                name: 'validate-date',
                test: function (dob: Date | null) {
                    if (dob) {
                        const age = new Date().getFullYear() - new Date(dob).getFullYear();

                        if ( age > 22 ){
                            return this.createError({
                                message: "Student must be younger than 22 years old!",
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
            studentNumber: yup.string().required().label('Student Number'),
        }
    ).required()


     // @ts-ignore
     const { dispatch } = useAppContext()


     const onSubmit  = (data: any) => {
        dispatch({ type: 'ADD_STUDENT', payload: data });
        toggle();
     }

    return (
        <Modal toggle={toggle} open={open}>
            <Form schema={schema} submitFn={onSubmit}>
                <Form.Input labelName="National ID Number" type="number" placeholder="National ID Number" name="nationalID" />

                <Form.Input labelName="Name" type="text" placeholder="Name" name="name"/>
                <Form.Input labelName="Surname" type="text" placeholder="Surname" name="surname"/>
                <Form.Input labelName="Date of Birth" type="date" placeholder="Date of Birth" name="dob"/>
                <Form.Input labelName="Student Number" type="text" placeholder="Student Number" name="studentNumber"/>

                <Form.Button title="Add New Student"  />
            </Form>
        </Modal>
    )
}