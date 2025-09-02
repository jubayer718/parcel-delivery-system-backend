import { Router } from 'express';
import { UserRoutes } from '../module/user/user.route';
import { AuthRoutes } from '../module/auth/auth.route';
import { ParcelRoutes } from '../module/parcel/parcel.routes';





export const router = Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  }, 
  {
    path: "/auth",
    route: AuthRoutes
  }, {
    path: "/parcels",
    route: ParcelRoutes
  }
]

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
})