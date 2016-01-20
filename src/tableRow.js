import React from 'react';

const TableRow = ({username, date, productNb}) => {
    return (<tr>
        <td>{username}</td>
        <td>{date}</td>
        <td>{productNb}</td>
    </tr>
    )
};

TableRow.propTypes = {
    username: React.PropTypes.string.isRequired,
    date: React.PropTypes.string.isRequired,
    productNb: React.PropTypes.number.isRequired
};

export default TableRow;