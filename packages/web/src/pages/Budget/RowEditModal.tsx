import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityOnIcon from "@mui/icons-material/Visibility";
import { Box, Button, ClickAwayListener, TextField } from "@mui/material";
import { useRef } from "react";
import {
  FloatingArrow,
  useFloating,
  arrow,
  offset,
  FloatingPortal,
} from "@floating-ui/react";
import { Formik } from "formik";

export const RowEditModal = ({
  name,
  isHidden,
  canBeDeleted,
  open,
  onOpenChange,
  onNameChange,
  onHidden,
  onDeleted,
}: {
  name: string;
  isHidden: boolean;
  canBeDeleted: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNameChange: (name: string) => void;
  onHidden: (state: boolean) => void;
  onDeleted: () => void;
}) => {
  const arrowRef = useRef(null);
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange,
    middleware: [
      offset(10),
      arrow({
        element: arrowRef,
      }),
    ],
  });
  return (
    <>
      <button
        onClick={() => {
          onOpenChange(true);
        }}
        ref={refs.setReference}
        className="hover:underline underline-offset-2"
      >
        {isHidden && (
          <Box className="flex items-center gap-2 text-slate-400">
            <VisibilityOffIcon fontSize="small" />
            <Box className="italic">{name}</Box>
          </Box>
        )}
        {!isHidden && <Box>{name}</Box>}
      </button>
      {open && (
        <FloatingPortal>
          <ClickAwayListener onClickAway={() => onOpenChange(false)}>
            <Box
              ref={refs.setFloating}
              style={floatingStyles}
              className="flex flex-col gap-2 bg-white p-3 rounded-lg"
              sx={{
                boxShadow: "0px 5px 25px 5px rgba(0,0,0,0.2)",
              }}
            >
              <Formik
                initialValues={{ name }}
                onSubmit={(values) => {
                  onNameChange(values.name);
                }}
              >
                {({ getFieldProps, submitForm }) => (
                  <>
                    <FloatingArrow
                      className="fill-white"
                      ref={arrowRef}
                      context={context}
                    />

                    <TextField label="Name" {...getFieldProps("name")} />

                    <Box className="flex gap-2">
                      <Button
                        startIcon={
                          isHidden ? (
                            <VisibilityOnIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )
                        }
                        variant="outlined"
                        onClick={() => {
                          onHidden(!isHidden);
                        }}
                      >
                        {isHidden ? "Show" : "Hide"}
                      </Button>
                      <Button
                        disabled={!canBeDeleted}
                        startIcon={<DeleteIcon />}
                        color="error"
                        variant="outlined"
                        onClick={() => {
                          onDeleted();
                        }}
                      >
                        Delete
                      </Button>
                      <Box className="pl-4">
                        <Button
                          variant="contained"
                          onClick={() => submitForm()}
                        >
                          Save
                        </Button>
                      </Box>
                    </Box>
                  </>
                )}
              </Formik>
            </Box>
          </ClickAwayListener>
        </FloatingPortal>
      )}
    </>
  );
};
