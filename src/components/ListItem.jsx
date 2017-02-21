var React = require('react');
var moment = require('moment');
var ListItem = React.createClass({
    render: function() {
        var item = this.props.item;
        var createdAt = moment(item.created_at).format("MM-DD-YYYY");
        return (
            <li>
                <h4>{item.title} - {createdAt}</h4>
                <p>{item.description}</p>
            </li>
        );
    }
});

module.exports = ListItem;