function showAction(show, type){
    
    if(show){
        if(type === 'th'){
            return <th>Ações</th>
        }
    }

    if(show){
        if(type === 'td'){
            return (
                <td>
                    <span className="btn-delete">
                        delete
                    </span>
                </td>                
            )
        }
    }    

    return null;
}

const ImoveisList = (props) => {
    const {items, table } = props;
    
    return (
        <div>
            <table className="table">
                <thead className="thead-light">                    
                    <tr>
                        {table.columns.map(column => (
                            <th key={column.name} >{column.name}</th>
                        ))}
                        {showAction(table.show_action_column, 'th')}
                    </tr>
                </thead>
                <tbody>
                {items.map(item => (
                    <tr key={item.id}>
                        {table.columns.map(column => (
                            <td key={column.name} > { item[column.mapping] } </td>
                        ))}     
                        {showAction(table.show_action_column, 'td')}
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ImoveisList;