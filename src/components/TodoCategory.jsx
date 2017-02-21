var React = require('react');
var TodoList = require('./TodoList.jsx');
var HTTP = require('../services/httpservice');
var TodoCategory = React.createClass({

    getInitialState: function() {
        return {
            items: [],
            newItem: {
                title: '',
                description: '',
                created_at: ''
            }
        };
    },

    handleSubmit: function(e) {
        e.preventDefault();

        HTTP.post(`/todos?category=${this.props.categoryKey}`, this.state.newItem).then(function(bodyResponse) {
            switch(bodyResponse.type) {
                case 'success': {
                    let todos = bodyResponse.data.todos;
                    this.setState({
                        items: todos,
                        newItem: {
                            title: '',
                            description: '',
                            created_at: ''
                        }
                    });
                    break;
                }
                case 'fail': {
                    console.log(bodyResponse.data);
                    break;
                }

                case 'error': {
                    console.log(bodyResponse.message);
                    break;
                }
            }
        }.bind(this)).catch(err => {console.log(err)});
    },
    
    onTitleChange: function(e) {
        var item = this.state.newItem;
        item.title = e.target.value;

        this.setState({
            newItem: item
        })
    },

    onDescriptionChange: function(e){
      var item = this.state.newItem;
      item.description = e.target.value;
      this.setState({newItem: item});
    },

    componentWillMount: function() {
        HTTP.get('/todos?category='+this.props.categoryKey).then(function(bodyResponse){

            if(bodyResponse.type === 'success'){
                let todoItems = bodyResponse.data.todos.length > 0 ? bodyResponse.data.todos : [];
                this.setState({items: todoItems});
            }

        }.bind(this)).catch(function(err){
            console.log(err);
        });
    },

    render: function() {
        var divStyle = {
            marginTop: 10
        };

        var headingStyle = {};

        if(this.props.headingColor){
            headingStyle.background = this.props.headingColor;
        }
        return (
            <div style={divStyle} className="col-sm-4">
                <div className="panel panel-primary">
                    <div style={headingStyle} className="panel-heading">
                        <h3>{this.props.title}</h3>
                    </div>
                    <div className="panel-body">
                         <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label>Title</label>
                                <input className="form-control" onChange={this.onTitleChange} value={this.state.newItem.title}/>
                            </div>

                            <div className="form-group">
                                <label>Description</label>
                                <textarea className="form-control" rows="5" onChange={this.onDescriptionChange} value={this.state.newItem.description}></textarea>
        
                            </div>
            
                            <div className="form-group">
                                <button className="btn btn-primary">Add</button>
                            </div>
                           
                        </form>
                    </div>
                    <TodoList items={this.state.items}/>
                </div>
            </div>
        );
    }
});

module.exports = TodoCategory;