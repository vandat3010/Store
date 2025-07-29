using System.Linq.Expressions;

public interface IBaseService<T> where T : class
{
    Task<IEnumerable<T>> GetAllAsync();
    Task<T?> GetByIdAsync(int id);
    Task AddAsync(T entity);
    Task UpdateAsync(T entity);
    Task DeleteAsync(int id);
    Task<(IEnumerable<T> Items, int TotalCount)> SearchAsync(
        Expression<Func<T, bool>> predicate, int pageNumber, int pageSize);
}
