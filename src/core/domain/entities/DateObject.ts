import { ValueObject } from "./ValueObject"

export class DateObject extends ValueObject<Date> {
  static now(): DateObject {
    return new DateObject(new Date())
  }
}
