import { useEffect } from 'react';
import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import {
  Bold, Italic, UnderlineIcon, Strikethrough, Link as LinkIcon,
  Image as ImageIcon, List, ListOrdered, Quote, Undo, Redo,
  AlignLeft, AlignCenter, AlignRight, Heading1, Heading2, Heading3,
} from 'lucide-react';
import { toast } from 'sonner';
import api, { assetUrl } from '../lib/api';
import { cn } from './ui/cn';

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export function RichTextEditor({ value, onChange, placeholder = 'Write your blog post content...' }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Link.configure({ openOnClick: false, HTMLAttributes: { rel: 'noopener noreferrer' } }),
      Image.configure({ inline: false, allowBase64: false }),
      Placeholder.configure({ placeholder }),
    ],
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;
    if (editor.getHTML() === value) return;
    editor.commands.setContent(value || '', false);
  }, [editor, value]);

  if (!editor) return null;

  return (
    <div className="tiptap-editor rounded-lg border border-gray-300 overflow-hidden">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} className="min-h-[350px]" />
    </div>
  );
}

function Toolbar({ editor }: { editor: Editor }) {
  const setLink = () => {
    const url = window.prompt('Enter URL', editor.getAttributes('link').href);
    if (url === null) return;
    if (url === '') { editor.chain().focus().unsetLink().run(); return; }
    editor.chain().focus().setLink({ href: url }).run();
  };

  const insertImage = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      try {
        const formData = new FormData();
        formData.append('image', file);
        const { data } = await api.post<{ url: string }>('/api/v1/admin/blog/upload-image', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        editor.chain().focus().setImage({ src: assetUrl(data.url) }).run();
        toast.success('Image uploaded');
      } catch (error: any) {
        toast.error(error?.response?.data?.message || 'Image upload failed. Please try again.');
      }
    };
    input.click();
  };

  const btn = (active: boolean, title: string, action: () => void, icon: React.ReactNode) => (
    <button
      type="button"
      title={title}
      onClick={action}
      className={cn(
        'rounded p-1.5 hover:bg-gray-100 transition-colors',
        active ? 'bg-gray-200 text-[#C8A84B]' : 'text-gray-600'
      )}
    >
      {icon}
    </button>
  );

  return (
    <div className="flex flex-wrap gap-0.5 border-b bg-gray-50 p-2">
      {btn(editor.isActive('bold'), 'Bold', () => editor.chain().focus().toggleBold().run(), <Bold className="h-4 w-4" />)}
      {btn(editor.isActive('italic'), 'Italic', () => editor.chain().focus().toggleItalic().run(), <Italic className="h-4 w-4" />)}
      {btn(editor.isActive('underline'), 'Underline', () => editor.chain().focus().toggleUnderline().run(), <UnderlineIcon className="h-4 w-4" />)}
      {btn(editor.isActive('strike'), 'Strikethrough', () => editor.chain().focus().toggleStrike().run(), <Strikethrough className="h-4 w-4" />)}
      <div className="mx-1 w-px bg-gray-200 self-stretch" />
      {btn(editor.isActive('heading', { level: 1 }), 'H1', () => editor.chain().focus().toggleHeading({ level: 1 }).run(), <Heading1 className="h-4 w-4" />)}
      {btn(editor.isActive('heading', { level: 2 }), 'H2', () => editor.chain().focus().toggleHeading({ level: 2 }).run(), <Heading2 className="h-4 w-4" />)}
      {btn(editor.isActive('heading', { level: 3 }), 'H3', () => editor.chain().focus().toggleHeading({ level: 3 }).run(), <Heading3 className="h-4 w-4" />)}
      <div className="mx-1 w-px bg-gray-200 self-stretch" />
      {btn(editor.isActive({ textAlign: 'left' }), 'Align Left', () => editor.chain().focus().setTextAlign('left').run(), <AlignLeft className="h-4 w-4" />)}
      {btn(editor.isActive({ textAlign: 'center' }), 'Align Center', () => editor.chain().focus().setTextAlign('center').run(), <AlignCenter className="h-4 w-4" />)}
      {btn(editor.isActive({ textAlign: 'right' }), 'Align Right', () => editor.chain().focus().setTextAlign('right').run(), <AlignRight className="h-4 w-4" />)}
      <div className="mx-1 w-px bg-gray-200 self-stretch" />
      {btn(editor.isActive('bulletList'), 'Bullet List', () => editor.chain().focus().toggleBulletList().run(), <List className="h-4 w-4" />)}
      {btn(editor.isActive('orderedList'), 'Numbered List', () => editor.chain().focus().toggleOrderedList().run(), <ListOrdered className="h-4 w-4" />)}
      {btn(editor.isActive('blockquote'), 'Quote', () => editor.chain().focus().toggleBlockquote().run(), <Quote className="h-4 w-4" />)}
      <div className="mx-1 w-px bg-gray-200 self-stretch" />
      {btn(editor.isActive('link'), 'Link', setLink, <LinkIcon className="h-4 w-4" />)}
      {btn(false, 'Insert Image', insertImage, <ImageIcon className="h-4 w-4" />)}
      <div className="mx-1 w-px bg-gray-200 self-stretch" />
      {btn(false, 'Undo', () => editor.chain().focus().undo().run(), <Undo className="h-4 w-4" />)}
      {btn(false, 'Redo', () => editor.chain().focus().redo().run(), <Redo className="h-4 w-4" />)}
    </div>
  );
}
