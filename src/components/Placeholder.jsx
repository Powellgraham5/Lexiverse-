import './placeholder.css';

// Temporary screen body until the real screen lands in its build phase.
export function Placeholder({ title, phase, children }) {
  return (
    <>
      <h1 class="lx-rise lx-page-title">{title}</h1>
      <section class="lx-card lx-placeholder lx-rise lx-d1">
        <span class="lx-placeholder-orbit" aria-hidden="true"><span /></span>
        <p>{children}</p>
        <p class="lx-placeholder-phase">Coming in build phase {phase}</p>
      </section>
    </>
  );
}
