import { usePage } from '../../app/usePage.js';

export default function NotFound() {
  usePage('Page not found');
  return (
    <>
      <h1 class="lx-rise" style={{ fontSize: '1.75rem' }}>Lost in space</h1>
      <p class="lx-rise lx-d1">This page drifted out of orbit. Head back to today's word.</p>
      <a class="lx-btn lx-rise lx-d2" href="/">Back to Today</a>
    </>
  );
}
