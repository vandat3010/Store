namespace StoreManagement.Models
{
    public class Product : BaseModels
    {
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
    }
}
