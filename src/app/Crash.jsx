import { Component } from 'preact';
import { useLocation } from 'preact-iso';

// Catches errors while a screen renders and offers a way out, instead of a blank page.
// The error belongs to the path it happened on, so moving to another screen clears it.
class Boundary extends Component {
  state = { path: null };
  componentDidCatch(error) {
    console.error(error);
    this.setState({ path: this.props.path });
  }
  render({ path, children }, { path: broken }) {
    if (broken === null || broken !== path) return children;
    return (
      <section class="lx-empty lx-card" role="alert" aria-labelledby="lx-crash-h">
        <h1 id="lx-crash-h" class="lx-page-title">Something went wrong</h1>
        <p>This screen hit a problem. Your words, notes and progress are safe.</p>
        <div class="lx-crash-row">
          <button type="button" class="lx-btn" onClick={() => location.reload()}>Reload</button>
          <a class="lx-btn secondary" href="/">Go home</a>
        </div>
      </section>
    );
  }
}

export function Crash({ children }) {
  const { path } = useLocation();
  return <Boundary path={path}>{children}</Boundary>;
}
