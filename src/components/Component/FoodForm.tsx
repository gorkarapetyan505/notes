import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Alert } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Food, FoodCategory } from "../../features/food/foodSlice";
import { useAppDispatch } from "../../app/hooks";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addFoodThunk, updateFoodThunk } from "../../features/food/foodAPI";
import { storage } from "../../firebase/firebase";

export const FoodForm = React.memo(() => {
  const [img, setImg] = useState<any>(null);
  const inpfileRef = useRef<any>(null);
  const [loading, setLogading] = useState<boolean>(false);
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

  const save = (data: Food) => {
    if (img) {
      dispatch(addFoodThunk(data)).then((res: any) => {
        const d1 = `food_photo/${img.name + " " + Date.now()}`;
        const storageRef = ref(storage, d1);
        const uploadTask = uploadBytesResumable(storageRef, img);
        uploadTask.on(
          "state_changed",
          () => {
            console.log("loading");
            setLogading(true);
          },
          () => {
            console.log("error");
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref)
              .then((res1: string) => {
                dispatch(
                  updateFoodThunk({
                    id: res.payload.id,
                    data: {
                      photo_url: res1,
                      photo_path: d1,
                    },
                  })
                );
                reset();
                setImg(null);
                setLogading(false);
              })
              .catch((res) => {
                // console.log(res)
                reset();
                setLogading(false);
                alert(res);
              });
          }
        );
        // } else {
        // }
      });
    } else {
      alert("enter photo");
      // reset();
    }
  };
  return (
    <>
      {/* {loading ? (
        <div className="loading">
          <div className="honeycomb">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <></>
      )} */}  
      <Button variant="primary" onClick={handleShow}>
        Add Food
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Food</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(save)}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Food name</Form.Label>
              <Form.Control
                {...register("food_name", { required: "enter name" })}
                type="text"
                placeholder="Enter food name"
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Calorie count</Form.Label>
              <Form.Control
                {...register("calorie_count", { required: "enter count" })}
                type="number"
                placeholder="Enter calorie count"
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Food Photo</Form.Label>
              <Form.Control
                type="file"
                placeholder="Enter calorie count"
                autoFocus
                ref={inpfileRef}
                onChange={(e: any) => {
                  console.log(e.target.files[0]);
                  if (e.target.files?.length > 0) {
                    setImg(e.target.files[0]);
                  }
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Food Photo</Form.Label>
              <Form.Select
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

            {/* <Button type="submit" variant="primary" style={{ width: "150px" }}>
              Save Changes
            </Button> */}
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
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
});
