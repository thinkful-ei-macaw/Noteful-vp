import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          hasError: false
        };
      }
      static propTypes = {
        children: PropTypes.element.isRequired
      }

      
      static getDerivedStateFromError(error) {
        return { hasError: true };
      }
      render() {
        if (this.state.hasError) {      
          return (
            <h2>Error.</h2>
          );
        }
        return this.props.children;
      } 
}

export default ErrorBoundary;