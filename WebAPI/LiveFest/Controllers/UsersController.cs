using LiveFest.Domains;
using LiveFest.Interface;
using LiveFest.Repository;
using LiveFest.Utils.Email;
using LiveFest.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LiveFest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private IUsersRepository _usersRepository { get; set; }

        private readonly EmailSendingService _emailSendingService;

        public UsersController(EmailSendingService emailSendingService)
        {
            _usersRepository = new UsersRepository();
            _emailSendingService = emailSendingService;
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync(Users users)
        {

            try
            {
                _usersRepository.CreateUser(users);

                await _emailSendingService.SendWelcomeEmail(users.Email!, users.UserName!);

                return StatusCode(201, users);
            }
            catch (Exception e)
            {
                if (e.Message == "Email já cadastrado.")
                {
                    return BadRequest("O email informado já está em uso.");
                }

                return BadRequest("Ocorreu um erro ao processar a sua solicitação.");
            }
        }
        


        [HttpGet("GetById")]

        public IActionResult GetById(Guid id)
        {
            try
            {
                _usersRepository.GetUserById(id);

                return Ok(id);
            }
            catch (Exception)
            {
                return NotFound();
            }
        }


        //[HttpGet]
        //public IActionResult Get()
        //{
        //    try
        //    {
        //        return Ok(_usersRepository.GetUsers());
        //    }
        //    catch (Exception e)
        //    {
        //        return BadRequest(e.Message);
        //    }
        //}

        [HttpPut("UpdatePassword")]
        public IActionResult UpdatePassword(string email , UpdatePasswordViewModel password )
        {

            try
            {
                _usersRepository.UpdatePasswaord(email, password.NewPassword!);

                return Ok("Senha Alterada com sucesso ");
            }
            catch (Exception e )
            {
                return BadRequest(e.Message);
            }
        }

    }
}
