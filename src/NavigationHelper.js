import { NavigationActions } from "react-navigation";
function reserverRootAndNavigate(navigation, options = { routeName: null, params: null }) {
  reserverAndNavigate(navigation, 0, options);
}
function reserverRouteAndNavigate(navigation, routeName, options = { routeName: null, params: null }) {
  let routes = navigation.state.routes ? navigation.state.routes :[];
  let index = 0;
  routes &&
    routes.forEach((element, i) => {
      if (element.routeName === routeName) {
        index = i;
      }
    });
  reservertAndNavigate(navigation, index, options);
}

function reserverAndNavigate(navigation, index, options) {
  navigation.push(options.routeName, {
    ...options.params,
    helperOptions: {
      type: NavigationActions.NAVIGATE,
      index
    }
  });
}

function backToRoute(navigation, routeName) {
  let routes = navigation.state.routes ? navigation.state.routes : [];
  let index = 0;
  routes &&
    routes.forEach((element, i) => {
      if (element.routeName === routeName) {
        index = i;
      }
    });
  /** 回去的页面刚好是上个页面 */
  if (index === routes.length -2){
    navigation.goBack()
  }
  else{
    /**  */
    navigation.setParams({
      helperOptions: {
        type: NavigationActions.BACK,
        index
      },
    })
  }
}

function handlerNavigationAction(navigation) {
  let state = navigation.state;
  let route = state.routes[state.index];
  if (route && route.params && route.params.helperOptions) {
    let helperOptions = route.params.helperOptions;
    if (helperOptions.type === NavigationActions.BACK) {
      navigation.goBack(null);
    } else if (helperOptions.type === NavigationActions.NAVIGATE) {
      navigation.setParams({
        ...route.params
      });
    }
  }
}

function helperGetStateForAction(action, state) {
  if (action.type === NavigationActions.SET_PARAMS) {
    let route = state.routes[state.index];
    if (route && action.params && action.params.helperOptions) {
      let routes = state.routes;
      let index = state.index;
      let helperOptions = action.params.helperOptions;
      if (helperOptions.type === NavigationActions.BACK || helperOptions.type === NavigationActions.NAVIGATE) {
        routes = routes.slice(0, helperOptions.index + 1);
        index = routes.length;
      }
      route.params.helperOptions = helperOptions;
      routes.push(route);
      return {
        ...state,
        routes,
        index
      };
    }
  }
  return false;
}

export { helperGetStateForAction, handlerNavigationAction, backToRoute, reserverRouteAndNavigate, reserverRootAndNavigate, reserverAndNavigate };
