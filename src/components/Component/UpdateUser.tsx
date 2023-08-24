import React, { useState } from "react";
import { User } from "../../features/user/userSlice";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { updateUserThunk } from "../../features/user/userAPI";
import { useAppDispatch } from "../../app/hooks";

export const UpdateUser = React.memo(({ user }: { user: User }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>();
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const update = (data: User) => {
    // console.log(data);
    // console.log(user.id)
    // dispatch(updateFoodThunk({ id: data.id, data:obj }));
    dispatch(updateUserThunk({ id: user.id, data: data }));
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow} className="update">
        {/* <img src="/icon/update.png" /> */}
        Update profile
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(update)}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                defaultValue={user.name}
                {...register("name", { required: "enter your name" })}
                type="text"
                placeholder="Enter your name"
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Surname</Form.Label>
              <Form.Control
                defaultValue={user.surname}
                {...register("surname", { required: "enter your surname" })}
                type="text"
                placeholder="Enter your surname"
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Age</Form.Label>
              <Form.Control
                defaultValue={user.age}
                {...register("age", { required: "enter your age" })}
                type="number"
                placeholder="Enter your age"
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Weight</Form.Label>
              <Form.Control
                defaultValue={user.weight}
                {...register("weight", { required: "enter your weight" })}
                type="number"
                placeholder="Enter your weight"
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Height</Form.Label>
              <Form.Control
                defaultValue={user.height}
                {...register("height", { required: "enter your height" })}
                type="number"
                placeholder="Enter your height"
                autoFocus
              />
            </Form.Group>

            <Modal.Footer style={{padding:"5px 0 0 0"}}>
              <Button
                type="submit"
                variant="primary"
                style={{ width: "150px" }}
              >
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
        {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
      </Modal>
    </>
  );
});
