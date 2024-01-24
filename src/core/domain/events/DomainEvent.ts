export abstract class DomainEvent {
  private _occurringTime: Date
  constructor(
    protected _name: string,
    protected _aggregateRootId: string | number
  ) {
    this._occurringTime = new Date()
  }

  get name() {
    return this._name
  }

  get occurringTime() {
    return this._occurringTime
  }

  get aggregateRootId() {
    return this._aggregateRootId
  }
}
