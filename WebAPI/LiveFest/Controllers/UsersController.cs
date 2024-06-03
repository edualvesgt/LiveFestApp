using LiveFest.Domains;
using LiveFest.Interface;
using LiveFest.Repository;
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
