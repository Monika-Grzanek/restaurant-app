import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getAllTables } from "../../redux/tablesRedux";
import TablesHome from "../views/TablesHome";

const Home = () => {
    const tables = useSelector(getAllTables);
    return(
        <div>
            <div>
                <h1>All Tables:</h1>
            </div>
            <Container>
                {tables.map(table => <TablesHome key={table.id} {...table} /> )}
            </Container>
        </div>
    )
}

export default Home;