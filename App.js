/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { createStackNavigator, StackActions, NavigationActions } from "react-navigation";
import Page from "./pages";
import { helperGetStateForAction, handlerNavigationAction } from "./src/NavigationHelper"

const StackRoot = createStackNavigator(
  {
    Page: { screen: Page }
  },
  {
    onTransitionEnd: res => {
      handlerNavigationAction(res.navigation);
    },
    navigationOptions: {
      headerBackTitle:null
    }
  }
);
const defaultGetStateForAction = StackRoot.router.getStateForAction;
StackRoot.router.getStateForAction = (action, state) => {
  let r = helperGetStateForAction(action, state)
  if (r) return r
  return defaultGetStateForAction(action, state);
};
type Props = {};
export default class App extends Component<Props> {
  render() {
    return <StackRoot />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});
