import { RowTree, Row } from 'components/TableRow/TableRow.types';

export const findElInArr = (state: RowTree[], id: number): RowTree => {
  let res = state.find(el => el.id === id);
  if (res) return res;

  for (let el of state) {
    res = findElInArr(el.child, id);
    if (res) return res;
  }

  return null;
};

export const changeElInArr = (state: RowTree[], id: number, newVal: RowTree): RowTree[] => {
  let elIndex = state.findIndex(el => el.id === id);
  if (elIndex !== -1) {
    state[elIndex] = newVal;
    return state;
  }

  for (let el of state) {
    el.child = changeElInArr(el.child, id, newVal);
  }

  return state;
};

export const deleteElFromArr = (state: RowTree[], id: number): RowTree[] => {
  let deletedElIndex = state.findIndex(el => el.id === id);
  if (deletedElIndex !== -1) return [...state.slice(0, deletedElIndex), ...state.slice(deletedElIndex + 1)];

  for (let el of state) {
    el.child = deleteElFromArr(el.child, id);
  }

  return state;
};

export const createEmptyEl = (id: number = 0): RowTree => {
  return {
    child: [],
    equipmentCosts: 0,
    estimatedProfit: 0,
    id,
    machineOperatorSalary: 0,
    mainCosts: 0,
    materials: 0,
    mimExploitation: 0,
    overheads: 0,
    rowName: '',
    salary: 0,
    supportCosts: 0,
    total: 0,
    new: true
  };
};
export const applyChanged = (changed: Row[], state: RowTree[]): RowTree[] => {
  let newState = state;
  changed.forEach(el => {
    const findedEl = findElInArr(state, el.id);
    const changedEl = { ...findedEl, ...el };
    newState = changeElInArr(newState, el.id, changedEl);
  });
  return newState;
};