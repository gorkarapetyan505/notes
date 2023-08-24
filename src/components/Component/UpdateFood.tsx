  import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Food, FoodCategory } from "../../features/food/foodSlice";
import { useAppDispatch } from "../../app/hooks";
import { updateFoodThunk } from "../../features/food/foodAPI";

export const UpdateFood = React.memo(({ data }: { data: Food }) => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Food>();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const update = (obj: Food) => {
    // console.log(data.id)
    dispatch(updateFoodThunk({ id: data.id, data:obj }));
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow} className="update">
        <img src="/icon/refresh (2).png" />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Food</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(update)}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Food name</Form.Label>
              <Form.Control
                defaultValue={data.food_name}
                {...register("food_name", { required: "enter name" })}
                type="text"
                placeholder="Enter food name"
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Calorie count</Form.Label>
              <Form.Control
                defaultValue={data.calorie_count}
                {...register("calorie_count", { required: "enter count" })}
                type="number"
                placeholder="Enter calorie count"
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Food Photo</Form.Label>
              <Form.Select
              defaultValue={data.category?data.category:''}
                placeholder="Enter food category"
                autoFocus
                {...register("category", { required: "enter category" })}
              >
                <option hidden value={""}>
                  Food Category
                </option>
                {FoodCategory?.map((e, i) => {
                  return (
                    <option key={i} value={e}>
                      {e}
                    </option>
                  );
                })}
              </Form.Select>
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
      </Modal>
    </>
  );
});
