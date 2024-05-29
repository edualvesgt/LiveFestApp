using LiveFest.Domains;
using LiveFest.Interface;
using LiveFest.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LiveFest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private IUsersRepository _usersRepository { get; set; }

        public UsersController()
        {
            _usersRepository = new UsersRepository();
        }

        [HttpPost]
        public IActionResult Post(Users users)
        {

            try
            {
                _usersRepository.CreateUser(users);

                return StatusCode(201, users);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
