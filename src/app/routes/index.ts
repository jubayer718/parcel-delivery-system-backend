import { Router } from 'express';





export const router = Router();

const moduleRoutes = [
  {
    path: "/user",
    route: ""
  },
  {
    path: "/auth",
    route: ""
  }
]

// moduleRoutes.forEach((route) => {
//   router.use(route.path, route.route);
// })