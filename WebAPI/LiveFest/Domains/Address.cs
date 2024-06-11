using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LiveFest.Domains
{
    [Table("Address")]
    public class Address
    {
        [Key]
        public Guid ID { get; set; } = Guid.NewGuid();

        [Column(TypeName ="VARCHAR(255)")]
        [Required(ErrorMessage = "Logradouro do Endereco Obrigatorio")]
        public string? Street { get; set; }

        [Column(TypeName = "INT")]
        [Required(ErrorMessage = "Numero do Endereco Obrigatorio")]
        public int? Number { get; set; }

        [Column(TypeName = "FLOAT")]
        [Required(ErrorMessage = "CEP do Endereco Obrigatorio")]
        public int? CEP { get; set; }

        [Column(TypeName = "VARCHAR(255)")]
        [Required(ErrorMessage = "Cidade do Endereco Obrigatorio")]
        public string? City { get; set; }

        [Column(TypeName = "VARCHAR(255)")]
        [Required(ErrorMessage = "Nome do Endereco Obrigatorio")]
        public string? Name { get; set; }

        [Column(TypeName = "DECIMAL(9,6)")]
        public decimal? Longitude { get; set; }

        [Column(TypeName = "DECIMAL(8,6)")]
        public decimal? Latitude { get; set; }


    }
}
