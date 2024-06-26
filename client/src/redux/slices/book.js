import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  book: {
    title: "",
    sections: [],
  },
  isCollaborator: false,
};

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setIsCollaborator: (state, action) => {
      state.isCollaborator = action.payload;
    },
    setBook: (state, action) => {
      state.book = action.payload;
    },
    setTitle: (state, action) => {
      state.book.title = action.payload;
    },
    addSection: (state, action) => {
      const newSection = {
        id: uuidv4(),
        title: "",
        subsections: [{ id: uuidv4(), title: "" }],
      };
      state.book.sections.push(newSection);
    },
    removeSection: (state, action) => {
      const { id, parentId } = action.payload;

      const removeSectionFromState = (sections) => {
        return sections.map((section) => {
          if (section.id === parentId) {
            section.subsections = section.subsections.filter(
              (subsection) => subsection.id !== id
            );
          } else {
           state.book.sections.pop(id)
      
          }
          return section;
        });
      };

      state.book.sections = removeSectionFromState(state.book.sections);
    },
    setSectionTitle: (state, action) => {
      const { id, title } = action.payload;

      const updateSectionTitle = (sections) => {
        return sections.map((section) => {
          if (section.id === id) {
            return {
              ...section,
              title: title,
            };
          } else if (section.subsections && section.subsections.length > 0) {
            return {
              ...section,
              subsections: updateSectionTitle(section.subsections),
            };
          }
          return section;
        });
      };

      state.book.sections = updateSectionTitle(state.book.sections);
    },
  },
});

export const {
  setIsCollaborator,
  setBook,
  setTitle,
  addSection,
  removeSection,
  setSectionTitle,
} = bookSlice.actions;

export default bookSlice.reducer;
