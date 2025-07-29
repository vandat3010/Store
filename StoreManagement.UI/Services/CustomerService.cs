using StoreManagement.UI.Http;
using StoreManagement.UI.Models.DTOs;
using StoreManagement.UI.Services.Interfaces;
using System.Net.Http;
using System.Net.Http.Json;

namespace StoreManagement.UI.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly HttpClient _http;

        public CustomerService(HttpClient http)
        {
            _http = http;
        }

        public async Task<List<CustomerDto>> GetAllAsync() =>
            await _http.GetFromJsonAsync<List<CustomerDto>>(ApiRoutes.Customers.GetAll) ?? new();

        public async Task<CustomerDto?> GetByIdAsync(int id) =>
            await _http.GetFromJsonAsync<CustomerDto>(ApiRoutes.Customers.GetById(id));

        public async Task<bool> CreateAsync(CustomerDto customer)
        {
            var response = await _http.PostAsJsonAsync(ApiRoutes.Customers.Create, customer);
            return response.IsSuccessStatusCode;
        }

        public async Task<bool> UpdateAsync(CustomerDto customer)
        {
            var response = await _http.PutAsJsonAsync(ApiRoutes.Customers.Update(customer.Id), customer);
            return response.IsSuccessStatusCode;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var response = await _http.DeleteAsync(ApiRoutes.Customers.Delete(id));
            return response.IsSuccessStatusCode;
        }
        public async Task<(List<CustomerDto> Items, int Total)> SearchAsync(SearchRequest request)
        {
            var response = await _http.PostAsJsonAsync(ApiRoutes.Customers.Search, request);

            if (!response.IsSuccessStatusCode)
                return (new List<CustomerDto>(), 0);

            var result = await response.Content.ReadFromJsonAsync<SearchResultDto>();
            return (result?.Data ?? new(), result?.Total ?? 0);
        }

        public class SearchResultDto
        {
            public List<CustomerDto> Data { get; set; } = new();
            public int Total { get; set; }
        }

    }
}
