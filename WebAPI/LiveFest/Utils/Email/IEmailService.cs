namespace LiveFest.Utils.Email
{
    public interface IEmailService
    {
        //Metodo Assincrono para encio de email que recebe o EmailRequest
        Task SendEmailAsync(MailRequest mailRequest);
    }
}
