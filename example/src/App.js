import React, { Component } from "react";
import TopLoader from "react-top-loader";

class Animator extends React.Component {
  state = {
    progress: 0
  };

  componentDidMount() {
    setInterval(
      () => this.setState({ progress: Math.min(1, this.state.progress + 0.1) }),
      this.props.loopDuration || 400
    );
  }

  render() {
    return <TopLoader show progress={this.state.progress} {...this.props} />;
  }
}

export default class App extends Component {
  render() {
    return (
      <div style={{ padding: 64, width: 480 }}>
        <h2 style={{ fontFamily: "sans-serif", textAlign: "center" }}>
          react-top-loader
        </h2>
        <div style={{ padding: 16 }}>
          <div
            style={{
              fontFamily: "sans-serif",
              paddingBottom: 8,
              fontSize: 12,
              textAlign: "center"
            }}
          >
            Progress Indicator
          </div>
          <TopLoader show progress={0.2} fixed={false} backgroundColor="#ddd" />
        </div>
        <div style={{ padding: 16 }}>
          <div
            style={{
              fontFamily: "sans-serif",
              paddingBottom: 8,
              fontSize: 12,
              textAlign: "center"
            }}
          >
            Animated
          </div>
          <Animator
            color="#61d800"
            progressDuration={400}
            fixed={false}
            backgroundColor="#ddd"
          />
        </div>
        <div style={{ padding: 16 }}>
          <div
            style={{
              fontFamily: "sans-serif",
              paddingBottom: 8,
              fontSize: 12,
              textAlign: "center"
            }}
          >
            Animated (no background)
          </div>
          <Animator fixed={false} color="#ffaf49" loopDuration={200} />
        </div>
        <div style={{ padding: 16 }}>
          <div
            style={{
              fontFamily: "sans-serif",
              paddingBottom: 8,
              fontSize: 12,
              textAlign: "center"
            }}
          >
            Indeterminate
          </div>
          <TopLoader
            backgroundColor="#eee6ff"
            show
            fixed={false}
            color="#0000e4"
          />
        </div>
        <div style={{ padding: 16 }}>
          <div
            style={{
              fontFamily: "sans-serif",
              paddingBottom: 8,
              fontSize: 12,
              textAlign: "center"
            }}
          >
            Indeterminate (no background)
          </div>
          <TopLoader color="#D32F2F" show fixed={false} duration={2500} />
        </div>
      </div>
    );
  }
}
