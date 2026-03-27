import PropTypes from 'prop-types';
import { Component } from 'react';

export default class ErrorBoundary extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fatal-fallback">
          <p className="eyebrow">Experience Recovery</p>
          <h1>The gallery hit a rendering fault.</h1>
          <p>Please refresh the page or return to the entry scene.</p>
          <div className="button-stack inline-actions">
            <button type="button" className="primary-button" onClick={() => window.location.reload()}>Refresh Experience</button>
            <button type="button" className="ghost-button" onClick={() => window.location.assign('/')}>Return to Entry</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
