//selectors
export const getAllTables = state => state.tables.data;
export const getTableById = ({tables}, id) => tables.data.find(table => table.id === id);
export const getTablePending = ({tables}) => tables.pending;
// actions

const createActionName = actionName => `app/tables/${actionName}`;
const UPDATE_TABLES = createActionName('UPDATE_TABLES');
const EDIT_TABLE = createActionName('EDIT_TABLE');
const UPDATE_PENDING = createActionName('UPDATE_PENDING')

// action creators
export const updateTables = payload => ({ type: UPDATE_TABLES, payload});
export const editTable = (payload) => ({type: EDIT_TABLE, payload});
export const updatePending = (payload) => ({type: UPDATE_PENDING, payload})
export const fetchTables = () => {
  return (dispatch) => {
    dispatch(updatePending(true))
    console.log('ok')
  fetch('http://localhost:3131/api/tables')
    .then(res => res.json())
    .then(tables => dispatch(updateTables(tables)));  
    dispatch(updatePending(false))
  }
};

export const editTableRequest = (newTable) => {
  return (dispatch) => {
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(newTable)
  };
  fetch('http://localhost:3131/tables/' + newTable.idTable, options)
    .then(() => dispatch(editTable(newTable)));
  };
}
const tablesReducer = (statePart = [], action) => {
    switch (action.type) {
      case UPDATE_PENDING:
        return { ...statePart, pending: action.payload}
      case UPDATE_TABLES: 
        return { ...statePart, data: [...action.payload]}
      case EDIT_TABLE:
        return { ...statePart, data: statePart.data.map(table => (table.id === action.payload.id ? { ...table, ...action.payload } : table))};
      default:
        return statePart;
    };
};

export default tablesReducer;

