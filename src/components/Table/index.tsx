import { TableHeader } from "@/models/Table"

 

export default function Table({ children }: { children: React.ReactNode }) {
    return (
        <table className="w-full h-full" data-testid="table">
            {children}
        </table>
    )
}


function TableHead({ children }: { children: React.ReactNode }){
    return (
        <thead className="bg-[#fcfcfc] w-full  h-[70px] border border-[#55565A12] " data-testid="table-head">
            {children}
        </thead>
    )
}

function Head({ children }: { children: React.ReactNode }){
    return (
        <th className={`py-[24px] text-left text-[#121212] text-[14px] font-bold`} data-testid="table-header">
            {children}
        </th>
    )
}

function TableRow({ children, index }: { children: React.ReactNode, index: number }) {
    return (
        <tr className={`${index%2==0 ? 'bg-white': 'bg-[#FCFCFC]'} border border-[#55565A12]`} data-testid="table-row">
            {children}
        </tr>
    )
}

function TableData({children, otherClassNames, colSpan }: { children: React.ReactNode, otherClassNames?: string, colSpan?: number  }) {

    return (
        <td className={`py-[24px] text-left text-[#7D8398] text-[14px] font-normal ${otherClassNames}`} colSpan={colSpan} data-testid="table">
            {children}
        </td>
    )
}

function TableFooter({ 
    current, 
    total,
    prev, 
    next 
    }: {
        current: number,
        total: number,
        prev: () => void,
        next: () => void
    }) {
    return (
        <div className="flex justify-center gap-x-8 mt-8 w-full"  data-testid="table-footer">
            <a onClick={prev} className="cursor-pointer hover:underline text-[#2674FD] text-[1rem] font-semibold">Prev</a>
            <p className="text-[#7D8398] font-medium">Page {current} of {total}</p>
            <a onClick={next} className="cursor-pointer hover:underline text-[#2674FD] text-[1rem] font-semibold">Next</a>
        </div>
    )
}


function DataTable({ headers, data }: { headers: TableHeader[] , data?: any[] }) {
    return (
        <Table>
        <Table.Head>
            <Table.Row index={0}>

            {
                headers.map((header, index) => (
                    <Table.Header key={index}>{header.name}</Table.Header>

                ))
            }
            </Table.Row>
        </Table.Head>

        <tbody>
            {
                data?.map((row, index) => (
                    <Table.Row index={index} key={index}>
                        {
                            headers.map((header, index) => (
                                <Table.Data key={index}>{row[header.key]}</Table.Data>
                            ))
                        }
                    </Table.Row>
                ))
            }

            {
                (!data || data?.length == 0) && (
                    <Table.Row index={0}>
                        <Table.Data otherClassNames="text-center" colSpan={headers.length}>No Records available!</Table.Data>
                    </Table.Row>
                )
            }
        </tbody>
    </Table>
    )
}


Table.Head = TableHead;
Table.Header = Head;
Table.Row = TableRow;
Table.Data = TableData;
Table.Footer = TableFooter;
Table.DataTable = DataTable;