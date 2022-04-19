import React, { Component, createRef } from 'react';
import './dropdown.css'

class DropdownClass extends Component {

  constructor(props) {
    super(props);
    this.state = {
      opened: false,
      selected: props.placeholderText ? props.placeholderText : props.options[0],
      options: props.noneValue ? [props.noneValue, ...props.options] : props.options,
      onChange: props.onChange ? props.onChange : () => { },
    }
  }

  componentDidMount() {
    document.addEventListener('click', this.handleOutsideClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleOutsideClick);
  }

  dropdownContainer = createRef();

  handleOutsideClick = (e) => {
    if (!this.dropdownContainer.current?.contains(e.target)) this.setState({ opened: false })
  };

  render() {
    return (
      <div className='dropdown-container' ref={this.dropdownContainer}>
        <button className={this.state.opened ? 'selected' : 'selected closed'}
          onClick={() => { this.setState({ opened: !this.state.opened }) }}>
          {this.state.selected}
          <span className={`icon ${this.state.opened ? 'arrow-up' : 'arrow-down'}`} />
        </button>
        {this.state.opened && (
          <div className='options'>
            {this.state.options
              .filter((option) => option !== this.state.selected)
              .map((option, index) => (
                <button key={index}
                  className='option'
                  onClick={() => {
                    this.setState({ selected: option });
                    this.setState({ opened: false });
                    this.state.onChange(option);
                  }}>
                  {option}
                </button>
              ))}
          </div>
        )}
      </div>
    )
  };
};

export default DropdownClass;