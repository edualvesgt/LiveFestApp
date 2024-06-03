using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using LiveFest.Domains;
using LiveFest.Interface;
using LiveFest.Repository;
using System.Collections.Generic;


namespace LiveFest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private IEventsRepository eventsRepository;

        public EventsController()
        {
            eventsRepository = new EventsRepository();
        }



        [HttpPost("PublicacaoDeEvento")]
        public IActionResult Register(Events events)
        {
            try
            {
                eventsRepository.Register(events);

                return StatusCode(201, events);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("BuscarPorId")]
        public IActionResult GetById(Guid id)
        {
            try
            {
                Events searchedEvents = eventsRepository.GetById(id);

                return Ok(searchedEvents);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("BuscarPorCategoria")]
        public IActionResult GetByCategory(Guid CategoriesID)
        {
            try
            {
                List<Events> eventsByCategory = eventsRepository.GetByCategory(CategoriesID);

                return Ok(eventsByCategory);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("Todos")]
        public IActionResult GetAll()
        {
            try
            {
                return Ok(eventsRepository.GetAll());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteEvent(Guid id)
        {
            try
            {
                eventsRepository.DeleteEvent(id);

                return NoContent();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
