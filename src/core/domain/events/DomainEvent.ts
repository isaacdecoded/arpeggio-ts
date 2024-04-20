export abstract class DomainEvent {
  private readonly _occurringTime = new Date()
  constructor(
    protected readonly _name: string,
    protected readonly _aggregateRootId: string,
  ) {}

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
