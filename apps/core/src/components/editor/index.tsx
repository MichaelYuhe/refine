import { EditorContainer } from '@blocksuite/editor'
import { assertExists } from '@blocksuite/global/utils'
import type { Page } from '@blocksuite/store'
import type { CSSProperties, ReactElement } from 'react'
import { memo, useEffect, useRef } from 'react'

export type EditorProps = {
  page: Page;
  mode: 'page' | 'edgeless';
  onLoad?: (page: Page, editor: EditorContainer) => () => void;
  style?: CSSProperties;
  className?: string;
};

const BlockSuiteEditorImpl = (props: EditorProps): ReactElement => {
  const { onLoad, page, mode, style } = props
  assertExists(page, 'page should not be null')
  const editorRef = useRef<EditorContainer | null>(null)
  if (editorRef.current === null) {
    editorRef.current = new EditorContainer()
    editorRef.current.autofocus = true
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    globalThis.editor = editorRef.current
  }
  const editor = editorRef.current
  assertExists(editorRef, 'editorRef.current should not be null')
  if (editor.mode !== mode) {
    editor.mode = mode
  }

  if (editor.page !== page) {
    editor.page = page
  }

  useEffect(() => {
    if (editor.page && onLoad) {
      const disposes = [] as ((() => void) | undefined)[]
      disposes.push(onLoad?.(page, editor))
      return () => {
        disposes.filter((dispose): dispose is () => void => !!dispose).
          forEach(dispose => dispose())
      }
    }
    return
  }, [editor, editor.page, page, onLoad])

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const editor = editorRef.current
    assertExists(editor)
    const container = ref.current
    if (!container) {
      return
    }
    container.appendChild(editor)
    return () => {
      container.removeChild(editor)
    }
  }, [editor])
  return (
    <div
      className={props.className}
      style={style}
      ref={ref}
    />
  )
}

export const BlockSuiteEditor = memo(function BlockSuiteEditor (
  props: EditorProps
): ReactElement {
  return (
    <BlockSuiteEditorImpl {...props} />
  )
})

BlockSuiteEditor.displayName = 'BlockSuiteEditor'