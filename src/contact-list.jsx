// display contact list

import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class ContactList extends Component {

    constructor(props) {

        super(props);
        this.state = {name: '', group: '', mobile: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleDel = this.handleDel.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        
    }

    handleChange(event) {
        this.setState({[event.target.id]: event.target.value});
    }
    
    handleAdd(event) {
        this.props.addContact(this.state);
        this.setState({name: '', group: '', mobile: ''});
        event.preventDefault();
    }

    handleDel(event) {
        this.props.delContact(event.target.id);
        event.preventDefault();
    }

    handleSelect(event) {
        
        event.preventDefault();
    }


    render(){

        const contacts = this.props.contacts;
        const groups = this.props.groups;
        const list = contacts.map((contact) => {
            return (
                <form id={contact.id} onSubmit={this.handleDel} className="input-form" key={contact.id}>
                    <Link to={"/contact/"+contact.id} className="list-item list-link">
                        {contact.name}
                    </Link>
                    <span className="list-item">{contact.group}</span>
                    <span className="list-item">{contact.mobile}</span>
                    <button type="submit">-</button>
                </form>
            )
        });

        return (
            <div className="content">
                <h1>Contact List</h1>
                {list}
                <form onSubmit={this.handleAdd} className="input-form">
                    <input type="text" id="name" value={this.state.name} onChange={this.handleChange} placeholder="Name"/>
                    {/* <input type="text" id="group" value={this.state.group} onChange={this.handleChange} placeholder="Group"/> */}
                    <select id="group" className="list-select" value={this.state.group} onChange={this.handleChange}>
                        <option value='' disabled>Select Group</option>
                        {groups.map((group) => 
                            <option key={group.id} name={group.name} value={group.name}>{group.name}</option>
                        )}
                    </select>
                    <input type="text" id="mobile" value={this.state.mobile} onChange={this.handleChange} placeholder="Mobile"/>
                    <button type="submit">+</button>
                </form>
            </div>
        );

    }

}

export default ContactList