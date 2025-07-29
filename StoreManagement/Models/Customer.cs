using System.ComponentModel.DataAnnotations.Schema;

namespace StoreManagement.Models
{
    [Table("Customer")]
    public class Customer: BaseModels
    {
        public string Name { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
    }
}
