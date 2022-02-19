import { Form, Row, Col, Button} from "react-bootstrap";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getTableById, getAllTables } from "../../redux/tablesRedux";
import { useParams } from "react-router-dom";
import { Input } from "../views/Input/Input";

const Table = () => {
    const {idTable} = useParams();
    const table = useSelector(state => getTableById(state, idTable));
    const tables = useSelector(getAllTables);

    //const [status, setStatus] = useState(table.status);
    return(
        <div>
            <h1>Table {idTable}</h1>
            <Form>
                <Row className="mb-3 d-flex justify-content-start" controlId="formBasicStatus">
                    <Col className="col-1">
                        <Form.Label><strong>Status:  </strong></Form.Label>
                    </Col>
                    <Col className="col-2">
                        <Form.Select aria-label="Default select example" >
                        {tables.map(tab => <option value={tab.id} >{tab.status}</option>  )}
                        </Form.Select>
                    </Col>
                </Row>
                <Row className="mb-3 d-flex justify-content-start" controlId="formBasicPeopleAmount">
                    <Col className="col-1">
                        <Form.Label><strong>People:  </strong></Form.Label>
                    </Col>
                    <Col className="col-6">
                    <Input> {table.peopleAmount} </Input>
                        /
                        <Input> {table.maxPeopleAmount} </Input>
                    </Col>
                </Row>
                <Row className="mb-3 d-flex justify-content-start" controlId="formBasicBill">
                    <Col className="col-1">
                        <Form.Label><strong>Bill:  </strong></Form.Label>
                    </Col>
                    <Col className="col-6">
                        $
                        <Input> {table.bill} </Input>
                    </Col>
                </Row>        
            </Form>
            <Button variant="primary" type="submit">
                Update
            </Button>

        
            
        </div>
    )
}

export default Table;