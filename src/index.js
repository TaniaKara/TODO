import React from 'react';
import ReactDOM from 'react-dom';

const ITEMS = [
    {"name": "Item1", "isDone": false},
    {"name": "Item2", "isDone": false},
    {"name": "Item3", "isDone": false},
    {"name": "Item4", "isDone": false},
];

class NewItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ""};

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange = (event) => this.setState({value: event.target.value});

    handleClick(event) {
        event.preventDefault();
        const newItem = createNewItem(this.state.value);             
        this.props.addItem(newItem);        
    }    

    render() {
        return(
            <form>            
                <input 
                    type = "text" 
                    value = {this.state.value} 
                    placeholder = "New item..."
                    onChange = {this.handleChange} />
                <button 
                    type = "submit"
                    onClick = {this.handleClick}
                    >
                    Add
                </button>            
            </form>
        );
    }
}

const Item = (props) => <li>{props.item.name}</li>;    

class TodoItemsList extends React.Component {
    render() {
        const items = this.props.items.map((item, index) => <Item key = {index} item = {item}/>);
        return(
            <ul>{items}</ul>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: ITEMS
        };
        this.addItem = this.addItem.bind(this);
    } 

    addItem(item) {        
        this.setState(
            {items: this.state.items.concat(item)}
        );        
    }

    render() {
        return (
            <div>
                <NewItem items = {this.state.items} addItem = {this.addItem}/>
                <TodoItemsList items = {this.state.items}/>
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

function createNewItem(name, isDone = false) {
    return {
        name, 
        isDone
    };
}