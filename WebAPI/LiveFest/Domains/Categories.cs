using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LiveFest.Domains
{
    [Table("Categories")]
    public class Categories
    {
        [Key]
        public Guid ID { get; set; } = Guid.NewGuid();

        [Column(TypeName = "VARCHAR(255)")]
        [Required(ErrorMessage = "Categoria Obrigatorio")]
        public string? Category { get; set; }
    }
}
