import React from 'react'
import { useRoutes } from 'react-router-dom'
import routes from './router/RouterList'
import { Provider } from 'react-redux';
import store from './redux/store'
import './App.less'

export default function App() {
  //useRoutes里面传进来的是一个RouterList数组
  let element = useRoutes(routes())
  return (
    <Provider store={store} >
      <div className="App">
        {element}
      </div>
    </Provider>
  )
};