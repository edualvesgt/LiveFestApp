using System.ComponentModel.DataAnnotations;

namespace LiveFest.ViewModel
{
    public class UpdatePasswordViewModel
    {
        [Required(ErrorMessage = "Informe a nova senha do usuário")]
        public string? NewPassword { get; set; }
    }
}
