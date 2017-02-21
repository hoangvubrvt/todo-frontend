var React = require('react');
var TodoCategory = require('./TodoCategory.jsx');
var HTTP = require('../services/httpservice');
var CategoryList = React.createClass({    

    render: function() {
        createCategory = function(category, index){
            return ( <div key={index+category.key} id={index+":"+category.key}>
                        <TodoCategory  categoryKey={category.key} title={category.title}/>
                    </div>)
        }
        return (<div>{this.props.categories.map(createCategory)}</div>);
    }
});

module.exports = CategoryList;