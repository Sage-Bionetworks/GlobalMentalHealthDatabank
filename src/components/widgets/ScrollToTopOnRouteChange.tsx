import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'

export interface OwnProps {
  onRouteChangeFn: Function
}

export type ScrollToTopOnRouteChangeProps = OwnProps & RouteComponentProps

class ScrollToTopOnRouteChange extends React.Component<ScrollToTopOnRouteChangeProps> {
  componentDidUpdate(prevProps: RouteComponentProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
      this.props.onRouteChangeFn(this.props.location.pathname)
    }
  }

  render() {
    return <></>
  }
}

export default withRouter(ScrollToTopOnRouteChange)
