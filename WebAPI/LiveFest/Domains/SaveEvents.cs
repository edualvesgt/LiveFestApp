using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LiveFest.Domains
{
    [Table("SaveEvents")]
    public class SaveEvents
    {
        [Key]
        public Guid ID { get; set; }= Guid.NewGuid();

        [Required(ErrorMessage ="Evento Obrigatorio")]
        public Guid EventsID { get; set; }
        [ForeignKey(nameof(EventsID))]
        public Events? Events { get; set; }

        [Required (ErrorMessage ="Usuario Obrigatorio")]
        public Guid UserID { get; set; }

        [ForeignKey (nameof(UserID))]
        public Users? Users { get; set; }
    }
}
