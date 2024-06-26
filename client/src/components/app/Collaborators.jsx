import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSelector, useDispatch } from "react-redux";
import { setBook } from "@/redux/slices/book";
import { useParams } from "react-router-dom";
import { useUpdateBookMutation } from "@/redux/services/book";

const Collaborators = ({ children }) => {
  const [updateBook, { error }] = useUpdateBookMutation();
  const book = useSelector((state) => state.book.book);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  let { id } = useParams();

  const addCollab = async () => {
    if (!book?.collaborators?.includes(email)) {
      try {
        const response = await updateBook({
          id,
          book: {
            ...book,
            collaborators: [...book.collaborators, email],
          },
        });
        dispatch(setBook(response.data));
        setEmail("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const removeCollab = async (collaborator) => {
    try {
      const response = await updateBook({
        id,
        book: {
          ...book,
          collaborators: book.collaborators.filter(
            (collab) => collab !== collaborator
          ),
        },
      });
      dispatch(setBook(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Manage Collaborators</DialogTitle>
          <DialogDescription>Add or remove collaborators.</DialogDescription>
        </DialogHeader>
        {/* <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
        </div> */}
        <div className="flex gap-2">
          <Label className="sr-only" htmlFor="email">
            Email<span className="asterisk">*</span>
          </Label>
          <Input
            id="email"
            placeholder="name@example.com"
            type="email"
            autoComplete="email"
            autoCorrect="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button onClick={addCollab} disabled={!email}>
            Add
          </Button>
        </div>
        <div className="flex flex-col gap-2 text-muted-foreground text-sm my-4">
          {book?.collaborators?.map((collaborator, index) => (
            <div key={index} className="flex justify-between items-center">
              <p>{collaborator}</p>
              <Button onClick={() => removeCollab(collaborator)}>Remove</Button>
            </div>
          ))}
        </div>
        {/* <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
};

export { Collaborators };
