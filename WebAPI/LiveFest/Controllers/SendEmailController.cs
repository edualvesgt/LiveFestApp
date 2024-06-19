using LiveFest.Utils.Email;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LiveFest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SendEmailController : ControllerBase
    {
        private readonly IEmailService _emailService;

        public SendEmailController(IEmailService service)
        {
            _emailService = service;
        }




        [HttpPost]
        public async Task<IActionResult> SendEmail(string email, string username)
        {
            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(username))
            {
                return BadRequest("Email e Username são obrigatórios");
            }

            try
            {
                // Criar o objeto para receber os dados do email para ser enviado
                MailRequest mailRequest = new MailRequest
                {
                    ToEmail = email,
                    Subject = "Seja Muito Bem-Vindo ao LiveFest",
                    Body = GetHtmlContent(username)
                };

                // Log para verificar o conteúdo do mailRequest
                Console.WriteLine($"Email: {mailRequest.ToEmail}, Subject: {mailRequest.Subject}, Body: {mailRequest.Body}");

                // Chamar o envio do email
                await _emailService.SendEmailAsync(mailRequest);

                return Ok(mailRequest);
            }
            catch (Exception ex)
            {
                // Log do erro
                Console.WriteLine($"Erro ao enviar email: {ex.Message}");
                return BadRequest($"Falha no envio do email: {ex.Message}");
            }
        }

        private string GetHtmlContent(string userName)
        {
            return $@"
<div style=""width:100%; background-color:rgba(96, 191, 197, 1); padding: 20px;"">
    <div style=""max-width: 600px; margin: 0 auto; background-color:#FFFFFF; border-radius: 10px; padding: 20px;"">
        <img src=""https://blobvitalhub.blob.core.windows.net/containervitalhub/logotipo.png"" alt=""Logotipo da Aplicação"" style=""display: block; margin: 0 auto; max-width: 200px;"" />
        <h1 style=""color: #333333; text-align: center;"">Bem-vindo ao LiveFest!</h1>
        <p style=""color: #666666; text-align: center;"">Olá <strong>{userName}</strong>,</p>
        <p style=""color: #666666; text-align: center;"">Estamos muito felizes por você ter se inscrito na plataforma LiveFest.</p>
        <p style=""color: #666666; text-align: center;"">Explore todas as funcionalidades que oferecemos e encontre os melhores shows.</p>
        <p style=""color: #666666; text-align: center;"">Se tiver alguma dúvida ou precisar de assistência, nossa equipe de suporte está sempre pronta para ajudar.</p>
        <p style=""color: #666666; text-align: center;"">Aproveite sua experiência conosco!</p>
        <p style=""color: #666666; text-align: center;"">Atenciosamente,<br>Equipe LiveFest</p>
    </div>
</div>";
        }
    }
}
