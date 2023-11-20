'use client';
import dynamic from "next/dynamic";
import { Table, DashboardCard, DashboardTableViewSwitch } from "@/components"
import AddStudentModal from "@/components/Modal/AddStudentModal";
import AddTeacherModal from "@/components/Modal/AddTeacherModal";
import React from "react"
import { useAppContext } from "@/context";
import { studentHeader, teacherHeader } from "./data";
import paginate from "@/utils/paginate";




export default function Home() {
  const itemsPerPage = 5;
  const [view, setView] = React.useState('Teachers');
  const [modalOpen, setModalOpen] = React.useState({ student: false, teacher: false });
  const [page, setPage] = React.useState(1);

  const [isClient, setIsClient] = React.useState(false);

  // @ts-ignore
  const { state, dispatch } = useAppContext();


  const totalNumberOfPages = (): number => view == 'Students' ? Math.ceil(state.students.length / itemsPerPage) : Math.ceil(state.teachers.length / itemsPerPage);

  const previousPage = () => {
    if(page  > 1) setPage(prev => prev - 1)

  }

  const nextPage = (totalNumberOfPages: number) => {
    if (page < totalNumberOfPages) setPage(prev => prev + 1);

  }


  React.useEffect(() => {
    setIsClient(true);
  }, [])


  React.useEffect(() => {
    
    const fetchStudents = async () => {
      await fetch('/api/get-students')
            .then(res => res.json())
            .then(data => dispatch({ type: 'INIT_STUDENT_LIST', payload: data.data }))
    }

    const fetchTeachers = async () => {
      await fetch('/api/get-teachers')
            .then(res => res.json())
            .then(data => dispatch({ type: 'INIT_TEACHERS_LIST', payload: data.data }))
    }

    fetchStudents();
    fetchTeachers();
  }, [])

  return (
      <main className='flex flex-col '>
        <div className="actions flex justify-end gap-x-4">
          <button className='btn btn-secondary w-[9.5625rem]' onClick={() => setModalOpen(prev => ({ ...prev, student: true }))}>Add Student</button>
          <button className="btn btn-primary w-[9.5625rem]" onClick={() => setModalOpen(prev => ({ ...prev, teacher: true }))}>Add Teacher</button>
        </div>


    
        <div className="metrics flex gap-x-8 justify-end mt-8">
          <DashboardCard 
            title='Total Records' 
            count={(state.teachers.length + state.students.length)}
            type='primary'
          />
          <DashboardCard 
            title='Number of Teachers' 
            count={state.teachers.length}
            type='tertiary'
        />
          <DashboardCard 
            title='Number of Students' 
            count={state.students.length}
            type='secondary'
          />
        </div>


        <div className="mt-16">
          <DashboardTableViewSwitch options={['Teachers', 'Students']}  
            defaultValue={view} 
            $emit={newView => {
              setView(newView);

              // reset page to the first page on switch
              setPage(1);
            }}/>
        </div>


      {
        isClient && (
          <div className="data mt-8">

            {view == 'Students' &&  <Table.DataTable headers={studentHeader} data={paginate({ items: state.students, itemsPerPage, page })} />}

            {view == 'Teachers' && <Table.DataTable headers={teacherHeader} data={paginate({ items: state.teachers, itemsPerPage, page })} />}

            <Table.Footer 
              current={page} 
              total={totalNumberOfPages()} 
              prev={() => previousPage()} 
              next={() => nextPage(totalNumberOfPages())} 
            />

          </div>
        )
      }



        {/** Modals */}
        <AddTeacherModal 
          open={modalOpen.teacher}
          toggle={() =>  setModalOpen(prev => ({ ...prev, teacher: false }))} 
        />

        <AddStudentModal 
          open={modalOpen.student}
          toggle={() => setModalOpen(prev => ({ ...prev, student: false }))} 
        />

      </main>
  )
}
