
### react-navigation
react-navigation 是一个跨平台框架，他可以运行在 iOS、Android 和 Web上，其良好的 API 及功能设计帮我们在构建页面框架时省去了非常多的时间。</br>
在页面导航层面上他支持一些基本的导航操作比如 navigate、push、popToTop、reset 等，他能满足我们大部分页面跳转需求。想了解 [react-navigation](https://reactnavigation.org/) 框架设计。
### reset 操作
但是发现在某些场景下，reset 操作并不能达到我们想要的想过。</br>
当前路由结构：A -> B -> C</br>
在 C 页面上我们进行 reset 操作希望最终的结构是这样，A -> D</br>
我们用 react-navigation 的 API 执行如下操作
>
```
const resetAction = StackActions.reset({
  index: 1,
  actions: [NavigationActions.navigate({ routeName: "A" }),
          NavigationActions.navigate({ routeName: "D" })]
});
this.props.navigation.dispatch(resetAction);
```

此过程并没有转场动画，交互不够友好

### 自定义 reset 的使用
#### 1、处理 ```Navigator``` 的 ```onTransitionEnd```
>
```
const  StackRoot  =  createStackNavigator({ 
  Page: { screen:  Page } },
  { 
    onTransitionEnd:  res  => {
      handlerNavigationAction(res.navigation);
	},
    navigationOptions: {
     headerBackTitle:null
	}
  }
);
```

#### 2、自定义路由
>
```
const  defaultGetStateForAction  =  StackRoot.router.getStateForAction;
StackRoot.router.getStateForAction  = (action, state) => {
  let  r  =  helperGetStateForAction(action, state)
  if (r) return  r
  return  defaultGetStateForAction(action, state);
};
```

#### 3、调用 API
>
```
reserverAndNavigate(this.props.navigation,0, { routeName:  "D" })
```
