var React = require('react');
var TodoItem = require('./TodoItem.jsx');

var TodoList = React.createClass({

    render: function() {
        var createItem = function(item, index){
            return <TodoItem key={index + item.title} item={item}/>;
        }

        return (
            <ul>
                {this.props.items.map(createItem)}
            </ul>
        );
    }
});

module.exports = TodoList;