import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Italic, List, ListOrdered, Quote, Undo2, Redo2 } from 'lucide-react';
import { useEffect } from 'react';
import type { ReactNode } from 'react';

type RichTextEditorProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

const EditorButton = ({
  onClick,
  active,
  children,
  title,
}: {
  onClick: () => void;
  active?: boolean;
  children: ReactNode;
  title: string;
}) => (
  <button
    type="button"
    title={title}
    onClick={onClick}
    className={`rounded-lg border px-3 py-2 text-sm transition ${
      active
        ? 'border-border bg-[color:var(--color-accent)] text-white'
        : 'border-border bg-card-bg text-text hover:bg-[color:var(--color-paper-elevated)]'
    }`}
  >
    {children}
  </button>
);

const RichTextEditor = ({ value, onChange, placeholder }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    editorProps: {
      attributes: {
        class:
          'min-h-[16rem] max-h-[32rem] overflow-auto px-5 py-4 focus:outline-none text-[color:var(--color-text)]',
      },
    },
    onUpdate: ({ editor: tiptapEditor }) => {
      onChange(tiptapEditor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) {
      return;
    }

    const currentHtml = editor.getHTML();
    if (value !== currentHtml) {
      editor.commands.setContent(value || '<p></p>', false);
    }
  }, [editor, value]);

  if (!editor) {
    return (
      <div className="rounded-2xl border border-border bg-card-bg p-4 text-sm text-text/70">
        Loading editor...
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card-bg shadow-sm">
      <div className="flex flex-wrap gap-2 border-b border-border p-3">
        <EditorButton title="Bold" active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()}>
          <Bold className="h-4 w-4" />
        </EditorButton>
        <EditorButton title="Italic" active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <Italic className="h-4 w-4" />
        </EditorButton>
        <EditorButton title="Bullet list" active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <List className="h-4 w-4" />
        </EditorButton>
        <EditorButton title="Numbered list" active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          <ListOrdered className="h-4 w-4" />
        </EditorButton>
        <EditorButton title="Quote" active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          <Quote className="h-4 w-4" />
        </EditorButton>
        <EditorButton title="Undo" onClick={() => editor.chain().focus().undo().run()}>
          <Undo2 className="h-4 w-4" />
        </EditorButton>
        <EditorButton title="Redo" onClick={() => editor.chain().focus().redo().run()}>
          <Redo2 className="h-4 w-4" />
        </EditorButton>
      </div>
      <EditorContent editor={editor} />
      {placeholder ? (
        <p className="border-t border-border px-5 py-3 text-xs text-text/60">{placeholder}</p>
      ) : null}
    </div>
  );
};

export default RichTextEditor;
