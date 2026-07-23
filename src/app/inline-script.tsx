/**
 * Renders a blocking inline script without tripping React 19's dev-time
 * warning about raw <script> children.
 *
 * The `type` swap is the trick: on the server it emits real JavaScript, which
 * the browser executes while parsing <head> — i.e. before first paint. On the
 * client React sees an inert `text/plain` node and leaves it alone, so it is
 * never re-executed during hydration.
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
