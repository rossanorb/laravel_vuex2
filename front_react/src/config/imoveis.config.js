const table = {    
        actions: ['delete'],
        columns: [
            {
                name: 'E-mail',
                mapping: 'email',
                sort: true
            },
            {
                name: 'Rua',
                mapping: 'rua',
                sort: true
            },
            {
                name: 'Bairro',
                mapping: 'bairro',
                sort: true                
            },
            {
                name: 'Status',
                mapping: 'contrato',
                sort: true
            }
        ]    
}

export {
    table
}