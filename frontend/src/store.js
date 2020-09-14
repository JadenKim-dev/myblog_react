import React, {createContext, useContext} from "react";
import useReducerWithSideEffects, { UpdateWithSideEffect, Update } from "use-reducer-with-side-effects"
import {getStorageItem, setStorageItem} from "utils/useLocalStorage"
import { useAxios } from "api";

const AppContext = createContext()

const reducer = ( prevState, action ) => {
  const { type } = action;
  if (type === SET_TOKEN) {
    const { payload: jwtToken } = action;
    const newState = {...prevState, jwtToken, isAuthenticated: true}
    return UpdateWithSideEffect(newState, () => {
      setStorageItem("jwtToken", jwtToken)
    })
  }
  else if (type === DELETE_TOKEN) {
    const newState = {...prevState, jwtToken: "", isAuthenticated: false}
    return UpdateWithSideEffect(newState, () => {
      setStorageItem("jwtToken", "")
    })
  }
  else if (type === SET_APP_TREE_DATA) {
    const { payload: treeData } = action;
    const newState = {...prevState, treeData}
    return Update(newState)
  }
  return prevState
}

export const AppProvider = ({ children }) => {
  const jwtToken = getStorageItem("jwtToken", "")
  const [store, dispatch] = useReducerWithSideEffects(reducer, {
    jwtToken,
    isAuthenticated: (jwtToken.length > 0 ? true : false),
    treeData: [],
  })
  return (
    <AppContext.Provider value={{ store, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}


export const useAppContext = () => useContext(AppContext)

const SET_TOKEN = "APP/SET_TOKEN"
const DELETE_TOKEN = "APP/DELETE_TOKEN"
const SET_APP_TREE_DATA = "APP/SET_TREE_DATA"

export const setToken = token => ({ type: SET_TOKEN, payload: token })
export const deleteToken = () => ({ type: DELETE_TOKEN })
export const setAppTreeData = treeData => ({ type: SET_APP_TREE_DATA, payload: treeData })