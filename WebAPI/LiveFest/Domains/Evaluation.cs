using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LiveFest.Domains
{
    [Table ("Evaluation")]
    public class Evaluation
    {
        [Key]
        public Guid ID { get; set; } = Guid.NewGuid();



        [Required (ErrorMessage = "Informe o Evento")]
        public Guid EventsID { get; set; }

        [ForeignKey(nameof (EventsID))]
        public Events? Events { get; set; }


        [Required(ErrorMessage ="Informe o Usuario")]
        public Guid UserID { get; set; }

        [ForeignKey (nameof (UserID))]  
        public Users? Users { get; set; }



        [Column(TypeName ="TEXT")]
        public string? Photo { get; set; }

        [Column(TypeName ="TEXT")]
        public string? Description { get; set; }

    }
}
