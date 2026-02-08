// import {
//   CanActivate,
//   ExecutionContext,
//   Injectable,
//   ForbiddenException,
// } from '@nestjs/common';
// import { Request } from 'express';
//
// @Injectable()
// export class RoleGuard implements CanActivate {
//   constructor(private readonly allowedRoles: string[] = []) {}
//
//   canActivate(context: ExecutionContext): boolean {
//     const request = context.switchToHttp().getRequest<Request>();
//     const user:string = request.user;
//
//     if (!user) {
//       throw new ForbiddenException('User not authenticated');
//     }
//
//     if (
//       this.allowedRoles.length > 0 &&
//       !this.allowedRoles.includes(user.role)
//     ) {
//       throw new ForbiddenException(
//         'You are not allowed to access this resource',
//       );
//     }
//
//     return true;
//   }
// }
