import {createAction, props} from '@ngrx/store';
import {CircuitElement} from '../circuitElement';
import {ArduinoState} from './arduino.reducer';

export const addElement = createAction('[Arduino] set element', props<{ element: CircuitElement }>());
export const setState = createAction('[Arduino] set state', props<{ newState: ArduinoState }>());
export const removeElement = createAction('[Arduino] remove element', props<{ id: number }>());
export const setCoordinates = createAction('[Arduino] set coordinates', props<{ id: number; xPos: number; yPos: number }>());
