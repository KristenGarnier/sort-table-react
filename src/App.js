import React, {Component} from 'react';
import moment from 'moment';
import _ from 'lodash';

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
                    <div className="col-md-6">
                        <input className="form-control" placeholder="Username" type="text" data-type='user.username'
                               value={this.state.filter.type === 'user.username' ? this.state.filter.value : ''}
                               onChange={this._handleChange}/>
                    </div>
                    <div className="col-md-6">
                        <input className="form-control" placeholder="jour-mois-année" type="date" data-type='date'
                               value={this.state.filter.type === 'date' ? this.state.filter.value : ''}
                               onChange={this._handleChange}/>
                    </div>
                </div>
            </div>


            <table className="table table-striped tablesorter">
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
            return commands.map((item, i) => {
                return <tr key={i}>
                    <td>{item.user.username}</td>
                    <td>{moment(item.date).format('d / MM / Y')}</td>
                    <td>{item.stls.length}</td>
                </tr>
            });
        } else {

            return commands.filter(item => {
                    if (_.get(item, filter.type) === undefined) {
                        return item;
                    }

                    if (filter.type === 'date') {
                        return moment(String(_.get(item, filter.type))).isSame(filter.value, 'day');
                    }

                    return String(_.get(item, filter.type)).includes(filterTrim);
                })
                .map((item, i) => {
                    return <tr key={i}>
                        <td>{item.user.username}</td>
                        <td>{moment(item.date).format('D / MM / Y')}</td>
                        <td>{item.stls.length}</td>
                    </tr>
                });
        }
    }

    _handleSort(action) {
        const commands = this.state.commands;
        const oldState = this.state.oldState;
        const sort = _.partial(this.sortApply, commands);

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

    sortApply(collection, filter) {
        if (filter !== 'stls') {
            if (collection[0].id === _.sortByOrder(collection, [filter], ['asc'])[0].id) {
                this.setState({
                    commands: _.sortByOrder(collection, [filter], ['desc'])
                });
            } else {
                this.setState({
                    commands: _.sortByOrder(collection, [filter], ['asc'])
                });
            }

        } else {
            let change = collection;
            if (collection[0].stls.length > collection[collection.length - 1].stls.length) {
                this.setState({
                    oldState: collection,
                    commands: change.sort((a, b) => {
                        return a.stls.length - b.stls.length
                    })
                });
            } else {
                this.setState({
                    oldState: collection,
                    commands: change.sort((a, b) => {
                        return b.stls.length - a.stls.length
                    })
                });
            }
        }
    }
}

export default Table;
