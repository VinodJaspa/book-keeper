import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { DashboardWrapper } from "@/components/app";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useLazyGetBooksQuery } from "@/redux/services/book";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [getBooks, { error }] = useLazyGetBooksQuery();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const fetchBooks = async () => {
      const response = await getBooks();
      const filteredBooks = response.data.filter((book) => {
        return (
          book.userId == decodedToken.sub ||
          book.collaborators?.includes(decodedToken.email)
        );
      });

      setBooks(filteredBooks);
    };

    fetchBooks();
  }, []);

  return (
    <DashboardWrapper tab="books">
      <div className="flex flex-col gap-8 p-8 w-full max-w-[600px]">
        <h2 className="text-xl font-bold">Books</h2>
        {books.length === 0 ? (
          <p className="text-gray-500 mt-4">You have no books yet.</p>
        ) : (
          <div className={cn("flex flex-col gap-6 w-full")}>
            {books?.map((book) => (
              <div key={book.id} className="flex justify-between items-center">
                <p>{book.title}</p>
                <div className="flex gap-2">
                  <Link to={`/books/${book.id}`}>
                    <Button>Edit</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-4">
          <Link to="/add-new-book">
            <Button>Add Book</Button>
          </Link>
        </div>
      </div>
    </DashboardWrapper>
  );
};

export { Books };
