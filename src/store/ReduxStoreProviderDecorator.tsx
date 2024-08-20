import React from 'react'
import {Provider} from 'react-redux'
import {applyMiddleware, combineReducers, legacy_createStore} from 'redux'

import {v1} from 'uuid'

import {todolistsReducer} from "./todolists-reducer";
import {AppRootStateType} from "./store";
import {tasksReducer} from "./tasks-reducer";
import {TaskPriorities, TaskStatuses} from "../api/tasks-api";
import thunk from "redux-thunk";
import {appReducer} from "./app-reducer";
import {authReducer} from "./auth-reducer";


const rootReducer = combineReducers({
    tasks:tasksReducer,
    todolists:todolistsReducer,
    app:appReducer,
    auth: authReducer
})

// @ts-ignore
const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all",order:0, entityStatus:'idle'},
        {id: "todolistId2", title: "What to buy", filter: "all", order:0, entityStatus:'loading'}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", status:TaskStatuses.New, addedDate:'', deadline:'', description:'',
                order:0, priority: TaskPriorities.Low, startDate: '', todoListId:"todolistId1"},
            {id: v1(), title: "JS", status:TaskStatuses.New, addedDate:'', deadline:'', description:'',
                order:0, priority: TaskPriorities.Low, startDate: '', todoListId:"todolistId1"},
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", status:TaskStatuses.New, addedDate:'', deadline:'', description:'',
                order:0, priority: TaskPriorities.Low, startDate: '', todoListId:"todolistId2"},
            {id: v1(), title: "React Book", status:TaskStatuses.New, addedDate:'', deadline:'', description:'',
                order:0, priority: TaskPriorities.Low, startDate: '', todoListId:"todolistId2"},
        ]
    },
    app:{
        error:null,
        status:'idle',
        isInitialized:false
    },
    auth: {
        isLoggedIn:false
    }

};


export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType, applyMiddleware(thunk));

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)