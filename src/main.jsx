var React = require('react');
var ReactDOM = require('react-dom');
var CategoryList = require('./components/CategoryList.jsx');
var HTTP = require('./services/httpservice');
var Promise = require('promise-polyfill');

if(!window.Promise){
    window.Promise = Promise;
}

var Main = React.createClass({
    getInitialState: function() {
        return {
            categories: [],
            newCategory: {
                key: '',
                title: '',
            }
        };
    },

    componentWillMount: function() {
        HTTP.get('/categories').then(function(bodyResponse) {
            this.setState({categories: bodyResponse.data.categories});
        }.bind(this)).catch(function(err){
            console.log(err);
        });
    },

    onKeyChange: function(e){
        var category = this.state.newCategory;
        category.key = e.target.value;
        this.setState({
            newCategory: category
        });
    },

    onTitleChange: function(e){
        var category = this.state.newCategory;
        category.title = e.target.value;

        this.setState({
            newCategory: category
        })
    },

    handleSubmit: function(e){
        e.preventDefault();
        HTTP.post('/categories', this.state.newCategory).then(function(bodyResponse) {
            var currentCategories = this.state.categories;
            currentCategories.push(bodyResponse.data);

            this.setState({
                categories: currentCategories,
                newCategory: {
                    key: '',
                    title: '',
                }   
            });
        }.bind(this)).catch(function(err){
            console.log(err);
        });
    },

    render: function() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">Create new todo category</h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label>Category Key</label>
                                <input className="form-control" onChange={this.onKeyChange} value={this.state.newCategory.key}/>
                            </div>

                            <div className="form-group">
                                <label>Category Title</label>
                                <input className="form-control" onChange={this.onTitleChange} value={this.state.newCategory.title}></input>
                            </div>
                    
                            <div className="form-group">
                                <button className="btn btn-primary">Add New Category</button>
                            </div>              
                    </form>
                </div>
                <CategoryList categories={this.state.categories}/>
            </div>
        );
    }
});

ReactDOM.render(<Main/>, document.getElementById('container'));