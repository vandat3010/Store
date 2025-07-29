namespace StoreManagement.Models
{
    public class Bill : BaseModels
    {
        public string Code { get; set; }
        public DateTime InvoiceDate { get; set; }

        public int CustomerId { get; set; }
        public Customer Customer { get; set; }

        public int EmployeeId { get; set; }
        public Employee Employee { get; set; }

        public ICollection<ChiTietHoaDon> ChiTietHoaDons { get; set; }
    }
}
