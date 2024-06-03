using LiveFest.Domains;
using LiveFest.Interface;
using LiveFest.Repository;
using LiveFest.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace LiveFest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IUsersRepository _usersRepository;

        public LoginController()
        {
            _usersRepository = new UsersRepository();
        }

        [HttpPost]

        public IActionResult Login(LoginViewModel user)
        {
            try
            {
                Users searchUser = _usersRepository.Login(user.Email!, user.Password!);
                if (searchUser == null)
                {
                    return StatusCode(401, "Email ou Senha Invalidos");

                }

                //IMPLEMENTAR AUTENTICACAO JWT 

                return StatusCode(200, searchUser);

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
