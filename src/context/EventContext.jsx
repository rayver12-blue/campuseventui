import { createContext, useContext, useReducer, useState } from 'react'

// Initial state
const initialState = {
  events: [],
  isLoggedIn: false,
}

// Reducer (Step 7 - Add, Delete, Toggle Status)
function eventReducer(state, action) {
  switch (action.type) {
    case 'ADD_EVENT':
      return { ...state, events: [...state.events, action.payload] }

    case 'DELETE_EVENT':
      return {
        ...state,
        events: state.events.filter((e) => e.id !== action.payload),
      }

    case 'TOGGLE_STATUS':
      return {
        ...state,
        events: state.events.map((e) =>
          e.id === action.payload
            ? { ...e, active: !e.active }
            : e
        ),
      }

    case 'SET_EVENTS':
      return { ...state, events: action.payload }

    case 'LOGIN':
      return { ...state, isLoggedIn: true }

    case 'LOGOUT':
      return { ...state, isLoggedIn: false }

    default:
      return state
  }
}

const EventContext = createContext(null)

export function EventProvider({ children }) {
  const [state, dispatch] = useReducer(eventReducer, initialState)

  const login = () => dispatch({ type: 'LOGIN' })
  const logout = () => dispatch({ type: 'LOGOUT' })
  const addEvent = (event) => dispatch({ type: 'ADD_EVENT', payload: event })
  const deleteEvent = (id) => dispatch({ type: 'DELETE_EVENT', payload: id })
  const toggleStatus = (id) => dispatch({ type: 'TOGGLE_STATUS', payload: id })
  const setEvents = (events) => dispatch({ type: 'SET_EVENTS', payload: events })

  return (
    <EventContext.Provider
      value={{
        events: state.events,
        isLoggedIn: state.isLoggedIn,
        login,
        logout,
        addEvent,
        deleteEvent,
        toggleStatus,
        setEvents,
      }}
    >
      {children}
    </EventContext.Provider>
  )
}

export function useEvents() {
  return useContext(EventContext)
}
