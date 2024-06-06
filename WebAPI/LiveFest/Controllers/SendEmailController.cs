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
        [Route("send-welcome-email")]
        public async Task<IActionResult> SendWelcomeEmail(string email, string username)
        {
            try
            {
                // Criar o objeto para receber os dados do email a ser enviado
                MailRequest mailRequest = new MailRequest
                {
                    ToEmail = email,
                    Subject = "Bem-vindo ao LiveFest",
                    Body = GetHtmlContent(username)
                };

                // Chamar o envio do email
                await _emailService.SendEmailAsync(mailRequest);

                return Ok(mailRequest);
            }
            catch (Exception)
            {
                return BadRequest("Falha no envio do email");
            }
        }

        private string GetHtmlContent(string userName)
        {
            string Response = @"
<div style=""width:100%; background-color:#003366; padding: 20px;"">
    <div style=""max-width: 600px; margin: 0 auto; background-color:#FFFFFF; border-radius: 10px; padding: 20px;"">
        <img src=""https://linkparaalogodolivefest.com/logo.png"" alt=""Logotipo do LiveFest"" style=""display: block; margin: 0 auto; max-width: 200px;"" />
        <h1 style=""color: #333333; text-align: center;"">Bem-vindo ao LiveFest!</h1>
        <p style=""color: #666666; text-align: center;"">Olá <strong>" + userName + @"</strong>,</p>
        <p style=""color: #666666; text-align: center;"">Estamos muito felizes por você ter se inscrito na plataforma LiveFest.</p>
        <p style=""color: #666666; text-align: center;"">Explore todas as funcionalidades que oferecemos e encontre os melhores eventos.</p>
        <p style=""color: #666666; text-align: center;"">Se tiver alguma dúvida ou precisar de assistência, nossa equipe de suporte está sempre pronta para ajudar.</p>
        <p style=""color: #666666; text-align: center;"">Aproveite sua experiência conosco!</p>
        <p style=""color: #666666; text-align: center;"">Atenciosamente,<br>Equipe LiveFest</p>
    </div>
</div>";

            return Response;
        }

    }
}
