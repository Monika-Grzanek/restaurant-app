import { Form, Row, Col, Button} from "react-bootstrap";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTableById, editTableRequest, getTablePending } from "../../redux/tablesRedux";
import { useParams } from "react-router-dom";
import { InputNumber } from "../views/Input/InputNumber";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Loader from "../views/Loader";

const Table = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {idTable} = useParams();
    const table = useSelector(state => getTableById(state, parseInt(idTable)));
    const tablesStatus = ['Busy', 'Reserved', 'Free', 'Cleaning'];
    const pending = useSelector(getTablePending);
    console.log('pending:', pending);

    const [status, setStatus] = useState(table.status);
    const [peopleAmount, setPeopleAmount] = useState(table.peopleAmount);
    const [maxPeopleAmount, setMaxPeopleAmount] = useState(table.maxPeopleAmount);
    const [bill, setBill] = useState(table.bill);

    useEffect(() => {
        if(status === 'Busy'){
          setBill(0);
        }
    }, [status])

    useEffect(() => {
        if(peopleAmount < 0) setPeopleAmount(0)
        if(peopleAmount > maxPeopleAmount) setPeopleAmount(maxPeopleAmount)
    }, [peopleAmount, maxPeopleAmount])

    useEffect(() => {
        if(maxPeopleAmount < 0) setMaxPeopleAmount(0)
        if(maxPeopleAmount > 10) setMaxPeopleAmount(10)
    }, [maxPeopleAmount])

    if(!idTable) return <Navigate to="/" />;
    
    const handleSubmit = e => {
        e.preventDefault();
        const modifiedTable = {
          ...table,
          status,
          peopleAmount,
          maxPeopleAmount,
          bill
        }
        dispatch(editTableRequest(modifiedTable));
        navigate('/');
    }

    return(
        <div>
            <h1>Table {idTable}</h1>
            {pending && <Loader />}
            {!pending && <Form onSubmit={handleSubmit}>
                <Row className="mb-3 d-flex justify-content-start" controlId="formBasicStatus">
                    <Col className="col-1">
                        <Form.Label><strong>Status:  </strong></Form.Label>
                    </Col>
                    <Col className="col-2">
                        <Form.Select aria-label="Default select example" value={status} onChange={e => setStatus(e.currentTarget.value)} >
                        {tablesStatus.map(tab => <option key={tab} value={tab} >{tab}</option>  )}
                        </Form.Select>
                    </Col>
                </Row>
                <Row className="mb-3 d-flex justify-content-start" controlId="formBasicPeopleAmount">
                    <Col className="col-1">
                        <Form.Label><strong>People:  </strong></Form.Label>
                    </Col>
                    <Col className="col-6">
                        <InputNumber value={peopleAmount} onChange={e => setPeopleAmount(e.currentTarget.value)}> {table.peopleAmount} </InputNumber>
                        /
                        <InputNumber value={maxPeopleAmount} onChange={e => setMaxPeopleAmount(e.currentTarget.value)}> {table.maxPeopleAmount} </InputNumber>
                    </Col>
                </Row>
                {status === 'Busy' ? (<Row className="mb-3 d-flex justify-content-start" controlId="formBasicBill">
                    <Col className="col-1">
                        <Form.Label><strong>Bill:  </strong></Form.Label>
                    </Col>
                    <Col className="col-6">
                        $
                        <InputNumber value={bill} onChange={e => setBill(e.currentTarget.value)} > {table.bill} </InputNumber>
                    </Col>
                </Row>) : null}       
                <Button variant="primary" type="submit">
                    Update
                </Button> 
            </Form>}
            
        </div>
    )
}

export default Table;