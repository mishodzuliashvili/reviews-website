import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import htmlToDraft from "html-to-draftjs";

export default function Wysiwyg({
    onChange,
    defaultValue = "<p>Hey this <strong>editor</strong> rocks 😀</p>",
}: {
    onChange: (html: string) => void;
    defaultValue?: string;
}) {
    const contentBlock = htmlToDraft(defaultValue);
    const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
    );
    const editorState = EditorState.createWithContent(contentState);
    return (
        <div className="bg-white dark:bg-transparent dark:text-black border rounded-lg">
            <Editor
                placeholder="Write your review here..."
                toolbarClassName="dark:bg-transparent dark:border-gray-800 dark:shadow-none"
                editorClassName="px-3 dark:text-white"
                onEditorStateChange={(d) => {
                    onChange(draftToHtml(convertToRaw(d.getCurrentContent())));
                }}
                defaultEditorState={editorState}
            />
        </div>
    );
}
