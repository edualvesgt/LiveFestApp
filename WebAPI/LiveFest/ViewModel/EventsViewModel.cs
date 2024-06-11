using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace LiveFest.ViewModel
{
    public class EventsViewModel
    {
        public Guid CategoriesID { get; set; }

        public Guid AddressID { get; set; }

        public string? EventName { get; set; }

        public DateTime? Date { get; set; }

        public string? Email { get; set; }

        public float? PhoneNumber { get; set; }

        [NotMapped]
        [JsonIgnore]
        public IFormFile? Arquivo { get; set; }

        public string? Photo { get; set; }
    }
}
