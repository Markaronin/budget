import React, { Component, FunctionComponent } from "react";
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";
import "./nav-bar.less";

const FancyNavLink: FunctionComponent<{ to: string; className?: string }> = ({ to, className, children }) => {
    return (
        <NavLink
            to={to}
            exact
            className={className ? `${className} navBarItem` : "navBarItem"}
            activeClassName="activeNavBarItem"
        >
            {children}
        </NavLink>
    );
};

interface NavBarProps extends RouteComponentProps {}
interface NavBarState {}
export class NavBarWithoutRouter extends Component<NavBarProps, NavBarState> {
    constructor(props: NavBarProps) {
        super(props);
        this.state = {};
    }
    render(): JSX.Element {
        return (
            <div className="navList">
                <FancyNavLink to="/">Budgets</FancyNavLink>
            </div>
        );
    }
}

export const NavBar = withRouter(NavBarWithoutRouter);
