import './styles.scss';

interface DASHBOARD_TABLE_SWITCH_PROPS {
    options: string[],
    defaultValue: string,
    $emit: (val: string) => void
}

function DashboardTableViewSwitch({ options, defaultValue, $emit  }: DASHBOARD_TABLE_SWITCH_PROPS){
    return (
        <div className="table-switch w-full h-[40px] pb-[16px] border-b border-[#55565A12] flex gap-x-8"  >

            
            {
                options.map((option, index) => (
                    <div className='flex' key={index}>
                        <input data-testid="switch-input" type="radio" name="switch" value={option}  id={`switch${index}`} className='hidden' defaultChecked={defaultValue == option}  onChange={e => e.target.checked && $emit(e.target.value)}/>

                        <label data-testid="switch-label" htmlFor={`switch${index}`} className='text-[#7D8398] font-medium text-[16px] cursor-pointer'  key={index} >
                            {option}
                        </label>
                    </div>
                ))
            }
        </div>
    )
}


export default DashboardTableViewSwitch;