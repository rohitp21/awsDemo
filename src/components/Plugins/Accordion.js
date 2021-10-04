import React, { Component } from "react";
import { Collapse } from "reactstrap";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));
export class Accordion extends Component {
  state = {
    open: this.props.open,
  };

  toggleSection = (index) => () => {
    this.setState(({ open }) => ({
      open: index === open ? undefined : index,
    }));
  };

  render() {
    return (
      <div className="accordion">
        {React.Children.map(this.props.children, (child, index) => {
          if (child.type !== AccordionItem) return null;
          return React.cloneElement(child, {
            isOpen: child.props.open || this.state.open === index,
            onClick: this.toggleSection(index),
          });
        })}
      </div>
    );
  }
}

Accordion.propTypes = {
  open: PropTypes.number,
};

const AccordionItem = ({ children, isOpen, onClick }) => (
  <Card>
    {React.Children.map(children, (child) => {
      if (child.type === AccordionHeader) {
        return React.cloneElement(child, { onClick });
      }

      if (child.type === AccordionBody) {
        return React.cloneElement(child, { isOpen });
      }

      return null;
    })}
  </Card>
);

const AccordionHeader = ({ children, onClick }) => (
  <CardHeader
    title={
      <h5>
        {children}
      </h5>
    }
    onClick={onClick}
  />
);

const AccordionBody = ({ children, isOpen }) => (
  <Collapse isOpen={isOpen}>
    <Divider />
    <CardContent>{children}</CardContent>
  </Collapse>
);

Accordion.Item = AccordionItem;
Accordion.Header = AccordionHeader;
Accordion.Body = AccordionBody;
