import { Form, Row, Col, Button} from "react-bootstrap";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTableById, getAllTables, editTableRequest } from "../../redux/tablesRedux";
import { useParams } from "react-router-dom";
import { Input } from "../views/Input/Input";
import { Navigate, useNavigate } from "react-router-dom";

const Table = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {idTable} = useParams();
    const table = useSelector(state => getTableById(state, idTable));
    const tables = useSelector(getAllTables);

    const [status, setStatus] = useState(table.status);
    const [peopleAmount, setPeopleAmount] = useState(table.peopleAmount);
    const [maxPeopleAmount, setMaxPeopleAmount] = useState(table.maxPeopleAmount);
    const [bill, setBill] = useState(table.bill);
 

    if(!idTable) return <Navigate to="/" />;
    if(setStatus !== 'Busy'){
        setBill(0)
        }

    if(setMaxPeopleAmount < 0 || setMaxPeopleAmount > 10) return 0;
    if(setPeopleAmount > setMaxPeopleAmount) return setPeopleAmount === setMaxPeopleAmount;
    
    const handleSubmit = table => {
        dispatch(editTableRequest({...table, idTable}));
        navigate('/');
    }

    return(
        <div>
            <h1>Table {idTable}</h1>
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3 d-flex justify-content-start" controlId="formBasicStatus">
                    <Col className="col-1">
                        <Form.Label><strong>Status:  </strong></Form.Label>
                    </Col>
                    <Col className="col-2">
                        <Form.Select aria-label="Default select example" value={status} onChange={e => setStatus(e.currentTarget.value)} >
                        {tables.map(tab => <option value={tab.id} >{tab.status}</option>  )}
                        </Form.Select>
                    </Col>
                </Row>
                <Row className="mb-3 d-flex justify-content-start" controlId="formBasicPeopleAmount">
                    <Col className="col-1">
                        <Form.Label><strong>People:  </strong></Form.Label>
                    </Col>
                    <Col className="col-6">
                    <Input value={peopleAmount} onChange={e => setPeopleAmount(e.currentTarget.value)}> {table.peopleAmount} </Input>
                        /
                        <Input value={maxPeopleAmount} onChange={e => setMaxPeopleAmount(e.currentTarget.value)}> {table.maxPeopleAmount} </Input>
                    </Col>
                </Row>
                <Row className="mb-3 d-flex justify-content-start" controlId="formBasicBill">
                    <Col className="col-1">
                        <Form.Label><strong>Bill:  </strong></Form.Label>
                    </Col>
                    <Col className="col-6">
                        $
                        <Input value={bill} onChange={e => setBill(e.currentTarget.value)} > {table.bill} </Input>
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