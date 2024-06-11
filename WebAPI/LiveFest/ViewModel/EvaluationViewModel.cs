using LiveFest.Domains;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
namespace LiveFest.ViewModel
{
    public class EvaluationViewModel
    {
        public Guid EventsID { get; set; }

        public Guid UserID { get; set; }

        public string? Description { get; set; }

        [NotMapped]
        [JsonIgnore]
        public IFormFile? Arquivo { get; set; }

        public string? Photo { get; set; }

    }
}
