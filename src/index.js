import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css";

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
        this.setState({value: ""});
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

function Item(props) {        
    return (
        <li onClick = {props.onClick} className = {props.className}>
            {props.item.name}
        </li>
    );
} 

function DoneItems(props) {
    const doneItems = props.items.map((item, index) => 
        <Item key = {index} 
            item = {item} 
            onClick = {() => props.clickOnItem(item)} 
            className = "itemDone"/>
    );
    return (
        <ul>{doneItems}</ul>        
    );
}

function NotDoneItems(props) {
    const notDoneItems = props.items.map((item, index) => 
        <Item key = {index} 
            item = {item} 
            onClick = {() => props.clickOnItem(item)} 
            className = "itemNotDone"/>
    );
    return (        
        <ul>{notDoneItems}</ul>
    );
}

function RemoveItem(props) {
    return (
        <button onClick = {props.removeDoneItems}>Remove Done</button>
    );
}

class TodoItemsList extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(item){              
        this.props.clickOnItem(item);        
    }
    render() {
        const doneItems = this.props.items.filter(item => item.isDone);
        const notDoneItems = this.props.items.filter(item => !item.isDone);        
     
        return(
            <div>
                <NotDoneItems items = {notDoneItems} clickOnItem = {this.handleClick}/>
                <hr />
                <DoneItems items = {doneItems} clickOnItem = {this.handleClick}/>    
            </div>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: ITEMS,            
        };
        this.addItem = this.addItem.bind(this);
        this.clickOnItem = this.clickOnItem.bind(this);
        this.removeDoneItems = this.removeDoneItems.bind(this);
    } 

    addItem(item) {        
        this.setState(
            {items: this.state.items.concat(item)}
        );        
    }

    clickOnItem(i) {        
        const items = this.state.items;
        const position = items.indexOf(i);
        items[position] = updateDone(i);
        
        this.setState({
            items: items
        });
    }

    removeDoneItems() {        
        const newItems = this.state.items.filter(item => !item.isDone)
        this.setState({
            items: newItems
        });
    }

    render() {
        return (
            <div>
                <NewItem items = {this.state.items} addItem = {this.addItem}/>
                <TodoItemsList items = {this.state.items} clickOnItem = {this.clickOnItem}/>
                <RemoveItem items = {this.state.items} removeDoneItems = {this.removeDoneItems}/>
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

function updateDone(item) {
    return createNewItem(item.name, !item.isDone)
}