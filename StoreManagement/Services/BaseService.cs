using System.Linq.Expressions;

public class BaseService<T> : IBaseService<T> where T : class
{
    private readonly IGenericRepository<T> _repository;

    public BaseService(IGenericRepository<T> repository)
    {
        _repository = repository;
    }

    public Task<IEnumerable<T>> GetAllAsync() => _repository.GetAllAsync();
    public Task<T?> GetByIdAsync(int id) => _repository.GetByIdAsync(id);
    public Task AddAsync(T entity) => _repository.AddAsync(entity);
    public Task UpdateAsync(T entity) => _repository.UpdateAsync(entity);
    public Task DeleteAsync(int id) => _repository.DeleteAsync(id);
    public Task<(IEnumerable<T> Items, int TotalCount)> SearchAsync(
        Expression<Func<T, bool>> predicate, int pageNumber, int pageSize)
        => _repository.SearchAsync(predicate, pageNumber, pageSize);
}
