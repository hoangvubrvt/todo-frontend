var React = require('react');
var ReactDOM = require('react-dom');
var ListManager = require('./components/ListManager.jsx');

ReactDOM.render(<ListManager title="Ingredients"/>, document.getElementById('ingredients'));
ReactDOM.render(<ListManager title="TO DO"/>, document.getElementById('todo'));
ReactDOM.render(<ListManager title="Hello React" headingColor="#b31217"/>, document.getElementById('helloreact'));