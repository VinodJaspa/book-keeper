import React from "react";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { useSelector, useDispatch } from "react-redux";
import {
  addSection,
  removeSection,
  setSectionTitle,
} from "@/redux/slices/book";

const Section = ({ section, parentId }) => {

  const isCollaborator = useSelector((state) => state.book.isCollaborator);
  const book = useSelector((state)=> state.book.book);
  console.log(book ,"sdsds");
  const dispatch = useDispatch();

  return (
    <div className={parentId && "ml-6"}>
      <div className="flex justify-between items-center gap-2 mb-2">

        <Input
          id="title"
          placeholder={!parentId ? "Section title" :'Subsection Title'}
          defaultValue={section.title}
          onChange={(e) =>
            dispatch(setSectionTitle({ id: section.id, title: e.target.value }))
          }
        />
        {!isCollaborator && (
          <div className="flex gap-2">
            <Button
              onClick={() => dispatch(addSection({ parentId: section.id }))}
            >
              +
            </Button>
            <Button
              onClick={() =>
             
                dispatch(removeSection({parentId:parentId,id: section.id }))
              }
            >
              -
            </Button>
          </div>
        )}
      </div>
      {section.subsections && section.subsections.map((subsection) => (
        <Section
          key={subsection.id}
          parentId={section.id}
          section={subsection}
        />
      ))}
    </div>
  );
};

export { Section };
