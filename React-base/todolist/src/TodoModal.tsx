import React from 'react';
import { Modal } from 'react-bootstrap';

type Todo = {
  id: number;
  text: string;
  isChecked: boolean;
};

type TodoModalProps = {
  show: boolean;
  task: Todo | null;
  handleClose: () => void;
};

const TodoModal: React.FC<TodoModalProps> = (props) => {
  const { show, task, handleClose } = props;

  return (
    <div>
      <Modal
        show={show}
        onHide={() => handleClose()}
        animation={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Task 상세 정보</Modal.Title>
        </Modal.Header>
        <Modal.Body>{task?.text}</Modal.Body>
      </Modal>
    </div>
  );
};

export default TodoModal;
