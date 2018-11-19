import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, TouchableHighlight } from "react-native";
import { StackActions, NavigationActions } from "react-navigation";
import { backToRoute, reserverRouteAndNavigate, reserverAndNavigate, reserverRootAndNavigate } from "../src/NavigationHelper"
export default class Page extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Page" + navigation.getParam("index", 1)
    };
  };

  getActions = index => {
    let actions = [];
    index < 3
      ? actions.push({ title: "navigate page" + (index + 1), action: () => this.props.navigation.push("Page", { index: index + 1 }) })
      : actions.push(
          {
            title: "reset page1 and navigate without animation",
            action: () => {
              const resetAction = StackActions.reset({
                index: 1,
                actions: [NavigationActions.navigate({ routeName: "Page", params:{ index: 1} }), NavigationActions.navigate({ routeName: "Page", params:{ index: 4} })]
              });
              this.props.navigation.dispatch(resetAction);
            }
          },
          { title: "reset page1 and navigate with animation" , action: ()=> reserverAndNavigate(this.props.navigation,0, { routeName: "Page", params:{ index: 4} })},
        );
    return actions;
  };
  render() {
    let currentIndex = this.props.navigation.getParam("index", 1);
    let actions = this.getActions(currentIndex);
    return (
      <View style={styles.container}>
        {actions.map((item, index) => (
          <TouchableHighlight style={styles.button} underlayColor={"#F2F2F2"} onPress={() => item.action()} key={index}>
            <Text>{item.title}</Text>
          </TouchableHighlight>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    paddingVertical: 10
  },
  button: {
    width: "100%",
    backgroundColor: "white",
    borderColor: "#EAEAEA",
    borderWidth: 0.5,
    height: 36,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 10
  }
});
