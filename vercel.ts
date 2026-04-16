import {routes, type VercelConfig} from '@vercel/config/v1';

export const config: VercelConfig = {
  rewrites: [
    routes.rewrite('/resume', 'http://adelbeit-resume.vercel.app/'),
  ],
};
