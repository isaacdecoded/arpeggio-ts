export interface FindTodosRepository<ReadCriteria, ReadModel> {
  find(criteria?: ReadCriteria): Promise<ReadModel>
}
