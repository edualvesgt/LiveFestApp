using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LiveFest.Domains
{
    [Table("Events")]
    public class Events
    {
        [Key]
        public Guid ID { get; set; } = Guid.NewGuid();



        [Required(ErrorMessage = "Informe a Categoria")]
        public Guid CategoriesID { get; set; }

        //Chave Estrangeira
        [ForeignKey(nameof(CategoriesID))]
        public Categories? Categories { get; set; }


        [Required(ErrorMessage = "Informe o Endereco")]
        public Guid AddressID { get; set; }
        //Chave Estrangeira
        [ForeignKey(nameof(AddressID))]
        public Address? Address  { get; set; }





        [Column(TypeName = "VARCHAR(255)")]
        [Required(ErrorMessage = "Nome do Evento Obrigatorio")]
        public string? EventName { get; set; }

        [Column(TypeName = "DATE")]
        [Required(ErrorMessage = "Data e Horario do Evento Obrigatorias")]
        public DateTime Date { get; set; }

        [Column(TypeName = "VARCHAR(255)")]
        [Required(ErrorMessage = "Email do Contato do Evento Obrigatorio ")]
        public string? Email { get; set; }

        [Column(TypeName = "INT")]
        [Required(ErrorMessage = "O Numero de Contato de Evento Obrigatorio")]
        public int? PhoneNumber { get; set; }

        [Column(TypeName = "TEXT")]
        [Required(ErrorMessage = "Foto do Evneto Obrigatoria" )]
        public string? Photo { get; set; }


    }
}
