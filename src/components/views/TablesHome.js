import { Button, ListGroup, Row, Col} from "react-bootstrap";
import {Link} from 'react-router-dom';

const TablesHome = ({...table}) => {
    return (
        <ListGroup >
            <ListGroup.Item>
                <Row >
                    <Col className="justify-content-start" xs lg="10">
                        <h2 className="d-inline">Table {table.id}</h2>
                        <p  className="d-inline p-3"><span className={"d-inline "}><strong>Status: </strong></span>{table.status}</p>
                    </Col>
                    <Col className="justify-content-end" xs lg="2">
                        <Button as={Link} to={`/table/${table.id}`} variant="primary"  >Show more</Button>
                    </Col>
                </Row>
            </ListGroup.Item>           
        </ListGroup>
    )
}

export default TablesHome;