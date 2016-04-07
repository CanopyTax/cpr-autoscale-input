import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

var html = function(size, family) {
	return '<div style="position: absolute;"><span style="font-family:' + family + ';font-size:' + size + '; font-weight:400;"></span></div>';
};

var CanopyAutoscaleInput = React.createClass({

  componentWillReceiveProps: function(props) {
    this.measureAndSize(props.value);
  },

  componentDidMount: function() {
    this.measureAndSize();
  },

  measureAndSize: function(text) {
    let input = ReactDOM.findDOMNode(this);
    text = text || input.value;
    if (this.props.inputAttrs && this.props.inputAttrs.placeholder) text = text || this.props.inputAttrs.placeholder;
    text = text.length < 2 ? 'HI' : text;
    text = text.replace(/\s/g, "_");
    if(this.props.inputAttrs && this.props.inputAttrs.maxLength) text = text.substring(0,this.props.inputAttrs.maxLength);

    let $input = $(input);
    var measuredEl = $(html($input.css('font-size'), $input.css('font-family').replace(/\"/g, "'")));
    measuredEl.find('span').text(text);
    $input.after(measuredEl);
    $input.css('width', measuredEl[0].offsetWidth + 6 + 'px');
    measuredEl.remove();
  },

  handleChange: function(property, event) {
    this.measureAndSize();
    // Call parent callback
    this.props.onChange(property, event);
  },

  render: function() {
    return (
      <input name={this.props.propName} value={this.props.value} onChange={this.handleChange.bind(this, this.props.propName)} readOnly={this.props.readOnly} {...this.props.inputAttrs}/>
    );
  }
});

if (window && !window.CanopyAutoscaleInput) window.CanopyAutoscaleInput = CanopyAutoscaleInput;

export default CanopyAutoscaleInput;
