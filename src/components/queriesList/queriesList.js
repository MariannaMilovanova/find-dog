import React, { Component } from 'react';
import {get} from 'lodash';
import recycleBin from '../../assets/recycle-bin.png'
import './date.js';
import _ from 'lodash';
import './queriesList.css';

class QueriesList extends Component {
    handleDelete = (id) => {
        this.props.deleteQuery(id);
    };
    render() {
        if (!get(this, 'props.searchHistory[0]', true)) {
            return <div></div>
        }
        return (
            <div className="queries-list-wrapper">
                <div className='search-history-table'>
                    <div>
                        {this.props.searchHistory.map((item, i) =>{
                                return (
                                    <div key={i} className='search-history-item'>
                                        <div className='search-history-cell-img'>
                                            <img src={recycleBin} className='recycle-bin-img' onClick={()=>this.handleDelete(item.id)}/>
                                            <div>{item.term}</div>
                                        </div>
                                        <div className='search-history-cell'>{_.round(item.center.lat, 6)}</div>
                                        <div className='search-history-cell'>{_.round(item.center.lng, 6)}</div>
                                        <div className='search-history-cell-radius'>{_.round(item.radius/1000)}km</div>
                                        <div className='search-history-cell-date'>{new Date(Date.parse(item.date)).customFormat('#MMM# #DD#, #YYYY# #hh#:#mm# #AMPM#')}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default QueriesList;