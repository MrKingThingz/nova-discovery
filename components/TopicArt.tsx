import { topicStyle } from "@/lib/presentation";

// Abstract editorial illustrations, not photographs or scientific diagrams.
export function TopicArt({
  slug = "",
  small = false,
}: {
  slug?: string;
  small?: boolean;
}) {
  return (
    <div
      className={`topic-art art-${topicStyle(slug)}${small ? " art-small" : ""}`}
      aria-hidden="true"
    >
      <div className="art-grid" />
      <span className="celestial-ring" />
      <span className="celestial-body" />
      <span className="art-star star-one" />
      <span className="art-star star-two" />
      <span className="art-star star-three" />
    </div>
  );
}
