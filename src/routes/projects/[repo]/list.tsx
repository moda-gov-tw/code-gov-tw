import { component$ } from "@builder.io/qwik";

const extractMarkdownLink = (content: string) => {
  if (!content || content === "") return null;
  const start = content.indexOf("[");
  const end = content.indexOf("]");
  if (start !== -1 && end !== -1 && start < end) {
    const title = content.substring(start + 1, end);
    const hrefStart = content.indexOf("(", end);
    const hrefEnd = content.indexOf(")", hrefStart);
    if (hrefStart !== -1 && hrefEnd !== -1 && hrefStart < hrefEnd) {
      const href = content.substring(hrefStart + 1, hrefEnd);
      return { title, href };
    }
  }
  return null;
};

type ListProps = {
  title: string;
  contents?: (string | null | undefined)[];
  useMarkdown?: boolean;
};

export default component$<ListProps>((props) => {
  if (!props.contents) {
    return null;
  }

  const renderContent = (content: string | null | undefined, index: number) => {
    if (!content) return null;
    const markdownLink = extractMarkdownLink(content);
    if (props.useMarkdown && markdownLink) {
      const { title, href } = markdownLink;
      const other = content.replace(`[${title}](${href})`, "");
      return (
        <div key={index}>
          <a
            class="text-brand-secondary"
            target="_blank"
            rel="noopener noreferrer"
            href={href}
          >
            {title}
          </a>
          <span>{other}</span>
        </div>
      );
    }
    return <div key={index}>{content}</div>;
  };

  return (
    <div class="flex flex-col gap-4 border-t border-gray-400 pb-8 pt-4 last-of-type:border-b md:grid md:grid-cols-4">
      <div class="text-lg font-medium">{props.title}</div>
      <div class="md:col-span-3">{props.contents.map(renderContent)}</div>
    </div>
  );
});
