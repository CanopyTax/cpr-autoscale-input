import React from 'react';

var html = function(size, family) {
  return `<span style="font-family:${family};font-size:${size}; font-weight:400;"></span>`;
};

export default class CanopyAutoscaleInput extends React.Component{

  componentDidUpdate() {
    this.measureAndSize(this.props.value);
  };

  componentDidMount() {
    this.measureAndSize();
    if (this.props.getInputRef) this.props.getInputRef(this.input);
  };

  measureAndSize = (text) => {
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
  };

  handleChange = (property, event) => {
    this.measureAndSize();
    // Call parent callback
    this.props.onChange(property, event);
  };

  render() {
    return (
      <input
        onBlur={e => this.props.onBlur && this.props.onBlur(e)}
        ref={ref => this.input = ref}
        name={this.props.propName}
        value={this.props.value}
        onChange={this.handleChange.bind(this, this.props.propName)}
        readOnly={this.props.readOnly} {...this.props.inputAttrs}/>
    );
  }
};

if (typeof window !== "undefined" && window && !window.CanopyAutoscaleInput) window.CanopyAutoscaleInput = CanopyAutoscaleInput;
