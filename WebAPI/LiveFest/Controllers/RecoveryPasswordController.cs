using LiveFest.Context;
using LiveFest.Utils.Email;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

namespace LiveFest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecoveryPasswordController : ControllerBase
    {
        private readonly LiveFestContext _context; // Contexto do banco de dados
        private readonly EmailSendingService _emailSendingService; // Serviço de envio de e-mails

        public RecoveryPasswordController(LiveFestContext context, EmailSendingService emailSendingService)
        {
            _context = context; // Inicializa o contexto do banco de dados
            _emailSendingService = emailSendingService; // Inicializa o serviço de envio de e-mails
        }

        // Método para enviar o código de recuperação de senha por e-mail
        [HttpPost]
        public async Task<IActionResult> SendRecoveryCodePassword(string email)
        {
            try
            {
                // Busca o usuário pelo e-mail no banco de dados
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

                if (user == null)
                {
                    return NotFound("Usuario Nao Encontrado "); // Retorna um erro 404 se o usuário não for encontrado
                }

                // Gera um código de recuperação de senha aleatório
                Random random = new Random();
                int RecoveryCode = random.Next(1000, 9999);

                // Armazena o código de recuperação de senha no usuário
                user.Code = RecoveryCode;

                await _context.SaveChangesAsync(); // Salva as alterações no banco de dados

                // Envia o código de recuperação de senha por e-mail
                await _emailSendingService.SendRecoveryPassword(RecoveryCode, user.Email!);

                return Ok("Codigo Enviado Com Sucesso "); // Retorna uma resposta de sucesso
            }
            catch (Exception  e )
            {
                return BadRequest($"Erro Ao enviar o Codigo: {e.Message}"); // Retorna um erro 400 em caso de falha
            }
        }

        // Método para validar o código de recuperação de senha
        [HttpPost("RecoveryPassword")]
        public async Task<IActionResult> ValidatePasswordRecoveryCode(string email, int code)
        {
            try
            {
                // Busca o usuário pelo e-mail no banco de dados
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

                if (user == null)
                {
                    return NotFound("Usuario Nao Encontrado "); // Retorna um erro 404 se o usuário não for encontrado
                }

                if (user.Code != code)
                {
                    return BadRequest("Codigo Invalido"); // Retorna um erro 400 se o código for inválido
                }

                user.Code = null; // Limpa o código de recuperação de senha do usuário

                await _context.SaveChangesAsync(); // Salva as alterações no banco de dados

                return Ok("Codigo de Recuperacao Valido"); // Retorna uma resposta de sucesso
            }
            catch (Exception e)
            {
                return BadRequest(e.Message); // Retorna um erro 400 em caso de falha
            }
        }
    }
}

