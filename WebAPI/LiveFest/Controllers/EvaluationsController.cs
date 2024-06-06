using LiveFest.Domains;
using LiveFest.Interface;
using LiveFest.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LiveFest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EvaluationsController : ControllerBase
    {
        private IEvaluationsRepository _evaluantionRepository;

        public EvaluationsController()
        {
            _evaluantionRepository = new EvaluationsRepository();
        }

        [HttpPost]
        public IActionResult Register(Events events)
        {
            try
            {
                _eventsRepository.Register(events);

                return StatusCode(201, events);
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
                Events searchedEvents = _eventsRepository.GetById(id);

                return Ok(searchedEvents);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("GetByEvent")]
        public List<Events> GetByEvent(Guid EventsID)
        {
            try
            {
                List<Events> categoryList = ctx.Events
                    .Where(x => x.CategoriesID == CategoriesID)
                    .ToList();

                return categoryList;
            }
            catch (Exception)
            {
                throw;
            }

        }
    }
}
