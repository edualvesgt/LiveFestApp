
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;

namespace LiveFest.Utils.Email
{
    public class EmailService : IEmailService
    {
        private readonly EmailSettings _emailSettings;

        public EmailService(IOptions<EmailSettings> options)
        {
            _emailSettings = options.Value;
        }
        public async Task SendEmailAsync(MailRequest mailRequest)
        {
            try
            {
                //Objeto que Representa o Email
                var email = new MimeMessage();

                //Define o Remetente do Email
                email.Sender = MailboxAddress.Parse(_emailSettings.Email);

                //Adiciona o Destinatario do Email 
                email.To.Add(MailboxAddress.Parse(mailRequest.ToEmail));

                //Define o Assunto do Email  
                email.Subject = mailRequest.Subject;

                //Cria o corpo do Email
                var builder = new BodyBuilder();

                //Define Corpo do email como HTML
                builder.HtmlBody = mailRequest.Body;

                //Define o Corpo do Email no Objeto Mime Message
                email.Body = builder.ToMessageBody();

                using (var smtp = new SmtpClient())
                {
                    // Conecta ao servidor SMTP usando os dados do Email Settings
                    smtp.Connect(_emailSettings.Host, _emailSettings.Port, SecureSocketOptions.StartTls);

                    //Authentica no Servidor SMTP usando os dados do Email Settings
                    smtp.Authenticate(_emailSettings.Email, _emailSettings.Password);

                    //Envia o Email Assincrono
                    await smtp.SendAsync(email);
                }


            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao enviar email: {ex.Message}");
                throw;
            }
        }
    }
}
