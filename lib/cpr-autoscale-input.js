'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var html = function html(size, family) {
  return '<div style="position: absolute;"><span style="font-family:' + family + ';font-size:' + size + '; font-weight:400;"></span></div>';
};

var CanopyAutoscaleInput = _react2['default'].createClass({
  displayName: 'CanopyAutoscaleInput',

  componentWillReceiveProps: function componentWillReceiveProps(props) {
    this.measureAndSize(props.value);
  },

  componentDidMount: function componentDidMount() {
    this.measureAndSize();
  },

  measureAndSize: function measureAndSize(text) {
    var input = _reactDom2['default'].findDOMNode(this);
    text = text || input.value;
    if (this.props.inputAttrs && this.props.inputAttrs.placeholder) text = text || this.props.inputAttrs.placeholder;
    text = text.length < 2 ? 'HI' : text;
    text = text.replace(/\s/g, "_");
    if (this.props.inputAttrs && this.props.inputAttrs.maxLength) text = text.substring(0, this.props.inputAttrs.maxLength);

    var $input = (0, _jquery2['default'])(input);
    var measuredEl = (0, _jquery2['default'])(html($input.css('font-size'), $input.css('font-family').replace(/\"/g, "'")));
    measuredEl.find('span').text(text);
    $input.after(measuredEl);
    $input.css('width', measuredEl[0].offsetWidth + 6 + 'px');
    measuredEl.remove();
  },

  handleChange: function handleChange(property, event) {
    this.measureAndSize();
    // Call parent callback
    this.props.onChange(property, event);
  },

  render: function render() {
    return _react2['default'].createElement('input', _extends({ name: this.props.propName, value: this.props.value, onChange: this.handleChange.bind(this, this.props.propName), readOnly: this.props.readOnly }, this.props.inputAttrs));
  }
});

if (window && !window.CanopyAutoscaleInput) window.CanopyAutoscaleInput = CanopyAutoscaleInput;

exports['default'] = CanopyAutoscaleInput;
module.exports = exports['default'];