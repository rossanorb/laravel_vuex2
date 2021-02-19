import BtnDelete from './contents/BtnDelete';
import Paginate from './contents/Paginate';

function showAction(type, props = null, item = {}){
    let show = false;
    let { table } = props;

    if(!!table.actions && table.actions.length ){
        show = true;
    }

    if(show){
        if(type === 'th'){
            return <th>Ações</th>
        }
    
        if(type === 'td'){
            return (
                <td>
                    { !!table.actions.includes('delete') && <BtnDelete id={item.id} confirmDelete={props.confirmDelete} />}                    
                </td>
            )
        }
    }    

    return null;
}

const Table = (props) => {
    const {items, table, paginate } = props;
    
    return (
        <div>
            <table className="table">
                <thead className="thead-light">                    
                    <tr>
                        {table.columns.map(column => (
                            <th key={column.name} >{column.name}</th>
                        ))}
                        {showAction('th', props)}
                    </tr>
                </thead>
                <tbody>
                {items.map(item => (
                    <tr key={item.id}>
                        {table.columns.map(column => (
                            <td key={column.name} > { item[column.mapping] } </td>
                        ))}     
                        {showAction('td', props, item)}
                    </tr>
                    ))}
                </tbody>
            </table>
            <Paginate 
                paginate={paginate}
                changePage={props.changePage}
            />
        </div>        
    )
}

export default Table;