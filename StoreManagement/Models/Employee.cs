namespace StoreManagement.Models
{
    public class Employee : BaseModels
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public string? Position { get; set; }
    }
}
