import React from 'react';
import { useTable } from 'react-table';

function ResultsTable({ results }) {
    const data = React.useMemo(() => results, [results]);

    const columns = React.useMemo(() => [
        { Header: 'ID', accessor: 'id' },
        { Header: 'HCP', accessor: 'hcp' },
        { Header: 'Scratch', accessor: 'scratch' },
        { Header: 'Hits', accessor: 'hits' },
        { Header: 'Hole', accessor: 'hole' },
        { Header: 'Stableford HCP', accessor: 'stablefordHcp' },
        { Header: 'Stableford Scratch', accessor: 'stablefordScratch' },
        { Header: 'To Par HCP', accessor: 'toParHcp' },
        { Header: 'To Par Scratch', accessor: 'toParScratch' },
        { Header: 'Fecha de Creación', accessor: 'createdAt' },
        { Header: 'Última Actualización', accessor: 'updatedAt' },
    ], []);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

    return (
        <table {...getTableProps()} style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: '#4CAF50', color: 'white' }}>
                {headerGroups.map(headerGroup => (
                    <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th key={column.id} {...column.getHeaderProps()} style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => (
                                <td key={cell.id}{...cell.getCellProps()} style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>
                                    {cell.render('Cell')}
                                </td>
                            ))}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default ResultsTable;
