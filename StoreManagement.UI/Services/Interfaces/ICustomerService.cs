using StoreManagement.UI.Models.DTOs;

namespace StoreManagement.UI.Services.Interfaces
{
    public interface ICustomerService
    {
        Task<List<CustomerDto>> GetAllAsync();
        Task<CustomerDto?> GetByIdAsync(int id);
        Task<bool> CreateAsync(CustomerDto customer);
        Task<bool> UpdateAsync(CustomerDto customer);
        Task<bool> DeleteAsync(int id);
        Task<(List<CustomerDto> Items, int Total)> SearchAsync(SearchRequest request);
    }
}
