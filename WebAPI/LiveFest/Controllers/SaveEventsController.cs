using LiveFest.Interface;
using LiveFest.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LiveFest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SaveEventsController : ControllerBase
    {
        private ISaveEventsRepository saveEventsRepository;

        [HttpGet("Todos")]
        public IActionResult GetAll()
        {
            try
            {
                return Ok(saveEventsRepository.GetAll());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
