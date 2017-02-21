var React = require('react');
var List = require('./List.jsx');

var ListManager = React.createClass({

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
        var currentItems = this.state.items;
        currentItems.push(this.state.newItem);
        this.state.newItem.created_at = Date.now();
        this.setState({
            items: currentItems,
            newItem: {
                title: '',
                description: '',
                created_at: ''
            }
        });
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
                    <List items={this.state.items}/>
                </div>
            </div>
        );
    }
});

module.exports = ListManager;