import type { Block } from "@/types/payload";
import {
  createSignal,
  type Component,
  type JSX,
  For,
  onMount,
  type ComponentProps,
  splitProps,
  type ValidComponent,
} from "solid-js";
import Fuse, { type FuseResult, type FuseResultMatch } from "fuse.js";
import { Dynamic } from "solid-js/web";
import DOMPurify from "dompurify";

type SearchItem = {
  slug: string;
  title: string;
  description: string;
};

type SearchResults = FuseResult<SearchItem>[];

interface Props {
  block: Block<"search">;
  searchData: SearchItem[];
}

const Search: Component<Props> = ({ block, searchData }) => {
  const fuse = new Fuse(searchData, {
    keys: ["title", "description"],
    includeMatches: true,
    minMatchCharLength: 2,
    threshold: 0.4,
  });

  const [query, setQuery] = createSignal("");
  const [searchResults, setSearchResults] = createSignal<SearchResults>([]);

  onMount(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const urlQuery = searchParams.get("q") ?? "";

    setQuery(urlQuery);
    setSearchResults(fuse.search(urlQuery));
  });

  const handleSearch: JSX.EventHandler<HTMLInputElement, Event> = (e) => {
    const value = e.currentTarget.value;

    if (!value) {
      setSearchResults([]);
      window.history.replaceState(history.state, "", window.location.pathname);
      return;
    }

    setQuery(value);
    const url = new URL(window.location.href);
    url.searchParams.set("q", value);
    window.history.replaceState(history.state, "", url);

    const results = fuse.search(value);
    setSearchResults(results);
  };

  return (
    <div class="mx-auto w-full max-w-2xl py-6 focus-visible:outline-none focus-visible:outline-yellow-highlight lg:py-10">
      <input
        value={query()}
        onInput={handleSearch}
        aria-label={block.label}
        placeholder={block.placeholder ?? ""}
        type="text"
        class="w-full rounded-md border-2 border-gray-900 px-2 py-1"
      />
      <ul class="flex flex-col gap-y-4 pt-6">
        <For each={searchResults()}>
          {({ item, matches }) => {
            return (
              <li>
                <FuseHighlight
                  as="a"
                  class="text-lg font-bold underline hover:bg-yellow-highlight"
                  href={`/posts/${item.slug}`}
                  fallback={item.title}
                  matches={matches}
                  searchKey="title"
                />
                <FuseHighlight
                  as="p"
                  fallback={item.description}
                  matches={matches}
                  searchKey="description"
                />
              </li>
            );
          }}
        </For>
      </ul>
    </div>
  );
};

export default Search;

interface FuseHighlightProps<T extends ValidComponent> {
  as: T;
  matches?: readonly FuseResultMatch[];
  searchKey: "title" | "description";
  fallback: string;
}

const FuseHighlight = <T extends ValidComponent = "div">(
  props: FuseHighlightProps<T> &
    Omit<ComponentProps<T>, keyof FuseHighlightProps<T>>,
) => {
  const [local, other] = splitProps(props, [
    "as",
    "fallback",
    "searchKey",
    "matches",
  ]);

  const matches: readonly FuseResultMatch[] | undefined = local.matches;
  const match = matches?.filter((match) => match.key === local.searchKey)[0];
  const originalValue = match?.value ?? local.fallback;
  let result = originalValue;

  match?.indices.forEach(([start, end]) => {
    const toReplace = originalValue.substring(start, end + 1);
    result = result.replace(toReplace, `<mark>${toReplace}</mark>`);
  });

  return (
    <Dynamic
      component={local.as || "div"}
      innerHTML={DOMPurify.sanitize(result, {
        USE_PROFILES: { html: true, svg: true },
      })}
      {...other}
    />
  );
};
