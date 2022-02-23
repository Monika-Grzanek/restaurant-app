//selectors
export const getAllTables = state => state.tables.data;
export const getTableById = ({tables}, id) => tables.data.find(table => table.id === id);
// actions

const createActionName = actionName => `app/tables/${actionName}`;
const UPDATE_TABLES = createActionName('UPDATE_TABLES');
const EDIT_TABLE = createActionName('EDIT_TABLE')

// action creators
export const updateTables = payload => ({ type: UPDATE_TABLES, payload});
export const editTable = (payload) => ({type: EDIT_TABLE, payload});
export const fetchTables = () => {
  return (dispatch) => {
  fetch('http://localhost:3131/api/tables')
    .then(res => res.json())
    .then(tables => dispatch(updateTables(tables)));  
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
      case UPDATE_TABLES: 
        return { ...statePart, data: [...action.payload]}
      case EDIT_TABLE:
        return { ...statePart, data: statePart.map(table => (table.id === action.payload.id ? { ...table, ...action.payload } : table))};
      default:
        return statePart;
    };
};

export default tablesReducer;

