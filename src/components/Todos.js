import React, { useState } from "react";
import { connect } from "react-redux";
import { addTodos } from "../redux/reducer";
import { GoPlus } from "react-icons/go";
import { motion } from "framer-motion";
import { Button, Modal } from "react-bootstrap";

const mapStateToProps = (state) => {
  return {
    todos: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (obj) => dispatch(addTodos(obj)),
  };
};

const Todos = (props) => {
  const [todo, setTodo] = useState("");

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const add = () => {
    if (todo === "") {
      alert("Input is Empty");
    } else {
      props.addTodo({
        id: Math.floor(Math.random() * 1000),
        item: todo,
        completed: false,
      });
      setTodo("");
    }
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //console.log("props from store", props);
  return (
    <div className="addTodos">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="add-btn"
        onClick={handleShow}
      >
        <GoPlus />
      </motion.button>

      <Modal show={show} onHide={handleClose} keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add Todos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            onChange={(e) => handleChange(e)}
            className="todo-input"
            value={todo}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => add()}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
//we can use connect method to connect this component with redux store
export default connect(mapStateToProps, mapDispatchToProps)(Todos);
