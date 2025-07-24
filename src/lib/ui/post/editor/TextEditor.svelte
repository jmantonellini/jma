<script lang="ts">
	import { Color } from '@tiptap/extension-color';
	import ListItem from '@tiptap/extension-list-item';
	import TextStyle from '@tiptap/extension-text-style';
	import StarterKit from '@tiptap/starter-kit';
	import { Editor } from '@tiptap/core';
	import { onMount } from 'svelte';
	import ListBullet from '$lib/icons/ListBullet.svelte';
	import ListNumbered from '$lib/icons/ListNumbered.svelte';

	let { name = 'content', content = $bindable() } = $props();
	let element: Element;
	let editor: Editor | null = $state(null);
	let html = $state(content);

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [
				Color.configure({ types: [TextStyle.name, ListItem.name] }),
				TextStyle.configure({ types: [ListItem.name] }),
				StarterKit
			],
			editorProps: {
				attributes: {
					class: 'w-full max-w-full prose prose-base lg:prose-2xl focus:outline-none min-h-[50vh]'
				}
			},
			content: content,
			autofocus: false,
			onUpdate: ({ editor: updatedEditor }) => {
				html = updatedEditor.getHTML();
				content = html; // update the bound value
			},
			onTransaction: ({ editor: newEditor }) => {
				// force re-render so `editor.isActive` works as expected
				editor = null;
				editor = newEditor;
			}
		});
	});

	// onDestroy(() => {
	// 	if (editor) {
	// 		editor.destroy();
	// 	}
	// });
</script>

{#if editor}
	<div class="flex items-start sticky top-[var(--header-height)] z-10 bg-base-100">
		<div class="flex gap-2 lg:gap-4 flex-wrap justify-center">
			<button
				type="button"
				onclick={() => editor?.chain().focus().toggleBold().run()}
				disabled={!editor.can().chain().focus().toggleBold().run()}
				class={`btn ${editor?.isActive('bold') ? 'btn-active btn-primary' : ''} disabled:btn-disabled`}
			>
				B
			</button>
			<button
				type="button"
				onclick={() => editor?.chain().focus().toggleItalic().run()}
				disabled={!editor.can().chain().focus().toggleItalic().run()}
				class={`btn ${editor?.isActive('italic') ? 'btn-active btn-primary' : ''} disabled:btn-disabled italic`}
			>
				I
			</button>
			<button
				type="button"
				onclick={() => editor?.chain().focus().toggleStrike().run()}
				disabled={!editor.can().chain().focus().toggleStrike().run()}
				class={`btn ${editor?.isActive('strike') ? 'btn-active btn-primary' : ''} disabled:btn-disabled line-through`}
			>
				Strike
			</button>
			<button
				type="button"
				onclick={() => editor?.chain().focus().toggleCode().run()}
				disabled={!editor.can().chain().focus().toggleCode().run()}
				class={`btn ${editor?.isActive('code') ? 'btn-active btn-primary' : ''} disabled:btn-disabled font-mono`}
			>
				Code
			</button>

			<button
				type="button"
				onclick={() => editor?.chain().focus().setParagraph().run()}
				class={`btn ${editor?.isActive('paragraph') ? 'btn-active btn-primary' : ''} disabled:btn-disabled`}
			>
				p
			</button>
			<button
				type="button"
				onclick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
				class={`btn ${editor?.isActive('heading', { level: 1 }) ? 'btn-active btn-primary' : ''} disabled:btn-disabled`}
			>
				H1
			</button>
			<button
				type="button"
				onclick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
				class={`btn ${editor?.isActive('heading', { level: 2 }) ? 'btn-active btn-primary' : ''} disabled:btn-disabled`}
			>
				H2
			</button>
			<button
				type="button"
				onclick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
				class={`btn ${editor?.isActive('heading', { level: 3 }) ? 'btn-active btn-primary' : ''} disabled:btn-disabled`}
			>
				H3
			</button>
			<button
				type="button"
				onclick={() => editor?.chain().focus().toggleBulletList().run()}
				class={`btn ${editor?.isActive('bulletList') ? 'btn-active btn-primary' : ''} disabled:btn-disabled`}
			>
				<ListBullet />
			</button>
			<button
				type="button"
				onclick={() => editor?.chain().focus().toggleOrderedList().run()}
				class={`btn ${editor?.isActive('orderedList') ? 'btn-active btn-primary' : ''} disabled:btn-disabled`}
			>
				<ListNumbered />
			</button>
			<button
				type="button"
				onclick={() => editor?.chain().focus().toggleCodeBlock().run()}
				class={`btn ${editor?.isActive('codeBlock') ? 'btn-active btn-primary' : ''} disabled:btn-disabled font-mono`}
			>
				Code block
			</button>
			<button
				type="button"
				onclick={() => editor?.chain().focus().toggleBlockquote().run()}
				class={`btn ${editor?.isActive('blockquote') ? 'btn-active btn-primary' : ''} disabled:btn-disabled`}
			>
				" "
			</button>
			<button type="button" onclick={() => editor?.chain().focus().setHorizontalRule().run()}>
				Horizontal rule
			</button>
			<button type="button" onclick={() => editor?.chain().focus().setHardBreak().run()}
				>Hard break</button
			>
			<button
				type="button"
				onclick={() => editor?.chain().focus().undo().run()}
				disabled={!editor.can().chain().focus().undo().run()}
			>
				Undo
			</button>
			<button
				type="button"
				onclick={() => editor?.chain().focus().redo().run()}
				disabled={!editor.can().chain().focus().redo().run()}
			>
				Redo
			</button>
			<button type="button" onclick={() => editor?.chain().focus().unsetAllMarks().run()}
				>Clear marks</button
			>
			<button type="button" onclick={() => editor?.chain().focus().clearNodes().run()}
				>Clear nodes</button
			>
			<button
				type="button"
				onclick={() => editor?.chain().focus().setColor('#958DF1').run()}
				class={editor?.isActive('textStyle', { color: '#958DF1' }) ? 'btn-active btn-primary' : ''}
			>
				Purple
			</button>
		</div>
	</div>
{/if}
<input type="hidden" {name} value={html} />
<div bind:this={element}></div>
