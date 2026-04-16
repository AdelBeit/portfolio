import {routes, type VercelConfig} from '@vercel/config/v1';

export const config: VercelConfig = {
  rewrites: [
    routes.rewrite('/resume', 'https://adelbeit-resume.vercel.app/'),
  ],
};
