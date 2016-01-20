import React, {Component} from 'react';
import moment from 'moment';
import {get as getProp, partial, sortByOrder}  from 'lodash';
import Input from './input';
import {renderRows, usernameToLowerCase} from './utilis';

class Table extends Component {
    constructor() {
        super();

        this._handleChange = this._handleChange.bind(this);
        this._handleSort = this._handleSort.bind(this);
        this.sortApply = this.sortApply.bind(this);

        this.state = {
            commands: window.doc,
            filter: {
                type: '',
                value: ''
            }
        }
    }

    render() {
        return <div className="container">
            <div className="form-group">
                <div className="row">
                    <Input placeholder="Username" type="text" Dt='user.username'
                           value={this.state.filter.type === 'user.username' ? this.state.filter.value : ''}
                           change={this._handleChange} label="Filtrer par nom d'utilisateur"/>

                    <Input placeholder="jour-mois-année" type="date" Dt='date'
                           value={this.state.filter.type === 'date' ? this.state.filter.value : ''}
                           change={this._handleChange} label="Filtrer par date"/>
                </div>
            </div>


            <table className="table table-striped">
                <thead>
                <tr>
                    <th onClick={() => this._handleSort('user')}>Nom d'utilisateur</th>
                    <th onClick={() => this._handleSort('date')}>Date de commande</th>
                    <th onClick={() => this._handleSort('qty')}>nb produits</th>
                </tr>
                </thead>
                <tbody>
                {this._renderTrs(this.state.filter, this.state.commands)}
                </tbody>
            </table>
        </div>
    }

    _handleChange(event) {
        this.setState({
            filter: {
                value: event.target.value,
                type: event.target.dataset.type
            }
        });
    }

    _renderTrs(filter, commands) {
        const filterTrim = filter.value.trim();
        if (filterTrim === '') {
            return commands.map(renderRows);
        } else {

            return commands.filter(item => {
                    if (getProp(item, filter.type) === undefined) {
                        return item;
                    }

                    if (filter.type === 'date') {
                        return moment(String(getProp(item, filter.type))).isSame(filter.value, 'day');
                    }

                    return String(getProp(item, filter.type)).toLowerCase().includes(filterTrim.toLowerCase());
                })
                .map(renderRows);
        }
    }

    _handleSort(action) {
        const commands = this.state.commands;
        const sort = partial(this.sortApply, commands);

        switch (action) {
            case 'user':
                sort('user.username');
                break;
            case 'date':
                sort(action);
                break;
            case 'qty':
                sort('stls');
                break;
            default:
                console.log('Wrong content provided');
                break;
        }
    }

    sortApply(initial, filter) {
        console.log(initial);
        const collection = usernameToLowerCase(initial);
        console.log(collection);
        if (filter !== 'stls') {
            if (collection[0].id === sortByOrder(collection, [filter], ['asc'])[0].id) {
                this.setState({
                    commands: sortByOrder(collection, [filter], ['desc'])
                });
            } else {
                this.setState({
                    commands: sortByOrder(collection, [filter], ['asc'])
                });
            }

        } else {
            let change = collection;
            if (collection[0].stls.length > collection[collection.length - 1].stls.length) {
                this.setState({
                    commands: change.sort((a, b) => {
                        return a.stls.length - b.stls.length
                    })
                });
            } else {
                this.setState({
                    commands: change.sort((a, b) => {
                        return b.stls.length - a.stls.length
                    })
                });
            }
        }
    }
}

export default Table;
