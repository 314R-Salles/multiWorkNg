import {Action, createReducer, createSelector, on} from '@ngrx/store';
import {CircuitElement} from '../circuitElement';
import {addElement, removeElement, setCoordinates, setState} from './arduino.actions';

export interface ArduinoState {
  elements: CircuitElement[];
}

export const initialState: ArduinoState = {
  elements: []
};

const _arduinoReducer = createReducer(
  initialState,
  on(addElement, (state, {element}) => ({...state, elements: [element, ...state.elements]})),
  on(setState, (state, {newState}) => ({...newState})),
  on(removeElement, (state, {id}) => ({
    ...state, elements: state.elements.filter(element => element.id !== id)
  })),
  on(setCoordinates, (state, {id, xPos, yPos}) => {
    const elements = [...state.elements];
    const index = elements.findIndex(item => item.id === id);
    const element = elements.splice(index, 1)[0];
    const newElement = {...element, xPos, yPos};
    return {...state, elements: [newElement, ...elements]};
  }),
);

export function arduinoReducer(state: ArduinoState, action: Action) {
  return _arduinoReducer(state, action);
}

export const selectArduinoState = (state: any) => state.arduino.arduinoState;

export const selectElements = createSelector(
  selectArduinoState,
  (state: ArduinoState) => {
    return (state ? state.elements : []);
  });
