import path from 'path';

export const TEMPLATE_PATH = (templateName: string) =>
  path.join(process.cwd(), 'dist', 'templates', templateName);
