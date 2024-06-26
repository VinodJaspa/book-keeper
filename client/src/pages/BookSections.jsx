import React, { useState, useEffect } from "react";
import { DashboardWrapper, Collaborators, Section } from "@/components/app";
import { jwtDecode } from "jwt-decode";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { addSection } from "@/redux/slices/book";
import {
  useLazyGetBookQuery,
  useUpdateBookMutation,
} from "@/redux/services/book";
import { setBook, setIsCollaborator } from "@/redux/slices/book";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const BookSections = () => {
  const book = useSelector((state) => state.book.book);
  const user = useSelector((state) => state.auth?.user);

  const isCollaborator = useSelector((state) => state.book.isCollaborator);
  const dispatch = useDispatch();
  let { id } = useParams();
  const [getBook, { error }] = useLazyGetBookQuery();
  const [updateBook, { error: updateError }] = useUpdateBookMutation();
  
  // Fetch book details and set collaborators on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const fetchBook = async () => {
      const response = await getBook({ id });
      dispatch(setBook(response.data));
      if (response.data?.collaborators.includes(decodedToken.email)) {
        dispatch(setIsCollaborator(true));
      } else {
        dispatch(setIsCollaborator(false));
      }
    };

    fetchBook();
  }, [id]);

  // Save book changes handler
  const saveBook = async () => {
    const response = await updateBook({ id, book });
   if(response.data){
    toast.success("Updated sucessfuly!")
   }
  };

  return (
    <DashboardWrapper tab="books">
      <div className="flex flex-col gap-8 p-8 w-full max-w-[600px]">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Book Sections</h2>
          {!isCollaborator && (
            <Collaborators>
              <Button variant="outline">Collaborators</Button>
            </Collaborators>
          )}
        </div>
        <div className="flex justify-between items-center gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg">
              <span className="font-semibold">Book Title:</span> {book?.title}
            </h2>
            <h2 className="text-lg">
              <span className="font-semibold">Author:</span> {user?.firstName} {user?.lastName}
            </h2>
          </div>
          {/* Add section button visible only to the Author */}
          {!isCollaborator && (
            <Button
             
              onClick={() => dispatch(addSection(id))}
            >
              Add Section
            </Button>
          )}
        </div>
        <div className={cn("flex flex-col gap-6 w-full")}>
          {book?.sections && book?.sections.map((section) => (
            <Section key={section.id} parentId={null} section={section} />
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <Button
           
            onClick={saveBook}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </DashboardWrapper>
  );
};

export { BookSections };
