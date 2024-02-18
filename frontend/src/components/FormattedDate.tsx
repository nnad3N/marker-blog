import type { Component } from "solid-js";

interface Props {
  date: Date;
  class?: string;
}

const FormattedDate: Component<Props> = ({ date, class: className }) => {
  return (
    <time class={className} datetime={date.toISOString()}>
      {date.toLocaleDateString("pl-pl", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}
    </time>
  );
};

export default FormattedDate;
