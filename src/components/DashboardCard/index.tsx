import './styles.scss';

interface DASHBOARD_CARD_PROPS {
    title: string,
    count: string,
    type: 'primary' | 'secondary' | 'tertiary'
}



export default function DashboardCard({ title, count, type }: DASHBOARD_CARD_PROPS) {
    return (
        <div className={`dashboard-card w-[15.9375rem] h-[11.3125rem] rounded-[1.25rem] flex flex-col p-8 dashboard-card-${type} cursor-pointer hover:shadow-sm`}>
            <h1 className="text-[#7D8398] text-[1rem] font-bold">{title}</h1>

            <p className="text-[#3B3C3E]  text-[3rem] font-medium">{count}</p>
        </div>
    )
}
