import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { useAddBookMutation } from "@/redux/services/book";
import { jwtDecode } from "jwt-decode";
import { Input } from "@/components/ui/input";
import { useSelector } from "react-redux";
import { DashboardWrapper } from "@/components/app";

const AddBookForm = () => {
  const [title, setTitle] = useState("");
  const [sections, setSections] = useState([
    {
      id: uuidv4(),
      title: "",
      subsections: [{ id: uuidv4(), title: "" }], // Initialize with one subsection
    },
  ]);
  const user = useSelector((state) => state.auth?.user);
  console.log(user,"usr__");
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const [addBook, { isLoading, isError, error }] = useAddBookMutation();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newBook = {
      userId: decodedToken.sub,
      title: title,
      collaborators: [],
      sections: sections.map((section) => ({
        ...section,
        subsections: section.subsections.map((subsection) => ({
          ...subsection,
          id: uuidv4(),
        })),
      })),
      id: uuidv4(),
    };

    try {
      const response = await addBook(newBook);
      console.log("New Book Data:", response.data);
      navigate('/books'); // Redirect to books page after successful submission
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  const handleAddSection = () => {
    setSections((prevSections) => [
      ...prevSections,
      {
        id: uuidv4(),
        title: "",
        subsections: [{ id: uuidv4(), title: "" }], // Initialize with one subsection
      },
    ]);
  };
  

  const removeSection = (id) => {
    const updatedSections = sections.filter((section) => section.id !== id);
    setSections(updatedSections);
  };

  const handleSectionChange = (index, value) => {
    const updatedSections = [...sections];
    updatedSections[index].title = value;
    setSections(updatedSections);
  };

  const handleAddSubsection = (sectionIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].subsections.push({
      id: uuidv4(),
      title: "",
    });
    setSections(updatedSections);
  };

  const handleRemoveSubsection = (sectionIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].subsections.pop(); // Remove the last subsection
    setSections(updatedSections);
  };

  const handleSubsectionChange = (sectionIndex, subsectionIndex, value) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].subsections[subsectionIndex].title = value;
    setSections(updatedSections);
  };

  return (
    <DashboardWrapper tab="addBook">
      <div className="flex flex-col gap-8 p-8 w-full max-w-[600px]">
      <h2 className="text-xl font-bold mb-4">Add New Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Input
            id="title"
            placeholder="Book title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {sections.map((section, sectionIndex) => (
          <div>
            <div className="flex justify-between items-center gap-2 mb-2 ">
              <Input
                id={`sectionTitle-${section.id}`}
                placeholder="Section name"
                value={section.title}
                onChange={(e) => handleSectionChange(sectionIndex, e.target.value)}
                required
              />
              <div className="flex gap-2 mt-1">
                <Button onClick={handleAddSection}>+ </Button>
                {sections.length > 1 && (
                  <Button onClick={() => removeSection(section.id)}>-</Button>
                )}
              </div>

            </div>

            {section.subsections.map((subsection, subsectionIndex) => (
              <div className="flex justify-between items-center gap-2 mb-2 ml-6">
                <Input
                  id={`subsection-${subsection.id}`}
                  placeholder="Subsection Title"
                  value={subsection.title}
                  onChange={(e) => handleSubsectionChange(sectionIndex, subsectionIndex, e.target.value)}
                  required
                />
                <div className="flex gap-2 mt-1">
                  <Button onClick={() => handleAddSubsection(sectionIndex)}>+ </Button>
                  {section.subsections.length > 1 && (
                    <Button onClick={() => handleRemoveSubsection(sectionIndex)}>-</Button>
                  )}
                </div>

              </div>
            ))}



          </div>

        ))}

        <Button type="submit">Save Book</Button>
      </form>
    </div>
    </DashboardWrapper>
  );
};

export { AddBookForm };
