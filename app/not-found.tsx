import Link from "next/link";
import { Orbit, ArrowLeft } from "lucide-react";
export default function NotFound() {
  return (
    <div className="site-container page-content">
      <div className="empty-state not-found">
        <Orbit size={52} />
        <p className="eyebrow">404 / OFF THE MAP</p>
        <h1>A little too far into space.</h1>
        <p>
          We couldn’t find that page. Let’s get you back to somewhere worth
          exploring.
        </p>
        <Link href="/" className="button button-primary">
          <ArrowLeft size={17} />
          Back to Discovery
        </Link>
      </div>
    </div>
  );
}
