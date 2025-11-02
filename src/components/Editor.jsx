import { useState, useEffect, useRef, useMemo } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
  ClassicEditor,
  Autosave,
  Essentials,
  Paragraph,
  Autoformat,
  ImageInsertViaUrl,
  ImageBlock,
  ImageToolbar,
  AutoImage,
  BlockQuote,
  Bold,
  CloudServices,
  Link,
  ImageUpload,
  Heading,
  ImageCaption,
  ImageInline,
  ImageStyle,
  ImageTextAlternative,
  Indent,
  IndentBlock,
  Italic,
  LinkImage,
  List,
  Table,
  TableToolbar,
  TableCaption,
  TextTransformation,
  TodoList,
  Underline,
  Fullscreen,
  Strikethrough,
  Subscript,
  Superscript,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  Highlight,
  HorizontalLine,
  CodeBlock,
  Alignment,
  PlainTableOutput,
  BalloonToolbar,
} from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';

const LICENSE_KEY =
  'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NjI5OTE5OTksImp0aSI6ImI0NzgwODViLTYzNTgtNGE1Zi1hYmQzLWMwNWVlOWQyOWJiYyIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6ImUwZmQ3MGMyIn0.oyVMQddzzoIZ-8HZP90ASqEB1TLHOkYf-xs3VDDkodZgsJt5GD9y_T34Myxsgcjj5y41-ZXaAKzb3QKzUpWNlA';

export default function Editor({ value = '', onChange }) {
  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    setIsLayoutReady(true);
    return () => setIsLayoutReady(false);
  }, []);

  const editorConfig = useMemo(
    () => ({
      toolbar: {
        items: [
          'undo',
          'redo',
          '|',
          'fullscreen',
          '|',
          'heading',
          '|',
          'fontSize',
          'fontFamily',
          'fontColor',
          'fontBackgroundColor',
          '|',
          'bold',
          'italic',
          'underline',
          'strikethrough',
          'subscript',
          'superscript',
          '|',
          'horizontalLine',
          'link',
          'insertImageViaUrl',
          'insertTable',
          'highlight',
          'blockQuote',
          'codeBlock',
          '|',
          'alignment',
          '|',
          'bulletedList',
          'numberedList',
          'todoList',
          'outdent',
          'indent',
        ],
        shouldNotGroupWhenFull: false,
      },
      plugins: [
        Alignment,
        Autoformat,
        AutoImage,
        Autosave,
        BalloonToolbar,
        BlockQuote,
        Bold,
        CloudServices,
        CodeBlock,
        Essentials,
        FontBackgroundColor,
        FontColor,
        FontFamily,
        FontSize,
        Fullscreen,
        Heading,
        Highlight,
        HorizontalLine,
        ImageBlock,
        ImageCaption,
        ImageInline,
        ImageInsertViaUrl,
        ImageStyle,
        ImageTextAlternative,
        ImageToolbar,
        ImageUpload,
        Indent,
        IndentBlock,
        Italic,
        Link,
        LinkImage,
        List,
        Paragraph,
        PlainTableOutput,
        Strikethrough,
        Subscript,
        Superscript,
        Table,
        TableCaption,
        TableToolbar,
        TextTransformation,
        TodoList,
        Underline,
      ],
      balloonToolbar: ['bold', 'italic', '|', 'link', '|', 'bulletedList', 'numberedList'],
      fontFamily: { supportAllValues: true },
      fontSize: { options: [10, 12, 14, 'default', 18, 20, 22], supportAllValues: true },
      placeholder: 'Type or paste your content here!',
      table: { contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'] },
      licenseKey: LICENSE_KEY,
    }),
    []
  );

  if (!isLayoutReady) return null;

  return (
    <div className="editor-wrapper">
      <div
        className="editor-container editor-container_classic-editor editor-container_include-fullscreen"
        ref={editorContainerRef}
      >
        <div className="editor-container__editor">
          <div ref={editorRef}>
            <CKEditor
              editor={ClassicEditor}
              config={editorConfig}
              data={value || ''}
              onChange={(event, editor) => onChange(event, editor)}
            />
          </div>
        </div>
      </div>

      {/* ✅ Responsive Styles */}
      <style jsx>{`
        .editor-wrapper {
          width: 100%;
          max-width: 100%;
          overflow: hidden;
        }

        .ck-editor__editable {
          min-height: 250px;
          font-size: 16px;
          line-height: 1.5;
        }

        /* ✅ Tablet screens */
        @media (max-width: 1024px) {
          .ck-toolbar {
            flex-wrap: wrap !important;
          }
          .ck-editor__editable {
            min-height: 220px;
          }
        }

        /* ✅ Mobile screens */
        @media (max-width: 768px) {
          .ck-toolbar {
            flex-wrap: wrap !important;
            justify-content: center;
          }
          .ck-editor__editable {
            min-height: 180px;
            font-size: 14px;
            padding: 8px;
          }
          .ck.ck-toolbar__items > * {
            flex: 1 0 10%;
            min-width: 32px;
          }
        }

        /* ✅ Extra small phones */
        @media (max-width: 480px) {
          .ck-editor__editable {
            min-height: 150px;
            font-size: 13px;
          }
        }
      `}</style>
    </div>
  );
}
