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
        private IEventsRepository _eventsRepository;

        public EventsController()
        {
            _eventsRepository = new EventsRepository();
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

        [HttpGet("GetByCategory")]
        public IActionResult GetByCategory(Guid CategoriesID)
        {
            try
            {
                List<Events> eventsByCategory = _eventsRepository.GetByCategory(CategoriesID);

                return Ok(eventsByCategory);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                return Ok(_eventsRepository.GetAll());
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
                _eventsRepository.DeleteEvent(id);

                return NoContent();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
