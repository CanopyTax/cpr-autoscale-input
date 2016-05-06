import React from 'react';
import ReactDOM from 'react-dom';

var html = function(size, family) {
	return `<span style="font-family:${family};font-size:${size}; font-weight:400;"></span>`;
};

var CanopyAutoscaleInput = React.createClass({

  componentWillReceiveProps: function(props) {
    this.measureAndSize(props.value);
  },

  componentDidMount: function() {
    this.measureAndSize();
  },

  measureAndSize: function(text) {
    text = text || this.input.value;
    if (this.props.inputAttrs && this.props.inputAttrs.placeholder) text = text || this.props.inputAttrs.placeholder;
    text = text.length < 2 ? 'HI' : text;
    text = text.replace(/\s/g, "_");
		let inputStyle = getComputedStyle(this.input, null);

		let wrapperDiv = document.createElement("div");
		wrapperDiv.style.position = "absolute";
		wrapperDiv.innerHTML = html(
			inputStyle['font-size'],
			inputStyle['font-family'].replace(/\"/g, "'")
		);
		wrapperDiv.children[0].textContent = text;

		this.input.parentNode.insertBefore(wrapperDiv, this.input);

    this.input.style.width = wrapperDiv.offsetWidth + 6 + 'px';
		this.input.parentNode.removeChild(wrapperDiv);
  },
  handleChange: function(property, event) {
    this.measureAndSize();
    // Call parent callback
    this.props.onChange(property, event);
  },

  render: function() {
    return (
			<input
				ref={ref => this.input = ref}
				name={this.props.propName}
				value={this.props.value}
				onChange={this.handleChange.bind(this, this.props.propName)}
				readOnly={this.props.readOnly} {...this.props.inputAttrs}/>
    );
  }
});

if (window && !window.CanopyAutoscaleInput) window.CanopyAutoscaleInput = CanopyAutoscaleInput;

export default CanopyAutoscaleInput;
