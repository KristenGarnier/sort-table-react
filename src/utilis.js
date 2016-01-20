import React from 'react';
import TableRow from './tableRow';
import moment from 'moment';

export function renderRows(item, i) {
    return <TableRow key={i} username={item.user.username}
                     date={moment(item.date).format('D / MM / Y')}
                     productNb={item.stls.length}
    />
}