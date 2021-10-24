import React, { Component } from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Switch, Route, HashRouter, Redirect, RouteComponentProps, withRouter } from "react-router-dom";
import { AlertHelperComponent } from "@markaronin/alert-helper";
import { getCookie } from "@markaronin/jefferson-util";
import { NavBar } from "./nav-bar/nav-bar";
import { BudgetsPage } from "./pages/budgets/budgets";
import { BudgetPage } from "./pages/budget/budget";

const queryClient = new QueryClient();
queryClient.setDefaultOptions({
    queries: {
        staleTime: Infinity,
        cacheTime: Infinity,
    },
});

interface MainDivProps extends RouteComponentProps {}
interface MainDivState {}
class MainDiv extends Component<MainDivProps, MainDivState> {
    constructor(props: MainDivProps) {
        super(props);
    }

    render() {
        return (
            <div>
                <NavBar />
                <AlertHelperComponent />
                <Switch>
                    <Route exact path="/" component={BudgetsPage} />
                    <Route exact path="/budgets" component={BudgetsPage} />
                    <Route exact path="/budgets/:id" component={BudgetPage} />
                    <Route path="*">
                        <Redirect to="/" />
                    </Route>
                </Switch>
                <footer style={{ paddingBottom: "5em", textAlign: "center" }}>
                    <hr />
                    Budget - Created by{" "}
                    <a href="https://github.com/Markaronin" target="_blank" rel="noreferrer">
                        Markaronin
                    </a>
                </footer>
            </div>
        );
    }
}

const MainDivWithRouter = withRouter(MainDiv);

// Auth logic
if (!getCookie("Auth")) {
    window.location.replace(`https://auth.markaronin.com?redirect=${encodeURIComponent(window.location.href)}`);
} else {
    const domContainer = document.querySelector("#reactDom");
    ReactDOM.render(
        <HashRouter>
            <QueryClientProvider client={queryClient}>
                <MainDivWithRouter />
            </QueryClientProvider>
        </HashRouter>,
        domContainer,
    );
}
