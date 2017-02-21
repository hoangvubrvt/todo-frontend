var React = require('react');
var ListItem = require('./ListItem.jsx');

var ingredients = [{"id": 1, "title": "ham"}, {"id": 2, "title": "cheese"}, {"id": 3, "title": "tomato"}];

var List = React.createClass({

    render: function() {
        var createItem = function(item, index){
            return <ListItem key={index + item.title} item={item}/>;
        }

        var listItems = ingredients.map((item) => {
            return <ListItem key={item.id} ingredient={item.title}/>
        });

        return (
            <ul>
                {this.props.items.map(createItem)}
            </ul>
        );
    }
});

module.exports = List;