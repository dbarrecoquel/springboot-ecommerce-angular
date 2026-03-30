import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'basket',
    renderMode: RenderMode.Client // 🔥 IMPORTANT
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
