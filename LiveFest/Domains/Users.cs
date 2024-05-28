using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LiveFest.Domains
{
    [Table("Users")]
    public class Users
    {
        [Key]
        public Guid ID { get; set; } = Guid.NewGuid();

        [Column(TypeName = "VARCHAR(255)")]
        [Required(ErrorMessage = "Nome do Usuario Obrigatorio")]
        public string? UserName { get; set; }

        [Column(TypeName = "VARCHAR(255)")]
        [Required(ErrorMessage = "Email do Usuario Obrigatorio")]
        public string? Email { get; set; }

        [Column(TypeName = "CHAR(60)")]
        [Required(ErrorMessage = "Senha do Usuario Obrigatorio")]
        [StringLength(60, MinimumLength = 5 , ErrorMessage = "Senha deve Obter no Minimo 5 caracteres e no Maximo 60")]
        public string? Password { get; set; }

        [Column(TypeName = "INT")]
        public int Code { get; set; }

        [Column(TypeName = "VARCHAR(11)")]
        [Required(ErrorMessage = "CPF do Usuario Obrigatorio")]
        public string? CPF { get; set; }


    }
}
