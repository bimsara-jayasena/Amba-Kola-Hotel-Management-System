import React, { useState } from "react";
import SuccessDialog from "../CreateAdmin/SuccessDialog";
import Link from "@mui/material/Link";
export default function Test() {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(!open);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <SuccessDialog open={open} handleClose={handleClose} />
      <div className="relative w-fit p-1 mt-1">
        <button
          className="border rounded w-[5rem]  mt-1 "
          onClick={handleClickOpen}
        >
          abc
        </button>
        <Link
          component="button"
          variant="body2"
          underline="none"
          onClick={() => {
            console.info("I'm a button.");
          }}
        >
          Button Link
        </Link>
      </div>
    </>
  );
}
