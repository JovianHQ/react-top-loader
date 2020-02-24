import React from "react";

class DeterminateLoader extends React.Component {
  render() {
    const {
      fixed,
      backgroundColor,
      thickness,
      style,
      duration,
      progress,
      progressDuration,
      color,
      zIndex,
      ...rest
    } = this.props;
    return (
      <div
        style={{
          position: fixed ? "fixed" : "static",
          top: fixed ? 0 : undefined,
          left: fixed ? 0 : undefined,
          right: fixed ? 0 : undefined,
          overflow: "hidden",
          width: "100%",
          height: thickness,
          backgroundColor: backgroundColor,
          zIndex: zIndex,
          ...style
        }}
        {...rest}
      >
        <div
          style={{
            width: progress * 100 + "%",
            position: "relative",
            maxWidth: "100%",
            height: "100%",
            backgroundColor: color,
            transition: `width ${progressDuration}ms linear`,
            zIndex: zIndex + 1
          }}
        />
      </div>
    );
  }
}

class IndeterminateLoader extends React.Component {
  state = {
    visible: false,
    loading: false
  };

  isIndeterminate = () =>
    this.props.progress === undefined || this.props.progerss === null;

  loop = () => {
    this.setState({ loading: true }, () =>
      setTimeout(() => this.setState({ loading: false }), this.props.duration)
    );
  };

  setupLoop = () =>
    setTimeout(
      () =>
        this.setState({ visible: true }, () => {
          this.loop();
          this.interval = setInterval(this.loop, this.props.duration + 100);
        }),
      this.props.delay
    );

  componentDidMount() {
    this.setupLoop();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const {
      progress,
      color,
      backgroundColor,
      thickness,
      duration,
      progressDuration,
      fixed,
      style,
      zIndex,
      ...rest
    } = this.props;
    const { loading, visible } = this.state;
    return !visible ? null : (
      <div
        style={{
          position: fixed ? "fixed" : "static",
          top: fixed ? 0 : undefined,
          left: fixed ? 0 : undefined,
          right: fixed ? 0 : undefined,
          overflow: "hidden",
          width: "100%",
          height: thickness,
          backgroundColor: backgroundColor,
          zIndex: zIndex,
          ...style
        }}
        {...rest}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            zIndex: zIndex + 1
          }}
        >
          <div
            style={{
              content: "",
              position: "absolute",
              height: "100%",
              backgroundColor: color,
              transition: loading
                ? `left ${duration}ms ease-out, width ${duration}ms ease-out`
                : "none",
              left: loading ? "100%" : "-100%",
              width: loading ? "10%" : "100%",
              zIndex: zIndex + 2
            }}
          />
        </div>
      </div>
    );
  }
}

class TopLoader extends React.Component {
  render() {
    const { show, ...rest } = this.props;
    if (!show) {
      return null;
    }
    if (rest.progress === undefined || rest.progress === null) {
      return <IndeterminateLoader {...rest} />;
    } else {
      return <DeterminateLoader {...rest} />;
    }
  }
}

TopLoader.defaultProps = {
  show: false,
  duration: 1500,
  progressDuration: 100,
  thickness: 2,
  color: "#03a9f4",
  backgroundColor: "transparent",
  fixed: true,
  delay: 0,
  zIndex: 10000
};

export default TopLoader;
