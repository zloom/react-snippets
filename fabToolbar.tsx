const decorate = withStyles(
  theme =>
    ({
      buttonIcon: {
        color: theme.palette.common.white,
      },
      button: {
        position: "fixed",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      },
      toolboxContainer: {
        position: "absolute",
        width: "100%",
        bottom: 0,
        height: "64px",
        display: "flex",
        justifyContent: "center",
      },
      toolbox: {
        backgroundColor: theme.palette.primary[600],
      },
    } as React.CSSProperties),
  { withTheme: true },
);

type Props = typeof connectCreator.allProps & typeof decorate.keyType;

type State = { expanded: boolean };

class DashboardFooterComponent extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }

  handleClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  transition = (prop: string | string[], easing: keyof Easing, delay = false) => {
    const { transitions } = this.props.theme;
    const transitionString = transitions.create(prop, {
      duration: transitions.duration.shorter,
      easing: transitions.easing[easing],
      delay: delay ? transitions.duration.shorter : 0,
    });

    return transitionString;
  };

  render() {
    const { buttonIcon, button } = this.props.classes;
    const { spacing, palette } = this.props.theme;

    const transitions = [
      this.transition("right", this.state.expanded ? "easeIn" : "easeOut", !this.state.expanded),
      this.transition("bottom", this.state.expanded ? "easeOut" : "easeIn", !this.state.expanded),
      this.transition(["border-radius", "width", "height", "transform", "background-color"],
        "easeInOut", this.state.expanded),
    ];

    const buttonStyle = {
      transition: transitions.join(", "),
      right: this.state.expanded ? "50rem" : spacing.unit * 2,
      bottom: this.state.expanded ? 0 : spacing.unit * 2,
      borderRadius: this.state.expanded ? 0 : "30px",
      width: this.state.expanded ? "100%" : "56px",
      transform: `translateX(${this.state.expanded ? 50 : 0}rem)`,
      height: this.state.expanded ? "64px" : "56px",
      backgroundColor: this.state.expanded ? palette.common.white : palette.primary[600],
    };

    return (
      <Paper onClick={this.handleClick} className={button} style={buttonStyle}>
        {this.state.expanded ? null : <FilterList className={buttonIcon} />}
      </Paper>
    );
  }
}
