import { SECRET } from '../config';
import * as jwt from 'jsonwebtoken';

export class BaseController {
  constructor() {}

  protected getUserIdFromToken(authorization: any) {
    if (!authorization) return null;
    const token = authorization.split(' ')[1];
    const decoded: any = jwt.verify(token, SECRET);
    return decoded.id;
  }
}
