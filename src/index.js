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

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            style: {"textDecoration": ""}
        }
        this.updateDone = this.updateDone.bind(this);
    }

    updateDone() {
        this.props.onClick();
        this.props.item.isDone ? 
            this.setState({style: {"textDecoration": "line-through"}})
            : this.setState({style: {"textDecoration": ""}})        
    }

    render() {
        return (
            <li style = {this.state.style} onClick = {() => this.updateDone()}>{this.props.item.name}</li>
        );
    }
} 
        

class TodoItemsList extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(item){
        // cross out the item name
        this.props.clickOnItem(item);
        
    }

    render() {
        const items = this.props.items.map((item, index) => 
            <Item 
                key = {index} 
                item = {item}
                onClick = {() => this.handleClick(item)}
            />
        );
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
        this.clickOnItem = this.clickOnItem.bind(this);
    } 

    addItem(item) {        
        this.setState(
            {items: this.state.items.concat(item)}
        );        
    }

    clickOnItem(i) {
        // in the item change the isDone to reversed value
        // replace the element in the Items list

        const items = this.state.items;
        const index = items.indexOf(i);
        items[index] = updateDone(i);//createNewItem(items[index].name, !items[index].isDone);

        this.setState({
            items: items
        });
        
    }

    render() {
        return (
            <div>
                <NewItem items = {this.state.items} addItem = {this.addItem}/>
                <TodoItemsList items = {this.state.items} clickOnItem = {this.clickOnItem}/>
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