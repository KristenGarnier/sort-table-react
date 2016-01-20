import React from 'react';
import TableRow from './tableRow';
import moment from 'moment';

const capitalize = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export function renderRows(item, i) {
    return <TableRow key={i} username={item.user.username}
                     date={moment(item.date).format('D / MM / Y')}
                     productNb={item.stls.length}
    />
}

export function usernameCapitalize(collection){
    return collection.map(item => {
        return {
            ...item,
            user:{
                ...item.user,
                username: capitalize(item.user.username)
            }
        }
    });
}