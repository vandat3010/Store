using AutoMapper;
using StoreManagement.Dto;
using StoreManagement.Models;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Customer, CustomerDto>().ReverseMap();
        // Add more mappings as needed
    }
}
