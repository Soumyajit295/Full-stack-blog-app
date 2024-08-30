import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import './RTE.css'

function RichTextEditor({ value, onChange }) {
  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      className="custom-quill-editor"
      theme="snow"
      modules={{
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'header': [3, 4, 5, 6] }],
            [{ 'font': [] }],
            [{ 'size': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['bold', 'italic', 'underline'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            ['link', 'image'],
            ['clean']
          ]
      }}
    />
  );
}

export default RichTextEditor;
