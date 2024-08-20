import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '2c59aa34-aaed-4614-8c12-316aeadce273'
    }
})
export type TodolistType = {
    id: string
    addedDate?: ''
    order?: number
    title: string
}

export type ResponseType <D = {}> = {
    data: D
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: number
}



export const todolistsAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists');
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{item:TodolistType}>>(`todo-lists`, {title});
    },
    updateTodolist(title: string, todolistId: string) {
        return instance.put<ResponseType<{item:TodolistType}>>(`todo-lists/${todolistId}`, {title});
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`);
    }
}