import React, { Component } from 'react';
import PropTypes from "prop-types";
import styles from './header.module.css';
import styled from "styled-components";
import { Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

export default class Header extends Component {
    static propTypes = {
        brand: PropTypes.shape({
            name: PropTypes.string.isRequired,
            to: PropTypes.string.isRequired
        }),
        links: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired,
                to: PropTypes.string.isRequired
            })
        )
    };

    constructor(props) {
        super(props);
        this.state = {
            show: true,
            scrollPos: 0
        };
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll() {
        const { scrollPos } = this.state;
        this.setState({
            scrollPos: document.body.getBoundingClientRect().top,
            show: document.body.getBoundingClientRect().top > scrollPos
        });
    }

    render() {
        const NavLinks = () =>
            this.props.links.map((link, index) => ( <
                a key = { index }
                href = { link.to } > { link.name } <
                /a>
            ));
        return ( <
            Transition >
            <
            StyledNavbar className = { this.state.show ? "active" : "hidden" } >
            <
            IconButton className = { styles.icon }
            edge = "start"
            color = "inherit" >
            <
            MenuIcon className = { styles.iconi }
            />   <
            /IconButton>   <
            Typography variant = "h6"
            className = { styles.title } >
            <
            a className = "brand"
            href = "/" > { this.props.brand.name } <
            /a>   <
            /Typography>   <
            nav className = { styles.link } >
            <
            NavLinks / >
            <
            /nav>   <
            /StyledNavbar>   <
            /Transition>
        );
    }
}
const StyledNavbar = styled.div `
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  margin: 0 auto;
  height: 4rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-weight: bolder;
  background: #fff;
  box-shadow: 10px 10px 5px gray;
  z-index: 1000;
  a {
    margin-right: 1rem;
    font-weight: normal;
  }
  .brand {
    text-decoration:none;
    font-weight: bold;
    text-align:center;
    justify-content:center;
    align-items:center;
    color: black;
    font-family:arial;
    font-size: 1.8rem;
  }`;

const Transition = styled.div `
  .active {
    visibility: visible;
    transition: all 200ms ease-in;
  }
  .hidden {
    visibility: hidden;
    transition: all 200ms ease-out;
    transform: translate(0, -100%);
  }
`