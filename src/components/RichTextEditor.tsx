import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Italic, List, ListOrdered, Quote, Undo2, Redo2, Code, Heading1, Heading2 } from 'lucide-react';
import { useEffect, type ReactNode } from 'react';

type RichTextEditorProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

const ToolbarButton = ({
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
    aria-label={title}
    onClick={onClick}
    className={`inline-flex items-center justify-center rounded-lg p-2 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-accent/30 ${
      active
        ? 'bg-accent text-accent-text font-semibold shadow-xs'
        : 'text-text-muted hover:bg-paper-elevated hover:text-text'
    }`}
  >
    {children}
  </button>
);

export const RichTextEditor = ({ value, onChange, placeholder }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    editorProps: {
      attributes: {
        class:
          'min-h-[20rem] max-h-[36rem] overflow-auto px-6 py-5 focus:outline-none prose dark:prose-invert max-w-none text-text leading-relaxed font-sans',
      },
    },
    onUpdate: ({ editor: tiptapEditor }) => {
      onChange(tiptapEditor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;

    const currentHtml = editor.getHTML();
    if (value !== currentHtml) {
      editor.commands.setContent(value || '<p></p>', false);
    }
  }, [editor, value]);

  if (!editor) {
    return (
      <div className="rounded-2xl border border-border bg-paper p-8 text-center text-sm text-text-muted">
        Loading editor…
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-paper shadow-sm">
      {/* TipTap Toolbar */}
      <div className="flex flex-wrap items-center gap-1 border-b border-border bg-paper-elevated/50 p-2 sm:px-3">
        <ToolbarButton
          title="Bold (Ctrl+B)"
          active={editor.isActive('bold')}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarButton
          title="Italic (Ctrl+I)"
          active={editor.isActive('italic')}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="h-4 w-4" />
        </ToolbarButton>

        <div className="mx-1 h-4 w-px bg-border" aria-hidden="true" />

        <ToolbarButton
          title="Heading 1"
          active={editor.isActive('heading', { level: 1 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        >
          <Heading1 className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarButton
          title="Heading 2"
          active={editor.isActive('heading', { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          <Heading2 className="h-4 w-4" />
        </ToolbarButton>

        <div className="mx-1 h-4 w-px bg-border" aria-hidden="true" />

        <ToolbarButton
          title="Bullet List"
          active={editor.isActive('bulletList')}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarButton
          title="Numbered List"
          active={editor.isActive('orderedList')}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarButton
          title="Blockquote"
          active={editor.isActive('blockquote')}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <Quote className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarButton
          title="Code Block"
          active={editor.isActive('codeBlock')}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          <Code className="h-4 w-4" />
        </ToolbarButton>

        <div className="mx-1 h-4 w-px bg-border" aria-hidden="true" />

        <ToolbarButton
          title="Undo (Ctrl+Z)"
          onClick={() => editor.chain().focus().undo().run()}
        >
          <Undo2 className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarButton
          title="Redo (Ctrl+Y)"
          onClick={() => editor.chain().focus().redo().run()}
        >
          <Redo2 className="h-4 w-4" />
        </ToolbarButton>
      </div>

      {/* Editor Surface */}
      <EditorContent editor={editor} />

      {placeholder && (
        <div className="border-t border-border/80 bg-paper-elevated/30 px-5 py-2.5 text-xs text-text-muted">
          {placeholder}
        </div>
      )}
    </div>
  );
};

export default RichTextEditor;
