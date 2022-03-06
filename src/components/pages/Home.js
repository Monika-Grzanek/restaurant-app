import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getAllTables } from "../../redux/tablesRedux";
import TablesHome from "../views/TablesHome";
import Loader from "../views/Loader";
import { getTablePending } from "../../redux/tablesRedux";

const Home = () => {
    const tables = useSelector(getAllTables);
    const pending = useSelector(getTablePending);
    console.log('pending:', pending);
    return(
        <div>
            <div>
                <h1>All Tables:</h1>
            </div>
            {pending && <Loader />}
            {!pending && <Container>
                {tables && tables.map(table => <TablesHome key={table.id} {...table} /> )}
            </Container>}
        </div>
    )
}

export default Home;