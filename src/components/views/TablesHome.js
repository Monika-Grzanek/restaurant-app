import { Button, ListGroup } from "react-bootstrap";
import {Link} from 'react-router-dom';

const TablesHome = ({...table}) => {
    return (
        <ListGroup className="d-flex justify-content-between">
            <ListGroup.Item>
                <h2 className="d-inline">Table {table.id}</h2>
                <p  className="d-inline p-3"><span className={"d-inline "}><strong>Status: </strong></span>{table.status}</p>
                <Button as={Link} to={`/table/${table.id}`} variant="primary" className="justify-content-end" >Show more</Button>
            </ListGroup.Item>           
        </ListGroup>
    )
}

export default TablesHome;